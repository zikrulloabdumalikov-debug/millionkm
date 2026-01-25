
import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// ==========================================
// 1. DATA & CONSTANTS
// ==========================================
const TG_TOKEN = "7722483735:AAG_LZ1Bg0H-mnqAlnw4OknNj-BTrqM8CWM";
const TG_CHAT_ID = "-1003461463026";

const CAR_DATA = {
  "chevrolet": {
    "Nexia 3": { maxAge: 5, maxKm: 100000, price: 849000, desc: "Ishonchli va tejamkor Nexia 3." },
    "Cobalt": { maxAge: 5, maxKm: 100000, price: 849000, desc: "Oila avtomobili Cobalt." },
    "Gentra": { maxAge: 5, maxKm: 100000, price: 849000, desc: "Komfortli Gentra." },
    "Onix": { maxAge: 3, maxKm: 50000, price: 1049000, desc: "Zamonaviy Onix turbo." },
    "Tracker": { maxAge: 3, maxKm: 50000, price: 1049000, desc: "Krossover Tracker." },
    "Malibu": { maxAge: 5, maxKm: 50000, price: 1299000, desc: "Biznes klass Malibu." }
  },
  "kia": {
    "Sonet": { maxAge: 3, maxKm: 50000, price: 990000, desc: "KIA Sonet krossoveri." },
    "K5": { maxAge: 3, maxKm: 50000, price: 1350000, desc: "Elegant K5 sedan." },
    "Sportage": { maxAge: 3, maxKm: 50000, price: 1550000, desc: "Sportage yo'ltanlamasi." }
  },
  "liauto": {
    "L6": { maxAge: 3, maxKm: 50000, price: 1800000, desc: "Premium Li Auto L6." },
    "L7": { maxAge: 3, maxKm: 50000, price: 1900000, desc: "Li L7 gibrid tizimi." },
    "L9": { maxAge: 3, maxKm: 50000, price: 2100000, desc: "Flagman Li L9." }
  }
};

const BENEFITS = [
  { title: "Million km kafolat", desc: "Avtomobilingizga 1 mln kmgacha texnik kafolat beramiz.", icon: "fa-shield-halved" },
  { title: "Bepul avtomoyka", desc: "Har safar moy almashtirishda — bepul xizmat.", icon: "fa-droplet" },
  { title: "Original mahsulotlar", desc: "Faqat eng yuqori sifatdagi original mahsulotlar.", icon: "fa-check-double" }
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

// ==========================================
// 3. MAIN APP
// ==========================================
const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'cabinet' | 'admin'>('home');
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [loginForm, setLoginForm] = useState({ name: '', phone: '', password: '' });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  // Data States
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [checker, setChecker] = useState({ brand: '', model: '', year: '', km: '' });
  const [checkResult, setCheckResult] = useState<{ success: boolean; text: string } | null>(null);
  const [cars, setCars] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  
  // AI States
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiHistory, setAiHistory] = useState<any[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Persistence
  useEffect(() => {
    const savedUser = localStorage.getItem('mkm_v3_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    const savedOrders = localStorage.getItem('mkm_v3_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    if (user) {
      const savedCars = localStorage.getItem(`mkm_v3_cars_${user.uid}`);
      if (savedCars) setCars(JSON.parse(savedCars));
    }
  }, [user]);

  const showMsg = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Auth Logic
  const handleLogin = () => {
    if (loginForm.name.toLowerCase() === 'admin' && loginForm.password === '123') {
      const u = { uid: 'a1', name: 'Admin', isAdmin: true, phone: 'Admin' };
      setUser(u);
      localStorage.setItem('mkm_v3_user', JSON.stringify(u));
      setShowAuth(false);
      showMsg("Xush kelibsiz, Admin");
      return;
    }
    if (!loginForm.name || !loginForm.phone) return showMsg("Ma'lumotlar to'liq emas", "error");
    const u = { uid: Date.now().toString(), name: loginForm.name, phone: loginForm.phone, isAdmin: false };
    setUser(u);
    localStorage.setItem('mkm_v3_user', JSON.stringify(u));
    setShowAuth(false);
    showMsg(`Salom, ${u.name}`);
    notifyTelegram(`👤 <b>Yangi Foydalanuvchi</b>\nIsm: ${u.name}\nTel: ${u.phone}`);
  };

  // AI Mechanic Logic
  const askAi = async () => {
    if (!aiInput.trim()) return;
    const msg = aiInput;
    setAiInput('');
    setAiHistory(prev => [...prev, { role: 'user', text: msg }]);
    setIsAiTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Siz Million KM servisining professional mexanigisiz. Mijozga tushunarli va do'stona maslahat bering. Savol: ${msg}`
      });
      const reply = response.text;
      setAiHistory(prev => [...prev, { role: 'ai', text: reply }]);
      notifyTelegram(`🤖 <b>AI Chat</b>\nMijoz: ${user?.name || 'Mehmon'}\nSavol: ${msg}\nJavob: ${reply}`);
    } catch (e) {
      setAiHistory(prev => [...prev, { role: 'ai', text: 'Kechirasiz, aloqada xatolik yuz berdi.' }]);
    } finally {
      setIsAiTyping(false);
    }
  };

  // Ordering Logic
  const placeOrder = async (brand: string, model: string, type: string) => {
    if (!user) return setShowAuth(true);
    const order = {
      id: Date.now().toString(),
      userName: user.name,
      phone: user.phone,
      brand,
      model,
      type,
      time: new Date().toLocaleString()
    };
    const updated = [order, ...orders];
    setOrders(updated);
    localStorage.setItem('mkm_v3_orders', JSON.stringify(updated));
    showMsg("Buyurtma qabul qilindi!");
    await notifyTelegram(`📦 <b>Yangi Buyurtma</b>\nMijoz: ${user.name}\nTel: ${user.phone}\nAvto: ${brand} ${model}\nXizmat: ${type}`);
  };

  return (
    <div className="min-h-screen">
      {/* --- DYNAMIC ISLAND TOAST --- */}
      {toast && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[300] w-full max-w-[380px] px-6 pointer-events-none animate-dynamic-island">
          <div className={`mt-4 p-4 rounded-full apple-glass shadow-2xl flex items-center space-x-4 border border-white/40 ${toast.type === 'error' ? 'bg-red-500/90 text-white' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${toast.type === 'error' ? 'bg-white/20' : 'bg-blue-600 text-white'}`}>
              <i className={`fas ${toast.type === 'error' ? 'fa-exclamation-triangle' : 'fa-check'}`}></i>
            </div>
            <span className="font-bold text-sm tracking-tight">{toast.message}</span>
          </div>
        </div>
      )}

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-[100] p-6">
        <div className="max-w-7xl mx-auto h-16 apple-glass squircle px-8 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('home')}>
             <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white"><i className="fas fa-road"></i></div>
             <span className="font-black text-xl tracking-tighter">Million KM</span>
          </div>
          <div className="hidden md:flex space-x-10 text-[10px] font-black uppercase tracking-widest text-gray-400">
             <button onClick={() => setView('home')} className={view === 'home' ? 'text-blue-600' : ''}>Asosiy</button>
             <button onClick={() => document.getElementById('brands')?.scrollIntoView({behavior:'smooth'})}>Brendlar</button>
             <button onClick={() => document.getElementById('status')?.scrollIntoView({behavior:'smooth'})}>Status</button>
             {user?.isAdmin && <button onClick={() => setView('admin')} className={view === 'admin' ? 'text-black' : ''}>Admin</button>}
          </div>
          <div className="flex items-center space-x-4">
             {user ? (
               <button onClick={() => setView('cabinet')} className="bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest tap-active">Profil</button>
             ) : (
               <button onClick={() => setShowAuth(true)} className="bg-black text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest tap-active">Kirish</button>
             )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto pt-32 px-6 pb-40">
        {/* --- HOME VIEW --- */}
        {view === 'home' && (
          <div className="space-y-32 animate-spring">
             {/* Hero */}
             <section className="text-center py-20">
                <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-10">Premium Auto Service 2025</div>
                <h1 className="text-6xl md:text-[100px] font-black tracking-tighter leading-none text-slate-900 mb-8">
                  Dvigatelingizni <br /> <span className="text-blue-600">Saqlab Qolamiz.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-gray-500 text-xl font-medium mb-12">
                   Ko'pchilik dvigatelni ta'mirlaydi. Biz esa uni saqlab qolamiz. O'zbekistondagi 1-raqamli kafolatli servis.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                   <button onClick={() => document.getElementById('brands')?.scrollIntoView({behavior:'smooth'})} className="px-12 h-16 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs tap-active">Boshlash</button>
                   <button onClick={() => document.getElementById('status')?.scrollIntoView({behavior:'smooth'})} className="px-12 h-16 bg-white border border-gray-100 rounded-2xl font-black uppercase tracking-widest text-xs tap-active">Statusni tekshirish</button>
                </div>
             </section>

             {/* Brands Grid */}
             <section id="brands" className="space-y-12">
                <h2 className="text-4xl font-black tracking-tighter text-center uppercase">Qo'llab-quvvatlanadigan brendlar</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {Object.keys(CAR_DATA).map(brand => (
                    <div key={brand} onClick={() => setSelectedBrand(brand)} className="apple-glass p-12 squircle hover:border-blue-500 transition-all cursor-pointer group shadow-xl">
                       <h3 className="text-3xl font-black uppercase mb-4">{brand}</h3>
                       <p className="text-gray-400 text-sm font-bold uppercase mb-8">Premium servis tanlovi</p>
                       <button className="w-full py-5 bg-gray-50 rounded-xl font-black text-[10px] uppercase group-hover:bg-black group-hover:text-white transition-all">Modellarni ko'rish</button>
                    </div>
                  ))}
                </div>
             </section>

             {/* Model Selection Overlay */}
             {selectedBrand && (
               <div className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-md flex items-center justify-center p-6">
                  <div className="bg-white p-12 squircle-lg w-full max-w-5xl max-h-[85vh] overflow-y-auto relative animate-spring">
                     <button onClick={() => setSelectedBrand(null)} className="absolute top-10 right-10 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center hover:bg-black hover:text-white transition-all"><i className="fas fa-times"></i></button>
                     <h2 className="text-5xl font-black tracking-tighter uppercase mb-12">{selectedBrand} Modellari</h2>
                     <div className="grid md:grid-cols-3 gap-8">
                       {Object.entries((CAR_DATA as any)[selectedBrand.toLowerCase()]).map(([model, info]: any) => (
                         <div key={model} className="p-8 border border-gray-100 rounded-[32px] hover:border-blue-600 transition-all">
                            <h4 className="text-2xl font-black mb-3">{model}</h4>
                            <p className="text-gray-400 text-sm mb-10 italic">"{info.desc}"</p>
                            <div className="flex justify-between items-center pt-8 border-t">
                               <span className="text-blue-600 font-black text-xl">{info.price.toLocaleString()} <span className="text-xs">UZS</span></span>
                               <button onClick={() => { placeOrder(selectedBrand!, model, "Kafolat"); setSelectedBrand(null); }} className="px-6 py-3 bg-black text-white rounded-xl font-black text-[10px] uppercase tap-active">Buyurtma</button>
                            </div>
                         </div>
                       ))}
                     </div>
                  </div>
               </div>
             )}

             {/* Benefits */}
             <section className="bg-white rounded-[40px] p-20 shadow-sm">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Nega bizni tanlashadi?</h2>
                  <p className="text-gray-400 font-medium max-w-xl mx-auto">Chunki biz shunchaki mashina moyini almashtirmaymiz — sizga ishonch hadya qilamiz.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-12">
                   {BENEFITS.map((b, i) => (
                     <div key={i} className="text-center group">
                        <div className="w-20 h-20 bg-gray-50 text-blue-600 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                           <i className={`fas ${b.icon}`}></i>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{b.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                     </div>
                   ))}
                </div>
             </section>

             {/* Status Checker */}
             <section id="status" className="p-12 md:p-24 apple-glass squircle shadow-2xl text-center">
                <h2 className="text-5xl font-black tracking-tighter uppercase mb-4">Statusni Tekshiring</h2>
                <p className="text-gray-400 font-bold mb-16 uppercase tracking-widest">Million KM kafolatiga mosligini aniqlang</p>
                <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto mb-16">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Brend</label>
                     <select className="w-full h-16 px-6 bg-gray-50 rounded-2xl font-bold outline-none" value={checker.brand} onChange={e => setChecker({...checker, brand: e.target.value, model: ''})}>
                       <option value="">Tanlang...</option>
                       {Object.keys(CAR_DATA).map(b => <option key={b} value={b}>{b.toUpperCase()}</option>)}
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Model</label>
                     <select className="w-full h-16 px-6 bg-gray-50 rounded-2xl font-bold outline-none" disabled={!checker.brand} value={checker.model} onChange={e => setChecker({...checker, model: e.target.value})}>
                       <option value="">Tanlang...</option>
                       {checker.brand && Object.keys((CAR_DATA as any)[checker.brand.toLowerCase()]).map(m => <option key={m} value={m}>{m}</option>)}
                     </select>
                   </div>
                   <input type="number" placeholder="Mashina yili (2023)" className="h-16 px-6 bg-gray-50 rounded-2xl font-bold" value={checker.year} onChange={e => setChecker({...checker, year: e.target.value})} />
                   <input type="text" placeholder="Yurgan masofasi (KM)" className="h-16 px-6 bg-gray-50 rounded-2xl font-bold" value={checker.km} onChange={e => setChecker({...checker, km: e.target.value})} />
                </div>
                <button onClick={() => {
                  if(!checker.brand || !checker.model || !checker.year || !checker.km) return showMsg("Ma'lumotlarni to'ldiring", "error");
                  const config = (CAR_DATA as any)[checker.brand.toLowerCase()]?.[checker.model];
                  const age = new Date().getFullYear() - parseInt(checker.year);
                  const kmVal = parseInt(checker.km.replace(/\D/g, ''));
                  if (age <= config.maxAge && kmVal <= config.maxKm) {
                    setCheckResult({ success: true, text: "✅ Tabriklaymiz! Avtomobilingiz Million KM kafolatiga mos." });
                  } else {
                    setCheckResult({ success: false, text: "⚠️ Afsuski, limitlardan oshgan. Lekin bir martalik xizmat mavjud." });
                  }
                }} className="px-20 h-16 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs shadow-2xl tap-active">Tahlilni boshlash</button>
                {checkResult && (
                  <div className={`mt-16 p-10 rounded-[40px] border animate-spring ${checkResult.success ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                    <p className="text-xl font-black">{checkResult.text}</p>
                    <button onClick={() => {
                       if(checkResult.success) setShowAuth(true);
                       else placeOrder(checker.brand, checker.model, "Express");
                    }} className="mt-6 px-10 py-3 bg-black text-white rounded-xl font-bold text-xs uppercase tracking-widest">
                       {checkResult.success ? "Ro'yxatdan o'tish" : "Bir martalik xizmat"}
                    </button>
                  </div>
                )}
             </section>

             {/* Branch Map */}
             <section className="space-y-12">
                <h2 className="text-4xl font-black tracking-tighter text-center uppercase">Bizning Filiallar</h2>
                <div className="rounded-[48px] overflow-hidden shadow-2xl h-[450px] border border-white">
                  <iframe src="https://yandex.uz/map-widget/v1/?ll=70.893061,40.546387&z=15&l=map&pt=70.893061,40.546387,pm2rdm" width="100%" height="100%" frameBorder="0"></iframe>
                </div>
             </section>
          </div>
        )}

        {/* --- CABINET VIEW --- */}
        {view === 'cabinet' && user && (
          <div className="space-y-12 animate-spring">
             <div className="apple-glass p-12 squircle shadow-xl flex justify-between items-center">
                <div>
                   <h2 className="text-5xl font-black tracking-tighter">Salom, {user.name}!</h2>
                   <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-2">Shaxsiy garaj monitoringi</p>
                </div>
                <button onClick={() => {
                   const b = prompt("Brend?"); const m = prompt("Model?");
                   if(b&&m) {
                      const c = { id: Date.now(), brand: b, model: m, lastOil: 40000, daily: 50 };
                      const updated = [...cars, c]; setCars(updated);
                      localStorage.setItem(`mkm_v3_cars_${user.uid}`, JSON.stringify(updated));
                   }
                }} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest tap-active shadow-xl">Mashina qo'shish</button>
             </div>
             <div className="grid md:grid-cols-2 gap-8">
                {cars.length === 0 ? (
                  <div className="col-span-2 py-20 text-center text-gray-400 font-bold italic">Garajingiz hali bo'sh. Mashina qo'shing.</div>
                ) : cars.map(car => {
                  const limit = 8000;
                  const current = 3500; // Mock data
                  const percent = (current / limit) * 100;
                  return (
                    <div key={car.id} className="bg-white p-12 squircle shadow-xl border border-gray-100">
                       <h3 className="text-3xl font-black mb-8">{car.brand} {car.model}</h3>
                       <div className="space-y-4">
                          <div className="flex justify-between text-[10px] font-black uppercase text-gray-400"><span>Servisgacha</span><span>{limit-current} KM</span></div>
                          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-600 rounded-full" style={{ width: `${percent}%` }}></div></div>
                          <button onClick={() => placeOrder(car.brand, car.model, "Garaj Servis")} className="w-full py-4 bg-black text-white rounded-xl font-black text-[10px] uppercase mt-4 tap-active">Servisga yozilish</button>
                       </div>
                    </div>
                  );
                })}
             </div>
             <button onClick={() => { setUser(null); localStorage.removeItem('mkm_v3_user'); setView('home'); }} className="text-red-500 font-bold uppercase tracking-widest text-xs">Tizimdan chiqish</button>
          </div>
        )}

        {/* --- ADMIN VIEW --- */}
        {view === 'admin' && user?.isAdmin && (
          <div className="space-y-12 animate-spring">
             <h2 className="text-5xl font-black tracking-tighter">Admin Panel</h2>
             <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-gray-100">
                <table className="w-full text-left">
                   <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="p-8 text-xs font-black uppercase tracking-widest text-gray-400">Mijoz</th>
                        <th className="p-8 text-xs font-black uppercase tracking-widest text-gray-400">Avto</th>
                        <th className="p-8 text-xs font-black uppercase tracking-widest text-gray-400">Vaqt</th>
                      </tr>
                   </thead>
                   <tbody>
                      {orders.map(o => (
                        <tr key={o.id} className="border-b hover:bg-gray-50 transition-colors">
                           <td className="p-8"><div className="font-black">{o.userName}</div><div className="text-blue-600 text-xs font-bold">{o.phone}</div></td>
                           <td className="p-8"><div className="font-bold">{o.brand} {o.model}</div><div className="text-xs text-gray-400">{o.type}</div></td>
                           <td className="p-8 text-xs font-bold text-gray-400">{o.time}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}
      </main>

      {/* --- AI CHAT WIDGET --- */}
      <div className="fixed bottom-8 right-8 z-[150]">
        {!aiOpen ? (
          <button onClick={() => setAiOpen(true)} className="w-16 h-16 bg-black text-white rounded-2xl shadow-2xl flex items-center justify-center tap-active group">
            <i className="fas fa-robot text-xl"></i>
            <span className="absolute right-20 bg-black text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">AI Mexanik</span>
          </button>
        ) : (
          <div className="w-[380px] h-[550px] bg-white rounded-[40px] shadow-2xl flex flex-col overflow-hidden animate-spring border border-gray-100">
             <div className="p-6 bg-black text-white flex justify-between items-center">
                <div className="flex items-center space-x-3"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div><span className="font-bold text-sm">AI Mexanik</span></div>
                <button onClick={() => setAiOpen(false)}><i className="fas fa-times"></i></button>
             </div>
             <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {aiHistory.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-semibold leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border shadow-sm'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isAiTyping && <div className="text-[10px] font-black text-gray-300 uppercase animate-pulse ml-2">AI o'ylamoqda...</div>}
             </div>
             <div className="p-4 bg-white border-t flex gap-2">
                <input className="flex-1 h-12 bg-gray-100 rounded-xl px-4 text-sm font-bold outline-none" placeholder="Muammo haqida yozing..." value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && askAi()} />
                <button onClick={askAi} className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center"><i className="fas fa-paper-plane"></i></button>
             </div>
          </div>
        )}
      </div>

      {/* --- AUTH MODAL --- */}
      {showAuth && (
        <div className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-md flex items-center justify-center p-6">
           <div className="bg-white p-12 squircle-lg w-full max-w-md shadow-2xl relative animate-spring">
              <button onClick={() => setShowAuth(false)} className="absolute top-10 right-10 text-gray-300 hover:text-black transition-colors"><i className="fas fa-times text-xl"></i></button>
              <h2 className="text-4xl font-black tracking-tighter mb-10 text-center uppercase">Million KM</h2>
              <div className="space-y-4">
                 <input className="w-full h-16 bg-gray-50 rounded-2xl px-6 font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Ism" value={loginForm.name} onChange={e => setLoginForm({...loginForm, name: e.target.value})} />
                 <input className="w-full h-16 bg-gray-50 rounded-2xl px-6 font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Telefon / Admin ID" value={loginForm.phone} onChange={e => setLoginForm({...loginForm, phone: e.target.value})} />
                 {loginForm.name.toLowerCase() === 'admin' && <input className="w-full h-16 bg-gray-50 rounded-2xl px-6 font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all" type="password" placeholder="Parol" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} />}
                 <button onClick={handleLogin} className="w-full h-16 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs tap-active mt-4 shadow-xl">Davom etish</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

// Start Render
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
