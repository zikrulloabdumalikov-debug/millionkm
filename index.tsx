
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// ==========================================
// 1. DATA & CONSTANTS
// ==========================================
const TG_TOKEN = "7722483735:AAG_LZ1Bg0H-mnqAlnw4OknNj-BTrqM8CWM";
const TG_CHAT_ID = "-1003461463026";

const CAR_DATA: any = {
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

const BENEFITS = [
  { title: "Million km kafolat", desc: "Dvigatelingizga 1 mln kmgacha rasmiy kafolat beradigan O'zbekistondagi yagona servis.", icon: "fa-shield-halved" },
  { title: "Bepul avtomoyka", desc: "Har safar moy almashtirishda biz avtomobilingizni bepul yuvib beramiz.", icon: "fa-droplet" },
  { title: "Faqat original", desc: "Faqat eng yuqori sifatdagi, sertifikatlangan moy va filtrlar ishlatiladi.", icon: "fa-check-double" },
  { title: "Mobil Brigada", desc: "Uyingizga yoki ofisingizga borib servis ko'rsatish imkoniyati mavjud.", icon: "fa-bolt-lightning" }
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

const formatMoney = (num: number) => num.toLocaleString('uz-UZ') + " UZS";

// ==========================================
// 3. COMPONENTS
// ==========================================
const App = () => {
  const [view, setView] = useState('home');
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [loginForm, setLoginForm] = useState({ name: '', phone: '', password: '' });
  const [toast, setToast] = useState<any>(null);
  
  // Data States
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [checker, setChecker] = useState({ brand: '', model: '', year: '', km: '' });
  const [checkResult, setCheckResult] = useState<any>(null);
  const [cars, setCars] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // AI States
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiHistory, setAiHistory] = useState<any[]>([{ role: 'ai', text: "Assalomu alaykum! Men Million KM AI mexanikman. Mashinangizdagi muammo haqida so'rang." }]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('mkm_premium_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    const savedOrders = localStorage.getItem('mkm_premium_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    if (user) {
      const savedCars = localStorage.getItem(`mkm_premium_cars_${user.uid}`);
      if (savedCars) setCars(JSON.parse(savedCars));
    }
  }, [user]);

  const showMsg = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogin = () => {
    if (loginForm.name.toLowerCase() === 'admin' && loginForm.password === '123') {
      const u = { uid: 'a1', name: 'Admin', phone: 'Admin', isAdmin: true };
      setUser(u);
      localStorage.setItem('mkm_premium_user', JSON.stringify(u));
      setShowAuth(false);
      showMsg("Xush kelibsiz, Admin");
      return;
    }
    if (!loginForm.name || !loginForm.phone) return showMsg("Ma'lumotlar to'liq emas", "error");
    const u = { uid: Date.now().toString(), name: loginForm.name, phone: loginForm.phone, isAdmin: false };
    setUser(u);
    localStorage.setItem('mkm_premium_user', JSON.stringify(u));
    setShowAuth(false);
    showMsg(`Xush kelibsiz, ${u.name}`);
    notifyTelegram(`👤 <b>Yangi Foydalanuvchi</b>\nIsm: ${u.name}\nTel: ${u.phone}`);
  };

  const askAi = async () => {
    if (!aiInput.trim() || isAiTyping) return;
    const msg = aiInput;
    setAiInput('');
    setAiHistory(prev => [...prev, { role: 'user', text: msg }]);
    setIsAiTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Siz Million KM servisining professional mexanigisiz. Mijozning savoliga o'zbek tilida, qisqa va aniq maslahat bering. Savol: ${msg}`
      });
      setAiHistory(prev => [...prev, { role: 'ai', text: response.text }]);
      notifyTelegram(`🤖 <b>AI Chat</b>\nMijoz: ${user?.name || 'Mehmon'}\nSavol: ${msg}\nJavob: ${response.text}`);
    } catch (e) {
      setAiHistory(prev => [...prev, { role: 'ai', text: "Kechirasiz, hozirda aloqa bilan bog'liq muammo mavjud." }]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const placeOrder = async (brand: string, model: string, type: string) => {
    if (!user) return setShowAuth(true);
    const order = {
      id: Date.now().toString(),
      userName: user.name,
      phone: user.phone,
      brand,
      model,
      type,
      time: new Date().toLocaleString('uz-UZ')
    };
    const updated = [order, ...orders];
    setOrders(updated);
    localStorage.setItem('mkm_premium_orders', JSON.stringify(updated));
    showMsg("Buyurtmangiz qabul qilindi!");
    await notifyTelegram(`📦 <b>Yangi Buyurtma</b>\nMijoz: ${user.name}\nTel: ${user.phone}\nAvto: ${brand} ${model}\nXizmat: ${type}`);
  };

  return (
    <div className="min-h-screen">
      {/* Dynamic Island Toast */}
      {toast && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[300] w-full max-w-[380px] px-6 pointer-events-none animate-dynamic-island">
          <div className={`mt-4 p-4 rounded-full apple-glass shadow-2xl flex items-center space-x-4 border border-white/40 ${toast.type === 'error' ? 'bg-red-500/90 text-white' : 'text-slate-900'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${toast.type === 'error' ? 'bg-white/20' : 'bg-blue-600 text-white'}`}>
              <i className={`fas ${toast.type === 'error' ? 'fa-warning' : 'fa-check'}`}></i>
            </div>
            <span className="font-bold text-sm tracking-tight">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] p-6">
        <div className="max-w-7xl mx-auto h-16 apple-glass squircle px-8 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('home')}>
             <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white shadow-xl"><i className="fas fa-road"></i></div>
             <span className="font-black text-xl tracking-tighter">Million KM</span>
          </div>
          <div className="hidden md:flex space-x-10 text-[10px] font-black uppercase tracking-widest text-gray-400">
             <button onClick={() => setView('home')} className={view === 'home' ? 'text-blue-600' : ''}>Asosiy</button>
             <button onClick={() => { setView('home'); setTimeout(() => document.getElementById('brands')?.scrollIntoView({behavior:'smooth'}), 100); }}>Brendlar</button>
             <button onClick={() => { setView('home'); setTimeout(() => document.getElementById('status')?.scrollIntoView({behavior:'smooth'}), 100); }}>Status</button>
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
        {view === 'home' && (
          <div className="space-y-32 animate-spring">
             {/* Hero Section */}
             <section className="text-center py-20 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full -z-10"></div>
                <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-10">Premium Auto Care 2025</div>
                <h1 className="text-6xl md:text-[100px] font-black tracking-tighter leading-none text-slate-900 mb-8">
                  Dvigatelingizni <br /> <span className="text-blue-600">Saqlab Qolamiz.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-gray-500 text-xl font-medium leading-relaxed mb-12">
                   Ko'pchilik dvigatelni ta'mirlaydi. Biz esa uni saqlab qolamiz. <br className="hidden md:block"/> O'zbekistondagi yagona 1 mln km gacha kafolat beruvchi premium servis.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                   <button onClick={() => setShowAuth(true)} className="px-12 h-16 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs tap-active shadow-2xl shadow-gray-200">Boshlash</button>
                   <button onClick={() => document.getElementById('status')?.scrollIntoView({behavior:'smooth'})} className="px-12 h-16 bg-white border border-gray-100 rounded-2xl font-black uppercase tracking-widest text-xs tap-active shadow-sm">Statusni tekshirish</button>
                </div>
             </section>

             {/* Brand Cards Grid */}
             <section id="brands" className="space-y-12">
                <div className="text-center">
                  <h2 className="text-4xl font-black tracking-tighter uppercase">Qo'llab-quvvatlanadigan brendlar</h2>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-2">Faqat eng sara texnologiyalar uchun</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {Object.keys(CAR_DATA).map(brand => (
                    <div key={brand} onClick={() => setSelectedBrand(brand)} className="apple-glass p-12 squircle hover:border-blue-500 transition-all cursor-pointer group shadow-xl hover:shadow-2xl">
                       <h3 className="text-3xl font-black uppercase mb-4">{brand}</h3>
                       <p className="text-gray-400 text-sm font-bold uppercase mb-8">Premium servis tanlovi</p>
                       <button className="w-full py-5 bg-gray-50 rounded-xl font-black text-[10px] uppercase group-hover:bg-black group-hover:text-white transition-all">Modellarni ko'rish</button>
                    </div>
                  ))}
                </div>
             </section>

             {/* Benefits Grid */}
             <section className="bg-white rounded-[40px] p-20 shadow-sm border border-gray-50">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Nega Million KM?</h2>
                  <p className="text-gray-400 font-medium max-w-xl mx-auto italic">"Dvigatelni ta’mirlash emas, saqlab qolish uchun"</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                   {BENEFITS.map((b, i) => (
                     <div key={i} className="text-center group">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                           <i className={`fas ${b.icon}`}></i>
                        </div>
                        <h3 className="text-lg font-bold mb-2">{b.title}</h3>
                        <p className="text-gray-400 text-xs font-medium leading-relaxed">{b.desc}</p>
                     </div>
                   ))}
                </div>
             </section>

             {/* Status Checker Logic */}
             <section id="status" className="p-12 md:p-24 apple-glass squircle shadow-2xl text-center">
                <h2 className="text-5xl font-black tracking-tighter uppercase mb-4">Statusni Tekshiring</h2>
                <p className="text-gray-400 font-bold mb-16 uppercase tracking-widest">Million KM kafolatiga mosligini aniqlang</p>
                <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto mb-16">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Brend</label>
                     <select className="w-full h-16 px-6 bg-gray-50 rounded-2xl font-bold outline-none appearance-none" value={checker.brand} onChange={e => setChecker({...checker, brand: e.target.value, model: ''})}>
                       <option value="">Tanlang...</option>
                       {Object.keys(CAR_DATA).map(b => <option key={b} value={b}>{b.toUpperCase()}</option>)}
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Model</label>
                     <select className="w-full h-16 px-6 bg-gray-50 rounded-2xl font-bold outline-none appearance-none" disabled={!checker.brand} value={checker.model} onChange={e => setChecker({...checker, model: e.target.value})}>
                       <option value="">Tanlang...</option>
                       {checker.brand && Object.keys(CAR_DATA[checker.brand.toLowerCase()]).map(m => <option key={m} value={m}>{m}</option>)}
                     </select>
                   </div>
                   <input type="number" placeholder="Mashina yili" className="h-16 px-6 bg-gray-50 rounded-2xl font-bold" value={checker.year} onChange={e => setChecker({...checker, year: e.target.value})} />
                   <input type="text" placeholder="Yurgan masofasi (km)" className="h-16 px-6 bg-gray-50 rounded-2xl font-bold" value={checker.km} onChange={e => setChecker({...checker, km: e.target.value})} />
                </div>
                <button onClick={() => {
                  if(!checker.brand || !checker.model || !checker.year || !checker.km) return showMsg("Ma'lumotlar to'liq emas", "error");
                  const config = CAR_DATA[checker.brand.toLowerCase()]?.[checker.model];
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
                    }} className="mt-6 px-10 py-3 bg-black text-white rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg">
                       {checkResult.success ? "Ro'yxatdan o'tish" : "Bir martalik xizmat"}
                    </button>
                  </div>
                )}
             </section>

             {/* Map Section */}
             <section className="space-y-12">
                <div className="text-center">
                  <h2 className="text-4xl font-black tracking-tighter uppercase">Bizning Filiallar</h2>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-2">O'zbekiston bo'ylab xizmat tarmog'i</p>
                </div>
                <div className="rounded-[48px] overflow-hidden shadow-2xl h-[450px] border border-white">
                  <iframe src="https://yandex.uz/map-widget/v1/?ll=70.893061,40.546387&z=15&l=map&pt=70.893061,40.546387,pm2rdm" width="100%" height="100%" frameBorder="0"></iframe>
                </div>
             </section>
          </div>
        )}

        {/* Model Modal Overlays */}
        {selectedBrand && (
          <div className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-md flex items-center justify-center p-6">
             <div className="bg-white p-12 squircle-lg w-full max-w-5xl max-h-[85vh] overflow-y-auto relative animate-spring shadow-2xl">
                <button onClick={() => setSelectedBrand(null)} className="absolute top-10 right-10 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center hover:bg-black hover:text-white transition-all"><i className="fas fa-times"></i></button>
                <h2 className="text-5xl font-black tracking-tighter uppercase mb-12">{selectedBrand} Modellari</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Object.entries(CAR_DATA[selectedBrand.toLowerCase()]).map(([model, info]: any) => (
                    <div key={model} className="p-8 border border-gray-100 rounded-[32px] hover:border-blue-600 transition-all group">
                       <h4 className="text-2xl font-black mb-3">{model}</h4>
                       <p className="text-gray-400 text-sm mb-10 italic leading-relaxed">"{info.desc}"</p>
                       <div className="flex flex-col gap-6 pt-8 border-t">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Narxi</span>
                            <span className="text-blue-600 font-black text-xl">{info.price.toLocaleString()} <span className="text-xs">UZS</span></span>
                          </div>
                          <button onClick={() => { placeOrder(selectedBrand!, model, "Yillik Kafolat"); setSelectedBrand(null); }} className="w-full py-5 bg-black text-white rounded-xl font-black text-[10px] uppercase tap-active shadow-xl group-hover:bg-blue-600">Buyurtma berish</button>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        )}

        {/* Cabinet View */}
        {view === 'cabinet' && user && (
          <div className="space-y-12 animate-spring">
             <div className="apple-glass p-12 squircle shadow-xl flex justify-between items-center">
                <div>
                   <h2 className="text-5xl font-black tracking-tighter">Salom, {user.name}!</h2>
                   <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-2">Shaxsiy garaj va servis monitoringi</p>
                </div>
                <button onClick={() => {
                   const b = prompt("Brend?"); const m = prompt("Model?");
                   if(b&&m) {
                      const c = { id: Date.now(), brand: b, model: m, lastOil: 40000, daily: 50 };
                      const updated = [...cars, c]; setCars(updated);
                      localStorage.setItem(`mkm_premium_cars_${user.uid}`, JSON.stringify(updated));
                      showMsg("Mashina garajga qo'shildi!");
                   }
                }} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest tap-active shadow-xl shadow-blue-200">+ Mashina qo'shish</button>
             </div>
             <div className="grid md:grid-cols-2 gap-8">
                {cars.length === 0 ? (
                  <div className="col-span-2 py-32 text-center text-gray-300 font-black uppercase tracking-[0.2em] italic">Garajingiz hali bo'sh. Mashina qo'shing.</div>
                ) : cars.map(car => {
                  const limit = 8000;
                  const current = 3200; // Sample for visualization
                  const percent = (current / limit) * 100;
                  return (
                    <div key={car.id} className="bg-white p-12 squircle shadow-xl border border-gray-100 hover:border-blue-200 transition-all">
                       <h3 className="text-3xl font-black mb-8">{car.brand} {car.model}</h3>
                       <div className="space-y-6">
                          <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 tracking-widest">
                            <span>Keyingi servisgacha</span>
                            <span className="text-blue-600">{limit-current} KM</span>
                          </div>
                          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full bg-blue-600 rounded-full transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
                          </div>
                          <div className="flex gap-4 pt-4">
                            <button onClick={() => placeOrder(car.brand, car.model, "Garaj Servis")} className="flex-1 py-4 bg-black text-white rounded-xl font-black text-[10px] uppercase tap-active">Servisga yozilish</button>
                            <button onClick={() => {
                              const updated = cars.filter(c => c.id !== car.id);
                              setCars(updated);
                              localStorage.setItem(`mkm_premium_cars_${user.uid}`, JSON.stringify(updated));
                            }} className="w-14 h-14 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><i className="fas fa-trash-alt"></i></button>
                          </div>
                       </div>
                    </div>
                  );
                })}
             </div>
             <div className="flex justify-center">
               <button onClick={() => { setUser(null); localStorage.removeItem('mkm_premium_user'); setView('home'); }} className="text-red-500 font-black uppercase tracking-widest text-[10px] opacity-50 hover:opacity-100">Tizimdan chiqish</button>
             </div>
          </div>
        )}

        {/* Admin View */}
        {view === 'admin' && user?.isAdmin && (
          <div className="space-y-12 animate-spring">
             <div className="flex justify-between items-center">
                <h2 className="text-5xl font-black tracking-tighter">Admin Dashboard</h2>
                <div className="flex items-center space-x-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100 animate-pulse">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Jonli Monitoring Faol</span>
                </div>
             </div>
             <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-gray-100">
                <table className="w-full text-left">
                   <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Mijoz</th>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Avto Ma'lumot</th>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Vaqt</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y">
                      {orders.map(o => (
                        <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                           <td className="p-8">
                             <div className="font-black text-slate-900">{o.userName}</div>
                             <div className="text-blue-600 text-[10px] font-bold mt-1 tracking-widest uppercase">{o.phone}</div>
                           </td>
                           <td className="p-8">
                             <div className="font-bold text-slate-800">{o.brand} {o.model}</div>
                             <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{o.type}</div>
                           </td>
                           <td className="p-8 text-[10px] font-black text-gray-300 uppercase">{o.time}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
                {orders.length === 0 && <div className="p-24 text-center text-gray-300 font-black uppercase tracking-[0.2em] italic">Hozircha buyurtmalar yo'q</div>}
             </div>
          </div>
        )}
      </main>

      {/* AI Mechanic Widget */}
      <div className="fixed bottom-8 right-8 z-[150]">
        {!aiOpen ? (
          <button onClick={() => setAiOpen(true)} className="w-16 h-16 bg-black text-white rounded-2xl shadow-2xl flex items-center justify-center tap-active group relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors"></div>
            <i className="fas fa-robot text-xl relative z-10"></i>
            <span className="absolute right-20 bg-black text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity tracking-widest whitespace-nowrap shadow-xl">AI Mexanik</span>
          </button>
        ) : (
          <div className="w-[380px] h-[550px] bg-white rounded-[40px] shadow-2xl flex flex-col overflow-hidden animate-spring border border-gray-100">
             <div className="p-6 bg-black text-white flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                  <span className="font-black text-[11px] uppercase tracking-widest">Million KM AI</span>
                </div>
                <button onClick={() => setAiOpen(false)} className="opacity-50 hover:opacity-100 transition-opacity"><i className="fas fa-times"></i></button>
             </div>
             <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
                {aiHistory.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] font-semibold leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border text-slate-800 rounded-bl-none'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isAiTyping && <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest animate-pulse ml-2">AI o'ylamoqda...</div>}
             </div>
             <div className="p-4 bg-white border-t flex gap-2">
                <input className="flex-1 h-14 bg-gray-100 rounded-xl px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-100 transition-all" placeholder="Muammo haqida yozing..." value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && askAi()} />
                <button onClick={askAi} disabled={isAiTyping} className="w-14 h-14 bg-black text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all active:scale-90 disabled:opacity-50"><i className="fas fa-paper-plane"></i></button>
             </div>
          </div>
        )}
      </div>

      {/* Auth Modal UI */}
      {showAuth && (
        <div className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-md flex items-center justify-center p-6">
           <div className="bg-white p-12 squircle-lg w-full max-w-md shadow-2xl relative animate-spring border border-white/20">
              <button onClick={() => setShowAuth(false)} className="absolute top-10 right-10 text-gray-300 hover:text-black transition-colors"><i className="fas fa-times text-xl"></i></button>
              <h2 className="text-4xl font-black tracking-tighter mb-10 text-center uppercase">Kirish</h2>
              <div className="space-y-4">
                 <div className="space-y-1">
                   <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Shaxsingiz</label>
                   <input className="w-full h-16 bg-gray-50 rounded-2xl px-6 font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Ismingiz" value={loginForm.name} onChange={e => setLoginForm({...loginForm, name: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                   <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Bog'lanish</label>
                   <input className="w-full h-16 bg-gray-50 rounded-2xl px-6 font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Tel raqamingiz" value={loginForm.phone} onChange={e => setLoginForm({...loginForm, phone: e.target.value})} />
                 </div>
                 {loginForm.name.toLowerCase() === 'admin' && (
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Pin kod</label>
                      <input className="w-full h-16 bg-gray-50 rounded-2xl px-6 font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all text-center tracking-widest" type="password" placeholder="••••" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} />
                    </div>
                 )}
                 <button onClick={handleLogin} className="w-full h-16 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs tap-active mt-4 shadow-xl shadow-gray-200">Davom etish</button>
              </div>
              <p className="mt-8 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest">Million KM — Premium Auto Care Experience</p>
           </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white py-20 border-t border-gray-100 text-center">
         <div className="max-w-7xl mx-auto px-6">
            <div className="w-12 h-12 bg-black rounded-xl text-white flex items-center justify-center mx-auto mb-8 shadow-xl"><i className="fas fa-road"></i></div>
            <h3 className="text-2xl font-black tracking-tighter uppercase mb-2">Million KM</h3>
            <p className="text-gray-400 font-medium italic mb-10 text-sm">Dvigatel uchun yangi avlod kafolati</p>
            <div className="flex justify-center space-x-10 text-gray-300 mb-12">
               <a href="#" className="hover:text-pink-600 transition-colors"><i className="fab fa-instagram text-2xl"></i></a>
               <a href="#" className="hover:text-blue-400 transition-colors"><i className="fab fa-telegram text-2xl"></i></a>
               <a href="#" className="hover:text-red-600 transition-colors"><i className="fab fa-youtube text-2xl"></i></a>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">© 2025 MILLION KM PREMIUM AUTO SERVICE</p>
         </div>
      </footer>
    </div>
  );
};

// Application entry point
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
