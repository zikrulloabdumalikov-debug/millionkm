// --- CONSTANTS ---
const CAR_DATA = {
  "chevrolet": {
    "Nexia 3": { "maxAge": 5, "maxKm": 100000, "priceOneTime": 849000, "desc": "Ishonchli va tejamkor Nexia 3 uchun original xizmat." },
    "Cobalt": { "maxAge": 5, "maxKm": 100000, "priceOneTime": 849000, "desc": "Oila avtomobili Cobalt uchun uzoq muddatli kafolat." },
    "Gentra": { "maxAge": 5, "maxKm": 100000, "priceOneTime": 849000, "desc": "Komfortli Gentra uchun premium xizmat paketi." },
    "Onix": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1049000, "desc": "Zamonaviy Onix turbo motorlari uchun maxsus moylar." },
    "Tracker": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1049000, "desc": "Krossover Tracker uchun ishonchli texnik nazorat." },
    "Malibu": { "maxAge": 5, "maxKm": 50000, "priceOneTime": 1299000, "desc": "Biznes klass Malibu uchun oliy darajadagi xizmat." }
  },
  "kia": {
    "Sonet": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 990000, "desc": "Yangi Sonet krossoveri uchun original KIA standartlari." },
    "K5": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1350000, "desc": "Elegant K5 uchun yuqori sifatli texnik ko'rik." },
    "Sportage": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1550000, "desc": "Sportage yo'ltanlamasi uchun ishonchli million km kafolati." }
  },
  "liauto": {
    "L6": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1800000, "desc": "Premium Li Auto L6 uchun maxsus xizmat turi." },
    "L7": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1900000, "desc": "Li L7 gibrid tizimlari uchun professional yondashuv." },
    "L9": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 2100000, "desc": "Flagman Li L9 uchun eng oliy darajadagi Million KM xizmati." }
  }
};

const ONE_TIME_SERVICES = [
  "Avtomobil modeli bo'yicha to'g'ri motor moyi tanlovi",
  "Dvigatel uchun aniq va yetarli hajmda motor moyi",
  "Moy filtrini almashtirish",
  "Havo filtrini almashtirish",
  "Salon filtrini almashtirish",
  "Bonus: avtomobil ustki qismini bepul avtomoyka"
];

const YEARLY_BENEFITS = [
  "Million km oila a'zolari safiga qo'shilasiz",
  "Maxsus oilaviy futbolka sovg'a",
  "1 000 000 km gacha muammosiz yurish kafolati",
  "Shukurullohon Abdumalikov bilan 12 marta jonli efir"
];

const BRAND_LOGOS = {
  "chevrolet": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo.png/1200px-Chevrolet-logo.png",
  "kia": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Kia_logo.svg/2560px-Kia_logo.svg.png",
  "liauto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Li_Auto_logo.png/1200px-Li_Auto_logo.png"
};

// --- SERVICES ---
const TG_TOKEN = "7722483735:AAG_LZ1Bg0H-mnqAlnw4OknNj-BTrqM8CWM";
const TG_CHAT_ID = "-1003461463026";

const sendTelegramNotification = async (message) => {
  const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });
    return response.ok;
  } catch (error) {
    console.error("Telegram Notification Error:", error);
    return false;
  }
};

const sendLeadToTelegram = async (data) => {
  const message = `
<b>🚨 YANGI AI MUROJAAT (LEAD)</b>

<b>👤 Mijoz:</b> ${data.name}
<b>📞 Tel:</b> ${data.phone}
<b>🚗 Avto:</b> ${data.model}
<b>🔢 Davlat raqami:</b> <code>${data.carPlate}</code>
<b>📊 Probeg:</b> ${data.mileage} KM
<b>🛠 Muammo tavsifi:</b> 
<i>"${data.problem}"</i>

------------------------------
Xabar AI mexanik orqali qabul qilindi.
  `;
  return await sendTelegramNotification(message);
};

// --- COMPONENTS ---

const Navbar = ({ currentView, setView, user, onLogout, onLoginClick }) => {
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
    <>
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

const Hero = ({ onStart }) => {
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

const MobileService = ({ type, user, onOrder, onOpenAuth }) => {
  const [formData, setFormData] = React.useState({ name: user?.name || '', phone: user?.phone || '', location: '', note: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      onOpenAuth();
      return;
    }
    if (!formData.phone || !formData.location) {
      alert("Iltimos, telefon va manzilni kiriting");
      return;
    }
    onOrder({
      userName: formData.name,
      phone: formData.phone,
      serviceType: type === 'express' ? 'EXPRESS XIZMAT' : 'YOQILG\'I YETKAZISH',
      note: `Manzil: ${formData.location}. Izoh: ${formData.note}`
    });
    setFormData({ ...formData, location: '', note: '' });
  };

  const isExpress = type === 'express';

  return (
    <div className="max-w-6xl mx-auto px-4 pt-40 pb-20">
      <div className={`p-10 md:p-24 rounded-[4rem] text-white shadow-2xl relative overflow-hidden transition-all duration-1000 ${isExpress ? 'bg-slate-900' : 'bg-[#FF3B30]'}`}>
        <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl ${isExpress ? 'bg-blue-600' : 'bg-white text-[#FF3B30]'}`}>
              <i className={`fas ${isExpress ? 'fa-bolt' : 'fa-gas-pump'} text-4xl`}></i>
            </div>
            <h1 className="text-6xl font-black mb-8 leading-tight tracking-tighter">
              Million KM <br /> {isExpress ? 'Express' : 'Fuel'}
            </h1>
            <p className="text-white/60 text-xl mb-12 leading-relaxed font-medium">
              {isExpress 
                ? "Vaqtingizni qadrlaymiz. Mutaxassislarimiz manzilingizga borib, motor moyini professional tarzda almashtirib berishadi."
                : "Yoqilg'ingiz tugab qoldimi? Xavotir olmang, biz eng yuqori sifatli yoqilg'ini 30 daqiqada yetkazamiz."}
            </p>
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-2">
                 <div className="text-3xl font-black">30 DAQ</div>
                 <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Yetkazib berish</div>
               </div>
               <div className="space-y-2">
                 <div className="text-3xl font-black">24/7</div>
                 <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Mavjudlik</div>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl">
             <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-8">
                  <h3 className="text-3xl font-black text-slate-900 mb-2">Buyurtma</h3>
                  <p className="text-slate-400 text-sm font-medium">Barcha maydonlarni to'ldiring</p>
                </div>
                
                <div className="space-y-4">
                  <input 
                    className="w-full h-16 px-8 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-blue-500 text-slate-900 font-bold transition-all outline-none" 
                    placeholder="Ismingiz"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    className="w-full h-16 px-8 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-blue-500 text-slate-900 font-bold transition-all outline-none" 
                    placeholder="Telefon"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                  <input 
                    className="w-full h-16 px-8 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-blue-500 text-slate-900 font-bold transition-all outline-none" 
                    placeholder="Manzil (lokatsiya)"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                  />
                  <textarea 
                    className="w-full px-8 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-blue-500 text-slate-900 font-bold transition-all min-h-[120px] outline-none" 
                    placeholder="Izoh (Mashina modeli va qo'shimcha ma'lumot)"
                    value={formData.note}
                    onChange={e => setFormData({...formData, note: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className={`w-full py-6 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl active:scale-95 mt-4 ${isExpress ? 'bg-blue-600 hover:bg-slate-900 shadow-blue-100' : 'bg-[#FF3B30] hover:bg-slate-900 shadow-red-100'}`}
                >
                  Buyurtmani tasdiqlash
                </button>
             </form>
          </div>
        </div>

        <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      </div>
    </div>
  );
};

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 animate-fade-up">
      <div className="text-center mb-24 md:mb-32">
        <span className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] mb-6 block">Kompaniya haqida</span>
        <h1 className="text-4xl md:text-7xl font-extrabold text-[#1D1D1F] tracking-tight mb-8">Million KM — <br />Dvigatelingiz hayoti.</h1>
        <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium">
          Biz faqat moy almashtirmaymiz. Biz har bir mijozimizga ishonchli va xavfsiz haydash tajribasini yetkazamiz.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-32">
        <div className="bg-gray-50 p-12 rounded-[3rem] border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl mb-10 shadow-lg shadow-blue-100">
              <i className="fas fa-microchip"></i>
            </div>
            <h3 className="text-3xl font-extrabold mb-6 tracking-tight">Texnologik Yondashuv</h3>
            <p className="text-gray-500 leading-relaxed font-medium text-lg">
              Raqamli monitoring va AI yordamida har bir xizmatni soniya aniqligida nazorat qilamiz. Sizning ma'lumotlaringiz doimo saqlanadi.
            </p>
          </div>
        </div>
        <div className="bg-gray-50 p-12 rounded-[3rem] border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center text-xl mb-10 shadow-lg shadow-gray-200">
              <i className="fas fa-gem"></i>
            </div>
            <h3 className="text-3xl font-extrabold mb-6 tracking-tight">Premium Standartlar</h3>
            <p className="text-gray-500 leading-relaxed font-medium text-lg">
              Faqat original moylar va filtrlar. Million KM Oil — bu sizning mashinangiz uchun xalqaro darajadagi servis sifati.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-black rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden group">
        <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">O'zbekiston bo'ylab 100+ jamoa.</h2>
            <p className="text-white/50 text-xl leading-relaxed mb-12 font-medium">
              Bizning muhandislar har yili Germaniya va Koreya standartlari asosida malaka oshirishadi. Biz faqat eng yaxshilarini tanlaymiz.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="flex -space-x-4">
                   {[1,2,3,4].map(i => <div key={i} className="w-14 h-14 rounded-full border-4 border-black bg-gray-800 flex items-center justify-center text-xs font-bold text-white/50">M{i}</div>)}
                </div>
                <div className="text-sm font-bold tracking-widest text-blue-400 uppercase">Bizga qo'shiling</div>
              </div>
              
              <div className="flex items-center space-x-4">
                 <a href="#" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                    <i className="fab fa-instagram text-2xl"></i>
                 </a>
                 <a href="#" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                    <i className="fab fa-telegram-plane text-2xl"></i>
                 </a>
                 <a href="#" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                    <i className="fab fa-youtube text-2xl"></i>
                 </a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
             <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-colors">
               <div className="text-5xl font-extrabold mb-2 text-blue-400 tracking-tighter">25k+</div>
               <div className="text-white/30 text-xs font-black uppercase tracking-[0.2em]">Baxtli mijozlar</div>
             </div>
             <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-colors">
               <div className="text-5xl font-extrabold mb-2 text-white tracking-tighter">10+</div>
               <div className="text-white/30 text-xs font-black uppercase tracking-[0.2em]">Viloyatlarda mavjud</div>
             </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/10 blur-[120px] rounded-full group-hover:bg-blue-600/20 transition-all duration-1000"></div>
      </div>
    </div>
  );
};

const NearestLocations = () => {
  return (
    <div id="locations" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1d1d1f] tracking-tight mb-4">Million km filiallari</h2>
        <p className="text-gray-500 font-medium text-lg italic">O'zbekiston bo'ylab premium servis tarmog'i</p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-3 border border-slate-100 shadow-2xl overflow-hidden mb-12 relative group">
        <div className="aspect-video w-full rounded-[2rem] overflow-hidden transition-all duration-700">
          <iframe 
            src="https://yandex.uz/map-widget/v1/?ll=70.893061,40.546387&z=15&l=map&pt=70.893061,40.546387,pm2rdm" 
            width="100%" 
            height="100%" 
            frameBorder="0"
            title="Million KM Locations Map"
            className="rounded-[2rem]"
          ></iframe>
        </div>
        <div className="absolute top-8 right-8 bg-black text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl">
          Jonli Xarita
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-gray-100/50 flex flex-col justify-between group hover:border-blue-600 transition-all duration-300">
          <div className="flex items-center space-x-5 mb-6">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div>
              <h4 className="font-black text-xl text-slate-900 tracking-tight">Markaziy Filial</h4>
              <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest">Bosh ofis</p>
            </div>
          </div>
          <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6">
            Farg'ona viloyati, Dang'ara tumani, <br /> 
            Yangizamon MFY, Sayxunobod 1-o'tish yo'li, 65-uy.
          </p>
          <div className="flex items-center text-blue-600 font-bold text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform cursor-pointer">
            Yo'nalish olish <i className="fas fa-arrow-right ml-2 text-[10px]"></i>
          </div>
        </div>

        <div className="p-8 bg-blue-600 rounded-[2.5rem] flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-slate-900 transition-all duration-500 shadow-2xl shadow-blue-200">
          <div className="w-16 h-16 bg-white/20 text-white rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
            <i className="fas fa-plus"></i>
          </div>
          <h4 className="font-black text-2xl text-white tracking-tight mb-2">Qolgan filiallar</h4>
          <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">Tez orada butun Respublika bo'ylab</p>
        </div>

        <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-gray-100/50 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
            <i className="fas fa-phone-volume"></i>
          </div>
          <h4 className="font-black text-xl text-slate-900 tracking-tight mb-2">Markaziy aloqa</h4>
          <p className="text-gray-400 font-bold text-lg">+998 77 020 01 07</p>
          <div className="mt-4 flex space-x-3">
             <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"><i className="fab fa-telegram-plane"></i></div>
             <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all cursor-pointer"><i className="fab fa-instagram"></i></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickServices = ({ onSelect }) => {
  return (
    <div className="py-10 px-4">
      <div className="mb-12 md:mb-20">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-[#1D1D1F]">Talab bo'yicha</h2>
        <p className="text-lg md:text-xl text-gray-500 font-medium">Siz qayerda bo'lsangiz, biz o'sha yerda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        <div 
          onClick={() => onSelect('express')}
          className="ios-card group relative min-h-[420px] md:h-[520px] squircle overflow-hidden cursor-pointer bg-[#1C1C1E] transition-all duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative h-full p-10 md:p-12 flex flex-col justify-between z-10 text-white">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-600 rounded-[20px] md:rounded-[22px] flex items-center justify-center text-2xl md:text-3xl shadow-2xl transition-transform duration-500 group-hover:scale-110">
              <i className="fas fa-bolt"></i>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tighter leading-none">Express <br/> Xizmat</h3>
              <p className="text-white/60 font-medium text-base md:text-lg leading-snug mb-8">Sizning manzilingizda professional moy almashtirish. Tez, toza, ishonchli.</p>
              <span className="inline-flex items-center text-blue-400 font-bold uppercase tracking-widest text-[10px]">
                Hozir so'rash <i className="fas fa-chevron-right ml-3 text-[10px]"></i>
              </span>
            </div>
          </div>
        </div>

        <div 
          onClick={() => onSelect('fuel')}
          className="ios-card group relative min-h-[420px] md:h-[520px] squircle overflow-hidden cursor-pointer bg-[#FF3B30] transition-all duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <div className="relative h-full p-10 md:p-12 flex flex-col justify-between z-10 text-white">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white text-[#FF3B30] rounded-[20px] md:rounded-[22px] flex items-center justify-center text-2xl md:text-3xl shadow-2xl transition-transform duration-500 group-hover:scale-110">
              <i className="fas fa-gas-pump"></i>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tighter leading-none">Shoshilinch <br/> Yoqilg'i</h3>
              <p className="text-white/80 font-medium text-base md:text-lg leading-snug mb-8">Yoqilg'i tugab qoldimi? Biz 30 daqiqa ichida yuqori sifatli yoqilg'i yetkazamiz.</p>
              <span className="inline-flex items-center text-white font-bold uppercase tracking-widest text-[10px]">
                Buyurtma berish <i className="fas fa-chevron-right ml-3 text-[10px]"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Benefits = () => {
  const benefitList = [
    {
      title: "1. Million kilometrgacha kafolat — bozorda yagona!",
      desc: "Avtomobilingizga million kmgacha texnik kafolat beramiz. Bu — sifatimizga va jamoamizga bo‘lgan to‘liq ishonchimiz natijasi.",
      icon: "fa-shield-heart"
    },
    {
      title: "2. Har safar moy almashtirishda — bepul avtomoyka",
      desc: "Mashinangiz nafaqat texnik jihatdan, balki tashqi ko‘rinishda ham doim silliq va toza bo‘ladi.",
      icon: "fa-droplet"
    },
    {
      title: "3. Faqat eng yuqori sifatdagi mahsulotlar",
      desc: "Bizda faqat isbotlangan, sertifikatlangan va original mahsulotlar ishlatiladi. Sifat — muqaddas!",
      icon: "fa-award"
    },
    {
      title: "4. Har qanday muammo — bitta joyda hal",
      desc: "Endi turli joylarga yugurish shart emas. Diagnostika, ta’mirlash, xizmat — hammasi bizda.",
      icon: "fa-screwdriver-wrench"
    },
    {
      title: "5. O‘zbekiston bo‘ylab eng tezkor servis tarmog‘i",
      desc: "Qayerda bo‘lishingizdan qat’i nazar, xizmatimiz sizga yaqin va har doim tayyor.",
      icon: "fa-map-location-dot"
    },
    {
      title: "6. Eng tajribali ustalar — Million km jamoasida",
      desc: "Avtomobilingizni oddiy qo‘lga emas, o‘z ishining haqiqiy ustasiga topshiring.",
      icon: "fa-user-gear"
    },
    {
      title: "7. Har yili — bepul to‘liq diagnostika",
      desc: "Yilga bir marta avtomobilingiz sog‘ligini to‘liq tekshirtiring. Oldini olish — muhimroq!",
      icon: "fa-clipboard-check"
    },
    {
      title: "8. Express xizmatlar — vaqt sizniki!",
      desc: "Tez, aniq, professional. Ortiqcha kutish — endi o‘tmishda qoldi.",
      icon: "fa-bolt-lightning"
    },
    {
      title: "9. Avtomobil holatini kuzatish — shaxsiy tizim",
      desc: "Online monitoring orqali mashinangizni masofadan nazorat qilish imkoniyati.",
      icon: "fa-mobile-screen-button"
    },
    {
      title: "10. Masofaviy diagnostika va yordam",
      desc: "Qanday muammo bo‘lishidan qat’i nazar, sizga telefon orqali professional yordam beramiz.",
      icon: "fa-headset"
    },
    {
      title: "11. Har yangi mijozga — original futbolka sovg‘a",
      desc: "Siz faqat xizmat emas, katta bir professionallar jamiyatining bir qismiga aylanasiz.",
      icon: "fa-shirt"
    },
    {
      title: "12. Doimiy mijozlarga — bonuslar va chegirmalar",
      desc: "Aqlli xizmat, doimiy sadoqat tizimi va kutilmagan bonuslar bilan birga.",
      icon: "fa-percent"
    }
  ];

  return (
    <div className="py-24 bg-white rounded-[4rem] border border-slate-50 shadow-sm overflow-hidden">
      <div className="text-center mb-20 px-6">
        <span className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4 block animate-fade-up">Nega biz?</span>
        <h2 className="text-4xl md:text-6xl font-extrabold text-[#1d1d1f] mb-8 tracking-tight animate-fade-up">
          Nega aynan Million km xizmatini tanlashingiz kerak?
        </h2>
        <p className="text-gray-500 font-medium max-w-3xl mx-auto text-xl leading-relaxed animate-fade-up delay-100">
          Chunki biz shunchaki avtomobilga xizmat ko'rsatmaymiz — sizga ishonch, kafolat va qulaylik hadya qilamiz. Quyidagi <span className="text-blue-600 font-bold">12 sababi</span> esa buni isbotlaydi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12">
        {benefitList.map((b, idx) => (
          <div 
            key={idx} 
            className="p-10 bg-slate-50/50 rounded-[2.5rem] hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-slate-100 group flex flex-col h-full animate-in"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl text-blue-600 mb-8 shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <i className={`fas ${b.icon}`}></i>
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#1d1d1f] leading-tight group-hover:text-blue-600 transition-colors">{b.title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed flex-grow text-sm">{b.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-24 text-center px-6">
        <div className="inline-block p-8 bg-black rounded-[2.5rem] text-white max-w-4xl shadow-2xl">
          <p className="text-lg md:text-xl font-medium leading-relaxed italic opacity-90 mb-4">
            "Million km — bu sizning yutug'ingiz! O'z vaqtida xizmat ko'rsatish — buzilishdan qutqaradi. 
            Buzilishning oldini olish — xarajat emas, eng katta tejashdir."
          </p>
          <div className="text-blue-400 font-bold uppercase tracking-widest text-xs">Sizning ertangi kuningizga investitsiya</div>
        </div>
      </div>
    </div>
  );
};

const IOSDropdown = ({ label, options, value, onChange, disabled, placeholder }) => {
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

const StatusChecker = ({ showToast, onRegister, onOneTime }) => {
  const [brand, setBrand] = React.useState('');
  const [model, setModel] = React.useState('');
  const [year, setYear] = React.useState('');
  const [km, setKm] = React.useState('');
  const [result, setResult] = React.useState({ status: null, message: '' });

  const handleCheck = () => {
    if (!brand || !model || !year || !km) {
      showToast("Ma'lumotlar to'liq emas", "error");
      return;
    }
    const limits = CAR_DATA[brand.toLowerCase()]?.[model];
    if (!limits) {
      setResult({ status: 'not_eligible', message: "Bu model hali tizimda mavjud emas." });
      return;
    }
    const currentYear = new Date().getFullYear();
    const carAge = currentYear - parseInt(year);
    const carKm = parseInt(km.replace(/\D/g, ''));
    
    if (carAge <= limits.maxAge && carKm <= limits.maxKm) {
      setResult({ status: 'eligible', message: "Mashina Million KM dasturiga mos keladi" });
    } else {
      setResult({ status: 'not_eligible', message: "Chegaraviy limitlardan oshib ketgan" });
    }
  };

  return (
    <div id="status" className="bg-white p-8 md:p-20 squircle border border-gray-100 shadow-xl text-center mx-4 md:mx-0">
      <div className="mb-10 md:mb-16">
        <span className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4 block">Dvigatel intellekti</span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Statusni tekshirish</h2>
        <p className="text-sm md:text-lg text-gray-400 font-medium mt-3 md:mt-4">Kafolatga mosligini aniqlang.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
        <div className="space-y-6">
          <IOSDropdown label="Brend" placeholder="Brendni tanlang" options={Object.keys(CAR_DATA)} value={brand} onChange={v => {setBrand(v); setModel('');}} />
          <IOSDropdown label="Model" placeholder="Modelni tanlang" disabled={!brand} options={brand ? Object.keys(CAR_DATA[brand.toLowerCase()]) : []} value={model} onChange={setModel} />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 block">Yili</label>
            <input type="number" placeholder="2022" value={year} onChange={e => setYear(e.target.value)} className="w-full h-14 md:h-16 px-6 rounded-2xl bg-gray-50 font-bold border-none outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 block">Yurgan masofasi (KM)</label>
            <input type="text" placeholder="45 000" value={km} onChange={e => setKm(e.target.value)} className="w-full h-14 md:h-16 px-6 rounded-2xl bg-gray-50 font-bold border-none outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base" />
          </div>
        </div>
      </div>

      <button onClick={handleCheck} className="w-full md:w-auto mt-10 md:mt-16 px-12 md:px-20 py-4 md:py-5 bg-black text-white rounded-[18px] md:rounded-[22px] font-bold text-xs md:text-sm uppercase tracking-widest tap-active shadow-2xl">
        Tahlilni boshlash
      </button>

      {result.status && (
        <div className={`mt-10 md:mt-16 p-8 md:p-12 squircle border animate-spring ${result.status === 'eligible' ? 'bg-blue-50/40 border-blue-100' : 'bg-red-50/40 border-red-100'}`}>
          <h3 className={`text-xl md:text-2xl font-extrabold mb-4 tracking-tight ${result.status === 'eligible' ? 'text-blue-900' : 'text-red-900'}`}>{result.message}</h3>
          <p className="text-xs md:text-base text-gray-500 font-medium mb-8 md:mb-10 leading-relaxed">{result.status === 'eligible' ? 'Sizning avtomobilingiz barcha texnik talablariga javob beradi.' : 'Standart kafolat mavjud bo\'lmasa-da, boshqa xizmatlarimiz mavjud.'}</p>
          <button 
            onClick={result.status === 'eligible' ? onRegister : () => onOneTime(brand, model)}
            className={`w-full md:w-auto px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] tap-active ${result.status === 'eligible' ? 'bg-blue-600 text-white' : 'bg-black text-white'}`}
          >
            {result.status === 'eligible' ? 'Kafolatni faollashtirish' : 'Xizmatga yozilish'}
          </button>
        </div>
      )}
    </div>
  );
};

const BrandGrid = ({ user, onOrder, onOpenAuth }) => {
  const [selectedBrand, setSelectedBrand] = React.useState(null);
  const [selectedModel, setSelectedModel] = React.useState(null);
  const [tariffType, setTariffType] = React.useState(null);
  const [yearlyCount, setYearlyCount] = React.useState(3);
  
  const modelsRef = React.useRef(null);
  const checkoutRef = React.useRef(null);

  React.useEffect(() => {
    if (selectedBrand && modelsRef.current) {
      setTimeout(() => modelsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    }
  }, [selectedBrand]);

  React.useEffect(() => {
    if (selectedModel && checkoutRef.current) {
      setTimeout(() => checkoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    }
  }, [selectedModel]);

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setTariffType(null);
  };

  const calculateYearlyPrice = (basePrice, count) => {
    return basePrice * count;
  };

  const submitOrder = () => {
    if (!user) return onOpenAuth();
    if (!selectedBrand || !selectedModel || !tariffType) return;

    const basePrice = CAR_DATA[selectedBrand.toLowerCase()][selectedModel].priceOneTime;
    const finalPrice = tariffType === 'one-time' ? basePrice : calculateYearlyPrice(basePrice, yearlyCount);

    onOrder({
      brand: selectedBrand,
      model: selectedModel,
      serviceType: tariffType === 'one-time' ? '1 MARTALIK XIZMAT' : `1 YILLIK TARIF (${yearlyCount} marta)`,
      tariffType,
      servicesCount: tariffType === 'one-time' ? 1 : yearlyCount,
      totalPrice: finalPrice,
      note: `Tanlangan xizmat: ${tariffType === 'one-time' ? 'Bir martalik' : 'Yillik'}. Jami narx: ${finalPrice.toLocaleString()} UZS.`
    });

    setSelectedModel(null);
    setTariffType(null);
  };

  return (
    <div className="py-10">
      <div className="mb-12 md:mb-20 px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-[#1D1D1F]">Brendlar</h2>
        <p className="text-lg md:text-xl text-gray-500 font-medium">Faqat eng sara avtomobillar uchun.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
        {Object.keys(CAR_DATA).map((brand) => (
          <div 
            key={brand}
            onClick={() => { setSelectedBrand(brand); setSelectedModel(null); }}
            className={`ios-card bg-white/60 backdrop-blur-xl p-8 md:p-12 squircle border border-white/50 cursor-pointer flex flex-col items-center group ${selectedBrand === brand ? 'ring-4 ring-blue-500/20 shadow-2xl scale-[1.02]' : ''}`}
          >
            <div className="h-20 md:h-28 w-full flex items-center justify-center mb-6 md:mb-10 transition-transform duration-500 group-hover:scale-110">
              <img src={BRAND_LOGOS[brand]} alt={brand} className="max-h-full object-contain" />
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold capitalize mb-6 md:mb-8">{brand === 'liauto' ? 'Li Auto' : brand}</h3>
            <button className="w-full md:w-auto px-8 py-3 bg-gray-100 text-gray-900 text-[10px] md:text-[11px] font-bold uppercase tracking-widest rounded-full transition-all group-hover:bg-blue-600 group-hover:text-white">
              Modellarni ko'rish
            </button>
          </div>
        ))}
      </div>

      {selectedBrand && (
        <div ref={modelsRef} className="mt-12 md:mt-20 p-8 md:p-20 bg-black md:squircle text-white animate-spring relative overflow-hidden shadow-2xl rounded-[2.5rem] md:rounded-[36px] mx-4 md:mx-0">
          <div className="absolute top-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-blue-500/10 blur-[60px] md:blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-12 md:mb-20">
            <div>
              <span className="text-blue-400 font-bold uppercase tracking-[0.2em] text-[9px] md:text-[10px] mb-3 block">Premium Tanlov</span>
              <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight capitalize">{selectedBrand === 'liauto' ? 'Li Auto' : selectedBrand} To'plami</h3>
            </div>
            <button onClick={() => {setSelectedBrand(null); setSelectedModel(null);}} className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center tap-active hover:bg-white/20 transition-all">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(CAR_DATA[selectedBrand]).map(([model, info]) => (
              <div 
                key={model} 
                onClick={() => handleModelSelect(model)}
                className={`bg-white/5 p-8 md:p-10 squircle border transition-all ios-card cursor-pointer flex flex-col ${selectedModel === model ? 'border-blue-500 bg-white/10 ring-2 ring-blue-500/20' : 'border-white/10 hover:bg-white/10'}`}
              >
                <div className="flex justify-between items-start mb-6 md:mb-8">
                  <h4 className="text-xl md:text-2xl font-extrabold tracking-tight">{model}</h4>
                  <span className="bg-blue-500/20 text-blue-400 text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">Tanlash</span>
                </div>
                <p className="text-white/40 text-sm font-medium mb-10 md:mb-12 italic leading-snug">"{info.desc}"</p>
                <div className="mt-auto pt-6 md:pt-8 border-t border-white/10 flex justify-between items-end">
                  <span className="text-[9px] md:text-[10px] text-white/30 font-bold uppercase tracking-widest">Bazaviy narx</span>
                  <span className="text-xl md:text-2xl font-black text-blue-400">{info.priceOneTime.toLocaleString()} <span className="text-xs">uzs</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedModel && selectedBrand && (
        <div ref={checkoutRef} className="mt-12 md:mt-20 p-8 md:p-20 bg-white md:squircle border border-gray-100 shadow-2xl animate-spring rounded-[2.5rem] md:rounded-[36px] mx-4 md:mx-0">
          <div className="text-center mb-12 md:mb-20">
            <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block">Xizmat Turini Tanlang</span>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">{selectedBrand} {selectedModel}</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20">
            {/* One Time Choice */}
            <div 
              onClick={() => setTariffType('one-time')}
              className={`p-8 md:p-10 squircle border-2 transition-all cursor-pointer flex flex-col justify-between ${tariffType === 'one-time' ? 'border-blue-600 bg-blue-50/20' : 'border-gray-100 bg-gray-50/50'}`}
            >
              <div>
                <h4 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tighter">1 MARTALIK XIZMAT</h4>
                <p className="text-sm md:text-base text-gray-500 mb-8 font-medium">Faqat hozir moy almashtirib olishni xohlaydiganlar uchun.</p>
                <ul className="space-y-4 mb-10">
                   {['Modelga mos moy', 'Original filtrlar', 'Dvigatel nazorati', 'Bepul avtomoyka'].map(i => (
                     <li key={i} className="flex items-center text-xs md:text-sm font-bold text-gray-700">
                       <i className="fas fa-check-circle text-blue-500 mr-3"></i> {i}
                     </li>
                   ))}
                   <li className="flex items-center text-xs md:text-sm font-bold text-red-400 pt-4 border-t border-gray-200/50 mt-4">
                     <i className="fas fa-times-circle mr-3"></i> Million KM kafolati yo'q
                   </li>
                </ul>
              </div>
              <div className="text-2xl md:text-3xl font-black text-slate-900">{CAR_DATA[selectedBrand.toLowerCase()][selectedModel].priceOneTime.toLocaleString()} <span className="text-xs">UZS</span></div>
            </div>

            {/* Yearly Choice */}
            <div 
              onClick={() => setTariffType('yearly')}
              className={`p-8 md:p-10 squircle border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${tariffType === 'yearly' ? 'border-blue-600 bg-blue-50/20' : 'border-gray-100 bg-gray-50/50'}`}
            >
              <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-blue-600 text-white text-[8px] md:text-[10px] font-black px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-widest shadow-lg">TAVSIYA ETILADI</div>
              <div>
                <h4 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tighter text-blue-600">1 YILLIK TARIF</h4>
                <p className="text-sm md:text-base text-gray-500 mb-8 font-medium italic leading-snug">"Dvigatelni ta’mirlash emas, saqlab qolish uchun"</p>
                <ul className="space-y-4 mb-10">
                   {[
                     'Har safar bepul avtomoyka', 
                     '1 000 000 KM kafolati', 
                     'Doimiy monitoring', 
                     'Telegram yopiq guruh'
                   ].map(i => (
                     <li key={i} className="flex items-center text-xs md:text-sm font-bold text-gray-800">
                       <i className="fas fa-star text-yellow-500 mr-3"></i> {i}
                     </li>
                   ))}
                </ul>
              </div>
              <div className="text-blue-600 font-black text-[10px] md:text-sm uppercase tracking-widest mb-2 flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span> Doimiy nazorat
              </div>
              <div className="text-2xl md:text-3xl font-black text-slate-900">Konfiguratsiya <i className="fas fa-arrow-down text-sm ml-2 text-blue-600"></i></div>
            </div>
          </div>

          {tariffType === 'yearly' && (
            <div className="bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 text-white mb-12 md:mb-20 animate-spring border border-white/5">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
                <div className="flex-1 text-center md:text-left w-full">
                  <h4 className="text-2xl md:text-3xl font-black mb-3 md:mb-4 tracking-tight">Xizmatlar soni</h4>
                  <p className="text-white/40 text-xs md:text-base font-medium mb-8 md:mb-10">Bir yillik rejangiz: 3–12 marta</p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4">
                    {[3,4,5,6,8,10,12].map(num => (
                      <button 
                        key={num}
                        onClick={() => setYearlyCount(num)}
                        className={`w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl font-black text-xs md:text-sm transition-all active:scale-95 ${yearlyCount === num ? 'bg-blue-600 text-white scale-110 shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="w-full md:w-[350px] bg-white/5 backdrop-blur-3xl rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border border-white/10 text-center relative overflow-hidden group">
                   <div className="text-[9px] md:text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3 md:mb-4">Jami Yillik To'lov</div>
                   <div className="text-3xl md:text-4xl font-black mb-2 tracking-tighter">
                     {calculateYearlyPrice(CAR_DATA[selectedBrand.toLowerCase()][selectedModel].priceOneTime, yearlyCount).toLocaleString()}
                   </div>
                   <div className="text-[8px] md:text-[10px] text-white/30 font-bold uppercase tracking-widest">
                     UZS / YILIGA
                   </div>
                   <div className="mt-6 pt-6 border-t border-white/10 flex justify-center items-center text-[10px] font-bold text-white/60">
                     <i className="fas fa-info-circle mr-2 text-blue-400"></i> Premium servislar ichida
                   </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center">
            <button 
              onClick={submitOrder}
              disabled={!tariffType}
              className={`w-full md:w-auto px-12 md:px-24 py-5 md:py-6 rounded-[18px] md:rounded-[22px] font-black uppercase tracking-[0.2em] text-[12px] md:text-sm transition-all shadow-2xl active:scale-95 disabled:opacity-30 ${tariffType === 'yearly' ? 'bg-blue-600 text-white' : 'bg-black text-white'}`}
            >
              {tariffType === 'yearly' ? 'Tasdiqlash' : 'Band qilish'}
            </button>
            <p className="mt-6 md:mt-8 text-gray-400 text-[10px] font-bold uppercase tracking-widest text-center max-w-xs md:max-w-md">
              {tariffType === 'yearly' 
                ? "Yillik tarif — muammoning oldini oladi." 
                : "1 martalik xizmat — muammoni hozircha hal qiladi."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const Cabinet = ({ user, showToast, onOrder }) => {
  const [cars, setCars] = React.useState([
    { 
      id: 'c1', 
      userUid: user.uid, 
      brand: 'Chevrolet', 
      model: 'Cobalt', 
      year: 2022, 
      lastOilKm: 42000, 
      dailyKm: 45, 
      createdAt: new Date().toISOString() 
    }
  ]);

  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [newCar, setNewCar] = React.useState({ brand: '', model: '', year: '', lastOil: '', daily: '' });
  const [displayLastOil, setDisplayLastOil] = React.useState('');
  const [displayDaily, setDisplayDaily] = React.useState('');

  const formatWithSpaces = (val) => {
    const raw = val.replace(/\D/g, '');
    return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const addCar = () => {
    if (!newCar.brand || !newCar.model || !newCar.year || !newCar.lastOil) {
      showToast("Iltimos, barcha maydonlarni to'ldiring", 'error');
      return;
    }
    const car = {
      id: Math.random().toString(36).substr(2, 9),
      userUid: user.uid,
      brand: newCar.brand,
      model: newCar.model,
      year: parseInt(newCar.year),
      lastOilKm: parseInt(newCar.lastOil),
      dailyKm: parseInt(newCar.daily) || 30,
      createdAt: new Date().toISOString()
    };
    setCars([...cars, car]);
    setIsAddOpen(false);
    setNewCar({ brand: '', model: '', year: '', lastOil: '', daily: '' });
    setDisplayLastOil('');
    setDisplayDaily('');
    showToast("Mashina garajga qo'shildi!", 'success');
  };

  const requestService = (car) => {
    onOrder({
      brand: car.brand,
      model: car.model,
      serviceType: 'Garajdan xizmat so\'rovi',
      note: `Garajdan so'rov: ${car.lastOilKm} km da oxirgi moy almashtirilgan.`
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-white rounded-[2.5rem] p-10 md:p-14 border border-slate-100 card-shadow mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Shaxsiy profil boshqaruvi</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Salom, {user.name}!</h1>
            <p className="text-slate-500 mt-2 font-medium">Barcha avtomobillaringiz holati bir joyda.</p>
          </div>
          <button 
            onClick={() => setIsAddOpen(true)}
            className="group bg-slate-900 text-white px-8 py-4.5 rounded-[1.25rem] font-bold shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all flex items-center active:scale-95"
          >
            <i className="fas fa-plus mr-3 group-hover:rotate-90 transition-transform"></i> 
            Yangi mashina
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {cars.map(car => {
          const serviceInterval = 8000;
          const nextServiceKm = car.lastOilKm + serviceInterval;
          const drivenSinceLast = 2100; 
          const remainingKm = serviceInterval - drivenSinceLast;
          const progress = (drivenSinceLast / serviceInterval) * 100;
          const daysToService = Math.max(1, Math.ceil(remainingKm / car.dailyKm));

          return (
            <div key={car.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 card-shadow hover:translate-y-[-4px] transition-all group">
              <div className="p-10">
                <div className="flex justify-between items-start mb-12">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      <i className="fas fa-car-side"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{car.brand} {car.model}</h3>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">{car.year}-yil • {car.lastOilKm.toLocaleString()} km</p>
                    </div>
                  </div>
                  <div className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-100">
                    Xavfsiz haydash
                  </div>
                </div>

                <div className="space-y-12">
                  <div>
                    <div className="flex justify-between items-end mb-4">
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Keyingi servisgacha</span>
                        <span className="text-3xl font-black text-slate-900 tracking-tight">{remainingKm.toLocaleString().replace(/,/g, ' ')} KM</span>
                      </div>
                      <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">~{daysToService} kun</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${progress > 80 ? 'bg-red-500' : 'bg-blue-600'}`} 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50/50 p-6 rounded-[1.5rem] border border-slate-50">
                      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-2 text-center">Xizmat chegarasi</div>
                      <div className="text-lg font-extrabold text-slate-900 text-center">{nextServiceKm.toLocaleString().replace(/,/g, ' ')} km</div>
                    </div>
                    <div className="bg-slate-50/50 p-6 rounded-[1.5rem] border border-slate-50">
                      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-2 text-center">Kunlik yurish</div>
                      <div className="text-lg font-extrabold text-slate-900 text-center">{car.dailyKm} km</div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-10 border-t border-slate-50 flex space-x-4">
                   <button 
                    onClick={() => requestService(car)}
                    className="flex-1 py-4.5 bg-slate-900 text-white rounded-[1rem] font-bold uppercase tracking-widest text-[11px] hover:bg-blue-600 transition-all shadow-xl shadow-slate-100"
                   >
                     Servisga yozilish
                   </button>
                   <button className="w-14 h-14 bg-slate-50 text-slate-400 rounded-[1rem] flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all">
                     <i className="fas fa-trash-alt"></i>
                   </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
           <div className="bg-white rounded-[3rem] p-12 w-full max-w-lg shadow-2xl relative animate-in zoom-in duration-300">
              <button onClick={() => setIsAddOpen(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition-colors">
                <i className="fas fa-times text-2xl"></i>
              </button>
              <h2 className="text-2xl font-extrabold mb-10 text-slate-900 tracking-tight">Mashina qo'shish</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 font-semibold text-slate-900 transition-all outline-none" 
                    placeholder="Brend" 
                    value={newCar.brand}
                    onChange={e => setNewCar({...newCar, brand: e.target.value})}
                  />
                  <input 
                    className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 font-semibold text-slate-900 transition-all outline-none" 
                    placeholder="Model" 
                    value={newCar.model}
                    onChange={e => setNewCar({...newCar, model: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="number"
                    className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 font-semibold text-slate-900 transition-all outline-none" 
                    placeholder="Yili" 
                    value={newCar.year}
                    onChange={e => setNewCar({...newCar, year: e.target.value})}
                  />
                  <input 
                    type="text"
                    className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 font-semibold text-slate-900 transition-all outline-none" 
                    placeholder="Moy km (masalan: 40 000)" 
                    value={displayLastOil}
                    onChange={e => {
                      const raw = e.target.value.replace(/\D/g, '');
                      setNewCar({...newCar, lastOil: raw});
                      setDisplayLastOil(formatWithSpaces(raw));
                    }}
                  />
                </div>
                <input 
                  type="text"
                  className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 font-semibold text-slate-900 transition-all outline-none" 
                  placeholder="Kunlik yurish (km)" 
                  value={displayDaily}
                  onChange={e => {
                    const raw = e.target.value.replace(/\D/g, '');
                    setNewCar({...newCar, daily: raw});
                    setDisplayDaily(formatWithSpaces(raw));
                  }}
                />
                <button 
                  onClick={addCar}
                  className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-slate-900 transition-all shadow-xl shadow-blue-50 mt-6"
                >
                  Saqlash
                </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const Admin = ({ orders }) => {
  const uniqueClients = new Set(orders.map(o => o.phone)).size;
  const totalOrders = orders.length;
  
  const todayStr = new Date().toLocaleDateString('uz-UZ');
  const todayOrders = orders.filter(o => o.timestamp.includes(todayStr)).length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Tizim Boshqaruvi</div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Admin Boshqaruvi</h1>
        </div>
        <div className="flex items-center bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm font-bold text-sm">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse mr-3"></span>
          Jonli monitoring faol
        </div>
      </div>
      
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 card-shadow overflow-hidden">
            <div className="p-10 border-b border-slate-50 flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center">
                <i className="fas fa-stream mr-4 text-blue-600 opacity-50"></i> Oxirgi kelgan so'rovlar
              </h2>
              <span className="text-xs font-bold text-slate-400">{orders.length} ta jami</span>
            </div>
            
            <div className="overflow-x-auto">
              {orders.length === 0 ? (
                <div className="py-32 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl mx-auto mb-6 flex items-center justify-center text-slate-200">
                    <i className="fas fa-inbox text-2xl"></i>
                  </div>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Hozircha buyurtmalar yo'q</p>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-10 py-5 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Mijoz</th>
                      <th className="px-10 py-5 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Transport</th>
                      <th className="px-10 py-5 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Xizmat</th>
                      <th className="px-10 py-5 font-bold text-slate-400 text-[10px] uppercase tracking-widest text-right">Amal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-10 py-6">
                          <div className="font-extrabold text-slate-900 text-sm">{order.userName}</div>
                          <div className="text-[11px] text-blue-600 font-bold mt-1 tracking-wide">{order.phone}</div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="font-bold text-slate-700 text-sm">{order.brand} {order.model}</div>
                          <div className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-tight">{order.timestamp}</div>
                        </td>
                        <td className="px-10 py-6">
                          <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest">
                            {order.serviceType}
                          </span>
                        </td>
                        <td className="px-10 py-6 text-right">
                          <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all">
                            <i className="fas fa-arrow-right text-xs"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
             <div className="relative z-10 space-y-12">
               <div>
                 <div className="text-white/30 text-[9px] font-bold uppercase tracking-widest mb-4">Jami Mijozlar</div>
                 <div className="text-5xl font-black tracking-tighter">{uniqueClients}</div>
               </div>
               <div>
                 <div className="text-white/30 text-[9px] font-bold uppercase tracking-widest mb-4">Jami Buyurtmalar</div>
                 <div className="text-5xl font-black tracking-tighter">{totalOrders}</div>
               </div>
               <div>
                 <div className="text-white/30 text-[9px] font-bold uppercase tracking-widest mb-4">Bugungi</div>
                 <div className="text-5xl font-black tracking-tighter text-blue-400">{todayOrders}</div>
               </div>
             </div>
             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>
           </div>

           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 card-shadow">
              <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-[10px]">Eksport qilish</h3>
              <div className="grid grid-cols-2 gap-4">
                 <button className="p-6 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-all text-center">
                    <i className="fas fa-file-excel text-xl text-slate-300 mb-3 block"></i>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Excel</span>
                 </button>
                 <button className="p-6 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-all text-center">
                    <i className="fas fa-file-pdf text-xl text-slate-300 mb-3 block"></i>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">PDF</span>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const AIConsultant = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [step, setStep] = React.useState('welcome');
  const [isLoading, setIsLoading] = React.useState(false);
  
  const [data, setData] = React.useState({
    model: '',
    problem: '',
    name: '',
    phone: '',
    carPlate: '',
    mileage: ''
  });

  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [step, isOpen]);

  const handleNext = () => {
    if (step === 'welcome') setStep('model');
    else if (step === 'model' && data.model) setStep('problem');
    else if (step === 'problem' && data.problem) setStep('contact');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.phone) return;
    
    setIsLoading(true);
    const success = await sendLeadToTelegram(data);
    setIsLoading(false);
    
    if (success) {
      setStep('success');
      setTimeout(() => {
        setIsOpen(false);
        resetChat();
      }, 5000);
    }
  };

  const resetChat = () => {
    setStep('welcome');
    setData({ model: '', problem: '', name: '', phone: '', carPlate: '', mileage: '' });
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[200]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 md:w-16 md:h-16 bg-black text-white rounded-[22px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all border border-white/10 group"
        >
          <i className="fas fa-comment-dots text-xl md:text-2xl group-hover:rotate-12 transition-transform"></i>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-black animate-pulse"></span>
        </button>
      ) : (
        <div className="w-[calc(100vw-32px)] sm:w-[380px] md:w-[420px] bg-white rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col overflow-hidden animate-spring max-h-[85vh]">
          {/* Header */}
          <div className="p-5 md:p-6 bg-black text-white flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <i className="fas fa-headset text-sm"></i>
              </div>
              <div>
                <h4 className="font-bold text-xs md:text-sm tracking-tight">Million KM Support</h4>
                <div className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Operator Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
              <i className="fas fa-times text-xs"></i>
            </button>
          </div>

          {/* Chat Body */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 ios-scroll bg-gray-50/30">
            
            {/* Step: Messages */}
            <div className="space-y-6">
              {/* Bot: Welcome */}
              <div className="flex justify-start animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="max-w-[85%] bg-white p-4 md:p-5 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm text-xs md:text-sm font-semibold text-slate-800 leading-relaxed">
                  Assalomu alaykum! Million KM servisiga xush kelibsiz. Biz bilan bog'lanish uchun bir nechta savolga javob bering.
                </div>
              </div>

              {/* Bot: Ask Model */}
              {(step === 'model' || step === 'problem' || step === 'contact' || step === 'success') && (
                <div className="flex justify-start animate-in fade-in slide-in-from-left-4 duration-500">
                  <div className="max-w-[85%] bg-white p-4 md:p-5 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm text-xs md:text-sm font-semibold text-slate-800">
                    Mashinangiz modelini yozing (masalan: Cobalt, Kia K5):
                  </div>
                </div>
              )}

              {/* User: Model Input UI */}
              {step === 'model' && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <input 
                    autoFocus
                    className="w-full h-12 md:h-14 px-5 bg-white border border-gray-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Avto modeli..."
                    value={data.model}
                    onChange={e => setData({...data, model: e.target.value})}
                    onKeyPress={e => e.key === 'Enter' && data.model && handleNext()}
                  />
                  <button onClick={handleNext} disabled={!data.model} className="w-full h-12 bg-black text-white rounded-xl font-bold text-[10px] uppercase tracking-widest disabled:opacity-20 transition-all active:scale-95">
                    Davom etish <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              )}

              {/* Bot: Ask Problem */}
              {(step === 'problem' || step === 'contact' || step === 'success') && (
                <div className="flex justify-start animate-in fade-in slide-in-from-left-4 duration-500">
                  <div className="max-w-[85%] bg-white p-4 md:p-5 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm text-xs md:text-sm font-semibold text-slate-800">
                    Muammoni qisqacha tushuntiring:
                  </div>
                </div>
              )}

              {/* User: Problem Input UI */}
              {step === 'problem' && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <textarea 
                    autoFocus
                    className="w-full p-5 bg-white border border-gray-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[100px] resize-none"
                    placeholder="Masalan: moy kamayishi, motor ovozi..."
                    value={data.problem}
                    onChange={e => setData({...data, problem: e.target.value})}
                  />
                  <button onClick={handleNext} disabled={!data.problem} className="w-full h-12 bg-black text-white rounded-xl font-bold text-[10px] uppercase tracking-widest disabled:opacity-20 transition-all active:scale-95">
                    Keyingi <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              )}

              {/* Bot: Ask Contact */}
              {(step === 'contact' || step === 'success') && (
                <div className="flex justify-start animate-in fade-in slide-in-from-left-4 duration-500">
                  <div className="max-w-[85%] bg-white p-4 md:p-5 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm text-xs md:text-sm font-semibold text-slate-800">
                    Ajoyib! Mutaxassis bog'lanishi uchun ma'lumotlarni qoldiring:
                  </div>
                </div>
              )}

              {/* User: Contact Form UI */}
              {step === 'contact' && (
                <form onSubmit={handleSubmit} className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="grid grid-cols-1 gap-3">
                    <input required className="w-full h-12 px-5 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ismingiz" value={data.name} onChange={e => setData({...data, name: e.target.value})} />
                    <input required type="tel" className="w-full h-12 px-5 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" placeholder="Telefon (901234567)" value={data.phone} onChange={e => setData({...data, phone: e.target.value})} />
                    <div className="grid grid-cols-2 gap-3">
                      <input className="w-full h-12 px-5 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" placeholder="Raqam" value={data.carPlate} onChange={e => setData({...data, carPlate: e.target.value})} />
                      <input type="number" className="w-full h-12 px-5 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" placeholder="Probeg" value={data.mileage} onChange={e => setData({...data, mileage: e.target.value})} />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 active:scale-95 transition-all mt-4"
                  >
                    {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : "YUBORISH"}
                  </button>
                </form>
              )}

              {/* Success State */}
              {step === 'success' && (
                <div className="text-center py-8 space-y-4 animate-in zoom-in duration-500">
                  <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-2xl mx-auto shadow-inner">
                    <i className="fas fa-check"></i>
                  </div>
                  <h3 className="text-lg font-black tracking-tight uppercase text-slate-900">Qabul qilindi!</h3>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                    Mutaxassisimiz tez orada siz bilan <br /> bog'lanadi.
                  </p>
                </div>
              )}
            </div>
            
            <div ref={scrollRef} />
          </div>

          {/* Footer Branding */}
          <div className="p-4 bg-white border-t border-gray-50 text-center shrink-0">
            <p className="text-[8px] font-bold text-gray-300 uppercase tracking-[0.3em]">Million KM Premium Intelligence</p>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [currentView, setCurrentView] = React.useState('home');
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [toast, setToast] = React.useState(null);

  const [loginForm, setLoginForm] = React.useState({ name: '', phone: '', password: '' });

  const showToast = React.useCallback((message, type = 'success') => {
    setToast({ message, type, isExiting: false });
    setTimeout(() => setToast(prev => prev ? { ...prev, isExiting: true } : null), 3500);
    setTimeout(() => setToast(null), 4000);
  }, []);

  React.useEffect(() => {
    const savedUser = localStorage.getItem('million_km_user');
    const savedOrders = localStorage.getItem('million_km_orders');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const addOrder = async (orderData) => {
    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      userName: orderData.userName || currentUser?.name || 'Mehmon',
      brand: orderData.brand || 'Nomaʼlum',
      model: orderData.model || 'Nomaʼlum',
      serviceType: orderData.serviceType || 'Xizmat',
      phone: orderData.phone || currentUser?.phone || '',
      note: orderData.note || '',
      timestamp: new Date().toLocaleString('uz-UZ'),
      tariffType: orderData.tariffType,
      servicesCount: orderData.servicesCount,
      totalPrice: orderData.totalPrice
    };

    let tgMessage = `🚀 <b>YANGI BUYURTMA</b>\n\n`;
    tgMessage += `👤 Mijoz: ${newOrder.userName}\n`;
    tgMessage += `📞 Tel: ${newOrder.phone}\n`;
    tgMessage += `🚗 Avto: ${newOrder.brand} ${newOrder.model}\n`;
    tgMessage += `🛠 Xizmat: ${newOrder.serviceType}\n`;
    if (newOrder.totalPrice) {
      tgMessage += `💰 Narxi: ${newOrder.totalPrice.toLocaleString()} UZS\n`;
    }
    if (newOrder.note) {
      tgMessage += `\n📝 Izoh: ${newOrder.note}`;
    }

    await sendTelegramNotification(tgMessage);

    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem('million_km_orders', JSON.stringify(updated));
    showToast("Buyurtmangiz qabul qilindi!");
  };

  const handleLoginSubmit = () => {
    if (loginForm.name.toLowerCase() === 'admin' && loginForm.password === '123') {
      const adminUser = { uid: 'a1', name: 'Admin', email: '', phone: '', gender: '', isAdmin: true };
      setCurrentUser(adminUser);
      localStorage.setItem('million_km_user', JSON.stringify(adminUser));
      setIsAuthModalOpen(false);
      showToast("Xush kelibsiz, Admin");
      return;
    }

    if (!loginForm.name || !loginForm.phone) {
      showToast("Ma'lumotlar to'liq emas", "error");
      return;
    }

    const user = { uid: 'u-' + Date.now(), name: loginForm.name, email: '', phone: loginForm.phone, gender: '', isAdmin: false };
    setCurrentUser(user);
    localStorage.setItem('million_km_user', JSON.stringify(user));
    setIsAuthModalOpen(false);
    showToast(`Salom, ${user.name}`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('million_km_user');
    setCurrentView('home');
    showToast("Tizimdan chiqdingiz");
  };

  const renderView = () => {
    switch (currentView) {
      case 'cabinet': return currentUser ? <Cabinet user={currentUser} showToast={showToast} onOrder={addOrder} /> : <Hero onStart={() => setIsAuthModalOpen(true)} />;
      case 'admin': return currentUser?.isAdmin ? <Admin orders={orders} /> : <div className="p-20 text-center font-bold text-red-500">Ruxsat yo'q</div>;
      case 'express':
      case 'fuel': return <MobileService type={currentView} user={currentUser} onOrder={addOrder} onOpenAuth={() => setIsAuthModalOpen(true)} />;
      case 'about': return <AboutUs />;
      default: return (
        <div className="space-y-32 pb-40">
          <Hero onStart={() => setIsAuthModalOpen(true)} />
          <div id="brands" className="max-w-[1200px] mx-auto px-6"><BrandGrid user={currentUser} onOrder={addOrder} onOpenAuth={() => setIsAuthModalOpen(true)} /></div>
          <div id="benefits" className="max-w-[1200px] mx-auto px-6"><Benefits /></div>
          <div id="status" className="max-w-[900px] mx-auto px-6"><StatusChecker showToast={showToast} onRegister={() => setIsAuthModalOpen(true)} onOneTime={() => setCurrentView('express')} /></div>
          <div id="quick-services-view" className="max-w-[1200px] mx-auto px-6"><QuickServices onSelect={setCurrentView} /></div>
          <div id="locations" className="max-w-[1200px] mx-auto px-6"><NearestLocations /></div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen selection:bg-blue-100 flex flex-col bg-[#F8F9FA]">
      <Navbar currentView={currentView} setView={setCurrentView} user={currentUser} onLogout={handleLogout} onLoginClick={() => setIsAuthModalOpen(true)} />
      
      <main className="flex-grow pt-16 md:pt-0">
        {renderView()}
      </main>

      <footer className="py-20 border-t border-gray-100 bg-white/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-extrabold tracking-tighter">Million KM</h3>
            <p className="text-sm text-gray-400 mt-2 font-medium italic">Premium avto servis xizmati</p>
          </div>
          <div className="flex space-x-10 text-[13px] font-bold text-gray-500 uppercase tracking-widest">
            <button onClick={() => setCurrentView('home')} className="hover:text-black">Bosh sahifa</button>
            <button onClick={() => setCurrentView('about')} className="hover:text-black">Biz haqimizda</button>
            <a href="tel:+998770200107" className="hover:text-black">Yordam</a>
          </div>
        </div>
      </footer>

      <AIConsultant />

      {toast && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[300] w-full max-w-[420px] px-6 pointer-events-none transition-all duration-700 ${toast.isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100 animate-spring'}`}>
          <div className={`p-5 rounded-[2.5rem] shadow-[0_25px_60px_-10px_rgba(0,0,0,0.2)] flex items-center space-x-5 border backdrop-blur-3xl ${toast.type === 'success' ? 'bg-[#1C1C1E] text-white border-white/10' : 'bg-[#FF3B30] text-white border-white/20'}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${toast.type === 'success' ? 'bg-blue-500/20 shadow-lg' : 'bg-white/20'}`}>
              <i className={`fas ${toast.type === 'success' ? 'fa-check' : 'fa-exclamation-triangle'} text-lg`}></i>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 leading-none mb-1.5">Million KM</span>
              <span className="font-bold text-[15px] tracking-tight">{toast.message}</span>
            </div>
          </div>
        </div>
      )}

      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
          <div className="bg-white/95 backdrop-blur-3xl rounded-[32px] p-10 w-full max-w-md shadow-2xl relative border border-white/50 animate-spring">
            <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors tap-active"><i className="fas fa-times text-xl"></i></button>
            <h2 className="text-3xl font-extrabold tracking-tight mb-8">Kirish</h2>
            <div className="space-y-5">
               <div className="space-y-2">
                 <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">To'liq ism</label>
                 <input type="text" value={loginForm.name} onChange={e => setLoginForm({...loginForm, name: e.target.value})} placeholder="Masalan: Azizbek" className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
               </div>
               {loginForm.name.toLowerCase() !== 'admin' ? (
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Telefon raqam</label>
                    <input type="tel" value={loginForm.phone} onChange={e => setLoginForm({...loginForm, phone: e.target.value})} placeholder="+998" className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
                  </div>
               ) : (
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Maxfiy kod</label>
                    <input type="password" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} placeholder="••••" className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold text-center tracking-[0.5em]" />
                  </div>
               )}
               <button onClick={handleLoginSubmit} className="w-full h-16 bg-black text-white rounded-2xl font-bold text-sm uppercase tracking-widest tap-active shadow-xl mt-4 active:scale-95 transition-all">Davom etish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- RENDER ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);