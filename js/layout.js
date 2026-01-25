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
    `text-[14px] font-medium transition-colors ${currentView === view ? 'text-[#0071E3]' : 'text-[#1D1D1F] hover:text-[#0071E3]'}`;

  return (
    <React.Fragment>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-[1080px] mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleNav('home')}>
             <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md transition-transform group-hover:scale-105">M</div>
             <span className="text-lg font-bold tracking-tight text-[#1D1D1F]">Million<span className="text-[#0071E3]">KM</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNav('home')} className={linkClass('home')}>Bosh sahifa</button>
            <button onClick={() => handleNav('about')} className={linkClass('about')}>Biz haqimizda</button>
            <button onClick={() => handleNav('home', '#brands')} className={linkClass('brands')}>Modellar</button>
            <button onClick={() => handleNav('home', '#locations')} className={linkClass('locations')}>Filiallar</button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-3">
                <button onClick={() => handleNav('cabinet')} className="bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] px-4 py-2 rounded-full font-medium text-[13px] transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {user.name.split(' ')[0]}
                </button>
                <button onClick={onLogout} className="w-9 h-9 flex items-center justify-center rounded-full text-[#86868B] hover:bg-red-50 hover:text-red-500 transition-colors"><i className="fas fa-sign-out-alt"></i></button>
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

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[90] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="pt-24 px-8 flex flex-col space-y-6">
           <button onClick={() => handleNav('home')} className="text-2xl font-bold text-[#1D1D1F] text-left">Bosh sahifa</button>
           <button onClick={() => handleNav('about')} className="text-2xl font-bold text-[#1D1D1F] text-left">Biz haqimizda</button>
           <button onClick={() => handleNav('home', '#brands')} className="text-2xl font-bold text-[#1D1D1F] text-left">Modellar</button>
           <button onClick={() => handleNav('home', '#locations')} className="text-2xl font-bold text-[#1D1D1F] text-left">Filiallar</button>
           <div className="h-px bg-gray-100 w-full my-2"></div>
           {user ? (
             <>
                <button onClick={() => handleNav('cabinet')} className="text-xl font-bold text-[#0071E3] text-left">Mening Kabinetim</button>
                <button onClick={() => {onLogout(); setIsMobileMenuOpen(false)}} className="text-base font-medium text-red-500 text-left">Chiqish</button>
             </>
           ) : (
             <button onClick={() => {onLoginClick(); setIsMobileMenuOpen(false)}} className="apple-btn-blue w-full py-4 text-lg mt-4">Tizimga kirish</button>
           )}
        </div>
      </div>
    </React.Fragment>
  );
};

// Hero Section (Clean Text Only, No Image)
window.Hero = ({ onStart }) => {
  return (
    <div className="relative pt-40 pb-32 px-6 overflow-hidden bg-[#F5F5F7] flex items-center justify-center min-h-[60vh]">
      <div className="max-w-[960px] mx-auto text-center relative z-10">
        
        <div className="animate-fade-up">
           <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-[#E5E5EA] mb-8 shadow-sm">
             <span className="w-1.5 h-1.5 bg-[#0071E3] rounded-full mr-2 animate-pulse"></span>
             <span className="text-[11px] font-bold text-[#1D1D1F] uppercase tracking-wide">2026 Premium Standart</span>
           </div>

           <h1 className="text-5xl md:text-7xl font-bold text-[#1D1D1F] tracking-tight mb-8 leading-[1.05] text-hero">
             Dvigatelni ta’mirlamang. <br/>
             <span className="text-[#0071E3]">Uni saqlab qoling.</span>
           </h1>
           
           <p className="text-[#86868B] text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed mb-12">
             1,000,000 km kafolat va professional muhandislar nazorati. 
             Eng yaxshisiga loyiqsiz.
           </p>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
             <button onClick={onStart} className="apple-btn-primary px-10 py-4 text-base shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto">
                Hozir boshlash
             </button>
             <button 
               onClick={() => {
                  const el = document.getElementById('status');
                  if(el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
               }}
               className="apple-btn-secondary px-10 py-4 text-base w-full sm:w-auto bg-white hover:bg-gray-50 border border-gray-200"
             >
               Statusni tekshirish
             </button>
           </div>
        </div>

      </div>
    </div>
  );
};

// IOS Dropdown (Clean Inputs)
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
        className={`w-full h-[50px] px-4 rounded-xl flex items-center justify-between text-left transition-all bg-white border ${disabled ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed' : 'border-[#D2D2D7] hover:border-[#0071E3] text-[#1D1D1F]'} ${isOpen ? 'ring-2 ring-[#0071E3]/20 border-[#0071E3]' : ''}`}
      >
        <span className="text-[15px] font-medium truncate">{value || placeholder}</span>
        <i className={`fas fa-chevron-down text-xs text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-up origin-top py-1 max-h-60 overflow-y-auto ios-scroll">
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