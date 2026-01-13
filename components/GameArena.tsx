
import React, { useState, useEffect, useRef } from 'react';
import { GameMode, GameState, GameMove, User } from '../types';
import { validateWord, getBotMove, getWordAnalysis } from '../services/geminiService';

interface GameArenaProps {
  mode: GameMode;
  onQuit: () => void;
  user: User;
}

const GameArena: React.FC<GameArenaProps> = ({ mode, onQuit, user }) => {
  const [input, setInput] = useState('');
  const [activeSideTab, setActiveSideTab] = useState<'moves' | 'chat'>('moves');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    id: 'game-' + Math.random().toString(36).substr(2, 9),
    mode,
    players: [
      user,
      { id: 'bot', username: 'Gemini Grandmaster', elo: 2850, country: 'AI', status: 'Playing', lastActive: 'now', email: '' }
    ],
    moves: [],
    currentPlayerIndex: 0,
    timers: [mode === GameMode.BLITZ ? 180 : 600, mode === GameMode.BLITZ ? 180 : 600],
    status: 'InProgress'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameState.status === 'InProgress') {
        setGameState(prev => {
          const newTimers = [...prev.timers];
          newTimers[prev.currentPlayerIndex] = Math.max(0, newTimers[prev.currentPlayerIndex] - 1);
          if (newTimers[prev.currentPlayerIndex] === 0) {
            return { ...prev, status: 'Finished', winner: prev.players[1 - prev.currentPlayerIndex].username };
          }
          return { ...prev, timers: newTimers as [number, number] };
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState.status, gameState.currentPlayerIndex]);

  useEffect(() => {
    // Bot navbati kelganda ishga tushadi
    if (gameState.currentPlayerIndex === 1 && mode === GameMode.BOT && gameState.status === 'InProgress' && !loading) {
      const triggerBot = async () => {
        const lastMove = gameState.moves.length > 0 ? gameState.moves[gameState.moves.length - 1] : null;
        const botWord = await getBotMove(lastMove ? lastMove.word : "", 'Hard');
        await handleMove(botWord, true); // true - bot ekanligini bildiradi
      };
      const timeout = setTimeout(triggerBot, 1000 + Math.random() * 1500);
      return () => clearTimeout(timeout);
    }
  }, [gameState.currentPlayerIndex, gameState.status, loading]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [gameState.moves]);

  const handleMove = async (word: string, isBot: boolean = false) => {
    const trimmedWord = word.trim().toLowerCase();
    if (!trimmedWord) return;

    setLoading(true);
    setError(null);
    setHint(null);

    const lastMove = gameState.moves[gameState.moves.length - 1];
    
    // Zanjir qoidasini tekshirish
    if (lastMove) {
        const lastLetter = lastMove.word.slice(-1).toLowerCase();
        if (trimmedWord[0] !== lastLetter) {
            setError(`So'z "${lastLetter.toUpperCase()}" harfi bilan boshlanishi kerak!`);
            setLoading(false);
            return;
        }
    }

    const validation = await validateWord(trimmedWord, lastMove?.word);

    if (validation.isValid) {
      const newMove: GameMove = {
        player: gameState.players[gameState.currentPlayerIndex].username,
        word: trimmedWord,
        points: trimmedWord.length * 15,
        timestamp: Date.now()
      };

      setGameState(prev => ({
        ...prev,
        moves: [...prev.moves, newMove],
        currentPlayerIndex: 1 - prev.currentPlayerIndex,
        lastWord: trimmedWord
      }));
      setInput('');
    } else {
      setError(validation.error || "Mavjud bo'lmagan so'z!");
      // Agar bot xato so'z yuborsa, o'yin qotib qolmasligi uchun fallback ishlashi kerak
      if (isBot && lastMove) {
          // Bu holat geminiService dagi fallback tufayli kam uchraydi
          console.warn("Bot invalid word sent, retrying...");
      }
    }
    setLoading(false);
  };

  const getHint = async () => {
    if (!user.isPremium) return;
    setLoading(true);
    const lastWord = gameState.moves.length > 0 ? gameState.moves[gameState.moves.length - 1].word : 'start';
    const suggested = await getBotMove(lastWord, 'Hard');
    setHint(suggested);
    setLoading(false);
  };

  const handleResign = () => {
    if (window.confirm("Haqiqatan ham taslim bo'lmoqchimisiz?")) {
      setGameState(prev => ({
        ...prev,
        status: 'Finished',
        winner: prev.players[1].username
      }));
    }
  };

  const handleDraw = () => {
    if (window.confirm("Durang taklif qilmoqchimisiz?")) {
      setGameState(prev => ({
        ...prev,
        status: 'Finished',
        winner: 'Draw'
      }));
    }
  };

  const handleShowAnalysis = async () => {
    setLoading(true);
    const words = gameState.moves.map(m => m.word);
    const res = await getWordAnalysis(words);
    setAnalysis(res);
    setLoading(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Game Stage */}
      <div className="flex-1 flex flex-col p-4 lg:p-8 justify-center items-center bg-[#262421] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.chess.com/bundles/web/images/offline-play/board-wood.30fd55c4.jpg')] bg-cover"></div>
        
        <div className="w-full max-w-[900px] flex flex-col gap-6 relative z-10">
          
          {/* Opponent Info */}
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-red-600/20 rounded-3xl border-2 border-red-500/30 overflow-hidden shadow-2xl">
                <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${gameState.players[1].username}`} alt="bot" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                   <p className="text-white font-black text-2xl italic">{gameState.players[1].username}</p>
                   <span className="bg-red-600 text-white text-[10px] px-3 py-1 rounded-full font-black">GM</span>
                </div>
                <p className="text-sm text-red-500 font-black tracking-widest">{gameState.players[1].elo}</p>
              </div>
            </div>
            <div className={`px-10 py-4 rounded-[2rem] font-mono text-5xl font-black shadow-2xl transition-all ${gameState.currentPlayerIndex === 1 ? 'bg-white text-black glow-timer scale-110' : 'bg-[#312e2b] text-gray-700'}`}>
              {formatTime(gameState.timers[1])}
            </div>
          </div>

          {/* Word Battle Box */}
          <div className="glass-panel h-[550px] w-full rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] border-4 border-[#312e2b] overflow-hidden flex flex-col relative">
            <div ref={scrollRef} className="flex-1 p-12 overflow-y-auto flex flex-col gap-10 custom-scrollbar scroll-smooth">
              {gameState.moves.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-12 opacity-40">
                   <i className="fa-solid fa-bolt-lightning text-8xl text-[#81b64c] mb-6 animate-pulse"></i>
                   <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter">English Battle</h4>
                   <p className="text-gray-400 font-bold mt-2">Write any English word to start the chain.</p>
                </div>
              )}
              {gameState.moves.map((move, i) => (
                <div key={i} className={`move-anim flex ${move.player === user.username ? 'justify-end' : 'justify-start'}`}>
                  <div className={`relative px-10 py-6 rounded-[2.5rem] shadow-2xl transition-all border-b-8 ${move.player === user.username ? 'bg-[#81b64c] text-white rounded-br-none border-[#4e7a2b]' : 'bg-white text-[#262421] rounded-bl-none border-gray-300'}`}>
                     <p className="text-5xl font-black uppercase tracking-tighter italic leading-none">{move.word}</p>
                     <div className={`absolute -top-4 ${move.player === user.username ? 'right-0' : 'left-0'} flex items-center gap-2`}>
                        <span className="text-[10px] font-black uppercase bg-black/80 px-4 py-2 rounded-full text-white border border-white/10 backdrop-blur-md">
                            {move.player} • {move.points} PTS
                        </span>
                     </div>
                  </div>
                </div>
              ))}
              {loading && gameState.currentPlayerIndex === 1 && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 px-6 py-4 rounded-3xl animate-pulse">
                        <div className="flex gap-2">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                    </div>
                  </div>
              )}
            </div>

            {/* Input Layer */}
            <div className="p-10 bg-[#2b2926] border-t-4 border-[#312e2b] relative z-20">
              {gameState.status === 'InProgress' ? (
                <div className="space-y-4">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleMove(input); }}
                    className="flex gap-4"
                  >
                    <div className="flex-1 relative group">
                      <input
                        type="text"
                        autoFocus
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={gameState.currentPlayerIndex !== 0 || loading}
                        placeholder={gameState.currentPlayerIndex === 0 ? "Enter English word..." : "Gemini is thinking..."}
                        className={`w-full bg-[#1c1b18] text-white text-3xl font-black border-4 rounded-full px-10 py-6 pr-48 focus:outline-none transition-all ${gameState.currentPlayerIndex === 0 ? (error ? 'border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.3)]' : 'border-[#81b64c] shadow-[0_0_30px_rgba(129,182,76,0.3)]') : 'border-[#3d3a36]'}`}
                      />
                      {gameState.lastWord && (
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                           <span className="text-gray-600 font-black text-xs uppercase italic tracking-widest hidden sm:inline">Starts with:</span>
                           <span className="bg-[#81b64c] text-white px-4 py-1 rounded-xl font-black text-2xl shadow-lg animate-bounce">{gameState.lastWord.slice(-1).toUpperCase()}</span>
                        </div>
                      )}
                    </div>
                    <button 
                      type="submit"
                      disabled={gameState.currentPlayerIndex !== 0 || loading || !input}
                      className="chess-btn-primary px-16 rounded-full font-black text-3xl uppercase italic tracking-widest disabled:opacity-20 active:scale-95 transition-all"
                    >
                      {loading && gameState.currentPlayerIndex === 0 ? <i className="fa-solid fa-spinner fa-spin"></i> : 'PLAY'}
                    </button>
                  </form>
                  <div className="flex justify-between items-center min-h-[24px]">
                     <div className="flex gap-4">
                        <button onClick={getHint} disabled={!user.isPremium || loading} className="flex items-center gap-2 text-yellow-500 font-black uppercase text-xs tracking-widest hover:text-white transition-colors disabled:opacity-30">
                           <i className="fa-solid fa-lightbulb text-sm"></i> Hint {hint && <span className="text-white ml-2 bg-yellow-500/20 px-3 py-1 rounded-full">({hint})</span>}
                        </button>
                     </div>
                     <p className="text-red-500 font-black uppercase text-xs tracking-widest animate-pulse">{error}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 bg-gradient-to-br from-[#81b64c] to-[#4e7a2b] rounded-[3rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                  <h3 className="text-6xl font-black text-white mb-4 uppercase italic tracking-tighter relative z-10">GAME OVER!</h3>
                  <p className="text-white/90 text-3xl font-bold mb-8 relative z-10">Winner: {gameState.winner}</p>
                  <div className="flex gap-6 justify-center relative z-10">
                     <button onClick={onQuit} className="bg-white text-[#262421] px-14 py-5 rounded-full font-black uppercase text-xl shadow-2xl hover:scale-110 transition-all border-b-4 border-gray-300">New Game</button>
                     <button onClick={handleShowAnalysis} className="bg-[#262421] text-white px-14 py-5 rounded-full font-black uppercase text-xl shadow-2xl hover:scale-110 transition-all border-b-4 border-black/50">
                        {loading ? 'Analyzing...' : 'Analysis'}
                     </button>
                  </div>
                  {analysis && (
                    <div className="mt-8 mx-auto max-w-2xl bg-black/40 p-6 rounded-3xl text-left border border-white/10 animate-slide-up">
                        <p className="text-white/80 text-sm font-medium leading-relaxed italic whitespace-pre-line">{analysis}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#81b64c]/20 rounded-3xl border-2 border-[#81b64c]/50 overflow-hidden shadow-2xl active-turn-glow">
                 <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.username}`} alt="you" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                   <p className="text-white font-black text-2xl italic uppercase">{user.username}</p>
                   <span className="bg-[#81b64c] text-white text-[10px] px-3 py-1 rounded-full font-black shadow-lg">PRO</span>
                </div>
                <p className="text-sm text-[#81b64c] font-black tracking-widest">ELO: {user.elo}</p>
              </div>
            </div>
            <div className={`px-10 py-4 rounded-[2rem] font-mono text-5xl font-black shadow-2xl transition-all ${gameState.currentPlayerIndex === 0 ? 'bg-white text-black glow-timer scale-110' : 'bg-[#312e2b] text-gray-700'}`}>
              {formatTime(gameState.timers[0])}
            </div>
          </div>

        </div>
      </div>

      {/* Control Sidebar (Moves History & Chat) */}
      <div className="w-full lg:w-[450px] glass-panel border-l border-white/5 flex flex-col shrink-0">
        <div className="flex border-b border-white/5 bg-[#262421]">
          <button 
            onClick={() => setActiveSideTab('moves')}
            className={`flex-1 py-6 font-black text-xs uppercase tracking-[6px] border-b-4 italic transition-all ${activeSideTab === 'moves' ? 'text-white border-[#81b64c] bg-white/5' : 'text-gray-500 border-transparent hover:text-white'}`}
          >
            Moves
          </button>
          <button 
            onClick={() => setActiveSideTab('chat')}
            className={`flex-1 py-6 font-black text-xs uppercase tracking-[6px] border-b-4 italic transition-all ${activeSideTab === 'chat' ? 'text-white border-[#81b64c] bg-white/5' : 'text-gray-500 border-transparent hover:text-white'}`}
          >
            Chat
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#211f1c]">
          {activeSideTab === 'moves' ? (
            <table className="w-full text-left border-collapse">
              <tbody>
                {Array.from({ length: Math.ceil(gameState.moves.length / 2) }).map((_, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white/[0.03]' : 'bg-transparent'}>
                    <td className="px-8 py-5 w-20 text-gray-600 font-black italic border-r border-white/5">{i + 1}.</td>
                    <td className="px-8 py-5 text-white font-black uppercase italic tracking-tighter text-xl hover:bg-[#81b64c]/20 cursor-pointer transition-colors border-r border-white/5">
                      {gameState.moves[i * 2]?.word}
                      <span className="block text-[10px] text-gray-500 font-bold not-italic mt-1">+{gameState.moves[i * 2]?.points} pts</span>
                    </td>
                    <td className="px-8 py-5 text-white font-black uppercase italic tracking-tighter text-xl hover:bg-white/10 cursor-pointer transition-colors">
                      {gameState.moves[i * 2 + 1]?.word}
                      {gameState.moves[i * 2 + 1] && <span className="block text-[10px] text-gray-500 font-bold not-italic mt-1">+{gameState.moves[i * 2 + 1]?.points} pts</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 space-y-4">
              <div className="bg-white/5 p-4 rounded-2xl italic text-gray-400 text-xs">Chat is empty. Be the first to say hi!</div>
              <div className="flex gap-2">
                <input type="text" placeholder="Type a message..." className="flex-1 bg-black/20 rounded-full px-4 py-2 outline-none border border-white/5 text-xs focus:border-[#81b64c]" />
                <button className="bg-[#81b64c] w-8 h-8 rounded-full flex items-center justify-center text-white"><i className="fa-solid fa-paper-plane text-[10px]"></i></button>
              </div>
            </div>
          )}
        </div>

        {/* Action Panel */}
        <div className="p-8 bg-[#2b2926] grid grid-cols-2 gap-6 border-t border-white/5">
          <button 
            onClick={handleResign}
            className="py-5 bg-[#312e2b] hover:bg-red-600/20 text-white rounded-2xl font-black text-xs uppercase tracking-[4px] flex items-center justify-center gap-3 transition-all border border-white/5 hover:border-red-600/50"
          >
            <i className="fa-solid fa-flag text-red-500"></i> Resign
          </button>
          <button 
            onClick={handleDraw}
            className="py-5 bg-[#312e2b] hover:bg-[#81b64c]/20 text-white rounded-2xl font-black text-xs uppercase tracking-[4px] flex items-center justify-center gap-3 transition-all border border-white/5 hover:border-[#81b64c]/50"
          >
            <i className="fa-solid fa-handshake text-[#81b64c]"></i> Draw
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameArena;
