
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
const notifyTelegram = async (msg: string) => {
  try {
    await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, text: msg, parse_mode: 'HTML' })
    });
  } catch (e) { console.error("Telegram Error:", e); }
};

const formatMoney = (amount: number) => amount.toLocaleString() + " UZS";

// ==========================================
// 3. COMPONENTS
// ==========================================

// --- Navbar ---
const Navbar = ({ view, setView, user, toggleAuth, onLogout }: any) => {
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
            <button onClick={() => { setView('home'); document.getElementById('brands')?.scrollIntoView(); }} className="hover:text-black">Brendlar</button>
            <button onClick={() => { setView('home'); document.getElementById('services')?.scrollIntoView(); }} className="hover:text-black">Xizmatlar</button>
            <button onClick={() => { setView('home'); document.getElementById('benefits')?.scrollIntoView(); }} className="hover:text-black">Afzalliklar</button>
            <button onClick={() => { setView('home'); document.getElementById('filiallar')?.scrollIntoView(); }} className="hover:text-black">Filiallar</button>
            
            {user ? (
              <div className="flex items-center space-x-4 ml-4">
                <button onClick={() => setView('cabinet')} className="text-[#007aff] font-bold">Kabinet</button>
                {user.isAdmin && <button onClick={() => setView('admin')} className="text-black font-bold">Admin</button>}
                <button onClick={onLogout} className="text-red-500"><i className="fas fa-sign-out-alt"></i></button>
              </div>
            ) : (
              <button onClick={toggleAuth} className="text-black font-bold">Kirish</button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-white transform ${isOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-300 md:hidden pt-20 px-6`}>
         <div className="flex flex-col space-y-6 text-xl font-bold">
            <button onClick={() => { setIsOpen(false); document.getElementById('brands')?.scrollIntoView(); }}>Brendlar</button>
            <button onClick={() => { setIsOpen(false); document.getElementById('services')?.scrollIntoView(); }}>Xizmatlar</button>
            <button onClick={() => { setIsOpen(false); setView('cabinet'); }} className="text-[#007aff]">Kabinet</button>
            {user ? (
               <button onClick={() => { setIsOpen(false); onLogout(); }} className="text-red-500">Chiqish</button>
            ) : (
               <button onClick={() => { setIsOpen(false); toggleAuth(); }}>Kirish</button>
            )}
         </div>
      </div>
    </>
  );
};

// --- Main App ---
const App = () => {
  const [view, setView] = useState('home');
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [loginForm, setLoginForm] = useState({ name: '', phone: '' });
  const [toast, setToast] = useState<string | null>(null);
  
  // Data State
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [checker, setChecker] = useState({ brand: '', model: '', year: '', km: '' });
  const [checkResult, setCheckResult] = useState<any>(null);
  const [cars, setCars] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  
  // Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([{ role: 'ai', text: 'Salom! Sizga qanday yordam bera olaman?' }]);
  const [isTyping, setIsTyping] = useState(false);

  // Initialize
  useEffect(() => {
    const u = localStorage.getItem('mkm_user');
    if (u) {
      const parsed = JSON.parse(u);
      setUser(parsed);
      loadUserData(parsed.uid);
    }
    const savedOrders = localStorage.getItem('mkm_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const loadUserData = (uid: string) => {
    const savedCars = localStorage.getItem(`mkm_cars_${uid}`);
    if (savedCars) setCars(JSON.parse(savedCars));
  };

  const showToastMsg = (msg: string) => {
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
    localStorage.setItem('mkm_user', JSON.stringify(newUser));
    setShowAuth(false);
    showToastMsg(`Xush kelibsiz, ${newUser.name}`);
    await notifyTelegram(`👤 <b>Yangi Foydalanuvchi</b>\nIsm: ${newUser.name}\nTel: ${newUser.phone}`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mkm_user');
    setView('home');
  };

  // Order Logic
  const handleOrder = async (type: string, details: string) => {
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
    localStorage.setItem('mkm_orders', JSON.stringify(updated));
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
    } catch {
      setChatHistory(prev => [...prev, { role: 'ai', text: 'Kechirasiz, aloqada xatolik.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Cabinet Logic
  const addCar = async (carData: any) => {
    const newCar = { ...carData, id: Date.now(), lastOil: parseInt(carData.lastOil), daily: parseInt(carData.daily) };
    const updated = [...cars, newCar];
    setCars(updated);
    localStorage.setItem(`mkm_cars_${user.uid}`, JSON.stringify(updated));
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
             <h2 className="text-3xl font-bold mb-8">Qo'llab-quvvatlanadigan brendlar</h2>
             <div className="grid md:grid-cols-3 gap-6">
               {Object.keys(CAR_DATA).map(brand => (
                 <div key={brand} className="apple-glass p-8 squircle hover:shadow-xl transition-all">
                    <h3 className="text-2xl font-bold capitalize mb-2">{brand === 'liauto' ? 'Li Auto' : brand}</h3>
                    <p className="text-gray-500 text-sm mb-6">Million km standartlariga mos eng so'nggi {brand} modellari</p>
                    <button onClick={() => setSelectedBrand(brand)} className="bg-[#f5f5f7] px-6 py-2 rounded-xl text-sm font-bold hover:bg-black hover:text-white transition-colors">Modellarni tanlash</button>
                 </div>
               ))}
             </div>
          </section>

          {/* Model Selection Modal */}
          {selectedBrand && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
               <div className="bg-white rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 animate-fade">
                  <div className="flex justify-between items-center mb-8">
                     <h2 className="text-3xl font-bold capitalize">{selectedBrand} Modellari</h2>
                     <button onClick={() => setSelectedBrand(null)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"><i className="fas fa-times"></i></button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                     {Object.entries(CAR_DATA[selectedBrand]).map(([model, info]: any) => (
                        <div key={model} className="border p-6 rounded-3xl hover:border-[#007aff] transition-colors">
                           <h4 className="text-xl font-bold mb-2">{model}</h4>
                           <p className="text-gray-500 text-sm mb-4">{info.desc}</p>
                           <div className="flex justify-between items-center">
                              <span className="font-bold text-[#007aff]">{formatMoney(info.price)}</span>
                              <button onClick={() => { handleOrder(selectedBrand, `Model: ${model}`); setSelectedBrand(null); }} className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold">Buyurtma</button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          )}

          {/* Services */}
          <section id="services" className="py-16 px-6 max-w-7xl mx-auto">
             <h2 className="text-3xl font-bold mb-8">Maxsus xizmatlar</h2>
             <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-8 squircle shadow-sm border border-gray-100">
                   <div className="text-4xl mb-4">🚀</div>
                   <h3 className="text-2xl font-bold mb-2">Million km Express</h3>
                   <p className="text-gray-500 mb-6">Million km standardi asosida, manzilga borib xizmat ko'rsatish.</p>
                   <button onClick={() => handleOrder('Express', 'Manzilga borish')} className="bg-[#007aff] text-white px-6 py-3 rounded-xl font-bold text-sm w-full">Xizmatni tanlash</button>
                </div>
                <div className="bg-white p-8 squircle shadow-sm border border-gray-100">
                   <div className="text-4xl mb-4">⛽</div>
                   <h3 className="text-2xl font-bold mb-2">Million km Fuel</h3>
                   <p className="text-gray-500 mb-6">Million km talablariga mos, sifatli yoqilg'i yetkazib berish.</p>
                   <button onClick={() => handleOrder('Fuel', 'Yoqilg\'i yetkazish')} className="bg-black text-white px-6 py-3 rounded-xl font-bold text-sm w-full">Xarid qilish</button>
                </div>
             </div>
          </section>

          {/* Benefits */}
          <section id="benefits" className="py-16 px-6 max-w-7xl mx-auto bg-white rounded-[40px] mb-16">
             <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Nega aynan Million km?</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">Chunki biz shunchaki avtomobilga xizmat ko'rsatmaymiz — sizga ishonch, kafolat va qulaylik hadya qilamiz.</p>
             </div>
             <div className="grid md:grid-cols-3 gap-8">
                {BENEFITS.map((b, i) => (
                   <div key={i} className="text-center p-6">
                      <div className="w-16 h-16 bg-gray-50 text-[#007aff] rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">
                         <i className={`fas ${b.icon}`}></i>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{b.title}</h3>
                      <p className="text-gray-500 text-sm">{b.desc}</p>
                   </div>
                ))}
             </div>
          </section>

          {/* Status Checker */}
          <section id="status" className="py-20 px-6 max-w-3xl mx-auto text-center">
             <h2 className="text-3xl font-bold mb-2">Mashinangiz statusini tekshiring</h2>
             <p className="text-gray-500 mb-10">Million km xizmatiga mos ekanligini aniqlang</p>
             
             <div className="bg-white p-8 squircle-lg shadow-xl border border-gray-100 text-left">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                   <select className="w-full h-14 bg-[#f5f5f7] rounded-xl px-4 font-bold outline-none" value={checker.brand} onChange={e => setChecker({...checker, brand: e.target.value, model: ''})}>
                      <option value="">Brendni tanlang</option>
                      {Object.keys(CAR_DATA).map(b => <option key={b} value={b}>{b.toUpperCase()}</option>)}
                   </select>
                   <select className="w-full h-14 bg-[#f5f5f7] rounded-xl px-4 font-bold outline-none" disabled={!checker.brand} value={checker.model} onChange={e => setChecker({...checker, model: e.target.value})}>
                      <option value="">Modelni tanlang</option>
                      {checker.brand && Object.keys(CAR_DATA[checker.brand]).map(m => <option key={m} value={m}>{m}</option>)}
                   </select>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                   <input type="number" placeholder="Yili (2023)" className="w-full h-14 bg-[#f5f5f7] rounded-xl px-4 font-bold outline-none" value={checker.year} onChange={e => setChecker({...checker, year: e.target.value})} />
                   <input type="text" placeholder="KM (45000)" className="w-full h-14 bg-[#f5f5f7] rounded-xl px-4 font-bold outline-none" value={checker.km} onChange={e => setChecker({...checker, km: e.target.value})} />
                </div>
                <button onClick={runCheck} className="w-full h-14 bg-black text-white rounded-xl font-bold text-sm uppercase tracking-widest tap-active">Tekshirish</button>
                
                {checkResult && (
                   <div className={`mt-6 p-6 rounded-2xl ${checkResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} font-bold text-center`}>
                      <p className="mb-4">{checkResult.text}</p>
                      {checkResult.success ? (
                         <button onClick={() => setShowAuth(true)} className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm">Ro'yxatdan o'tish</button>
                      ) : (
                         <button onClick={() => handleOrder('Bir martalik', `${checker.brand} ${checker.model}`)} className="px-6 py-2 bg-red-600 text-white rounded-lg text-sm">Bir martalik xizmat</button>
                      )}
                   </div>
                )}
             </div>
          </section>

          {/* Branches */}
          <section id="filiallar" className="py-16 px-6 max-w-7xl mx-auto">
             <h2 className="text-3xl font-bold mb-8 text-center">Million km filiallari</h2>
             <div className="rounded-[32px] overflow-hidden shadow-2xl h-[400px]">
                <iframe src="https://yandex.uz/map-widget/v1/?ll=70.893061,40.546387&z=15&l=map&pt=70.893061,40.546387,pm2rdm" width="100%" height="100%" frameBorder="0"></iframe>
             </div>
          </section>

          {/* Footer */}
          <footer className="bg-white py-12 text-center border-t border-gray-200 mt-20">
             <h3 className="text-2xl font-bold mb-2">Million km</h3>
             <p className="text-gray-500 mb-8">Dvigatel uchun yangi avlod ishonchi</p>
             <div className="flex justify-center space-x-6 text-gray-400 mb-8">
                <a href="#" className="hover:text-[#007aff]">Instagram</a>
                <a href="#" className="hover:text-[#007aff]">Telegram</a>
                <a href="#" className="hover:text-[#007aff]">YouTube</a>
             </div>
             <p className="text-black font-bold">📞 Call center: +998 71 123 45 67</p>
          </footer>
        </div>
      )}

      {/* --- CABINET VIEW --- */}
      {view === 'cabinet' && user && (
         <div className="pt-24 px-6 max-w-7xl mx-auto animate-fade">
            <div className="flex justify-between items-center mb-10">
               <div>
                  <h1 className="text-3xl font-bold">Salom, {user.name}</h1>
                  <p className="text-gray-500">Shaxsiy garajingiz</p>
               </div>
               <button onClick={() => { 
                  const b = prompt("Brend?"); const m = prompt("Model?"); const y = prompt("Yil?"); const l = prompt("Oxirgi moy km?"); const d = prompt("Kunlik km?");
                  if(b&&m&&y&&l&&d) addCar({ brand: b, model: m, year: y, lastOil: l, daily: d });
               }} className="bg-[#007aff] text-white px-6 py-3 rounded-xl font-bold text-sm">+ Mashina</button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
               {cars.length === 0 ? <p className="text-gray-500">Garaj bo'sh.</p> : cars.map(car => {
                  const limit = 8000;
                  const current = 2000; // Mock current progress
                  const percent = (current / limit) * 100;
                  return (
                     <div key={car.id} className="bg-white p-8 squircle shadow-lg border border-gray-100">
                        <div className="flex justify-between mb-6">
                           <h3 className="text-xl font-bold">{car.brand} {car.model}</h3>
                           <span className="text-gray-400">{car.year}</span>
                        </div>
                        <div className="mb-4">
                           <div className="flex justify-between text-sm font-bold mb-2">
                              <span className="text-gray-500">Servisgacha</span>
                              <span className="text-[#007aff]">{limit - current} km</span>
                           </div>
                           <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#007aff]" style={{ width: `${percent}%` }}></div>
                           </div>
                        </div>
                        <button onClick={() => handleOrder('Servis', `${car.brand} ${car.model}`)} className="w-full py-3 bg-black text-white rounded-xl font-bold text-sm mt-4">Servisga yozilish</button>
                     </div>
                  );
               })}
            </div>
         </div>
      )}

      {/* --- ADMIN VIEW --- */}
      {view === 'admin' && user?.isAdmin && (
         <div className="pt-24 px-6 max-w-7xl mx-auto animate-fade">
            <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
               <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200">
                     <tr>
                        <th className="p-6">Mijoz</th>
                        <th className="p-6">Xizmat</th>
                        <th className="p-6">Vaqt</th>
                     </tr>
                  </thead>
                  <tbody>
                     {orders.map(o => (
                        <tr key={o.id} className="border-b border-gray-100">
                           <td className="p-6">
                              <div className="font-bold">{o.userName}</div>
                              <div className="text-sm text-gray-500">{o.phone}</div>
                           </td>
                           <td className="p-6">
                              <div className="font-bold text-[#007aff]">{o.type}</div>
                              <div className="text-sm text-gray-500">{o.details}</div>
                           </td>
                           <td className="p-6 text-sm text-gray-400">{o.timestamp}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      )}

      {/* --- CHAT WIDGET --- */}
      <div className="fixed bottom-6 right-6 z-50">
         {!chatOpen ? (
            <button onClick={() => setChatOpen(true)} className="w-16 h-16 bg-[#007aff] text-white rounded-full shadow-2xl flex items-center justify-center text-2xl hover:scale-110 transition-transform">
               <i className="fas fa-comment-dots"></i>
            </button>
         ) : (
            <div className="w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-fade h-[500px]">
               <div className="p-4 bg-[#007aff] text-white flex justify-between items-center">
                  <span className="font-bold">Million km Support</span>
                  <button onClick={() => setChatOpen(false)}><i className="fas fa-times"></i></button>
               </div>
               <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f5f5f7]">
                  {chatHistory.map((msg, i) => (
                     <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-[#007aff] text-white' : 'bg-white text-black shadow-sm'}`}>
                           {msg.text}
                        </div>
                     </div>
                  ))}
                  {isTyping && <div className="text-xs text-gray-400 ml-2">Yozmoqda...</div>}
               </div>
               <div className="p-4 bg-white border-t flex gap-2">
                  <input className="flex-1 bg-gray-100 rounded-xl px-4 text-sm outline-none" placeholder="Xabar yozing..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendChat()} />
                  <button onClick={sendChat} className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center"><i className="fas fa-paper-plane"></i></button>
               </div>
            </div>
         )}
      </div>

      {/* --- TOAST --- */}
      {toast && (
         <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-gray-200 font-bold animate-fade z-[100]">
            {toast}
         </div>
      )}

      {/* --- AUTH MODAL --- */}
      {showAuth && (
         <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="bg-white p-10 rounded-[40px] w-full max-w-md animate-fade shadow-2xl">
               <h2 className="text-3xl font-bold mb-8 text-center">Tizimga Kirish</h2>
               <div className="space-y-4">
                  <input placeholder="Ismingiz" className="w-full h-14 bg-[#f5f5f7] rounded-xl px-6 font-bold outline-none" value={loginForm.name} onChange={e => setLoginForm({...loginForm, name: e.target.value})} />
                  <input placeholder="Telefon (+998)" className="w-full h-14 bg-[#f5f5f7] rounded-xl px-6 font-bold outline-none" value={loginForm.phone} onChange={e => setLoginForm({...loginForm, phone: e.target.value})} />
                  <button onClick={handleLogin} className="w-full h-14 bg-black text-white rounded-xl font-bold text-sm uppercase tracking-widest mt-4 tap-active">Kirish</button>
                  <button onClick={() => setShowAuth(false)} className="w-full text-center text-gray-400 font-bold text-xs mt-4">YOPISH</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
