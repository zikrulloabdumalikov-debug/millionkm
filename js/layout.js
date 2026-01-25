// Navbar (Apple Style White)
window.Navbar = ({ currentView, setView, user, onLogout, onLoginClick }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemClass = (view) => 
    `text-[13px] font-medium transition-colors ${currentView === view ? 'text-[#0071E3]' : 'text-[#1d1d1f] hover:text-[#0071E3]'}`;

  return (
    <React.Fragment>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1080px] mx-auto px-6 flex justify-between items-center">
          
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setView('home')}>
            <div className="w-8 h-8 bg-[#1d1d1f] rounded-lg flex items-center justify-center text-white font-bold shadow-lg group-hover:bg-[#0071E3] transition-colors">M</div>
            <span className="text-lg font-bold tracking-tight text-[#1d1d1f]">Million<span className="text-[#0071E3]">KM</span></span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setView('home')} className={navItemClass('home')}>Bosh sahifa</button>
            <button onClick={() => setView('about')} className={navItemClass('about')}>Biz haqimizda</button>
            <button onClick={() => {
               const el = document.getElementById('brands');
               if(el) el.scrollIntoView({behavior:'smooth'});
            }} className="text-[13px] font-medium text-[#1d1d1f] hover:text-[#0071E3]">Avtomobillar</button>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-3">
                <button onClick={() => setView('cabinet')} className="bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1d1d1f] px-4 py-2 rounded-full font-medium text-xs transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {user.name}
                </button>
                <button onClick={onLogout} className="text-[#86868b] hover:text-[#FF3B30]"><i className="fas fa-sign-out-alt"></i></button>
              </div>
            ) : (
              <button onClick={onLoginClick} className="bg-[#1d1d1f] hover:bg-[#333] text-white px-5 py-2 rounded-full text-xs font-bold transition-all shadow-md hover:shadow-lg">
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

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[90] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="pt-28 px-8 flex flex-col space-y-6">
           <button onClick={() => {setView('home'); setIsMobileMenuOpen(false)}} className="text-3xl font-bold text-[#1d1d1f] text-left tracking-tight">Bosh Sahifa</button>
           <button onClick={() => {setView('about'); setIsMobileMenuOpen(false)}} className="text-3xl font-bold text-[#1d1d1f] text-left tracking-tight">Falsafa</button>
           <div className="h-px bg-gray-100 w-full my-2"></div>
           {user ? (
             <button onClick={() => {setView('cabinet'); setIsMobileMenuOpen(false)}} className="text-xl font-bold text-[#0071E3] text-left">Mening Kabinetim</button>
           ) : (
             <button onClick={() => {onLoginClick(); setIsMobileMenuOpen(false)}} className="w-full py-4 bg-[#0071E3] text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-500/20">Tizimga kirish</button>
           )}
        </div>
      </div>
    </React.Fragment>
  );
};

// Hero Section (Updated Copywriting & Visuals)
window.Hero = ({ onStart }) => {
  return (
    <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden bg-[#F5F5F7]">
      <div className="max-w-[1080px] mx-auto text-center relative z-10">
        
        <div className="animate-fade-up">
           {/* New Badge (No more red text) */}
           <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
             <span className="w-1.5 h-1.5 bg-[#0071E3] rounded-full mr-2 animate-pulse"></span>
             <span className="text-[10px] font-bold text-[#0071E3] uppercase tracking-widest">2025 Premium Standart</span>
           </div>

           <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#1d1d1f] tracking-tight leading-[1.05] mb-8">
             Ko‘pchilik dvigatelni <span className="text-[#86868b]">ta’mirlaydi.</span> <br/>
             Biz esa uni <span className="text-[#0071E3]">saqlab qolamiz.</span>
           </h1>
           
           <p className="text-[#86868b] text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed mb-10">
             1,000,000 km kafolat. Original moylar. <br className="hidden md:block"/>
             Avtomobilingiz uchun eng yuqori darajadagi g'amxo'rlik.
           </p>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button 
               onClick={onStart}
               className="apple-btn blue px-10 py-4 text-lg w-full sm:w-auto shadow-xl shadow-blue-500/20"
             >
               Hozir boshlash
             </button>
             <button 
               onClick={() => {
                  const el = document.getElementById('status');
                  if(el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
               }}
               className="px-10 py-4 text-[#1d1d1f] font-semibold bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 transition-all w-full sm:w-auto"
             >
               Statusni tekshirish
             </button>
           </div>
        </div>

        {/* Hero Abstract Image - Clean & White */}
        <div className="mt-20 md:mt-24 animate-fade-up" style={{animationDelay: '0.2s'}}>
           <div className="relative rounded-[32px] overflow-hidden shadow-2xl mx-auto max-w-5xl aspect-[16/9] md:aspect-[21/9] border border-white/50">
              <img 
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop" 
                alt="Million KM Premium Service" 
                className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white text-left">
                <div className="font-bold text-lg">Million KM Service</div>
                <div className="text-white/80 text-sm">Professional muhandislar jamoasi</div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

// Dropdown UI (Clean Apple Style)
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
      <label className="text-[12px] font-bold text-[#86868b] uppercase tracking-wider mb-2 block ml-1">{label}</label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-14 px-5 rounded-2xl flex items-center justify-between text-left transition-all bg-white border ${disabled ? 'bg-gray-50 border-gray-200 text-gray-400' : 'border-gray-200 hover:border-[#0071E3] text-[#1d1d1f]'} ${isOpen ? 'ring-4 ring-[#0071E3]/10 border-[#0071E3]' : ''}`}
      >
        <span className="text-[15px] font-semibold truncate">{value || placeholder}</span>
        <i className={`fas fa-chevron-down text-xs text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-scale origin-top py-1 max-h-60 overflow-y-auto">
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={`w-full text-left px-5 py-3 text-[14px] font-medium hover:bg-[#F5F5F7] transition-colors ${value === opt ? 'text-[#0071E3] bg-[#F5F5F7]' : 'text-[#1d1d1f]'}`}
              >
                {opt}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};