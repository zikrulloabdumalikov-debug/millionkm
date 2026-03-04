import React from 'react';

const Navbar = ({ currentView, setView, user, onLogout, onLoginClick, showBack, onBack }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNav = (view, hash = '') => {
    setView(view);
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
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
    <header>
      <nav className={`fixed top-0 w-full z-[105] transition-all duration-500 ${scrolled ? 'py-2 md:py-4 px-4 md:px-6' : 'py-6 md:py-8'}`}>
        <div className={`max-w-[1200px] mx-auto px-4 md:px-6 h-16 flex justify-between items-center transition-all duration-500 ${scrolled ? 'apple-glass squircle shadow-[0_10px_40px_rgba(0,0,0,0.05)]' : ''}`}>
          
          <div className="flex items-center">
            {showBack && (
              <button 
                onClick={onBack}
                className="mr-3 md:mr-4 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-200 transition-all active:scale-95 animate-fade-in"
              >
                <i className="fas fa-arrow-left text-sm"></i>
              </button>
            )}
            <div className={`flex items-center space-x-3 md:space-x-4 cursor-pointer tap-active transition-all duration-300 ${showBack ? 'pl-2' : ''}`} onClick={() => handleNav('home')}>
              <span className="text-lg md:text-xl font-extrabold tracking-tighter text-[#1D1D1F]" title="Million KM Avtoservis Toshkent">Million KM</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <ul className="flex items-center space-x-10">
              <li><button onClick={() => handleNav('home')} className={`text-[13px] font-bold transition-colors ${currentView === 'home' ? 'text-blue-600' : (scrolled ? 'text-slate-600 hover:text-black' : 'text-slate-900 hover:text-black')}`}>Bosh sahifa</button></li>
              <li><button onClick={() => handleNav('home', '#brands')} className={`text-[13px] font-bold transition-colors ${scrolled ? 'text-slate-600 hover:text-black' : 'text-slate-900 hover:text-black'}`}>Modellar</button></li>
              <li><button onClick={() => handleNav('home', '#locations')} className={`text-[13px] font-bold transition-colors ${scrolled ? 'text-slate-600 hover:text-black' : 'text-slate-900 hover:text-black'}`}>Filiallar</button></li>
              <li><button onClick={() => handleNav('about')} className={`text-[13px] font-bold transition-colors ${currentView === 'about' ? 'text-blue-600' : (scrolled ? 'text-slate-600 hover:text-black' : 'text-slate-900 hover:text-black')}`}>Biz haqimizda</button></li>
            </ul>
            
            <div className="h-5 w-px bg-gray-200/50 mx-2"></div>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-black text-sm shadow-xl tap-active hover:scale-105 transition-all"
                >
                  {user.name.charAt(0).toUpperCase()}
                </button>
                
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-4 w-64 bg-white rounded-[24px] shadow-2xl border border-gray-100 py-4 animate-in fade-in slide-in-from-top-2 duration-300 z-[110]">
                    <div className="px-6 py-4 border-b border-gray-50 mb-2">
                      <div className="font-black text-slate-900 text-sm truncate">{user.name}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{user.phone}</div>
                    </div>
                    <button 
                      onClick={() => handleNav('cabinet')}
                      className="w-full text-left px-6 py-3 text-[13px] font-bold text-slate-700 hover:bg-gray-50 hover:text-blue-600 transition-all flex items-center"
                    >
                      <i className="fas fa-car-side mr-3 opacity-30"></i> Shaxsiy kabinet
                    </button>
                    {user.isAdmin && (
                      <button 
                        onClick={() => handleNav('admin')}
                        className="w-full text-left px-6 py-3 text-[13px] font-bold text-slate-700 hover:bg-gray-50 hover:text-blue-600 transition-all flex items-center"
                      >
                        <i className="fas fa-user-shield mr-3 opacity-30"></i> Admin panel
                      </button>
                    )}
                    <div className="h-px bg-gray-50 my-2"></div>
                    <button 
                      onClick={() => { onLogout(); setIsUserDropdownOpen(false); }}
                      className="w-full text-left px-6 py-3 text-[13px] font-bold text-red-500 hover:bg-red-50 transition-all flex items-center"
                    >
                      <i className="fas fa-sign-out-alt mr-3 opacity-50"></i> Chiqish
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={onLoginClick} className="bg-black text-white h-10 px-8 rounded-full text-[11px] font-black uppercase tracking-widest tap-active shadow-xl shadow-gray-200">
                Kirish
              </button>
            )}
          </div>

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

      <div className={`fixed inset-0 z-[104] md:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
        
        <div className={`absolute inset-x-4 top-24 pb-8 px-6 bg-white rounded-[2rem] shadow-2xl border border-gray-100 transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="flex flex-col space-y-3 pt-6">
            <button 
              onClick={() => handleNav('home')} 
              className={`text-left px-6 py-4 rounded-2xl text-lg font-black transition-all ${currentView === 'home' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-gray-50 text-slate-900'}`}
            >
              Bosh sahifa
            </button>
            <button 
              onClick={() => handleNav('home', '#brands')} 
              className="text-left px-6 py-4 rounded-2xl text-lg font-black bg-gray-50 text-slate-900"
            >
              Modellar
            </button>
            <button 
              onClick={() => handleNav('home', '#locations')} 
              className="text-left px-6 py-4 rounded-2xl text-lg font-black bg-gray-50 text-slate-900"
            >
              Filiallar
            </button>
            <button 
              onClick={() => handleNav('about')} 
              className={`text-left px-6 py-4 rounded-2xl text-lg font-black transition-all ${currentView === 'about' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-gray-50 text-slate-900'}`}
            >
              Biz haqimizda
            </button>
            
            {user && (
              <>
                <div className="py-2 flex items-center">
                  <div className="h-px bg-gray-100 flex-1"></div>
                  <span className="px-4 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Profil</span>
                  <div className="h-px bg-gray-100 flex-1"></div>
                </div>
                <button 
                  onClick={() => handleNav('cabinet')} 
                  className={`text-left px-6 py-4 rounded-2xl text-lg font-black transition-all ${currentView === 'cabinet' ? 'bg-black text-white' : 'bg-gray-50 text-slate-900'}`}
                >
                  <i className="fas fa-user-circle mr-3 opacity-30"></i> {user.name}
                </button>
                {user.isAdmin && (
                  <button 
                    onClick={() => handleNav('admin')} 
                    className={`text-left px-6 py-4 rounded-2xl text-lg font-black transition-all ${currentView === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-slate-900'}`}
                  >
                    <i className="fas fa-user-shield mr-3 opacity-30"></i> Admin panel
                  </button>
                )}
                <button 
                  onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} 
                  className="text-left px-6 py-4 rounded-2xl text-lg font-black bg-red-50 text-red-500"
                >
                  <i className="fas fa-sign-out-alt mr-3 opacity-50"></i> Chiqish
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
