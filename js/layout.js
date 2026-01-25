// Navbar Komponenti
window.Navbar = ({ currentView, setView, user, onLogout, onLoginClick }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemClass = (view) => 
    `text-sm font-bold tracking-wide transition-all hover:text-white ${currentView === view ? 'text-white' : 'text-gray-400'}`;

  return (
    <React.Fragment>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setView('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
               <span className="text-white font-black text-lg">1M</span>
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">Million KM</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 bg-white/5 px-6 py-2 rounded-full border border-white/5 backdrop-blur-md">
            <button onClick={() => setView('home')} className={navItemClass('home')}>Asosiy</button>
            <button onClick={() => setView('about')} className={navItemClass('about')}>Biz Haqimizda</button>
            <button onClick={() => setView('home')} className="text-gray-400 hover:text-white transition-colors text-sm font-bold">Xizmatlar</button>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <button onClick={() => setView('cabinet')} className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all border border-white/5 flex items-center">
                  <i className="fas fa-user-astronaut mr-2"></i> {user.name}
                </button>
                <button onClick={onLogout} className="w-9 h-9 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"><i className="fas fa-power-off text-xs"></i></button>
              </div>
            ) : (
              <button onClick={onLoginClick} className="bg-white text-black hover:bg-brand-blue hover:text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Kirish
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white text-2xl p-2">
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-300 flex items-center justify-center ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col space-y-6 text-center">
           <button onClick={() => {setView('home'); setIsMobileMenuOpen(false)}} className="text-2xl font-bold text-white">Bosh Sahifa</button>
           <button onClick={() => {setView('about'); setIsMobileMenuOpen(false)}} className="text-2xl font-bold text-gray-400">Kompaniya</button>
           {user ? (
             <button onClick={() => {setView('cabinet'); setIsMobileMenuOpen(false)}} className="text-2xl font-bold text-brand-blue">Kabinet</button>
           ) : (
             <button onClick={() => {onLoginClick(); setIsMobileMenuOpen(false)}} className="text-2xl font-bold text-white bg-brand-blue px-8 py-3 rounded-2xl">Kirish</button>
           )}
        </div>
      </div>
    </React.Fragment>
  );
};

// Hero Komponenti
window.Hero = ({ onStart }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10"></div>
        <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 animate-pulse" style={{animationDuration: '10s'}} alt="Premium Car Engine" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 mb-8 animate-slide-up">
          <span className="w-2 h-2 bg-brand-blue rounded-full mr-2 animate-pulse"></span>
          <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">2025 Premium Servis</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-white animate-slide-up" style={{animationDelay: '0.1s'}}>
          Dvigatelingiz <br/> 
          <span className="text-gradient-blue">Abadiy</span> bo'lsin.
        </h1>
        
        <p className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-medium animate-slide-up" style={{animationDelay: '0.2s'}}>
          Biz faqat moy almashtirmaymiz. Biz har bir detalingizga 1,000,000 km kafolat beramiz.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-slide-up" style={{animationDelay: '0.3s'}}>
          <button 
            onClick={onStart}
            className="w-full md:w-auto px-10 py-5 bg-brand-blue hover:bg-blue-600 text-white rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-[0_0_40px_rgba(0,102,255,0.4)]"
          >
            Xizmatga yozilish
          </button>
          <button 
            onClick={() => {
              const el = document.getElementById('status');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="w-full md:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold text-lg transition-all"
          >
            Statusni tekshirish
          </button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 border-t border-white/10 pt-8 animate-slide-up" style={{animationDelay: '0.4s'}}>
           <div>
             <div className="text-3xl font-black text-white">5k+</div>
             <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Mijozlar</div>
           </div>
           <div>
             <div className="text-3xl font-black text-white">100%</div>
             <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Original</div>
           </div>
           <div>
             <div className="text-3xl font-black text-white">24/7</div>
             <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Qo'llab quvvatlash</div>
           </div>
        </div>
      </div>
    </div>
  );
};

// Custom Dropdown UI
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
    <div className="relative w-full group" ref={dropdownRef}>
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">{label}</label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-14 px-6 rounded-2xl flex items-center justify-between font-bold text-left transition-all glass-panel ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-brand-blue/50'} ${isOpen ? 'border-brand-blue ring-1 ring-brand-blue/20' : 'border-white/10'}`}
      >
        <span className={`text-sm ${!value ? 'text-gray-500' : 'text-white'}`}>{value || placeholder}</span>
        <i className={`fas fa-chevron-down text-xs text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-slide-up">
          <div className="max-h-60 overflow-y-auto py-2">
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={`w-full text-left px-6 py-3 font-bold text-sm hover:bg-white/5 transition-colors capitalize ${value === opt ? 'text-brand-blue bg-brand-blue/10' : 'text-gray-300'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};