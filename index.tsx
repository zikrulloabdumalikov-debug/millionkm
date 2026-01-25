
import React, { useState, useEffect, useRef } from 'react';
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
    "Sonet": { maxAge: 3, maxKm: 50000, price: 990000, desc: "KIA Sonet krossoveri uchun original KIA standartlari." },
    "K5": { maxAge: 3, maxKm: 50000, price: 1350000, desc: "Elegant K5 uchun yuqori sifatli texnik ko'rik." },
    "Sportage": { maxAge: 3, maxKm: 50000, price: 1550000, desc: "Sportage uchun ishonchli million km kafolati." }
  },
  "liauto": {
    "L6": { maxAge: 3, maxKm: 50000, price: 1800000, desc: "Premium Li Auto L6 uchun maxsus xizmat turi." },
    "L7": { maxAge: 3, maxKm: 50000, price: 1900000, desc: "Li L7 gibrid tizimlari uchun professional yondashuv." },
    "L9": { maxAge: 3, maxKm: 50000, price: 2100000, desc: "Flagman Li L9 uchun eng oliy darajadagi Million KM xizmati." }
  }
};

const BENEFITS = [
  { title: "Million km kafolat", desc: "1 mln kmgacha rasmiy kafolat beradigan yagona servis.", icon: "fa-shield-halved" },
  { title: "Bepul avtomoyka", desc: "Har safar moy almashtirishda mashinangiz bepul yuviladi.", icon: "fa-droplet" },
  { title: "Faqat original", desc: "Faqat sertifikatlangan, eng sifatli moy va filtrlar ishlatiladi.", icon: "fa-check-double" },
  { title: "Mobil Brigada", desc: "Manzilingizga borib servis ko'rsatish imkoniyati.", icon: "fa-bolt-lightning" }
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
// 3. MAIN COMPONENT
// ==========================================
const App = () => {
  const [view, setView] = useState('home');
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [loginForm, setLoginForm] = useState({ name: '', phone: '', password: '' });
  const [toast, setToast] = useState<any>(null);
  
  // Data
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [checker, setChecker] = useState({ brand: '', model: '', year: '', km: '' });
  const [checkResult, setCheckResult] = useState<any>(null);
  const [cars, setCars] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // AI Chat
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiHistory, setAiHistory] = useState<any[]>([{ role: 'ai', text: "Assalomu alaykum! Men Million KM AI mexanikman. Mashinangizdagi har qanday texnik muammo haqida so'rang." }]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('mkm_v4_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    const savedOrders = localStorage.getItem('mkm_v4_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    if (user) {
      const savedCars = localStorage.getItem(`mkm_v4_cars_${user.uid}`);
      if (savedCars) setCars(JSON.parse(savedCars));
    }
  }, [user]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiHistory]);

  const showMsg = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogin = () => {
    if (loginForm.name.toLowerCase() === 'admin' && loginForm.password === '123') {
      const u = { uid: 'a1', name: 'Admin', phone: 'Admin', isAdmin: true };
      setUser(u);
      localStorage.setItem('mkm_v4_user', JSON.stringify(u));
      setShowAuth(false);
      showMsg("Xush kelibsiz, Admin");
      return;
    }
    if (!loginForm.name || !loginForm.phone) return showMsg("Ma'lumotlarni to'ldiring", "error");
    const u = { uid: Date.now().toString(), name: loginForm.name, phone: loginForm.phone, isAdmin: false };
    setUser(u);
    localStorage.setItem('mkm_v4_user', JSON.stringify(u));
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
      // Create fresh instance per call as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Siz Million KM servisining tajribali mexanigisiz. Mijozning savoliga o'zbek tilida professional, lekin tushunarli javob bering. Savol: ${msg}`,
      });
      const replyText = response.text || "Kechirasiz, javob topishda qiynaldim.";
      setAiHistory(prev => [...prev, { role: 'ai', text: replyText }]);
      notifyTelegram(`🤖 <b>AI Savol-Javob</b>\nMijoz: ${user?.name || 'Mehmon'}\nSavol: ${msg}\nAI: ${replyText}`);
    } catch (e) {
      console.error(e);
      setAiHistory(prev => [...prev, { role: 'ai', text: "Hozirda aloqa tizimida yuklama katta. Iltimos, birozdan so'ng qayta yozing yoki +998 77 020 01 07 ga qo'ng'iroq qiling." }]);
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
    localStorage.setItem('mkm_v4_orders', JSON.stringify(updated));
    showMsg("Buyurtmangiz qabul qilindi!");
    await notifyTelegram(`📦 <b>Yangi Buyurtma</b>\nMijoz: ${user.name}\nTel: ${user.phone}\nAvto: ${brand} ${model}\nXizmat: ${type}`);
  };

  return (
    <div className="min-h-screen selection:bg-blue-100">
      {/* Toast Notification (Dynamic Island style) */}
      {toast && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[300] w-full max-w-[380px] px-6 pointer-events-none animate-dynamic-island">
          <div className={`mt-4 p-4 rounded-full apple-glass shadow-2xl flex items-center space-x-4 border border-white/40 ${toast.type === 'error' ? 'bg-red-500 text-white' : 'text-slate-900'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${toast.type === 'error' ? 'bg-white/20' : 'bg-blue-600 text-white shadow-lg'}`}>
              <i className={`fas ${toast.type === 'error' ? 'fa-exclamation-triangle' : 'fa-check'}`}></i>
            </div>
            <span className="font-bold text-sm tracking-tight">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] p-6">
        <div className="max-w-7xl mx-auto h-16 apple-glass squircle px-8 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-3 cursor-pointer tap-active" onClick={() => setView('home')}>
             <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white shadow-xl"><i className="fas fa-road"></i></div>
             <span className="font-black text-xl tracking-tighter">Million KM</span>
          </div>
          <div className="hidden md:flex space-x-8 text-[11px] font-black uppercase tracking-widest text-gray-400">
             <button onClick={() => setView('home')} className={`hover:text-black transition-colors ${view === 'home' ? 'text-blue-600' : ''}`}>Asosiy</button>
             <button onClick={() => document.getElementById('brands')?.scrollIntoView({behavior:'smooth'})} className="hover:text-black">Brendlar</button>
             <button onClick={() => document.getElementById('status')?.scrollIntoView({behavior:'smooth'})} className="hover:text-black">Status</button>
             {user?.isAdmin && <button onClick={() => setView('admin')} className={`hover:text-black ${view === 'admin' ? 'text-black' : ''}`}>Admin</button>}
          </div>
          <div className="flex items-center space-x-4">
             {user ? (
               <button onClick={() => setView('cabinet')} className="bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest tap-active shadow-lg shadow-blue-500/20">Garaj</button>
             ) : (
               <button onClick={() => setShowAuth(true)} className="bg-black text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest tap-active shadow-xl">Kirish</button>
             )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto pt-32 px-6 pb-40">
        {view === 'home' && (
          <div className="space-y-32 animate-spring">
             {/* Hero Section */}
             <section className="text-center py-20 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full -z-10"></div>
                <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-10 border border-blue-100 shadow-sm">Premium Auto Care 2025</div>
                <h1 className="text-6xl md:text-[100px] font-black tracking-tighter leading-none text-slate-900 mb-8">
                  Dvigatelingizni <br /> <span className="text-blue-600">Saqlab Qolamiz.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-gray-500 text-xl font-medium leading-relaxed mb-12">
                   Biz nafaqat moy almashtiramiz, balki dvigatel umrini uzaytiramiz. <br className="hidden md:block"/> Million kilometr ishonch — bu bizning kafolatimiz.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                   <button onClick={() => setShowAuth(true)} className="px-12 h-16 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs tap-active shadow-2xl">Hoziroq boshlash</button>
                   <button onClick={() => document.getElementById('status')?.scrollIntoView({behavior:'smooth'})} className="px-12 h-16 bg-white border border-gray-100 rounded-2xl font-black uppercase tracking-widest text-xs tap-active shadow-sm hover:bg-gray-50 transition-colors">Statusni tekshirish</button>
                </div>
             </section>

             {/* Brand Cards */}
             <section id="brands" className="space-y-12">
                <div className="text-center">
                  <h2 className="text-4xl font-black tracking-tighter uppercase">Brendlar</h2>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px] mt-2">Premium avtomobillar uchun tanlangan servis</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {Object.keys(CAR_DATA).map(brand => (
                    <div key={brand} onClick={() => setSelectedBrand(brand)} className="apple-glass p-12 squircle hover:border-blue-500 transition-all cursor-pointer group shadow-xl hover:-translate-y-2">
                       <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">{brand}</h3>
                       <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-8">Rasmiy hamkorlik standarti</p>
                       <button className="w-full py-5 bg-gray-50 rounded-2xl font-black text-[10px] uppercase group-hover:bg-black group-hover:text-white transition-all shadow-sm">Modellarni ko'rish</button>
                    </div>
                  ))}
                </div>
             </section>

             {/* Benefits Section */}
             <section className="bg-white rounded-[40px] p-20 shadow-2xl border border-gray-50 relative overflow-hidden">
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full"></div>
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Nega Million KM?</h2>
                  <p className="text-gray-400 font-medium italic">"Dvigatelni ta’mirlash emas, saqlab qolish bizning maqsadimiz"</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                   {BENEFITS.map((b, i) => (
                     <div key={i} className="text-center group">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm group-hover:scale-110">
                           <i className={`fas ${b.icon}`}></i>
                        </div>
                        <h3 className="text-lg font-bold mb-2">{b.title}</h3>
                        <p className="text-gray-400 text-xs font-medium leading-relaxed">{b.desc}</p>
                     </div>
                   ))}
                </div>
             </section>

             {/* Status Checker UI */}
             <section id="status" className="p-12 md:p-24 apple-glass squircle shadow-2xl text-center border-white/40">
                <h2 className="text-5xl font-black tracking-tighter uppercase mb-4">Statusni Tekshiring</h2>
                <p className="text-gray-400 font-bold mb-16 uppercase tracking-widest text-[10px]">Kafolat dasturiga mosligingizni aniqlang</p>
                <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto mb-16">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Brend</label>
                     <select className="w-full h-16 px-6 bg-gray-50 rounded-2xl font-bold outline-none appearance-none cursor-pointer border-none" value={checker.brand} onChange={e => setChecker({...checker, brand: e.target.value, model: ''})}>
                       <option value="">Tanlang...</option>
                       {Object.keys(CAR_DATA).map(b => <option key={b} value={b}>{b.toUpperCase()}</option>)}
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Model</label>
                     <select className="w-full h-16 px-6 bg-gray-50 rounded-2xl font-bold outline-none appearance-none cursor-pointer border-none" disabled={!checker.brand} value={checker.model} onChange={e => setChecker({...checker, model: e.target.value})}>
                       <option value="">Tanlang...</option>
                       {checker.brand && Object.keys(CAR_DATA[checker.brand.toLowerCase()]).map(m => <option key={m} value={m}>{m}</option>)}
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Mashina yili</label>
                     <input type="number" placeholder="2023" className="w-full h-16 px-6 bg-gray-50 rounded-2xl font-bold border-none outline-none" value={checker.year} onChange={e => setChecker({...checker, year: e.target.value})} />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Yurgan masofasi (KM)</label>
                     <input type="text" placeholder="50 000" className="w-full h-16 px-6 bg-gray-50 rounded-2xl font-bold border-none outline-none" value={checker.km} onChange={e => setChecker({...checker, km: e.target.value})} />
                   </div>
                </div>
                <button onClick={() => {
                  if(!checker.brand || !checker.model || !checker.year || !checker.km) return showMsg("Ma'lumotlar to'liq emas", "error");
                  const config = CAR_DATA[checker.brand.toLowerCase()]?.[checker.model];
                  const age = new Date().getFullYear() - parseInt(checker.year);
                  const kmVal = parseInt(checker.km.replace(/\D/g, ''));
                  if (age <= config.maxAge && kmVal <= config.maxKm) {
                    setCheckResult({ success: true, text: "✅ Tabriklaymiz! Avtomobilingiz Million KM kafolatiga to'liq mos." });
                  } else {
                    setCheckResult({ success: false, text: "⚠️ Afsuski, limitlardan oshgan. Lekin siz uchun maxsus xizmat paketimiz bor." });
                  }
                }} className="px-20 h-16 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs shadow-2xl tap-active hover:scale-105 transition-transform">Tahlilni boshlash</button>
                {checkResult && (
                  <div className={`mt-16 p-10 rounded-[40px] border animate-spring ${checkResult.success ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                    <p className="text-xl font-black">{checkResult.text}</p>
                    <button onClick={() => {
                       if(checkResult.success) setShowAuth(true);
                       else placeOrder(checker.brand, checker.model, "Xususiy Paket");
                    }} className="mt-8 px-10 py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">
                       {checkResult.success ? "Ro'yxatdan o'tish" : "Xizmat so'rash"}
                    </button>
                  </div>
                )}
             </section>

             {/* Branch Location */}
             <section className="space-y-12">
                <div className="text-center">
                  <h2 className="text-4xl font-black tracking-tighter uppercase">Bizning Filiallar</h2>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px] mt-2">O'zbekiston bo'ylab xizmat nuqtalari</p>
                </div>
                <div className="rounded-[48px] overflow-hidden shadow-2xl h-[450px] border-4 border-white apple-glass">
                  <iframe src="https://yandex.uz/map-widget/v1/?ll=70.893061,40.546387&z=15&l=map&pt=70.893061,40.546387,pm2rdm" width="100%" height="100%" frameBorder="0"></iframe>
                </div>
             </section>
          </div>
        )}

        {/* Brand Overlay Modal */}
        {selectedBrand && (
          <div className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setSelectedBrand(null)}>
             <div className="bg-white p-12 squircle-lg w-full max-w-5xl max-h-[85vh] overflow-y-auto relative animate-spring shadow-2xl" onClick={e => e.stopPropagation()}>
                <button onClick={() => setSelectedBrand(null)} className="absolute top-10 right-10 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center hover:bg-black hover:text-white transition-all"><i className="fas fa-times"></i></button>
                <h2 className="text-5xl font-black tracking-tighter uppercase mb-12">{selectedBrand} To'plami</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Object.entries(CAR_DATA[selectedBrand.toLowerCase()]).map(([model, info]: any) => (
                    <div key={model} className="p-8 border border-gray-100 rounded-[32px] hover:border-blue-600 transition-all group flex flex-col justify-between h-full bg-white shadow-sm">
                       <div>
                         <h4 className="text-2xl font-black mb-3">{model}</h4>
                         <p className="text-gray-400 text-sm mb-10 italic">"{info.desc}"</p>
                       </div>
                       <div className="pt-8 border-t border-gray-50">
                          <div className="flex justify-between items-center mb-6">
                            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Narxi</span>
                            <span className="text-blue-600 font-black text-xl">{info.price.toLocaleString()} <span className="text-xs">UZS</span></span>
                          </div>
                          <button onClick={() => { placeOrder(selectedBrand!, model, "Premium Xizmat"); setSelectedBrand(null); }} className="w-full py-5 bg-black text-white rounded-2xl font-black text-[10px] uppercase tap-active group-hover:bg-blue-600 transition-colors shadow-lg shadow-gray-200">Buyurtma Berish</button>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        )}

        {/* Cabinet (Garage) View */}
        {view === 'cabinet' && user && (
          <div className="space-y-12 animate-spring">
             <div className="apple-glass p-12 squircle shadow-xl flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                   <h2 className="text-5xl font-black tracking-tighter">Salom, {user.name}!</h2>
                   <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-2">Shaxsiy garaj va monitoring tizimi</p>
                </div>
                <button onClick={() => {
                   const b = prompt("Brend?"); const m = prompt("Model?");
                   if(b&&m) {
                      const c = { id: Date.now(), brand: b, model: m, lastOil: 40000, daily: 50 };
                      const updated = [...cars, c]; setCars(updated);
                      localStorage.setItem(`mkm_v4_cars_${user.uid}`, JSON.stringify(updated));
                      showMsg("Mashina qo'shildi!");
                   }
                }} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest tap-active shadow-xl shadow-blue-500/20">Mashina qo'shish</button>
             </div>
             <div className="grid md:grid-cols-2 gap-8">
                {cars.length === 0 ? (
                  <div className="col-span-2 py-32 text-center text-gray-300 font-black uppercase tracking-[0.2em] italic">Hozircha garajingiz bo'sh. Birinchi mashinangizni qo'shing.</div>
                ) : cars.map(car => {
                  const limit = 8000;
                  const current = 5200; // Mock current mileage for UI
                  const percent = Math.min(100, (current / limit) * 100);
                  const statusColor = percent > 85 ? 'bg-red-500' : percent > 60 ? 'bg-yellow-500' : 'bg-blue-600';
                  return (
                    <div key={car.id} className="bg-white p-12 squircle shadow-xl border border-gray-100 hover:border-blue-200 transition-all flex flex-col justify-between">
                       <div className="mb-10">
                          <h3 className="text-3xl font-black mb-2">{car.brand} {car.model}</h3>
                          <div className="flex items-center space-x-2">
                             <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest">Faol Kafolat</span>
                          </div>
                       </div>
                       <div className="space-y-6">
                          <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 tracking-widest">
                            <span>Moy muddati (Servisgacha)</span>
                            <span className={percent > 85 ? 'text-red-500 animate-pulse' : 'text-slate-900'}>{limit - current} KM</span>
                          </div>
                          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden p-1 shadow-inner">
                            <div className={`h-full ${statusColor} rounded-full transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
                          </div>
                          <div className="flex gap-4 pt-4">
                            <button onClick={() => placeOrder(car.brand, car.model, "Garajdan Buyurtma")} className="flex-1 py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tap-active shadow-lg">Servisga Yozilish</button>
                            <button onClick={() => {
                              const updated = cars.filter(c => c.id !== car.id);
                              setCars(updated);
                              localStorage.setItem(`mkm_v4_cars_${user.uid}`, JSON.stringify(updated));
                            }} className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><i className="fas fa-trash-alt"></i></button>
                          </div>
                       </div>
                    </div>
                  );
                })}
             </div>
             <div className="flex justify-center mt-20">
               <button onClick={() => { setUser(null); localStorage.removeItem('mkm_v4_user'); setView('home'); }} className="text-red-500 font-black uppercase tracking-widest text-[9px] hover:scale-110 transition-transform opacity-60 hover:opacity-100">Profilni tark etish</button>
             </div>
          </div>
        )}

        {/* Admin Dashboard */}
        {view === 'admin' && user?.isAdmin && (
          <div className="space-y-12 animate-spring">
             <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <h2 className="text-5xl font-black tracking-tighter">Admin Dashboard</h2>
                <div className="bg-green-50 text-green-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center space-x-3 border border-green-100">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                  <span>Jonli Tizim Monitoringi</span>
                </div>
             </div>
             <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Mijoz</th>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Avto Ma'lumot</th>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Vaqt</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="p-20 text-center text-gray-300 font-black uppercase italic tracking-widest">Buyurtmalar mavjud emas</td>
                        </tr>
                      ) : orders.map(o => (
                        <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                           <td className="p-8">
                             <div className="font-black text-slate-900">{o.userName}</div>
                             <div className="text-blue-600 text-[10px] font-bold mt-1 tracking-widest">{o.phone}</div>
                           </td>
                           <td className="p-8">
                             <div className="font-bold text-slate-800">{o.brand} {o.model}</div>
                             <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{o.type}</div>
                           </td>
                           <td className="p-8">
                             <span className="px-4 py-1.5 bg-yellow-50 text-yellow-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-yellow-100">Yangi</span>
                           </td>
                           <td className="p-8 text-[10px] font-black text-gray-300 uppercase">{o.time}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}
      </main>

      {/* AI Chat Bot Widget */}
      <div className="fixed bottom-8 right-8 z-[150]">
        {!aiOpen ? (
          <button onClick={() => setAiOpen(true)} className="w-16 h-16 bg-black text-white rounded-[22px] shadow-2xl flex items-center justify-center tap-active group relative overflow-hidden border border-white/20">
            <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <i className="fas fa-robot text-xl relative z-10"></i>
            <span className="absolute right-20 bg-black text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase opacity-0 group-hover:opacity-100 transition-all tracking-widest whitespace-nowrap shadow-2xl">AI Mexanik</span>
          </button>
        ) : (
          <div className="w-[380px] h-[550px] bg-white rounded-[40px] shadow-2xl flex flex-col overflow-hidden animate-spring border border-gray-100 shadow-[0_30px_100px_rgba(0,0,0,0.1)]">
             <div className="p-6 bg-black text-white flex justify-between items-center shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                  <span className="font-black text-[11px] uppercase tracking-widest">Million KM AI Bot</span>
                </div>
                <button onClick={() => setAiOpen(false)} className="opacity-50 hover:opacity-100 transition-opacity"><i className="fas fa-times"></i></button>
             </div>
             <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-gray-50/50 ios-scroll">
                {aiHistory.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-[22px] text-[13px] font-semibold leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border text-slate-800 rounded-bl-none'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isAiTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border p-4 rounded-2xl rounded-bl-none shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
             </div>
             <div className="p-5 bg-white border-t flex gap-3 shrink-0">
                <input className="flex-1 h-14 bg-gray-100 rounded-2xl px-5 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-100 transition-all border-none" placeholder="Muammo haqida yozing..." value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && askAi()} />
                <button onClick={askAi} disabled={isAiTyping} className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all active:scale-90 disabled:opacity-50 shadow-xl shadow-gray-200"><i className="fas fa-paper-plane"></i></button>
             </div>
          </div>
        )}
      </div>

      {/* Auth Modal UI */}
      {showAuth && (
        <div className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setShowAuth(false)}>
           <div className="bg-white p-12 squircle-lg w-full max-w-md shadow-2xl relative animate-spring" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowAuth(false)} className="absolute top-10 right-10 text-gray-300 hover:text-black transition-colors"><i className="fas fa-times text-xl"></i></button>
              <h2 className="text-4xl font-black tracking-tighter mb-10 text-center uppercase">Kirish</h2>
              <div className="space-y-4">
                 <div className="space-y-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Ismingiz</label>
                   <input className="w-full h-16 bg-gray-50 rounded-2xl px-6 font-bold border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="To'liq ism" value={loginForm.name} onChange={e => setLoginForm({...loginForm, name: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Telefon</label>
                   <input className="w-full h-16 bg-gray-50 rounded-2xl px-6 font-bold border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="+998" value={loginForm.phone} onChange={e => setLoginForm({...loginForm, phone: e.target.value})} />
                 </div>
                 {loginForm.name.toLowerCase() === 'admin' && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Admin Parol</label>
                      <input className="w-full h-16 bg-gray-50 rounded-2xl px-6 font-bold border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all text-center tracking-widest" type="password" placeholder="••••" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} />
                    </div>
                 )}
                 <button onClick={handleLogin} className="w-full h-16 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs tap-active mt-6 shadow-2xl shadow-gray-200">Davom etish</button>
              </div>
              <p className="mt-10 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest opacity-40 leading-relaxed">Million KM — Sizning xavfsizligingiz, bizning ishimiz.</p>
           </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white py-24 border-t border-gray-100 text-center">
         <div className="max-w-7xl mx-auto px-6">
            <div className="w-12 h-12 bg-black rounded-2xl text-white flex items-center justify-center mx-auto mb-10 shadow-xl shadow-gray-200 rotate-12 transition-transform hover:rotate-0"><i className="fas fa-road"></i></div>
            <h3 className="text-2xl font-black tracking-tighter uppercase mb-4">Million KM</h3>
            <p className="text-gray-400 font-medium italic mb-12 text-sm max-w-md mx-auto">Dvigatelingiz uchun yangi avlod kafolati va yuqori darajadagi g'amxo'rlik.</p>
            <div className="flex justify-center space-x-10 text-gray-300 mb-16">
               <a href="https://instagram.com" className="hover:text-pink-600 transition-all hover:scale-125"><i className="fab fa-instagram text-2xl"></i></a>
               <a href="https://t.me" className="hover:text-blue-400 transition-all hover:scale-125"><i className="fab fa-telegram text-2xl"></i></a>
               <a href="https://youtube.com" className="hover:text-red-600 transition-all hover:scale-125"><i className="fab fa-youtube text-2xl"></i></a>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] opacity-40">© 2025 MILLION KM PREMIUM AUTO SERVICE</p>
         </div>
      </footer>
    </div>
  );
};

// Mount Application
const rootNode = document.getElementById('root');
if (rootNode) {
  createRoot(rootNode).render(<App />);
}
