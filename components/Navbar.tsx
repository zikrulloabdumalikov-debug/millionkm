
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface NavbarProps {
  currentView: string;
  setView: (view: any) => void;
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, user, onLogout, onLoginClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (view: any, hash: string = '') => {
    setView(view);
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-[105] transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className={`max-w-[1200px] mx-auto px-6 h-16 flex justify-between items-center transition-all duration-500 ${scrolled ? 'apple-glass squircle mx-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)]' : ''}`}>
        <div className="flex items-center space-x-4 cursor-pointer tap-active" onClick={() => handleNav('home')}>
          <div className="w-11 h-11 bg-black rounded-[12px] flex items-center justify-center shadow-xl shadow-gray-200">
             <span className="text-white font-black text-xl tracking-tighter">1M</span>
          </div>
          <span className="text-xl font-extrabold tracking-tighter text-[#1D1D1F]">Million KM</span>
        </div>

        <div className="hidden md:flex items-center space-x-10">
          <button onClick={() => handleNav('home')} className={`text-[13px] font-bold transition-colors ${currentView === 'home' ? 'text-blue-600' : 'text-gray-400 hover:text-black'}`}>Umumiy</button>
          <button onClick={() => handleNav('about')} className={`text-[13px] font-bold transition-colors ${currentView === 'about' ? 'text-blue-600' : 'text-gray-400 hover:text-black'}`}>Biz haqimizda</button>
          <button onClick={() => handleNav('home', '#brands')} className="text-[13px] font-bold text-gray-400 hover:text-black">Brendlar</button>
          
          <div className="h-5 w-px bg-gray-200/50 mx-2"></div>

          {user ? (
            <div className="flex items-center space-x-5">
              <button onClick={() => handleNav('cabinet')} className="bg-gray-100 text-black h-10 px-5 rounded-full font-bold text-[11px] uppercase tracking-widest tap-active hover:bg-black hover:text-white transition-all">
                {user.name.split(' ')[0]}
              </button>
              <button onClick={onLogout} className="w-10 h-10 rounded-full bg-red-50 text-red-500 tap-active"><i className="fas fa-power-off"></i></button>
            </div>
          ) : (
            <button onClick={onLoginClick} className="bg-black text-white h-10 px-8 rounded-full text-[11px] font-black uppercase tracking-widest tap-active shadow-xl shadow-gray-200">
              Kirish
            </button>
          )}
        </div>

        <button className="md:hidden w-11 h-11 apple-glass rounded-xl flex items-center justify-center text-black tap-active">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
