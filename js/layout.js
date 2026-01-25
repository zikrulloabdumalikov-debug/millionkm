// Navbar Komponenti (Apple Style)
window.Navbar = ({ currentView, setView, user, onLogout, onLoginClick }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkStyle = (view) => 
    `text-[13px] font-medium transition-colors ${currentView === view ? 'text-[#0071E3]' : 'text-[#1d1d1f] hover:text-[#0071E3]'}`;

  return (
    <React.Fragment>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-[1080px] mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <span className="text-xl font-bold tracking-tight text-[#1d1d1f]">Million<span className="text-[#0071E3]">KM</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setView('home')} className={linkStyle('home')}>Bosh sahifa</button>
            <button onClick={() => setView('about')} className={linkStyle('about')}>Biz haqimizda</button>
            <button onClick={() => {
               const el = document.getElementById('brands');
               if(el) el.scrollIntoView({behavior:'smooth'});
            }} className="text-[13px] font-medium text-[#1d1d1f] hover:text-[#0071E3]">Avtomobillar</button>
          </div>

          {/* Auth & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-3">
                <button onClick={() => setView('cabinet')} className="text-sm font-medium text-[#1d1d1f] hover:text-[#0071E3] transition-colors">
                  {user.name}
                </button>
                <button onClick={onLogout} className="text-[#86868b] hover:text-[#FF3B30]"><i className="fas fa-sign-out-alt"></i></button>
              </div>
            ) : (
              <button onClick={onLoginClick} className="bg-[#1d1d1f] text-white px-5 py-1.5 rounded-full text-[12px] font-medium hover:bg-[#333] transition-all">
                Kirish
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#1d1d1f] text-xl p-2">
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="pt-24 px-8 flex flex-col space-y-6">
           <button onClick={() => {setView('home'); setIsMobileMenuOpen(false)}} className="text-2xl font-bold text-[#1d1d1f] text-left">Bosh Sahifa</button>
           <button onClick={() => {setView('about'); setIsMobileMenuOpen(false)}} className="text-2xl font-bold text-[#1d1d1f] text-left">Kompaniya</button>
           <div className="h-px bg-gray-100 w-full my-4"></div>
           {user ? (
             <button onClick={() => {setView('cabinet'); setIsMobileMenuOpen(false)}} className="text-xl font-medium text-[#0071E3] text-left">Mening Kabinetim</button>
           ) : (
             <button onClick={() => {onLoginClick(); setIsMobileMenuOpen(false)}} className="text-xl font-medium text-[#1d1d1f] text-left">Tizimga kirish</button>
           )}
        </div>
      </div>
    </React.Fragment>
  );
};

// Hero Komponenti (Clean & Sales Focused)
window.Hero = ({ onStart }) => {
  return (
    <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden bg-[#F5F5F7]">
      <div className="max-w-[1080px] mx-auto text-center relative z-10">
        
        <div className="animate-fade-up">
           <h2 className="text-[#F56300] font-semibold text-lg md:text-xl mb-4 tracking-tight">Yangi daraja</h2>
           <h1 className="text-5xl md:text-8xl font-bold text-[#1d1d1f] tracking-tight leading-[1.05] mb-6">
             Dvigatel uchun. <br/>
             <span className="text-[#0071E3]">Professional hayot.</span>
           </h1>
           <p className="text-[#86868b] text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed mb-10">
             1,000,000 km kafolat. Original moylar. <br className="hidden md:block"/>
             Sizning avtomobilingiz eng yaxshisiga loyiq.
           </p>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button 
               onClick={onStart}
               className="apple-btn px-8 py-4 text-lg shadow-lg shadow-blue-500/30 w-full sm:w-auto"
             >
               Xizmatga yozilish
             </button>
             <button 
               onClick={() => {
                  const el = document.getElementById('status');
                  if(el) el.scrollIntoView({ behavior: 'smooth' });
               }}
               className="text-[#0071E3] font-medium text-lg px-8 py-4 hover:underline w-full sm:w-auto"
             >
               Statusni tekshirish <i className="fas fa-chevron-right text-xs ml-1"></i>
             </button>
           </div>
        </div>

        {/* Hero Image / Abstract Visual */}
        <div className="mt-16 md:mt-24 animate-fade-up" style={{animationDelay: '0.2s'}}>
           <div className="relative rounded-[32px] overflow-hidden shadow-2xl mx-auto max-w-5xl aspect-video md:aspect-[21/9]">
              <img 
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1920&auto=format&fit=crop" 
                alt="Premium Service" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-left text-white">
                 <div className="text-sm font-bold uppercase tracking-widest opacity-80 mb-1">Premium Servis</div>
                 <div className="text-2xl md:text-3xl font-bold">Texnologiya va Tajriba</div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

// Dropdown UI (Clean)
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
      <label className="text-[12px] font-semibold text-[#86868b] mb-2 block ml-1">{label}</label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-14 px-4 rounded-xl flex items-center justify-between text-left transition-all bg-white border ${disabled ? 'bg-gray-50 border-gray-200 text-gray-400' : 'border-gray-200 hover:border-[#0071E3] text-[#1d1d1f]'} ${isOpen ? 'ring-2 ring-[#0071E3]/20 border-[#0071E3]' : ''}`}
      >
        <span className="text-[15px] font-medium truncate">{value || placeholder}</span>
        <i className={`fas fa-chevron-down text-xs text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-up origin-top py-1 max-h-60 overflow-y-auto">
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={`w-full text-left px-4 py-3 text-[14px] font-medium hover:bg-[#F5F5F7] transition-colors ${value === opt ? 'text-[#0071E3] bg-[#F5F5F7]' : 'text-[#1d1d1f]'}`}
              >
                {opt}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};