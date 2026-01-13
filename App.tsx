
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import GameArena from './components/GameArena';
import Profile from './components/Profile';
import AuthPage from './components/AuthPage';
import LandingPage from './components/LandingPage';
import { GameMode, User } from './types';

type AppView = 'landing' | 'auth' | 'app';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [activeTab, setActiveTab] = useState('play');
  const [currentGameMode, setCurrentGameMode] = useState<GameMode | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  
  const [user, setUser] = useState<User>({
    id: 'u1',
    username: 'Guest_402',
    fullName: 'Azizbek Temirov',
    age: 22,
    email: 'aziz@wordbattle.pro',
    elo: 1250,
    country: 'UZ',
    status: 'Online',
    lastActive: 'Hozir',
    isPremium: true,
    joinedAt: '2024-01-15',
    bio: "Word Battle Pro - mening sevimli o'yinim! Global TOP 100 ga kirish niyatim bor.",
    stats: {
      wins: 142,
      losses: 89,
      draws: 12,
      bestWord: 'QUARTZ',
      longestWord: 'INTERNATIONALIZATION',
      totalGames: 243
    },
    achievements: [
      { id: '1', title: '7 Day Streak', description: 'O\'ynadi 7 kun ketma-ket', icon: 'fa-fire', color: 'text-orange-500' },
      { id: '2', title: 'Grandmaster', description: 'ELO 2500+ yetdi', icon: 'fa-chess-king', color: 'text-yellow-500' }
    ],
    friends: ['u2', 'u3']
  });

  const addNotification = (msg: string) => {
    setNotifications(prev => [msg, ...prev]);
    setTimeout(() => setNotifications(prev => prev.slice(0, -1)), 4000);
  };

  const handleLoginSuccess = () => {
    setView('app');
    addNotification("Tizimga muvaffaqiyatli kirdingiz!");
  };

  const renderMainContent = () => {
    if (currentGameMode) {
      return (
        <GameArena 
          mode={currentGameMode} 
          user={user}
          onQuit={() => setCurrentGameMode(null)} 
        />
      );
    }

    switch (activeTab) {
      case 'play':
        return <Dashboard onStartGame={(mode) => setCurrentGameMode(mode)} />;
      case 'profile':
        return <Profile user={user} />;
      case 'leaderboard':
        return (
          <div className="p-10 max-w-5xl mx-auto space-y-10 pb-24 h-full overflow-y-auto custom-scrollbar">
            <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">Leaderboard</h2>
            <div className="glass-panel rounded-[2rem] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#312e2b]">
                        <tr>
                            <th className="px-8 py-4 text-xs font-black uppercase text-gray-500">Rank</th>
                            <th className="px-8 py-4 text-xs font-black uppercase text-gray-500">Player</th>
                            <th className="px-8 py-4 text-xs font-black uppercase text-gray-500">Rating</th>
                            <th className="px-8 py-4 text-xs font-black uppercase text-gray-500">Country</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {[
                            { rank: 1, name: 'WordGod', elo: 3105, country: 'NO' },
                            { rank: 2, name: 'Lexicographer', elo: 2980, country: 'US' },
                            { rank: 3, name: 'SpellerZ', elo: 2890, country: 'IN' },
                            { rank: 4, name: 'UzbekPro', elo: 2750, country: 'UZ' },
                            { rank: 5, name: 'QueenOfVowels', elo: 2640, country: 'UK' },
                            { rank: 6, name: 'ConsonantMaster', elo: 2590, country: 'DE' }
                        ].map((p, i) => (
                            <tr key={i} className="hover:bg-white/5 cursor-pointer">
                                <td className="px-8 py-6 font-black text-white italic">{p.rank}</td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gray-700 overflow-hidden"><img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${p.name}`} alt="" /></div>
                                        <span className="text-white font-bold">{p.name}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-[#81b64c] font-black">{p.elo}</td>
                                <td className="px-8 py-6 text-gray-500 font-bold">{p.country}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
        );
      case 'social':
        return (
          <div className="p-10 max-w-5xl mx-auto space-y-10 pb-24 h-full overflow-y-auto custom-scrollbar">
            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Social Hub</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="glass-panel p-10 rounded-[2.5rem] border-t-4 border-blue-500">
                    <h3 className="text-white font-black text-2xl uppercase italic mb-6">Friends List</h3>
                    <div className="space-y-4">
                        {['UzbekNinja', 'LexiconLover', 'WordMaster'].map((f, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden"><img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${f}`} alt="" /></div>
                                    <span className="text-white font-bold">{f}</span>
                                </div>
                                <button onClick={() => addNotification(`${f}ga chaqiruv yuborildi!`)} className="bg-[#81b64c] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase italic">Invite</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="glass-panel p-10 rounded-[2.5rem] border-t-4 border-purple-500">
                    <h3 className="text-white font-black text-2xl uppercase italic mb-6">Groups & Clubs</h3>
                    <div className="flex flex-col gap-4">
                        <div className="p-6 bg-[#211f1c] rounded-2xl border border-white/5 hover:border-purple-500 transition-all cursor-pointer">
                            <h4 className="text-white font-black text-lg">Uzbekistan Word Masters</h4>
                            <p className="text-gray-500 text-xs mt-1">1.2k a'zo • 14 ta faol o'yin</p>
                        </div>
                        <button className="w-full py-4 bg-purple-600 rounded-2xl font-black text-white uppercase italic tracking-widest text-sm shadow-xl">Klub qidirish</button>
                    </div>
                </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-10 max-w-4xl mx-auto space-y-10 pb-24 h-full overflow-y-auto custom-scrollbar text-white">
            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Account Settings</h2>
            <div className="space-y-8">
                <div className="glass-panel p-10 rounded-[2.5rem]">
                    <h3 className="text-gray-500 font-black uppercase text-xs tracking-[4px] mb-8">Game Preferences</h3>
                    <div className="space-y-6">
                        {[
                            { label: 'Sound Effects', value: true },
                            { label: 'Chat Notifications', value: true },
                            { label: 'Public Profile', value: false },
                            { label: 'Dark Mode (Always On)', value: true, disabled: true }
                        ].map((s, i) => (
                            <div key={i} className="flex items-center justify-between pb-4 border-b border-white/5">
                                <span className="font-bold text-gray-300">{s.label}</span>
                                <div className={`w-12 h-6 rounded-full relative transition-all cursor-pointer ${s.value ? 'bg-[#81b64c]' : 'bg-gray-700'} ${s.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${s.value ? 'right-1' : 'left-1'}`}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={() => setView('landing')} className="w-full py-6 bg-red-600/10 border-2 border-red-600/30 text-red-500 rounded-3xl font-black uppercase italic tracking-tighter hover:bg-red-600 hover:text-white transition-all">Sign Out Everywhere</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (view === 'landing') {
    return <LandingPage onAction={() => setView('auth')} />;
  }

  if (view === 'auth') {
    return <AuthPage onBack={() => setView('landing')} onLogin={handleLoginSuccess} />;
  }

  return (
    <div className="flex h-screen w-full bg-[#262421] overflow-hidden text-sm relative">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-8 bg-[#262421]/70 border-b border-white/5 backdrop-blur-xl shrink-0 z-40">
           <div className="flex items-center gap-10">
              <div className="hidden lg:flex items-center gap-8 pr-8 border-r border-white/5">
                 <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase text-gray-500 tracking-[3px] italic">Blitz Rating</span>
                    <span className="text-lg font-black text-[#81b64c] italic tracking-tighter leading-none">{user.elo}</span>
                 </div>
              </div>
           </div>
           
           <div className="flex items-center gap-6">
              <button onClick={() => setView('landing')} className="text-gray-500 hover:text-white transition-all uppercase text-[10px] font-black italic">Log Out</button>
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-[#81b64c] cursor-pointer" onClick={() => setActiveTab('profile')}>
                 <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.username}`} alt="profile" />
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
          {renderMainContent()}
        </div>
      </div>

      <div className="fixed bottom-10 right-10 z-[200] space-y-4 pointer-events-none">
        {notifications.map((n, i) => (
          <div key={i} className="bg-[#81b64c] text-white px-10 py-5 rounded-2xl shadow-2xl font-black italic animate-slide-up flex items-center gap-4 border-b-8 border-black/20 pointer-events-auto">
             <i className="fa-solid fa-check-circle"></i> {n}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
