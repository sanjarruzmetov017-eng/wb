
import React from 'react';
import { User } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, user }) => {
  const menuItems = [
    { id: 'play', icon: 'fa-chess-board', label: 'Play' },
    { id: 'puzzles', icon: 'fa-brain', label: 'Puzzles' },
    { id: 'leaderboard', icon: 'fa-trophy', label: 'Leaderboard' },
    { id: 'social', icon: 'fa-users', label: 'Social Hub' },
    { id: 'tournaments', icon: 'fa-fire', label: 'Tournaments' },
    { id: 'archive', icon: 'fa-clock-rotate-left', label: 'Archive' },
    { id: 'news', icon: 'fa-newspaper', label: 'News' },
  ];

  return (
    <div className="w-24 md:w-48 lg:w-60 bg-[#211f1c] h-screen flex flex-col py-8 shrink-0 relative z-50 border-r border-white/5 shadow-[20px_0_50px_rgba(0,0,0,0.3)]">
      <div className="px-8 mb-16 hidden md:block">
        <h1 className="text-xl font-black text-white flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setActiveTab('play')}>
          <div className="relative">
             <i className="fa-solid fa-spell-check text-[#81b64c] text-7xl group-hover:scale-110 transition-transform duration-300"></i>
             <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-600 rounded-full flex items-center justify-center text-[10px] text-white font-black animate-pulse border-2 border-[#211f1c]">PRO</div>
          </div>
          <span className="tracking-tighter uppercase italic text-xs mt-3 font-black text-white group-hover:tracking-[2px] transition-all">Word Battle Pro</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-3 px-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex flex-col md:flex-row items-center gap-2 md:gap-5 px-6 py-4 rounded-3xl text-[10px] md:text-[13px] font-black transition-all duration-300 group ${
              activeTab === item.id ? 'chess-sidebar-active shadow-xl' : 'chess-sidebar-item hover:bg-white/5'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-2xl w-8 text-center transition-transform group-hover:scale-125 ${activeTab === item.id ? 'text-[#81b64c]' : 'text-gray-500'}`}></i>
            <span className="hidden md:inline uppercase italic tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto px-4 space-y-6">
        {user.isPremium && (
          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-5 rounded-[2rem] shadow-2xl relative overflow-hidden group hidden md:block cursor-pointer">
             <div className="absolute top-0 right-0 p-2 opacity-20"><i className="fa-solid fa-crown text-5xl rotate-12"></i></div>
             <p className="text-white font-black text-xs uppercase italic tracking-tighter relative z-10">Premium Member</p>
             <p className="text-white text-[9px] font-bold opacity-80 mt-1 relative z-10">Unlimited Hints Enabled</p>
          </div>
        )}
        
        <div 
          onClick={() => setActiveTab('profile')}
          className={`w-14 h-14 md:w-full md:h-auto rounded-[2rem] p-3 flex items-center gap-4 cursor-pointer transition-all border-b-4 ${activeTab === 'profile' ? 'bg-[#81b64c]/20 border-[#81b64c]' : 'bg-white/5 border-white/5 hover:bg-white/10 border-black/20'}`}
        >
           <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 shadow-2xl border-2 border-white/10">
              <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.username}`} className="w-full h-full" alt="profile" />
           </div>
           <div className="hidden md:block overflow-hidden">
              <p className="text-white text-xs font-black truncate uppercase italic tracking-tighter">{user.username}</p>
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-[#81b64c] rounded-full animate-pulse"></div>
                 <p className="text-[9px] text-gray-500 font-black tracking-widest uppercase">Profile Info</p>
              </div>
           </div>
        </div>
        
        <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center justify-center md:justify-start gap-5 px-6 py-5 transition-all group ${activeTab === 'settings' ? 'text-[#81b64c]' : 'text-gray-500 hover:text-white'}`}>
            <i className="fa-solid fa-cog text-2xl group-hover:rotate-90 transition-transform"></i>
            <span className="hidden md:inline font-black uppercase text-[11px] tracking-widest italic">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
