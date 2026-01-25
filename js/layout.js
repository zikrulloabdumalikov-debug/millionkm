// Navbar Komponenti
window.Navbar = ({ currentView, setView, user, onLogout, onLoginClick }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (view, hash = '') => {
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
    <React.Fragment>
      <nav className={`fixed top-0 w-full z-[105] transition-all duration-500 ${scrolled ? 'py-2 md:py-4' : 'py-6 md:py-8'}`}>
        <div className={`max-w-[1200px] mx-auto px-4 md:px-6 h-16 flex justify-between items-center transition-all duration-500 ${scrolled ? 'apple-glass squircle mx-4 md:mx-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)]' : ''}`}>
          
          <div className="flex items-center space-x-3 md:space-x-4 cursor-pointer tap-active" onClick={() => handleNav('home')}>
            <div className="w-10 h-10 md:w-11 md:h-11 bg-black rounded-[12px] flex items-center justify-center shadow-xl">
               <span className="text-white font-black text-lg md:text-xl tracking-tighter">1M</span>
            </div>
            <span className="text-lg md:text-xl font-extrabold tracking-tighter text-[#1D1D1F]">Million KM</span>
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
                <button onClick={onLogout} className="w-10 h-10 rounded-full bg-red-50 text-red-500 tap-active"><i className="fas fa-power-off text-xs"></i></button>
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
        <div className="absolute inset-0 bg-white/80 backdrop-blur-2xl" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`absolute inset-x-0 top-0 pt-32 pb-12 px-8 transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-10'}`}>
           <div className="flex flex-col space-y-4">
              <button onClick={() => handleNav('home')} className="text-left px-8 py-6 rounded-[24px] text-2xl font-black bg-gray-50 text-slate-900">Bosh sahifa</button>
              <button onClick={() => handleNav('cabinet')} className="text-left px-8 py-6 rounded-[24px] text-2xl font-black bg-gray-50 text-slate-900">Kabinet</button>
           </div>
        </div>
      </div>
    </React.Fragment>
  );
};

// Hero Komponenti
window.Hero = ({ onStart }) => {
  return (
    <div className="relative pt-24 pb-16 md:pt-60 md:pb-48 overflow-hidden px-4">
      <div className="max-w-7xl mx-auto px-2 md:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/40 border border-white/50 backdrop-blur-md mb-8 md:mb-12 animate-spring">
            <span className="text-[9px] md:text-[11px] font-bold text-blue-600 tracking-[0.15em] uppercase">2025 Premium Standart</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-[112px] font-[850] tracking-[-0.04em] md:tracking-[-0.06em] leading-[1.1] md:leading-[0.95] text-[#1D1D1F] mb-6 md:mb-10 animate-spring" style={{ animationDelay: '0.1s' }}>
            Million KM
          </h1>
          
          <div className="p-4 md:p-12 mb-8 md:mb-16 animate-spring" style={{ animationDelay: '0.2s' }}>
            <p className="text-lg sm:text-xl md:text-4xl font-medium text-[#86868B] max-w-[800px] leading-tight">
              Ko‘pchilik dvigatelni ta’mirlaydi. <br className="hidden md:block" />
              <span className="text-black font-extrabold">Biz esa uni saqlab qolamiz.</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto px-4 md:px-0 animate-spring" style={{ animationDelay: '0.3s' }}>
            <button 
              onClick={onStart}
              className="w-full sm:px-16 py-4 md:py-5 bg-black text-white rounded-[20px] md:rounded-[22px] font-bold text-sm md:text-lg tap-active shadow-2xl shadow-gray-200 transition-all hover:bg-[#333]"
            >
              Boshlash
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('status');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="w-full sm:px-16 py-4 md:py-5 bg-white text-black rounded-[20px] md:rounded-[22px] font-bold text-sm md:text-lg border border-gray-100 tap-active hover:bg-gray-50 transition-all"
            >
              Statusni tekshirish
            </button>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] md:h-[800px] bg-gradient-to-b from-blue-50/40 to-transparent pointer-events-none -z-10"></div>
    </div>
  );
};

// Dropdown Elementi (UI)
window.IOSDropdown = ({ label, options, value, onChange, disabled, placeholder }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">{label}</label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-14 md:h-16 px-6 rounded-2xl flex items-center justify-between font-bold text-left transition-all tap-active ${disabled ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 text-black hover:bg-white ring-1 ring-gray-100 hover:ring-blue-200'} ${isOpen ? 'ring-2 ring-blue-500 bg-white' : ''}`}
      >
        <span className={`text-sm md:text-base ${!value ? 'text-gray-400' : ''}`}>{value || placeholder}</span>
        <i className={`fas fa-chevron-down text-[9px] md:text-[10px] transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white/90 backdrop-blur-3xl rounded-[20px] md:rounded-[24px] shadow-2xl border border-white/20 overflow-hidden animate-spring origin-top">
          <div className="max-h-64 overflow-y-auto py-2 ios-scroll">
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={`w-full text-left px-6 py-4 font-bold text-[13px] md:text-[14px] hover:bg-blue-50 transition-colors ${value === opt ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'}`}
              >
                {opt.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};