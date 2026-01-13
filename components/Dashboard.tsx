
import React from 'react';
import { GameMode } from '../types';

interface DashboardProps {
  onStartGame: (mode: GameMode) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartGame }) => {
  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar">
      <div className="max-w-[1300px] mx-auto p-6 lg:p-12 grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* Play Section */}
        <div className="xl:col-span-8 space-y-10">
          <div className="glass-panel rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] group">
            <div className="p-16 text-center bg-gradient-to-b from-[#2b2926] to-[#262421] relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-[#81b64c]"></div>
               <div className="absolute inset-0 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  <i className="fa-solid fa-spell-check text-[30rem] absolute -top-40 -left-20 rotate-12"></i>
               </div>
               <h2 className="text-7xl font-black text-white mb-6 tracking-tighter italic uppercase relative z-10">Battle Arena</h2>
               <p className="text-gray-400 text-2xl font-medium relative z-10">Join 24,102 active word masters online</p>
            </div>
            
            <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { mode: GameMode.BLITZ, color: 'gradient-blitz', icon: 'fa-bolt', desc: '3 Min • Super Fast' },
                { mode: GameMode.RAPID, color: 'gradient-rapid', icon: 'fa-stopwatch', desc: '10 Min • Standard' },
                { mode: GameMode.BOT, color: 'gradient-ai', icon: 'fa-robot', desc: 'Practice vs Gemini' }
              ].map((item, idx) => (
                <button 
                  key={idx}
                  onClick={() => onStartGame(item.mode)}
                  className={`group relative flex flex-col items-center p-10 ${item.color} rounded-[2.5rem] transition-all hover:scale-105 hover:-translate-y-2 shadow-2xl overflow-hidden border-b-8 border-black/20`}
                >
                  <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:scale-150 transition-transform">
                      <i className={`fa-solid ${item.icon} text-8xl -rotate-12`}></i>
                  </div>
                  <div className="w-20 h-20 flex items-center justify-center bg-white/20 rounded-[2rem] mb-6 shadow-inner backdrop-blur-md">
                    <i className={`fa-solid ${item.icon} text-4xl text-white`}></i>
                  </div>
                  <span className="text-white font-black text-3xl uppercase italic tracking-tighter">{item.mode}</span>
                  <span className="text-xs text-white/80 font-black mt-2 tracking-widest uppercase">{item.desc}</span>
                </button>
              ))}
            </div>
            
            <div className="px-10 pb-12">
              <button onClick={() => onStartGame(GameMode.RAPID)} className="w-full py-8 chess-btn-primary rounded-full font-black text-5xl uppercase tracking-tighter flex items-center justify-center gap-6 hover:brightness-110 active:scale-95 transition-all shadow-[0_20px_40px_rgba(129,182,76,0.4)]">
                <i className="fa-solid fa-play-circle text-6xl"></i>
                Play Now
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="glass-panel p-10 rounded-[2.5rem] border-t-4 border-indigo-600 shadow-2xl hover:bg-white/5 transition-all cursor-pointer">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-white font-black text-2xl uppercase italic tracking-tighter flex items-center gap-4">
                  <i className="fa-solid fa-puzzle-piece text-indigo-400 text-3xl"></i>
                  Daily Puzzle
                </h3>
                <span className="bg-indigo-600/20 text-indigo-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Incomplete</span>
              </div>
              <div className="bg-[#211f1c] p-8 rounded-[2rem] border-2 border-indigo-600/20 flex items-center justify-between group">
                <div>
                   <p className="text-indigo-400 font-black text-xs uppercase tracking-[4px] mb-2 italic">Level 42: Lexical Chain</p>
                   <p className="text-white font-black text-2xl italic tracking-tighter uppercase">"MYSTIQUE" &rarr; "E__"</p>
                </div>
                <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl shadow-2xl group-hover:rotate-12 transition-all">
                   <i className="fa-solid fa-brain"></i>
                </div>
              </div>
            </div>
            
            <div className="glass-panel p-10 rounded-[2.5rem] border-t-4 border-orange-600 shadow-2xl hover:bg-white/5 transition-all cursor-pointer">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-white font-black text-2xl uppercase italic tracking-tighter flex items-center gap-4">
                  <i className="fa-solid fa-fire text-orange-500 text-3xl"></i>
                  Tournaments
                </h3>
                <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase animate-pulse">Live</span>
              </div>
              <div className="space-y-4">
                 {[
                   { title: "Uzbek Open 2k24", players: "1.4k", prize: "$1,000", border: 'border-orange-500' },
                   { title: "Global Word Masters", players: "840", prize: "Elite Badge", border: 'border-blue-500' }
                 ].map((t, i) => (
                   <div key={i} className={`flex items-center justify-between p-5 bg-[#211f1c] rounded-3xl border-l-8 ${t.border} group hover:bg-[#312e2b] transition-all`}>
                      <div>
                        <p className="text-white font-black text-lg italic tracking-tighter uppercase">{t.title}</p>
                        <p className="text-[10px] text-gray-500 mt-1 uppercase font-black tracking-widest">{t.players} Players • Prize: {t.prize}</p>
                      </div>
                      <i className="fa-solid fa-arrow-right text-orange-500 text-sm group-hover:translate-x-2 transition-transform"></i>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>

        {/* Info Column */}
        <div className="xl:col-span-4 space-y-10">
          <div className="glass-panel rounded-[2.5rem] overflow-hidden border-t-4 border-yellow-500 shadow-2xl">
            <div className="p-6 bg-gradient-to-r from-[#2b2926] to-[#312e2b] border-b border-white/5 flex justify-between items-center">
              <h3 className="text-white font-black uppercase text-xs tracking-[4px] italic">Global Ranking</h3>
              <i className="fa-solid fa-crown text-yellow-500 animate-bounce"></i>
            </div>
            <div className="divide-y divide-white/5">
              {[
                { name: 'MagnusWordsen', elo: 2882, rank: 1, title: 'GM', country: 'NO' },
                { name: 'SpellMaster', elo: 2801, rank: 2, title: 'WGM', country: 'US' },
                { name: 'UzbekPro', elo: 2750, rank: 3, title: 'GM', country: 'UZ' }
              ].map((u, i) => (
                <div key={i} className="flex items-center gap-5 p-6 hover:bg-white/5 transition-all cursor-pointer group">
                  <span className={`text-2xl font-black italic w-6 ${i === 0 ? 'text-yellow-500' : 'text-gray-600'}`}>{u.rank}</span>
                  <div className="w-12 h-12 rounded-2xl bg-gray-700 flex items-center justify-center text-white font-black group-hover:rotate-6 transition-transform shadow-2xl overflow-hidden border-2 border-white/10">
                    <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${u.name}`} alt="avatar" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-black text-sm uppercase italic">{u.name}</span>
                      <span className="text-[9px] bg-red-600 px-1.5 rounded-full text-white font-black">{u.title}</span>
                    </div>
                    <p className="text-[10px] text-[#81b64c] font-black uppercase tracking-widest">ELO: {u.elo}</p>
                  </div>
                  <span className="text-xs font-black text-gray-700">{u.country}</span>
                </div>
              ))}
            </div>
            <button className="w-full py-4 text-gray-500 hover:text-white font-black text-[10px] uppercase tracking-widest italic transition-colors bg-white/5">View Full List</button>
          </div>

          <div className="glass-panel rounded-[2.5rem] overflow-hidden border-t-4 border-[#81b64c] shadow-2xl">
             <div className="p-6 bg-gradient-to-r from-[#2b2926] to-[#312e2b] border-b border-white/5 flex justify-between items-center">
                <h3 className="text-white font-black uppercase text-xs tracking-[4px] italic">Active Friends</h3>
                <span className="text-[10px] bg-[#81b64c] text-white px-4 py-1 rounded-full font-black animate-pulse">4 Online</span>
             </div>
             <div className="p-4 space-y-2">
                {[
                  { name: 'UzbekNinja', elo: 1850, status: 'Playing', seed: 'Ninja' },
                  { name: 'LexiconLover', elo: 1200, status: 'Online', seed: 'Lover' },
                  { name: 'WordMaster', elo: 2100, status: 'Searching', seed: 'Master' }
                ].map((friend, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-[2rem] cursor-pointer transition-all border border-transparent hover:border-white/5 group">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-[1.5rem] border-2 border-white/10 overflow-hidden shadow-2xl group-hover:scale-110 transition-transform">
                        <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${friend.seed}`} alt="avatar" />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-[#262421] rounded-full shadow-xl ${friend.status === 'Playing' ? 'bg-orange-500' : friend.status === 'Online' ? 'bg-[#81b64c]' : 'bg-blue-500'}`}></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-black text-sm uppercase italic">{friend.name}</p>
                      <p className={`text-[9px] font-black uppercase tracking-widest ${friend.status === 'Playing' ? 'text-orange-500' : 'text-gray-500'}`}>{friend.status}</p>
                    </div>
                    <button className="w-10 h-10 bg-white/5 hover:bg-[#81b64c] text-gray-400 hover:text-white rounded-[1.2rem] flex items-center justify-center transition-all active:scale-90 shadow-lg">
                        <i className={`fa-solid ${friend.status === 'Playing' ? 'fa-eye' : 'fa-play'} text-xs`}></i>
                    </button>
                  </div>
                ))}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
