
import React from 'react';

interface LandingPageProps {
  onAction: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAction }) => {
  return (
    <div className="min-h-screen bg-[#262421] overflow-y-auto custom-scrollbar flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center justify-center px-6 lg:px-20 bg-gradient-to-b from-[#4e5c3e] to-[#262421] py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-8 animate-slide-up">
            <span className="bg-[#81b64c]/20 text-[#81b64c] px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest border border-[#81b64c]/30">
              New: Season 5 is Live! 🏆
            </span>
            <h1 className="text-7xl lg:text-8xl font-black text-white italic tracking-tighter leading-none uppercase">
              Battle with <br />
              <span className="text-[#81b64c]">Words</span>
            </h1>
            <p className="text-gray-300 text-xl font-medium max-w-lg leading-relaxed">
              The ultimate real-time word strategy game. Challenge friends, climb the global leaderboards, and improve your vocabulary.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <button onClick={onAction} className="chess-btn-primary px-12 py-5 rounded-2xl font-black text-xl uppercase italic tracking-tighter">
                Play Now - It's Free
              </button>
              <button onClick={onAction} className="bg-[#312e2b] text-white px-12 py-5 rounded-2xl font-black text-xl uppercase italic border border-white/5 hover:bg-[#3d3a36] transition-all">
                Log In
              </button>
            </div>
          </div>

          <div className="hidden lg:block relative group">
            <div className="glass-panel p-8 rounded-3xl shadow-[0_50px_100px_rgba(0,0,0,0.5)] border-4 border-[#312e2b] transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
               <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-gray-600 rounded-lg"></div>
                     <span className="text-white font-black italic">You</span>
                  </div>
                  <div className="text-white font-mono text-3xl font-black">2 : 45</div>
                  <div className="flex items-center gap-3">
                     <span className="text-gray-500 font-black italic">GrandMaster</span>
                     <div className="w-10 h-10 bg-[#81b64c] rounded-full"></div>
                  </div>
               </div>
               <div className="space-y-6 h-[250px] relative">
                  <div className="bg-[#81b64c] text-white px-6 py-3 rounded-2xl rounded-bl-none font-black text-xl inline-block shadow-xl float-left clear-both">Dream</div>
                  <div className="bg-[#312e2b] text-white px-6 py-3 rounded-2xl rounded-br-none font-black text-xl inline-block shadow-xl float-right clear-both opacity-50">Word</div>
                  <div className="bg-[#81b64c] text-white px-6 py-3 rounded-2xl rounded-bl-none font-black text-xl inline-block shadow-xl float-left clear-both">Cloud</div>
                  <div className="bg-[#312e2b] text-white px-6 py-3 rounded-2xl rounded-br-none font-black text-xl inline-block shadow-xl float-right clear-both opacity-50">Music</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Play Word Battle? Section */}
      <section className="py-24 px-6 bg-[#211f1c]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">Why Play Word Battle?</h2>
            <p className="text-gray-400 font-bold text-lg">More than just a game. It's a mental workout.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
            {[
              { icon: '⚡', title: 'Real-time PvP', desc: 'Play against real people in 1v1 battles. No turn-based waiting.' },
              { icon: '🏆', title: 'Tournaments', desc: 'Join daily and weekly tournaments to win exclusive badges and prizes.' },
              { icon: '📈', title: 'Advanced Stats', desc: 'Track your progress, analyze your games, and improve your ELO.' },
              { icon: '🤖', title: 'Smart Bots', desc: 'Train against AI with adaptive difficulty levels.' },
              { icon: '🌍', title: 'Global Community', desc: 'Chat, make friends, and compete with players worldwide.' },
              { icon: '📱', title: 'Cross-Platform', desc: 'Play on your phone, tablet, or desktop. Your stats sync everywhere.' }
            ].map((f, i) => (
              <div key={i} className="bg-[#2b2926] p-8 rounded-2xl border border-white/5 hover:bg-[#312e2b] transition-all flex flex-col items-start text-left shadow-lg">
                <span className="text-4xl mb-6">{f.icon}</span>
                <h3 className="text-white font-black text-xl uppercase italic mb-3 tracking-tighter">{f.title}</h3>
                <p className="text-gray-500 font-bold text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Footer CTA & Links - Exactly matching the user's provided image */}
          <div className="flex flex-col items-center">
            <h2 className="text-5xl lg:text-6xl font-black text-white italic uppercase tracking-tighter mb-12">
              Ready to join the battle?
            </h2>
            
            <button 
              onClick={onAction} 
              className="bg-white text-black px-12 py-4 rounded-full font-black text-xl uppercase hover:scale-105 transition-all shadow-[0_10px_40px_rgba(255,255,255,0.1)] active:scale-95 mb-40"
            >
              Create Free Account
            </button>
            
            <div className="w-full flex flex-col items-center gap-4 py-8">
               <p className="text-gray-600 font-bold text-xs uppercase tracking-tight">
                 © 2023 Word Battle English. All rights reserved.
               </p>
               <div className="flex justify-center gap-8 text-gray-600 font-bold text-xs uppercase tracking-tight">
                  <a href="#" className="hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms</a>
                  <a href="#" className="hover:text-white transition-colors">Contact</a>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
