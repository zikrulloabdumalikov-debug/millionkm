
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (view: any, hash: string = '') => {
    setView(view);
    setIsMobileMenuOpen(false);
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
    <>
      <nav className={`fixed top-0 w-full z-[105] transition-all duration-500 ${scrolled ? 'py-2 md:py-4' : 'py-6 md:py-8'}`}>
        <div className={`max-w-[1200px] mx-auto px-4 md:px-6 h-16 flex justify-between items-center transition-all duration-500 ${scrolled ? 'apple-glass squircle mx-4 md:mx-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)]' : ''}`}>
          
          {/* Logo */}
          <div className="flex items-center space-x-3 md:space-x-4 cursor-pointer tap-active" onClick={() => handleNav('home')}>
            <div className="w-10 h-10 md:w-11 md:h-11 bg-black rounded-[12px] flex items-center justify-center shadow-xl">
               <span className="text-white font-black text-lg md:text-xl tracking-tighter">1M</span>
            </div>
            <span className="text-lg md:text-xl font-extrabold tracking-tighter text-[#1D1D1F]">Million KM</span>
          </div>

          {/* Desktop Navigation */}
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
                <button onClick={onLogout} className="w-10 h-10 rounded-full bg-red-50 text-red-500 tap-active"><i className="fas fa-power-off text-xs"></i></button>
              </div>
            ) : (
              <button onClick={onLoginClick} className="bg-black text-white h-10 px-8 rounded-full text-[11px] font-black uppercase tracking-widest tap-active shadow-xl shadow-gray-200">
                Kirish
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-3">
            {!user && (
              <button onClick={onLoginClick} className="bg-black text-white h-10 px-5 rounded-full text-[10px] font-black uppercase tracking-widest tap-active">
                Kirish
              </button>
            )}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${isMobileMenuOpen ? 'bg-black text-white' : 'apple-glass text-black'} tap-active`}
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[104] md:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop blur */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-2xl" onClick={() => setIsMobileMenuOpen(false)}></div>
        
        {/* Menu Items */}
        <div className={`absolute inset-x-0 top-0 pt-32 pb-12 px-8 transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-10'}`}>
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => handleNav('home')} 
              className={`text-left px-8 py-6 rounded-[24px] text-2xl font-black transition-all ${currentView === 'home' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'bg-gray-50 text-slate-900'}`}
            >
              Bosh sahifa
            </button>
            <button 
              onClick={() => handleNav('about')} 
              className={`text-left px-8 py-6 rounded-[24px] text-2xl font-black transition-all ${currentView === 'about' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'bg-gray-50 text-slate-900'}`}
            >
              Biz haqimizda
            </button>
            <button 
              onClick={() => handleNav('home', '#brands')} 
              className="text-left px-8 py-6 rounded-[24px] text-2xl font-black bg-gray-50 text-slate-900"
            >
              Brendlar
            </button>
            
            {user && (
              <>
                <div className="py-4 flex items-center">
                  <div className="h-px bg-gray-100 flex-1"></div>
                  <span className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Profil</span>
                  <div className="h-px bg-gray-100 flex-1"></div>
                </div>
                <button 
                  onClick={() => handleNav('cabinet')} 
                  className={`text-left px-8 py-6 rounded-[24px] text-2xl font-black transition-all ${currentView === 'cabinet' ? 'bg-black text-white' : 'bg-gray-50 text-slate-900'}`}
                >
                  <i className="fas fa-user-circle mr-3 opacity-30"></i> {user.name}
                </button>
                <button 
                  onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} 
                  className="text-left px-8 py-6 rounded-[24px] text-2xl font-black bg-red-50 text-red-500"
                >
                  <i className="fas fa-sign-out-alt mr-3 opacity-50"></i> Chiqish
                </button>
              </>
            )}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-6">Bog'lanish</p>
            <div className="flex justify-center space-x-4">
              <a href="tel:+998770200107" className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-xl text-black">
                <i className="fas fa-phone"></i>
              </a>
              <a href="#" className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-xl text-black">
                <i className="fab fa-telegram-plane"></i>
              </a>
              <a href="#" className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-xl text-black">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
