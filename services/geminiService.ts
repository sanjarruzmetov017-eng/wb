
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const validateWord = async (word: string, lastWord?: string): Promise<{ isValid: boolean; definition?: string; error?: string }> => {
  try {
    const lastLetter = lastWord ? lastWord.slice(-1).toLowerCase() : null;
    
    const systemInstruction = lastWord 
      ? `You are an English dictionary referee. The previous word was "${lastWord}". The new word "${word}" MUST be a valid English word AND MUST start with the letter "${lastLetter}".`
      : `You are an English dictionary referee. Check if "${word}" is a real, valid English dictionary word.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: systemInstruction + ` 
      Return JSON:
      {
        "isValid": boolean,
        "definition": "Short English definition",
        "error": "Reason why invalid (only if isValid is false)"
      }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isValid: { type: Type.BOOLEAN },
            definition: { type: Type.STRING },
            error: { type: Type.STRING }
          },
          required: ["isValid"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Word validation error:", error);
    return { isValid: false, error: "Validation service unavailable" };
  }
};

export const getBotMove = async (lastWord: string, level: 'Easy' | 'Medium' | 'Hard'): Promise<string> => {
  const difficultyPrompt = {
    'Easy': 'common, simple 3-4 letter English word',
    'Medium': 'standard 5-7 letter English dictionary word',
    'Hard': 'complex, rare, or long academic English word'
  };

  const lastLetter = lastWord ? lastWord.slice(-1).toLowerCase() : 'a';
  
  const fallbacks: Record<string, string> = {
    'a': 'apple', 'b': 'battle', 'c': 'chess', 'd': 'dream', 'e': 'energy',
    'f': 'future', 'g': 'galaxy', 'h': 'history', 'i': 'island', 'j': 'journey',
    'k': 'knight', 'l': 'legend', 'm': 'moment', 'n': 'nature', 'o': 'ocean',
    'p': 'planet', 'q': 'quartz', 'r': 'rhythm', 's': 'spirit', 't': 'theory',
    'u': 'unique', 'v': 'vision', 'w': 'wisdom', 'x': 'xenon', 'y': 'yellow', 'z': 'zebra'
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `We are playing a word chain game in English. 
      The last word was "${lastWord || 'start'}". 
      You MUST provide exactly ONE real English dictionary word that starts with the letter "${lastLetter}".
      Difficulty: ${difficultyPrompt[level]}.
      Return ONLY the word itself, lowercase, no punctuation.`,
    });
    
    let botWord = response.text.trim().toLowerCase().replace(/[^a-z]/g, '');
    
    // Agar Gemini kerakli harf bilan boshlanadigan so'z bermasa, fallback ishlatamiz
    if (!botWord || botWord[0] !== lastLetter) {
        return fallbacks[lastLetter] || "apple";
    }
    
    return botWord;
  } catch (error) {
    console.error("Bot move error:", error);
    return fallbacks[lastLetter] || "word";
  }
};

export const getWordAnalysis = async (moves: string[]): Promise<string> => {
  if (moves.length === 0) return "O'yin hali boshlanmagan.";
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze this English word battle: ${moves.join(', ')}. 
      Explain who had a better vocabulary and suggest a more complex English word for one of the turns. 
      Provide the response in a helpful, encouraging tone.`,
    });
    return response.text;
  } catch {
    return "Analysis unavailable.";
  }
};
