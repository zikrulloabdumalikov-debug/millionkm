
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { label: 'Bosh sahifa', view: 'home', hash: '' },
    { label: 'Biz haqimizda', view: 'about', hash: '' },
    { label: 'Brendlar', view: 'home', hash: '#brands' },
    { label: 'Xizmatlar', view: 'home', hash: '#benefits' },
    { label: 'Filiallar', view: 'home', hash: '#locations' },
  ];

  const handleNav = (view: any, hash: string = '') => {
    setView(view);
    setIsMenuOpen(false);
    if (hash) {
      // If we are navigating to a hash, give React time to render the 'home' view first if needed
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-[105] transition-all duration-300 ${scrolled ? 'glass border-b border-gray-100/50 py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <div 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => handleNav('home')}
        >
          <div className="relative w-12 h-12 bg-black rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-xl shadow-gray-200">
             <span className="text-white font-black text-2xl tracking-tighter">1M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-[#1D1D1F] leading-none">Million KM</span>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Premium Service</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.view, link.hash)}
              className={`text-[13px] font-bold tracking-tight transition-colors ${currentView === link.view && !link.hash ? 'text-blue-600' : 'text-gray-500 hover:text-black'}`}
            >
              {link.label}
            </button>
          ))}
          
          <div className="h-4 w-px bg-gray-200 mx-2"></div>

          {user ? (
            <div className="flex items-center space-x-5">
              <button 
                onClick={() => handleNav('cabinet')} 
                className={`px-5 py-2 rounded-full font-bold text-xs transition-all ${currentView === 'cabinet' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
              >
                {user.name}
              </button>
              {user.isAdmin && <button onClick={() => handleNav('admin')} className="text-gray-400 hover:text-blue-600"><i className="fas fa-cog"></i></button>}
              <button onClick={onLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                <i className="fas fa-sign-out-alt text-sm"></i>
              </button>
            </div>
          ) : (
            <button 
              onClick={onLoginClick} 
              className="bg-black text-white px-7 py-2.5 rounded-full text-xs font-bold hover:opacity-85 transition-all shadow-xl shadow-gray-200 active:scale-95"
            >
              Kirish
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden w-10 h-10 flex items-center justify-center text-[#1d1d1f] relative z-[110]"
        >
          <div className="w-5 flex flex-col items-end space-y-1.5">
            <span className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'w-5 rotate-45 translate-y-2' : 'w-5'}`}></span>
            <span className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-3'}`}></span>
            <span className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'w-5 -rotate-45 -translate-y-2' : 'w-4'}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 top-0 h-screen w-full bg-white z-[100] transition-all duration-500 md:hidden flex flex-col ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-100%] pointer-events-none'}`}>
        <div className="flex flex-col h-full pt-32 px-10 space-y-8 overflow-y-auto">
          {navLinks.map((link) => (
            <button 
              key={link.label} 
              onClick={() => handleNav(link.view, link.hash)} 
              className={`text-3xl font-extrabold text-left transition-colors ${currentView === link.view && !link.hash ? 'text-blue-600' : 'text-gray-900'}`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-10 border-t border-gray-100 mt-auto pb-20">
            {user ? (
              <div className="space-y-6">
                <button onClick={() => handleNav('cabinet')} className="block w-full text-left text-2xl font-bold">{user.name}</button>
                <button onClick={onLogout} className="block w-full text-left text-red-500 text-xl font-bold">Chiqish</button>
              </div>
            ) : (
              <button 
                onClick={() => { onLoginClick(); setIsMenuOpen(false); }} 
                className="w-full bg-black text-white py-5 rounded-3xl font-bold text-xl active:scale-95"
              >
                Kirish
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
