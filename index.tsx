import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// ==========================================
// 1. CONFIG & DATA
// ==========================================
const TG_TOKEN = "7722483735:AAG_LZ1Bg0H-mnqAlnw4OknNj-BTrqM8CWM";
const TG_CHAT_ID = "-1003461463026";

const CAR_DATA: any = {
  "chevrolet": {
    "Nexia 3": { maxAge: 5, maxKm: 100000, price: 849000, desc: "Million km standartlariga mos." },
    "Cobalt": { maxAge: 5, maxKm: 100000, price: 849000, desc: "Million km standartlariga mos." },
    "Gentra": { maxAge: 5, maxKm: 100000, price: 849000, desc: "Million km standartlariga mos." },
    "Onix": { maxAge: 3, maxKm: 50000, price: 1049000, desc: "Million km standartlariga mos." },
    "Tracker": { maxAge: 3, maxKm: 50000, price: 1049000, desc: "Million km standartlariga mos." },
    "Malibu": { maxAge: 5, maxKm: 50000, price: 1299000, desc: "Million km standartlariga mos." }
  },
  "kia": {
    "Sonet": { maxAge: 3, maxKm: 50000, price: 990000, desc: "Million km standartlariga mos." },
    "K5": { maxAge: 3, maxKm: 50000, price: 1350000, desc: "Million km standartlariga mos." },
    "Sportage": { maxAge: 3, maxKm: 50000, price: 1550000, desc: "Million km standartlariga mos." }
  },
  "liauto": {
    "L6": { maxAge: 3, maxKm: 50000, price: 1800000, desc: "Million km standartlariga mos." },
    "L7": { maxAge: 3, maxKm: 50000, price: 1900000, desc: "Million km standartlariga mos." },
    "L9": { maxAge: 3, maxKm: 50000, price: 2100000, desc: "Million km standartlariga mos." }
  }
};

const BENEFITS = [
  { title: "Million kilometrgacha kafolat", desc: "Avtomobilingizga million kmgacha texnik kafolat beramiz.", icon: "fa-shield-halved" },
  { title: "Bepul avtomoyka", desc: "Har safar moy almashtirishda — bepul avtomoyka.", icon: "fa-droplet" },
  { title: "Faqat original mahsulotlar", desc: "Faqat eng yuqori sifatdagi mahsulotlar ishlatiladi.", icon: "fa-check-double" }
];

// ==========================================
// 2. UTILS
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

const formatMoney = (amount) => amount.toLocaleString() + " UZS";

// ==========================================
// 3. COMPONENTS
// ==========================================

// --- Navbar ---
const Navbar = ({ view, setView, user, toggleAuth, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f5f7]/90 backdrop-blur-md border-b border-white/50 h-16">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('home')}>
             <div className="w-8 h-8 bg-[#007aff] rounded-lg flex items-center justify-center text-white">
               <i className="fas fa-gauge-high text-xs"></i>
             </div>
             <span className="text-lg font-bold tracking-tight">Million km</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-500">
            <button onClick={() => { setView('home'); setTimeout(() => document.getElementById('brands')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-black transition-colors">Brendlar</button>
            <button onClick={() => { setView('home'); setTimeout(() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-black transition-colors">Xizmatlar</button>
            <button onClick={() => { setView('home'); setTimeout(() => document.getElementById('benefits')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-black transition-colors">Afzalliklar</button>
            <button onClick={() => { setView('home'); setTimeout(() => document.getElementById('filiallar')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-black transition-colors">Filiallar</button>
            
            {user ? (
              <div className="flex items-center space-x-4 ml-4">
                <button onClick={() => setView('cabinet')} className="text-[#007aff] font-bold bg-blue-50 px-3 py-1 rounded-lg">Kabinet</button>
                {user.isAdmin && <button onClick={() => setView('admin')} className="text-black font-bold">Admin</button>}
                <button onClick={onLogout} className="text-red-500"><i className="fas fa-sign-out-alt"></i></button>
              </div>
            ) : (
              <button onClick={toggleAuth} className="text-black font-bold">Kirish</button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-2xl w-10 h-10 flex items-center justify-center" onClick={() => setIsOpen(!isOpen)}>
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-white transform ${isOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-300 md:hidden pt-24 px-6`}>
         <div className="flex flex-col space-y-8 text-2xl font-bold">
            <button className="text-left" onClick={() => { setIsOpen(false); document.getElementById('brands')?.scrollIntoView(); }}>Brendlar</button>
            <button className="text-left" onClick={() => { setIsOpen(false); document.getElementById('services')?.scrollIntoView(); }}>Xizmatlar</button>
            <button className="text-left text-[#007aff]" onClick={() => { setIsOpen(false); setView('cabinet'); }}>Kabinet</button>
            {user ? (
               <button className="text-left text-red-500" onClick={() => { setIsOpen(false); onLogout(); }}>Chiqish</button>
            ) : (
               <button className="text-left" onClick={() => { setIsOpen(false); toggleAuth(); }}>Kirish</button>
            )}
         </div>
      </div>
    </>
  );
};

// --- Main App ---
const App = () => {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [loginForm, setLoginForm] = useState({ name: '', phone: '' });
  const [toast, setToast] = useState(null);
  
  // Data State
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [checker, setChecker] = useState({ brand: '', model: '', year: '', km: '' });
  const [checkResult, setCheckResult] = useState(null);
  const [cars, setCars] = useState([]);
  const [orders, setOrders] = useState([]);
  
  // Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([{ role: 'ai', text: 'Salom! Sizga qanday yordam bera olaman?' }]);
  const [isTyping, setIsTyping] = useState(false);

  // Initialize
  useEffect(() => {
    const u = localStorage.getItem('mkm_user_v2');
    if (u) {
      const parsed = JSON.parse(u);
      setUser(parsed);
      loadUserData(parsed.uid);
    }
    const savedOrders = localStorage.getItem('mkm_orders_v2');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const loadUserData = (uid) => {
    const savedCars = localStorage.getItem(`mkm_cars_${uid}_v2`);
    if (savedCars) setCars(JSON.parse(savedCars));
  };

  const showToastMsg = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Auth Logic
  const handleLogin = async () => {
    if (!loginForm.name || !loginForm.phone) return showToastMsg("Ma'lumotlarni to'ldiring");
    
    const newUser = {
      uid: Date.now().toString(),
      name: loginForm.name,
      phone: loginForm.phone,
      isAdmin: loginForm.phone === 'admin777',
      createdAt: new Date().toISOString()
    };

    setUser(newUser);
    localStorage.setItem('mkm_user_v2', JSON.stringify(newUser));
    setShowAuth(false);
    showToastMsg(`Xush kelibsiz, ${newUser.name}`);
    await notifyTelegram(`👤 <b>Yangi Foydalanuvchi</b>\nIsm: ${newUser.name}\nTel: ${newUser.phone}`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mkm_user_v2');
    setView('home');
  };

  // Order Logic
  const handleOrder = async (type, details) => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    const newOrder = {
      id: Date.now(),
      userName: user.name,
      phone: user.phone,
      type,
      details,
      timestamp: new Date().toLocaleString()
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem('mkm_orders_v2', JSON.stringify(updated));
    showToastMsg("Buyurtma qabul qilindi!");
    await notifyTelegram(`📦 <b>Yangi Buyurtma</b>\nMijoz: ${user.name}\nTel: ${user.phone}\nXizmat: ${type}\nTafsilot: ${details}`);
  };

  // Checker Logic
  const runCheck = () => {
    if (!checker.brand || !checker.model || !checker.year || !checker.km) return showToastMsg("Barchasini to'ldiring");
    
    const config = CAR_DATA[checker.brand]?.[checker.model];
    if (!config) return;

    const age = new Date().getFullYear() - parseInt(checker.year);
    const km = parseInt(checker.km.replace(/\D/g, ''));
    
    if (age <= config.maxAge && km <= config.maxKm) {
      setCheckResult({ success: true, text: "✅ Tabriklaymiz! Avtomobilingiz Million KM kafolatiga mos." });
    } else {
      setCheckResult({ success: false, text: "⚠️ Afsuski, limitlardan oshgan. Lekin bir martalik xizmat mavjud." });
    }
  };

  // Chat Logic (Gemini + Telegram)
  const sendChat = async () => {
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: msg }]);
    setIsTyping(true);

    // Notify Admin via Telegram
    notifyTelegram(`💬 <b>Chat Xabar</b>\nMijoz: ${user?.name || 'Mehmon'}\nXabar: ${msg}`);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Siz Million KM avtoservisining support menejerisiz. O'zbek tilida qisqa javob bering. Savol: ${msg}`
      });
      const reply = response.text;
      setChatHistory(prev => [...prev, { role: 'ai', text: reply }]);
    } catch (e) {
      console.error(e);
      setChatHistory(prev => [...prev, { role: 'ai', text: 'Kechirasiz, aloqada xatolik.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Cabinet Logic
  const addCar = async (carData) => {
    const newCar = { 
      ...carData, 
      id: Date.now(), 
      lastOil: parseInt(carData.lastOil), 
      daily: parseInt(carData.daily) 
    };
    const updated = [...cars, newCar];
    setCars(updated);
    localStorage.setItem(`mkm_cars_${user.uid}_v2`, JSON.stringify(updated));
    showToastMsg("Mashina qo'shildi");
    await notifyTelegram(`🚗 <b>Yangi Mashina</b>\nMijoz: ${user.name}\nMashina: ${newCar.brand} ${newCar.model}`);
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar view={view} setView={setView} user={user} toggleAuth={() => setShowAuth(true)} onLogout={handleLogout} />

      {/* --- HOME VIEW --- */}
      {view === 'home' && (
        <div className="pt-20 animate-fade">
          {/* Hero */}
          <section className="text-center py-20 px-6 max-w-4xl mx-auto">
             <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest mb-8">Premium Auto Care 2025</div>
             <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Million km</h1>
             <p className="text-xl md:text-2xl text-gray-500 font-medium mb-4">Ko'pchilik dvigatelni ta'mirlaydi.</p>
             <p className="text-xl md:text-2xl text-[#1d1d1f] font-semibold mb-10">Biz esa uni saqlab qolamiz.</p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={() => setShowAuth(true)} className="bg-[#007aff] text-white px-8 py-4 rounded-2xl font-bold text-sm tap-active shadow-lg shadow-blue-200">Hozir boshlash</button>
                <button onClick={() => document.getElementById('status')?.scrollIntoView({behavior:'smooth'})} className="bg-white text-black border border-gray-200 px-8 py-4 rounded-2xl font-bold text-sm tap-active">Statusni tekshirish</button>
             </div>
          </section>

          {/* Brands */}
          <section id="brands" className="py-16 px-6 max-w-7xl mx-auto">
             <h2 className="text-3xl font-bold mb-8 text-center">Qo'llab-quvvatlanadigan brendlar</h2>
             <div className="grid md:grid-cols-3 gap-6">
               {Object.keys(CAR_DATA).map(brand => (
                 <div key={brand} className="apple-glass p-8 squircle hover:shadow-xl transition-all text-center">
                    <h3 className="text-3xl font-black capitalize mb-2">{brand === 'liauto' ? 'Li Auto' : brand}</h3>
                    <p className="text-gray-500 text-sm mb-8 font-medium">Million km standartlariga mos</p>
                    <button onClick={() => setSelectedBrand(brand)} className="w-full bg-[#f5f5f7] py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">Modellarni ko'rish</button>
                 </div>
               ))}
             </div>
          </section>

          {/* Model Selection Modal */}
          {selectedBrand && (
            <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
               <div className="bg-white rounded-[32px] w-full max-w-5xl max-h-[85vh] overflow-y-auto p-8 md:p-12 animate-fade">
                  <div className="flex justify-between items-center mb-10">
                     <h2 className="text-4xl font-bold capitalize">{selectedBrand} Modellari</h2>
                     <button onClick={() => setSelectedBrand(null)} className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"><i className="fas fa-times text-xl"></i></button>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {Object.entries(CAR_DATA[selectedBrand]).map(([model, info]: [string, any]) => (
                        <div key={model} className="border border-gray-100 p-8 rounded-[24px] hover:border-[#007aff] hover:shadow-lg transition-all">
                           <h4 className="text-2xl font-bold mb-3">{model}</h4>
                           <p className="text-gray-500 text-sm mb-6 leading-relaxed">{info.desc}</p>
                           <div className="flex flex-col gap-4 mt-auto">
                              <div className="text-xl font-black text-[#007aff]">{formatMoney(info.price)}</div>
                              <button onClick={() => { handleOrder(selectedBrand, `Model: ${model}`); setSelectedBrand(null); }} className="w-full bg-black text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest tap-active">Buyurtma berish</button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          )}

          {/* Services */}
          <section id="services" className="py-16 px-6 max-w-7xl mx-auto">
             <h2 className="text-3xl font-bold mb-8 text-center">Maxsus xizmatlar</h2>
             <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-600 text-white p-10 squircle shadow-xl shadow-blue-200">
                   <div className="text-5xl mb-6"><i className="fas fa-bolt"></i></div>
                   <h3 className="text-3xl font-bold mb-3">Million km Express</h3>
                   <p className="text-blue-100 mb-8 text-lg">Manzilingizga borib, 30 daqiqada professional xizmat ko'rsatamiz.</p>
                   <button onClick={() => handleOrder('Express', 'Manzilga borish')} className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest w-full hover:bg-blue-50">Xizmatni tanlash</button>
                </div>
                <div className="bg-black text-white p-10 squircle shadow-xl">
                   <div className="text-5xl mb-6"><i className="fas fa-gas-pump"></i></div>
                   <h3 className="text-3xl font-bold mb-3">Million km Fuel</h3>
                   <p className="text-gray-400 mb-8 text-lg">Sifatli yoqilg'i tugab qoldimi? Biz yetkazib beramiz.</p>
                   <button onClick={() => handleOrder('Fuel', 'Yoqilg\'i yetkazish')} className="bg-white text-black px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest w-full hover:bg-gray-200">Buyurtma berish</button>
                </div>
             </div>
          </section>

          {/* Benefits */}
          <section id="benefits" className="py-20 px-6 max-w-7xl mx-auto bg-white rounded-[40px] mb-16 shadow-sm border border-gray-100">
             <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Nega aynan Million km?</h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">Chunki biz shunchaki avtomobilga xizmat ko'rsatmaymiz — sizga ishonch, kafolat va qulaylik hadya qilamiz.</p>
             </div>
             <div className="grid md:grid-cols-3 gap-10">
                {BENEFITS.map((b, i) => (
                   <div key={i} className="text-center p-6 hover:bg-gray-50 rounded-3xl transition-colors">
                      <div className="w-20 h-20 bg-blue-50 text-[#007aff] rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm">
                         <i className={`fas ${b.icon}`}></i>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{b.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                   </div>
                ))}
             </div>
          </section>

          {/* Status Checker */}
          <section id="status" className="py-20 px-6 max-w-3xl mx-auto text-center">
             <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4 block">Diagnostika</span>
             <h2 className="text-4xl font-bold mb-4">Mashinangiz statusini tekshiring</h2>
             <p className="text-gray-500 mb-12">Million km xizmatiga mos ekanligini bir zumda aniqlang</p>
             
             <div className="bg-white p-8 md:p-12 squircle-lg shadow-2xl border border-gray-100 text-left">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-400 uppercase ml-2">Brend</label>
                     <select className="w-full h-16 bg-[#f5f5f7] rounded-2xl px-6 font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none" value={checker.brand} onChange={e => setChecker({...checker, brand: e.target.value, model: ''})}>
                        <option value="">Tanlang...</option>
                        {Object.keys(CAR_DATA).map(b => <option key={b} value={b}>{b.toUpperCase()}</option>)}
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-400 uppercase ml-2">Model</label>
                     <select className="w-full h-16 bg-[#f5f5f7] rounded-2xl px-6 font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none" disabled={!checker.brand} value={checker.model} onChange={e => setChecker({...checker, model: e.target.value})}>
                        <option value="">Tanlang...</option>
                        {checker.brand && Object.keys(CAR_DATA[checker.brand]).map(m => <option key={m} value={m}>{m}</option>)}
                     </select>
                   </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-400 uppercase ml-2">Yili</label>
                     <input type="number" placeholder="2023" className="w-full h-16 bg-[#f5f5f7] rounded-2xl px-6 font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={checker.year} onChange={e => setChecker({...checker, year: e.target.value})} />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-400 uppercase ml-2">Yurgan masofasi</label>
                     <input type="text" placeholder="45 000" className="w-full h-16 bg-[#f5f5f7] rounded-2xl px-6 font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={checker.km} onChange={e => setChecker({...checker, km: e.target.value})} />
                   </div>
                </div>
                <button onClick={runCheck} className="w-full h-16 bg-black text-white rounded-2xl font-bold text-sm uppercase tracking-widest tap-active hover:bg-gray-900 shadow-xl">Tekshirish</button>
                
                {checkResult && (
                   <div className={`mt-8 p-8 rounded-3xl ${checkResult.success ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'} text-center animate-fade`}>
                      <p className="mb-6 font-bold text-lg">{checkResult.text}</p>
                      {checkResult.success ? (
                         <button onClick={() => setShowAuth(true)} className="px-8 py-3 bg-green-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-green-200">Ro'yxatdan o'tish</button>
                      ) : (
                         <button onClick={() => handleOrder('Bir martalik', `${checker.brand} ${checker.model}`)} className="px-8 py-3 bg-red-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-red-200">Bir martalik xizmat</button>
                      )}
                   </div>
                )}
             </div>
          </section>

          {/* Branches */}
          <section id="filiallar" className="py-16 px-6 max-w-7xl mx-auto">
             <h2 className="text-3xl font-bold mb-8 text-center">Filiallarimiz Xaritada</h2>
             <div className="rounded-[40px] overflow-hidden shadow-2xl h-[450px] border border-gray-200">
                <iframe src="https://yandex.uz/map-widget/v1/?ll=70.893061,40.546387&z=15&l=map&pt=70.893061,40.546387,pm2rdm" width="100%" height="100%" frameBorder="0"></iframe>
             </div>
          </section>

          {/* Footer */}
          <footer className="bg-white py-16 text-center border-t border-gray-100 mt-20">
             <div className="inline-block w-12 h-12 bg-black rounded-xl text-white flex items-center justify-center text-xl mb-6"><i className="fas fa-road"></i></div>
             <h3 className="text-2xl font-bold mb-2">Million km</h3>
             <p className="text-gray-400 mb-10 font-medium">Dvigatel uchun yangi avlod ishonchi</p>
             <div className="flex justify-center space-x-8 text-gray-400 mb-10">
                <a href="#" className="hover:text-[#007aff] transition-colors"><i className="fab fa-instagram text-2xl"></i></a>
                <a href="#" className="hover:text-[#007aff] transition-colors"><i className="fab fa-telegram text-2xl"></i></a>
                <a href="#" className="hover:text-[#007aff] transition-colors"><i className="fab fa-youtube text-2xl"></i></a>
             </div>
             <p className="text-slate-900 font-bold text-lg">📞 +998 71 123 45 67</p>
          </footer>
        </div>
      )}

      {/* --- CABINET VIEW --- */}
      {view === 'cabinet' && user && (
         <div className="pt-28 px-6 max-w-7xl mx-auto animate-fade pb-20">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
               <div className="text-center md:text-left">
                  <h1 className="text-4xl font-black tracking-tight mb-2">Salom, {user.name}</h1>
                  <p className="text-gray-500 font-medium">Shaxsiy garaj va monitoring</p>
               </div>
               <button onClick={() => { 
                  const b = prompt("Brend?"); 
                  if(b) {
                    const m = prompt("Model?"); 
                    const y = prompt("Yil?"); 
                    const l = prompt("Oxirgi moy km?"); 
                    const d = prompt("Kunlik km?");
                    if(m&&y&&l&&d) addCar({ brand: b, model: m, year: parseInt(y), lastOil: l, daily: d });
                  }
               }} className="bg-[#007aff] text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-xl shadow-blue-200">+ Mashina qo'shish</button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               {cars.length === 0 ? (
                 <div className="col-span-2 py-20 text-center bg-white rounded-[3rem] border border-dashed border-gray-300">
                   <div className="text-6xl text-gray-200 mb-6"><i className="fas fa-car"></i></div>
                   <p className="text-gray-400 font-medium text-lg">Garajingiz hozircha bo'sh.</p>
                 </div>
               ) : cars.map(car => {
                  const limit = 8000;
                  const current = 2000; // Mock data for demo
                  const percent = (current / limit) * 100;
                  return (
                     <div key={car.id} className="bg-white p-10 squircle shadow-lg border border-gray-100 hover:border-blue-200 transition-all">
                        <div className="flex justify-between mb-8 items-start">
                           <div>
                             <h3 className="text-2xl font-black text-slate-900">{car.brand} {car.model}</h3>
                             <p className="text-gray-400 font-bold text-xs uppercase mt-1">{car.year}-yil</p>
                           </div>
                           <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400"><i className="fas fa-car-side"></i></div>
                        </div>
                        <div className="mb-8">
                           <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-3 text-gray-400">
                              <span>Servisgacha</span>
                              <span className="text-[#007aff]">{limit - current} km</span>
                           </div>
                           <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#007aff] rounded-full" style={{ width: `${percent}%` }}></div>
                           </div>
                        </div>
                        <div className="flex gap-4">
                          <button onClick={() => handleOrder('Servis', `${car.brand} ${car.model}`)} className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors">Servisga yozilish</button>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      )}

      {/* --- ADMIN VIEW --- */}
      {view === 'admin' && user?.isAdmin && (
         <div className="pt-28 px-6 max-w-7xl mx-auto animate-fade pb-20">
            <h1 className="text-4xl font-black tracking-tight mb-8">Admin Panel</h1>
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                       <tr>
                          <th className="p-8 text-xs font-bold uppercase tracking-widest text-gray-400">Mijoz</th>
                          <th className="p-8 text-xs font-bold uppercase tracking-widest text-gray-400">Xizmat turi</th>
                          <th className="p-8 text-xs font-bold uppercase tracking-widest text-gray-400">Vaqt</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       {orders.length === 0 ? (
                         <tr><td colSpan="3" className="p-10 text-center text-gray-400">Buyurtmalar yo'q</td></tr>
                       ) : orders.map(o => (
                          <tr key={o.id} className="hover:bg-gray-50/50">
                             <td className="p-8">
                                <div className="font-bold text-slate-900">{o.userName}</div>
                                <div className="text-xs font-bold text-blue-600 mt-1">{o.phone}</div>
                             </td>
                             <td className="p-8">
                                <div className="font-bold text-slate-900">{o.type}</div>
                                <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">{o.details}</div>
                             </td>
                             <td className="p-8 text-xs font-bold text-gray-400">{o.timestamp}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
            </div>
         </div>
      )}

      {/* --- CHAT WIDGET --- */}
      <div className="fixed bottom-8 right-8 z-50">
         {!chatOpen ? (
            <button onClick={() => setChatOpen(true)} className="w-16 h-16 bg-black text-white rounded-[20px] shadow-2xl flex items-center justify-center text-2xl hover:scale-105 active:scale-95 transition-all">
               <i className="fas fa-comment-dots"></i>
            </button>
         ) : (
            <div className="w-[90vw] md:w-96 bg-white rounded-[30px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-fade h-[600px] max-h-[80vh]">
               <div className="p-6 bg-black text-white flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-bold text-sm tracking-wide">Million KM AI</span>
                  </div>
                  <button onClick={() => setChatOpen(false)} className="opacity-70 hover:opacity-100"><i className="fas fa-times"></i></button>
               </div>
               <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#f9f9f9]">
                  {chatHistory.map((msg, i) => (
                     <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-800 shadow-sm border border-gray-100 rounded-bl-none'}`}>
                           {msg.text}
                        </div>
                     </div>
                  ))}
                  {isTyping && <div className="text-xs font-bold text-gray-400 ml-4 animate-pulse">AI yozmoqda...</div>}
               </div>
               <div className="p-4 bg-white border-t border-gray-100 flex gap-3">
                  <input className="flex-1 bg-gray-50 rounded-xl px-5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100 transition-all" placeholder="Savolingizni yozing..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendChat()} />
                  <button onClick={sendChat} className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center hover:bg-gray-800 active:scale-95 transition-all"><i className="fas fa-paper-plane"></i></button>
               </div>
            </div>
         )}
      </div>

      {/* --- TOAST --- */}
      {toast && (
         <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl px-8 py-4 rounded-2xl shadow-2xl border border-white/20 font-bold text-sm animate-fade z-[100] text-slate-900">
            {toast}
         </div>
      )}

      {/* --- AUTH MODAL --- */}
      {showAuth && (
         <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-6">
            <div className="bg-white p-10 md:p-14 rounded-[40px] w-full max-w-md animate-fade shadow-2xl relative">
               <button onClick={() => setShowAuth(false)} className="absolute top-8 right-8 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100"><i className="fas fa-times"></i></button>
               <h2 className="text-3xl font-black mb-8 text-center tracking-tight">Tizimga Kirish</h2>
               <div className="space-y-4">
                  <input placeholder="Ismingiz" className="w-full h-16 bg-[#f5f5f7] rounded-2xl px-6 font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={loginForm.name} onChange={e => setLoginForm({...loginForm, name: e.target.value})} />
                  <input placeholder="Telefon (+998)" className="w-full h-16 bg-[#f5f5f7] rounded-2xl px-6 font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={loginForm.phone} onChange={e => setLoginForm({...loginForm, phone: e.target.value})} />
                  <button onClick={handleLogin} className="w-full h-16 bg-black text-white rounded-2xl font-bold text-sm uppercase tracking-widest mt-6 tap-active shadow-xl hover:bg-gray-900 transition-all">Kirish</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);