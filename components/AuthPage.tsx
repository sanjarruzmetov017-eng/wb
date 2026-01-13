
import React, { useState } from 'react';

interface AuthPageProps {
  onBack: () => void;
  onLogin: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onBack, onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen bg-[#1c1b18] relative flex items-center justify-center p-6 overflow-hidden">
      {/* Hexagonal Pattern Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-opacity='0' stroke='%2381b64c' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 46px' 
        }}
      ></div>
      
      {/* Back Button */}
      <button 
        onClick={onBack} 
        className="absolute left-8 top-8 text-gray-500 hover:text-white transition-all flex items-center gap-3 text-sm font-black uppercase italic z-20 group"
      >
        <i className="fa-solid fa-arrow-left group-hover:-translate-x-2 transition-transform"></i> Back
      </button>

      {/* Centered Auth Card */}
      <div className="relative glass-panel w-full max-w-md rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/5 animate-slide-up z-10 bg-[#2b2926]/95">
        <div className="p-12">
          
          <div className="text-center mb-12">
            <div className="inline-block relative mb-6">
              <i className="fa-solid fa-swords text-[#81b64c] text-7xl rotate-12 drop-shadow-[0_0_20px_rgba(129,182,76,0.5)]"></i>
            </div>
            <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-2">Word Battle</h2>
            <p className="text-gray-500 font-bold italic text-base tracking-tight opacity-70">Master the words. Conquer the world.</p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-3 gap-5 mb-10">
            <button className="py-5 bg-white rounded-3xl flex items-center justify-center text-[#4285F4] text-2xl hover:scale-105 transition-all shadow-xl border-b-4 border-gray-300">
               <i className="fa-brands fa-google"></i>
            </button>
            <button className="py-5 bg-[#1877F2] rounded-3xl flex items-center justify-center text-white text-2xl hover:scale-105 transition-all shadow-xl border-b-4 border-[#1259b6]">
               <i className="fa-brands fa-facebook"></i>
            </button>
            <button className="py-5 bg-black rounded-3xl flex items-center justify-center text-white text-2xl hover:scale-105 transition-all shadow-xl border-b-4 border-gray-800">
               <i className="fa-brands fa-apple"></i>
            </button>
          </div>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[4px] text-gray-600">
              <span className="bg-[#2b2926] px-4 italic">Or continue with email</span>
            </div>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            {!isLoginView && (
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="USERNAME" 
                  required
                  className="w-full bg-[#1c1b18] border-2 border-white/5 p-6 rounded-full text-white font-black italic focus:border-[#81b64c] outline-none transition-all placeholder:text-gray-700 uppercase"
                />
              </div>
            )}
            <div className="relative">
              <label className="text-[10px] font-black uppercase text-gray-600 absolute -top-2.5 left-8 bg-[#2b2926] px-3 tracking-widest italic z-10">Email</label>
              <input 
                type="email" 
                placeholder="email" 
                required
                className="w-full bg-[#1c1b18] border-2 border-[#81b64c]/30 p-6 rounded-full text-white font-black italic focus:border-[#81b64c] outline-none transition-all placeholder:text-gray-700 uppercase px-10"
              />
            </div>
            <div className="relative">
              <label className="text-[10px] font-black uppercase text-gray-600 absolute -top-2.5 left-8 bg-[#2b2926] px-3 tracking-widest italic z-10">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                required
                className="w-full bg-[#1c1b18] border-2 border-white/5 p-6 rounded-full text-white font-black italic focus:border-[#81b64c] outline-none transition-all placeholder:text-gray-700 uppercase px-10"
              />
            </div>
            
            <button type="submit" className="w-full py-6 chess-btn-primary rounded-full font-black text-2xl uppercase italic tracking-tighter mt-6 active:scale-95 transition-all">
              {isLoginView ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-12 text-center space-y-5">
            <button className="text-gray-500 font-bold text-sm hover:text-white transition-all underline italic uppercase tracking-tighter">Forgot Password?</button>
            <div className="h-px w-20 bg-white/5 mx-auto"></div>
            <p className="text-gray-500 font-bold text-sm italic">
              {isLoginView ? "New to Word Battle?" : "Already have an account?"} 
              <button 
                onClick={() => setIsLoginView(!isLoginView)} 
                className="text-[#81b64c] ml-3 font-black hover:underline uppercase tracking-tighter"
              >
                {isLoginView ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
