// Navbar (Clean Apple Style)
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
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const linkClass = (view) => 
    `text-[13px] font-medium transition-colors ${currentView === view ? 'text-[#0071E3]' : 'text-[#1D1D1F] hover:text-[#0071E3]'}`;

  return (
    <React.Fragment>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-[1080px] mx-auto px-6 flex justify-between items-center">
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNav('home')}>
             <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">M</div>
             <span className="text-lg font-bold tracking-tight text-[#1D1D1F]">Million<span className="text-[#0071E3]">KM</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNav('home')} className={linkClass('home')}>Bosh sahifa</button>
            <button onClick={() => handleNav('about')} className={linkClass('about')}>Biz haqimizda</button>
            <button onClick={() => handleNav('home', '#brands')} className={linkClass('brands')}>Modellar</button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-3">
                <button onClick={() => handleNav('cabinet')} className="bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] px-4 py-2 rounded-full font-medium text-[12px] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  {user.name}
                </button>
                <button onClick={onLogout} className="text-[#86868B] hover:text-red-500 transition-colors"><i className="fas fa-sign-out-alt"></i></button>
              </div>
            ) : (
              <button onClick={onLoginClick} className="apple-btn-primary py-2 px-5 text-[13px]">
                Kirish
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-[#1D1D1F] text-xl">
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[90] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="pt-24 px-8 flex flex-col space-y-6">
           <button onClick={() => handleNav('home')} className="text-2xl font-bold text-[#1D1D1F] text-left">Bosh sahifa</button>
           <button onClick={() => handleNav('about')} className="text-2xl font-bold text-[#1D1D1F] text-left">Biz haqimizda</button>
           <button onClick={() => handleNav('home', '#brands')} className="text-2xl font-bold text-[#1D1D1F] text-left">Modellar</button>
           <div className="h-px bg-gray-100 w-full my-2"></div>
           {user ? (
             <button onClick={() => handleNav('cabinet')} className="text-xl font-bold text-[#0071E3] text-left">Mening Kabinetim</button>
           ) : (
             <button onClick={() => {onLoginClick(); setIsMobileMenuOpen(false)}} className="apple-btn-blue w-full py-4 text-lg">Tizimga kirish</button>
           )}
        </div>
      </div>
    </React.Fragment>
  );
};

// Hero Section (Fixed Sizes - Not Gigantic)
window.Hero = ({ onStart }) => {
  return (
    <div className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 overflow-hidden bg-[#F5F5F7]">
      <div className="max-w-[900px] mx-auto text-center relative z-10">
        
        <div className="animate-fade-up">
           <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 mb-6 shadow-sm">
             <span className="w-1.5 h-1.5 bg-[#0071E3] rounded-full mr-2 animate-pulse"></span>
             <span className="text-[10px] font-bold text-[#1D1D1F] uppercase tracking-wide">2025 Premium Standart</span>
           </div>

           <h1 className="text-4xl md:text-6xl font-bold text-[#1D1D1F] tracking-tight mb-6 leading-[1.1]">
             Dvigatelni ta’mirlamang. <br/>
             <span className="text-[#0071E3]">Uni saqlab qoling.</span>
           </h1>
           
           <p className="text-[#86868B] text-base md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-8">
             1,000,000 km kafolat va professional muhandislar nazorati. 
             Sizning avtomobilingiz eng yaxshisiga loyiq.
           </p>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button onClick={onStart} className="apple-btn-primary w-full sm:w-auto px-8">Hozir boshlash</button>
             <button 
               onClick={() => {
                  const el = document.getElementById('status');
                  if(el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
               }}
               className="apple-btn-secondary w-full sm:w-auto px-8"
             >
               Statusni tekshirish
             </button>
           </div>
        </div>

        <div className="mt-12 md:mt-16 animate-fade-up" style={{animationDelay: '0.2s'}}>
           <div className="relative rounded-[24px] overflow-hidden shadow-xl mx-auto max-w-4xl aspect-[16/9] border border-white/50 bg-white">
              <img 
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop" 
                alt="Premium Service" 
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white text-left">
                <div className="font-bold text-lg">Million KM Service</div>
                <div className="text-white/80 text-sm">Professional jamoa</div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

// IOS Dropdown (Clean)
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
      <label className="text-[12px] font-semibold text-[#86868B] mb-1.5 block ml-1">{label}</label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[48px] px-4 rounded-xl flex items-center justify-between text-left transition-all bg-white border ${disabled ? 'bg-gray-50 border-gray-200 text-gray-400' : 'border-[#D2D2D7] hover:border-[#0071E3] text-[#1D1D1F]'} ${isOpen ? 'ring-2 ring-[#0071E3]/20 border-[#0071E3]' : ''}`}
      >
        <span className="text-[14px] font-medium truncate">{value || placeholder}</span>
        <i className={`fas fa-chevron-down text-xs text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fade-up origin-top py-1 max-h-56 overflow-y-auto">
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-[14px] font-medium hover:bg-[#F5F5F7] transition-colors ${value === opt ? 'text-[#0071E3] bg-[#F5F5F7]' : 'text-[#1D1D1F]'}`}
              >
                {opt}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};