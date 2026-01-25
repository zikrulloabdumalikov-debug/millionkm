
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// ==========================================
// 1. DATA & CONSTANTS
// ==========================================
const CAR_DATA = {
  "chevrolet": {
    "Nexia 3": { maxAge: 5, maxKm: 100000, price: 849000, desc: "Ishonchli va tejamkor Nexia 3 uchun original xizmat." },
    "Cobalt": { maxAge: 5, maxKm: 100000, price: 849000, desc: "Oila avtomobili Cobalt uchun uzoq muddatli kafolat." },
    "Gentra": { maxAge: 5, maxKm: 100000, price: 849000, desc: "Komfortli Gentra uchun premium xizmat paketi." },
    "Onix": { maxAge: 3, maxKm: 50000, price: 1049000, desc: "Zamonaviy Onix turbo motorlari uchun maxsus moylar." },
    "Tracker": { maxAge: 3, maxKm: 50000, price: 1049000, desc: "Krossover Tracker uchun ishonchli texnik nazorat." },
    "Malibu": { maxAge: 5, maxKm: 50000, price: 1299000, desc: "Biznes klass Malibu uchun oliy darajadagi xizmat." }
  },
  "kia": {
    "Sonet": { maxAge: 3, maxKm: 50000, price: 990000, desc: "Yangi Sonet krossoveri uchun original KIA standartlari." },
    "K5": { maxAge: 3, maxKm: 50000, price: 1350000, desc: "Elegant K5 uchun yuqori sifatli texnik ko'rik." },
    "Sportage": { maxAge: 3, maxKm: 50000, price: 1550000, desc: "Sportage yo'ltanlamasi uchun ishonchli million km kafolati." }
  },
  "liauto": {
    "L6": { maxAge: 3, maxKm: 50000, price: 1800000, desc: "Premium Li Auto L6 uchun maxsus xizmat turi." },
    "L7": { maxAge: 3, maxKm: 50000, price: 1900000, desc: "Li L7 gibrid tizimlari uchun professional yondashuv." },
    "L9": { maxAge: 3, maxKm: 50000, price: 2100000, desc: "Flagman Li L9 uchun eng oliy darajadagi Million KM xizmati." }
  }
};

const TG_TOKEN = "7722483735:AAG_LZ1Bg0H-mnqAlnw4OknNj-BTrqM8CWM";
const TG_CHAT_ID = "-1003461463026";

// ==========================================
// 2. UTILITIES & SERVICES
// ==========================================
const notifyTelegram = async (msg) => {
  try {
    await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, text: msg, parse_mode: 'HTML' })
    });
  } catch (e) { console.error("Telegram Error:", e); }
};

// ==========================================
// 3. COMPONENTS
// ==========================================

const IOSDropdown = ({ label, options, value, onChange, disabled, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">{label}</label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-14 px-6 rounded-2xl flex items-center justify-between font-bold text-left transition-all tap-active ${disabled ? 'bg-gray-100 text-gray-300' : 'bg-gray-50 text-black hover:bg-white ring-1 ring-gray-100'}`}
      >
        <span className={!value ? 'text-gray-400' : ''}>{value || placeholder}</span>
        <i className={`fas fa-chevron-down text-[10px] transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden animate-spring origin-top">
          <div className="max-h-64 overflow-y-auto py-2">
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={`w-full text-left px-6 py-4 font-bold text-sm hover:bg-blue-50 transition-colors ${value === opt ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'}`}
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

const AIConsultant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Assalomu alaykum! Men Million KM AI mexanikman. Mashinangizdagi muammolar bo\'yicha savol bering.' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Siz professional avtomobil mexanigisiz. Million KM servisi nomidan javob bering. Mijoz savoli: ${userMsg}`
      });
      setMessages(prev => [...prev, { role: 'ai', text: response.text }]);
      notifyTelegram(`<b>💬 AI Chat</b>\nSavol: ${userMsg}\nAI: ${response.text}`);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Kechirasiz, tizimda xato yuz berdi.' }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[110]">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="w-16 h-16 bg-black text-white rounded-2xl shadow-2xl flex items-center justify-center tap-active group">
          <i className="fas fa-robot text-xl"></i>
          <span className="absolute right-20 bg-black text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">AI Mexanik</span>
        </button>
      ) : (
        <div className="w-80 md:w-96 apple-glass squircle-lg shadow-2xl flex flex-col overflow-hidden animate-spring">
          <div className="p-6 bg-black text-white flex justify-between items-center">
            <span className="font-black text-[10px] uppercase tracking-widest">Onlayn Yordam</span>
            <button onClick={() => setIsOpen(false)}><i className="fas fa-times"></i></button>
          </div>
          <div className="h-80 overflow-y-auto p-6 space-y-4 bg-white/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] font-semibold ${m.role === 'user' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border text-slate-800 shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-[10px] font-bold text-gray-400 animate-pulse">O'ylamoqda...</div>}
          </div>
          <div className="p-4 bg-white border-t flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} className="flex-1 h-12 px-4 rounded-xl bg-gray-50 outline-none text-sm font-bold" placeholder="Savol..." />
            <button onClick={handleSend} className="w-12 h-12 bg-black text-white rounded-xl"><i className="fas fa-paper-plane"></i></button>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 4. MAIN APP
// ==========================================
const App = () => {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [loginForm, setLoginForm] = useState({ name: '', phone: '' });
  const [toast, setToast] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [orders, setOrders] = useState([]);
  const [checkerResult, setCheckerResult] = useState(null);
  const [checkerInputs, setCheckerInputs] = useState({ brand: '', model: '', year: '', km: '' });

  useEffect(() => {
    const saved = localStorage.getItem('mkm_session_v2');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const showMsg = (m) => {
    setToast(m);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = () => {
    if (!loginForm.name || !loginForm.phone) return showMsg("Ma'lumotlarni kiriting");
    const u = { name: loginForm.name, phone: loginForm.phone, uid: Date.now().toString() };
    setUser(u);
    localStorage.setItem('mkm_session_v2', JSON.stringify(u));
    setShowAuth(false);
    showMsg(`Xush kelibsiz, ${u.name}`);
  };

  const handleCreateOrder = async (brand, model, type = "Servis") => {
    if (!user) return setShowAuth(true);
    showMsg("So'rov yuborilmoqda...");
    const newOrder = {
      id: Date.now(),
      userName: user.name,
      phone: user.phone,
      brand,
      model,
      type,
      time: new Date().toLocaleString()
    };
    setOrders([newOrder, ...orders]);
    await notifyTelegram(`🚀 <b>Yangi Buyurtma</b>\nMijoz: ${user.name}\nTel: ${user.phone}\nAvto: ${brand} ${model}\nXizmat: ${type}`);
    showMsg("Buyurtma qabul qilindi!");
  };

  const handleCheckStatus = () => {
    const { brand, model, year, km } = checkerInputs;
    if (!brand || !model || !year || !km) return showMsg("Barcha maydonlarni to'ldiring");
    
    const config = CAR_DATA[brand.toLowerCase()]?.[model];
    if (!config) return setCheckerResult({ status: 'error', text: "Model topilmadi" });

    const carAge = new Date().getFullYear() - parseInt(year);
    const carKm = parseInt(km.replace(/\D/g, ''));

    if (carAge <= config.maxAge && carKm <= config.maxKm) {
      setCheckerResult({ status: 'eligible', text: "Mashina 1,000,000 KM kafolatiga mos keladi!" });
    } else {
      setCheckerResult({ status: 'not_eligible', text: "Limitlardan oshgan (Kafolat mavjud emas)" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFF]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] p-6">
        <div className="max-w-7xl mx-auto h-16 apple-glass squircle px-8 flex items-center justify-between shadow-2xl shadow-black/5">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setView('home'); setSelectedBrand(null); }}>
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <i className="fas fa-road text-white text-sm"></i>
            </div>
            <span className="font-black tracking-tighter text-xl">Million KM</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <button onClick={() => setView('home')} className={view === 'home' ? 'text-black' : ''}>Asosiy</button>
            <button onClick={() => setView('about')} className={view === 'about' ? 'text-black' : ''}>Haqimizda</button>
            {user && <button onClick={() => setView('cabinet')} className={view === 'cabinet' ? 'text-black' : ''}>Kabinet</button>}
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <button onClick={() => setView('cabinet')} className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center tap-active">
                  <i className="fas fa-user-circle text-lg"></i>
                </button>
                <button onClick={() => { setUser(null); localStorage.removeItem('mkm_session_v2'); setView('home'); }} className="w-10 h-10 rounded-full bg-red-50 text-red-400 flex items-center justify-center tap-active">
                  <i className="fas fa-power-off text-xs"></i>
                </button>
              </div>
            ) : (
              <button onClick={() => setShowAuth(true)} className="bg-black text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest tap-active">Kirish</button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto pt-32 px-6 pb-20">
        {view === 'home' && (
          <div className="space-y-32 animate-spring">
            {/* Hero */}
            <section className="text-center py-20 px-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-10">
                Premium Auto Care 2025
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-slate-900 mb-10">
                Dvigatelingiz <br /> <span className="text-blue-600">Million KM</span> ga <br /> loyiq.
              </h1>
              <p className="max-w-2xl mx-auto text-gray-400 text-lg font-medium leading-relaxed mb-12">
                Dvigatelni ta'mirlash — xarajat. Uni saqlab qolish esa — eng katta tejashdir. 
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={() => document.getElementById('brands-grid')?.scrollIntoView({ behavior: 'smooth' })} className="px-12 h-16 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl tap-active">Boshlash</button>
                <button onClick={() => document.getElementById('status-checker')?.scrollIntoView({ behavior: 'smooth' })} className="px-12 h-16 bg-white border border-gray-100 rounded-2xl font-black uppercase tracking-widest text-xs tap-active">Statusni tekshirish</button>
              </div>
            </section>

            {/* Status Checker */}
            <section id="status-checker" className="p-12 md:p-20 apple-glass squircle-lg shadow-2xl text-center">
               <h2 className="text-4xl font-black tracking-tighter mb-10 uppercase">Statusni Tekshirish</h2>
               <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                 <IOSDropdown label="Brend" placeholder="Brendni tanlang" options={Object.keys(CAR_DATA)} value={checkerInputs.brand} onChange={v => setCheckerInputs({...checkerInputs, brand: v, model: ''})} />
                 <IOSDropdown label="Model" placeholder="Modelni tanlang" disabled={!checkerInputs.brand} options={checkerInputs.brand ? Object.keys(CAR_DATA[checkerInputs.brand.toLowerCase()]) : []} value={checkerInputs.model} onChange={v => setCheckerInputs({...checkerInputs, model: v})} />
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block">Ishlab chiqarilgan yili</label>
                   <input type="number" placeholder="2022" value={checkerInputs.year} onChange={e => setCheckerInputs({...checkerInputs, year: e.target.value})} className="w-full h-14 px-6 rounded-2xl bg-gray-50 font-bold border-none outline-none focus:ring-2 focus:ring-blue-500" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block">Kilometr (KM)</label>
                   <input type="text" placeholder="45 000" value={checkerInputs.km} onChange={e => setCheckerInputs({...checkerInputs, km: e.target.value})} className="w-full h-14 px-6 rounded-2xl bg-gray-50 font-bold border-none outline-none focus:ring-2 focus:ring-blue-500" />
                 </div>
               </div>
               <button onClick={handleCheckStatus} className="mt-12 px-16 h-16 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-200 tap-active">Tekshirish</button>
               {checkerResult && (
                 <div className={`mt-10 p-10 squircle border animate-spring ${checkerResult.status === 'eligible' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                   <p className="font-black text-xl">{checkerResult.text}</p>
                 </div>
               )}
            </section>

            {/* Brands Grid */}
            <section id="brands-grid" className="space-y-12">
              <h2 className="text-4xl font-black tracking-tighter uppercase text-center">Premium Brendlar</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {Object.keys(CAR_DATA).map(brand => (
                  <div key={brand} onClick={() => setSelectedBrand(brand)} className={`apple-glass p-12 squircle hover:border-blue-500 transition-all cursor-pointer group shadow-xl ${selectedBrand === brand ? 'ring-4 ring-blue-500/20' : ''}`}>
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{brand}</h3>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-10 italic">Premium original xizmatlar</p>
                    <button className="w-full py-5 bg-gray-50 rounded-xl font-black text-[10px] uppercase tracking-widest group-hover:bg-black group-hover:text-white transition-all">Modellarni ko'rish</button>
                  </div>
                ))}
              </div>
            </section>

            {/* Models for selected brand */}
            {selectedBrand && (
              <section className="p-12 md:p-20 bg-black rounded-[48px] text-white animate-spring">
                <div className="flex justify-between items-center mb-16">
                   <h2 className="text-4xl font-black tracking-tighter uppercase">{selectedBrand} Modellari</h2>
                   <button onClick={() => setSelectedBrand(null)} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"><i className="fas fa-times"></i></button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Object.entries(CAR_DATA[selectedBrand.toLowerCase()]).map(([model, info]) => (
                    <div key={model} className="bg-white/5 p-10 squircle border border-white/10 flex flex-col hover:bg-white/10 transition-all">
                      <h4 className="text-2xl font-extrabold mb-4">{model}</h4>
                      <p className="text-white/40 text-sm mb-10 italic font-medium">"{info.desc}"</p>
                      <div className="mt-auto pt-8 border-t border-white/10 flex justify-between items-center">
                        <span className="text-blue-400 font-black text-xl">{info.price.toLocaleString()} <span className="text-[10px]">UZS</span></span>
                        <button onClick={() => handleCreateOrder(selectedBrand, model)} className="px-6 py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest tap-active">Buyurtma</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {view === 'about' && (
          <div className="py-20 animate-spring text-center space-y-12 max-w-4xl mx-auto">
             <h2 className="text-6xl font-black tracking-tighter uppercase">Million KM Oil</h2>
             <p className="text-xl text-gray-500 font-medium leading-relaxed">
               Biz O'zbekistondagi har bir avtomobilning motor umrini uzaytirish uchun professional jamoa va original mahsulotlarni birlashtirdik. 
               Sifat — bizning oliy qadriyatimiz.
             </p>
             <div className="grid grid-cols-3 gap-6">
                <div className="p-10 apple-glass squircle shadow-xl"><div className="text-4xl font-black mb-2 text-blue-600">10k+</div><div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mijoz</div></div>
                <div className="p-10 apple-glass squircle shadow-xl"><div className="text-4xl font-black mb-2">24/7</div><div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Yordam</div></div>
                <div className="p-10 apple-glass squircle shadow-xl"><div className="text-4xl font-black mb-2 text-green-600">100%</div><div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Original</div></div>
             </div>
          </div>
        )}

        {view === 'cabinet' && user && (
          <div className="py-20 animate-spring space-y-12">
            <div className="apple-glass p-12 squircle-lg shadow-xl flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-black tracking-tighter mb-2">Salom, {user.name}!</h2>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Shaxsiy Garaj</p>
              </div>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-200 tap-active">Yangi Mashina</button>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="p-12 apple-glass squircle border-dashed border-2 border-gray-200 text-center flex flex-col items-center justify-center min-h-[300px]">
                 <i className="fas fa-car-side text-4xl text-gray-200 mb-6"></i>
                 <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Hozircha mashinalar yo'q</p>
               </div>
            </div>
          </div>
        )}
      </main>

      <AIConsultant />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] apple-glass px-8 py-4 squircle shadow-2xl border-l-4 border-l-blue-600 animate-spring">
          <span className="font-bold text-sm tracking-tight">{toast}</span>
        </div>
      )}

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white/95 apple-glass p-12 squircle-lg w-full max-w-md shadow-2xl animate-spring">
            <h2 className="text-4xl font-black tracking-tighter mb-10">Tizimga Kirish</h2>
            <div className="space-y-4">
              <input value={loginForm.name} onChange={e => setLoginForm({...loginForm, name: e.target.value})} placeholder="Ismingiz" className="w-full h-16 px-6 rounded-2xl bg-gray-50 border-none outline-none font-bold" />
              <input value={loginForm.phone} onChange={e => setLoginForm({...loginForm, phone: e.target.value})} placeholder="+998" className="w-full h-16 px-6 rounded-2xl bg-gray-50 border-none outline-none font-bold" />
              <button onClick={handleLogin} className="w-full h-16 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs tap-active mt-4 shadow-xl">Kirish</button>
              <button onClick={() => setShowAuth(false)} className="w-full h-10 text-[10px] font-bold uppercase tracking-widest text-gray-400">Yopish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
