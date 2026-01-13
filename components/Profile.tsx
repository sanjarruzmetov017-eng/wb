
import React, { useState } from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user.bio || '');

  const handleSave = () => {
    setIsEditing(false);
    alert("Profil ma'lumotlari saqlandi!");
  };

  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-6 lg:p-10">
      <div className="max-w-5xl mx-auto space-y-10 pb-24">
        
        {/* Header Profile Section */}
        <div className="glass-panel rounded-[2.5rem] overflow-hidden shadow-2xl border-b-4 border-[#312e2b]">
          <div className="h-32 bg-gradient-to-r from-[#81b64c] to-indigo-600 relative">
             <div className="absolute -bottom-12 left-10 flex items-end gap-6">
                <div className="w-32 h-32 rounded-3xl border-4 border-[#262421] shadow-2xl overflow-hidden bg-gray-700">
                   <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.username}`} className="w-full h-full" alt="avatar" />
                </div>
                <div className="mb-2">
                   <div className="flex items-center gap-3">
                      <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">{user.username}</h2>
                      <span className="bg-[#81b64c] text-white px-3 py-1 rounded-full font-black text-xs">PRO</span>
                   </div>
                   <p className="text-gray-400 font-bold mt-1">O'zbekiston | 2024-yilda qo'shilgan</p>
                </div>
             </div>
          </div>
          <div className="pt-16 pb-10 px-10 flex flex-wrap justify-between items-center gap-6">
             <div className="flex gap-10">
                <div className="text-center">
                   <p className="text-3xl font-black text-white">{user.elo}</p>
                   <p className="text-xs text-gray-500 font-black uppercase tracking-widest">ELO Rating</p>
                </div>
                <div className="text-center">
                   <p className="text-3xl font-black text-[#81b64c]">24</p>
                   <p className="text-xs text-gray-500 font-black uppercase tracking-widest">G'alabalar</p>
                </div>
                <div className="text-center">
                   <p className="text-3xl font-black text-red-500">18</p>
                   <p className="text-xs text-gray-500 font-black uppercase tracking-widest">Yutqiziqlar</p>
                </div>
             </div>
             <div className="flex gap-4">
                {isEditing ? (
                  <button onClick={handleSave} className="px-8 py-3 bg-[#81b64c] text-white font-black rounded-2xl hover:brightness-110 transition-all uppercase text-sm border-b-2 border-black/20">Saqlash</button>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="px-8 py-3 bg-[#312e2b] text-white font-black rounded-2xl hover:bg-[#3d3a36] transition-all uppercase text-sm border-b-2 border-black/20">Profilni tahrirlash</button>
                )}
                <button onClick={() => alert("Profil linki ko'chirildi!")} className="w-12 h-12 flex items-center justify-center bg-[#312e2b] text-white rounded-2xl hover:bg-[#3d3a36]"><i className="fa-solid fa-share-nodes"></i></button>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Left Col: Bio & Badges */}
           <div className="lg:col-span-2 space-y-8">
              <div className="glass-panel p-8 rounded-[2rem]">
                 <h3 className="text-white font-black uppercase text-xs tracking-widest mb-6 border-b border-white/5 pb-2">Haqimda</h3>
                 {isEditing ? (
                   <textarea 
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-[#81b64c]"
                    rows={4}
                   />
                 ) : (
                   <p className="text-gray-300 font-bold leading-relaxed">{bio}</p>
                 )}
              </div>

              <div className="glass-panel p-8 rounded-[2rem]">
                 <h3 className="text-white font-black uppercase text-xs tracking-widest mb-6 border-b border-white/5 pb-2">Yutuqlar (Badges)</h3>
                 <div className="grid grid-cols-4 md:grid-cols-6 gap-6">
                    {[
                      { icon: 'fa-fire', color: 'text-orange-500', name: '7-kunlik Streak' },
                      { icon: 'fa-bolt', color: 'text-yellow-400', name: 'Tezkor So\'z' },
                      { icon: 'fa-trophy', color: 'text-yellow-600', name: 'Turnir G\'olibi' },
                      { icon: 'fa-brain', color: 'text-indigo-400', name: 'Genius' },
                      { icon: 'fa-medal', color: 'text-[#81b64c]', name: 'Top 1%' },
                      { icon: 'fa-shield-halved', color: 'text-blue-500', name: 'Pro Member' }
                    ].map((badge, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => alert(`${badge.name} badge haqida ma'lumot`)}>
                         <div className={`w-14 h-14 bg-[#262421] rounded-full flex items-center justify-center shadow-2xl border border-white/10 group-hover:scale-110 transition-transform ${badge.color}`}>
                            <i className={`fa-solid ${badge.icon} text-2xl`}></i>
                         </div>
                         <span className="text-[10px] text-gray-500 font-black text-center leading-tight">{badge.name}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Right Col: Recent Games */}
           <div className="space-y-8">
              <div className="glass-panel rounded-[2rem] overflow-hidden">
                 <div className="p-4 bg-[#2b2926] border-b border-white/5">
                    <h3 className="text-white font-black uppercase text-xs tracking-widest">So'nggi O'yinlar</h3>
                 </div>
                 <div className="divide-y divide-white/5">
                    {[
                      { opponent: 'MagnusW', result: 'Win', elo: '+15', wordCount: 12 },
                      { opponent: 'SpellingBee', result: 'Loss', elo: '-12', wordCount: 8 },
                      { opponent: 'GeminiBot', result: 'Win', elo: '+0', wordCount: 20 }
                    ].map((game, i) => (
                      <div key={i} onClick={() => alert("O'yin tarixi tez kunda!")} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                         <div className="flex items-center gap-3">
                            <div className={`w-2 h-10 rounded-full ${game.result === 'Win' ? 'bg-[#81b64c]' : 'bg-red-500'}`}></div>
                            <div>
                               <p className="text-white font-black text-sm group-hover:text-[#81b64c]">{game.opponent}</p>
                               <p className="text-[10px] text-gray-500 font-bold uppercase">{game.wordCount} ta so'z</p>
                            </div>
                         </div>
                         <span className={`font-black ${game.result === 'Win' ? 'text-[#81b64c]' : 'text-red-500'}`}>{game.elo}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
