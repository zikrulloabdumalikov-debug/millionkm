
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// --- Constants ---
const CAR_DATA = {
  "chevrolet": {
    "Nexia 3": { maxAge: 5, maxKm: 100000, price: 849000, desc: "Ishonchli va tejamkor Nexia 3 uchun xizmat." },
    "Cobalt": { maxAge: 5, maxKm: 100000, price: 849000, desc: "Oila avtomobili Cobalt uchun uzoq muddatli kafolat." },
    "Gentra": { maxAge: 5, maxKm: 100000, price: 849000, desc: "Komfortli Gentra uchun premium xizmat." }
  },
  "kia": {
    "K5": { maxAge: 3, maxKm: 50000, price: 1350000, desc: "Elegant K5 uchun yuqori sifatli texnik ko'rik." },
    "Sportage": { maxAge: 3, maxKm: 50000, price: 1550000, desc: "Sportage uchun ishonchli million km kafolati." }
  },
  "liauto": {
    "L7": { maxAge: 3, maxKm: 50000, price: 1900000, desc: "Li L7 gibrid tizimlari uchun professional yondashuv." },
    "L9": { maxAge: 3, maxKm: 50000, price: 2100000, desc: "Flagman Li L9 uchun eng oliy darajadagi xizmat." }
  }
};

const TG_TOKEN = "7722483735:AAG_LZ1Bg0H-mnqAlnw4OknNj-BTrqM8CWM";
const TG_CHAT_ID = "-1003461463026";

// --- Services ---
const notifyTelegram = async (msg) => {
  try {
    await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, text: msg, parse_mode: 'HTML' })
    });
  } catch (e) { console.error(e); }
};

// --- Components ---
const Navbar = ({ view, setView, user, onAuth, onLogout }) => (
  <nav className="fixed top-0 left-0 right-0 z-[100] p-6">
    <div className="max-w-7xl mx-auto h-16 apple-glass squircle px-8 flex items-center justify-between shadow-2xl shadow-black/5">
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('home')}>
        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
          <i className="fas fa-road text-white text-sm"></i>
        </div>
        <span className="font-black tracking-tighter text-xl">Million KM</span>
      </div>
      <div className="hidden md:flex items-center space-x-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
        <button onClick={() => setView('home')} className={`hover:text-black transition-colors ${view === 'home' ? 'text-black' : ''}`}>Asosiy</button>
        <button onClick={() => setView('about')} className={`hover:text-black transition-colors ${view === 'about' ? 'text-black' : ''}`}>Haqimizda</button>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-3">
            <button onClick={() => setView('cabinet')} className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center tap-active">
              <i className="fas fa-user-circle text-lg"></i>
            </button>
            <button onClick={onLogout} className="w-10 h-10 rounded-full bg-red-50 text-red-400 flex items-center justify-center tap-active">
              <i className="fas fa-power-off text-xs"></i>
            </button>
          </div>
        ) : (
          <button onClick={onAuth} className="bg-black text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest tap-active">Kirish</button>
        )}
      </div>
    </div>
  </nav>
);

const AIConsultant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Salom! Men Million KM AI mexanikman. Qanday yordam bera olaman?' }]);
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
        contents: `Professional mexanik sifatida javob ber: ${userMsg}`
      });
      setMessages(prev => [...prev, { role: 'ai', text: response.text }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Texnik xato yuz berdi.' }]);
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
            <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} className="flex-1 h-12 px-4 rounded-xl bg-gray-50 outline-none text-sm font-bold" placeholder="Savolingizni yozing..." />
            <button onClick={handleSend} className="w-12 h-12 bg-black text-white rounded-xl"><i className="fas fa-paper-plane"></i></button>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [loginForm, setLoginForm] = useState({ name: '', phone: '' });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('mkm_session');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const showMsg = (m) => {
    setToast(m);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = () => {
    if (!loginForm.name || !loginForm.phone) return showMsg("Ma'lumotlarni to'ldiring");
    const u = { name: loginForm.name, phone: loginForm.phone };
    setUser(u);
    localStorage.setItem('mkm_session', JSON.stringify(u));
    setShowAuth(false);
    showMsg(`Xush kelibsiz, ${u.name}`);
  };

  const handleOrder = async (service) => {
    if (!user) return setShowAuth(true);
    showMsg("So'rov yuborilmoqda...");
    await notifyTelegram(`🚀 Buyurtma: ${service}\nMijoz: ${user.name}\nTel: ${user.phone}`);
    showMsg("Muvaffaqiyatli qabul qilindi!");
  };

  return (
    <div className="min-h-screen">
      <Navbar view={view} setView={setView} user={user} onAuth={() => setShowAuth(true)} onLogout={() => setUser(null)} />
      
      <main className="max-w-7xl mx-auto pt-32 px-6">
        {view === 'home' && (
          <div className="space-y-32 animate-spring">
            {/* Hero */}
            <section className="text-center py-20 px-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-10">
                Premium Auto Service 2025
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-slate-900 mb-10">
                Sizning motor <br /> <span className="text-blue-600">Million KM</span> ga <br /> loyiq.
              </h1>
              <p className="max-w-2xl mx-auto text-gray-400 text-lg font-medium leading-relaxed mb-12">
                Dvigatel moyini almashtirishdan ko'ra ko'prog'i — biz mashinangiz kelajagini saqlaymiz.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={() => setView('brands')} className="px-12 h-16 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl tap-active">Brendni tanlash</button>
                <button onClick={() => setView('cabinet')} className="px-12 h-16 bg-white border border-gray-100 rounded-2xl font-black uppercase tracking-widest text-xs tap-active">Garajga o'tish</button>
              </div>
            </section>

            {/* Brands */}
            <section className="grid md:grid-cols-3 gap-8 pb-32">
              {Object.keys(CAR_DATA).map(brand => (
                <div key={brand} className="apple-glass p-12 squircle hover:border-blue-500 transition-all cursor-pointer group shadow-xl shadow-black/5">
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{brand}</h3>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-10 italic">Premium original xizmat</p>
                  <button onClick={() => handleOrder(brand.toUpperCase() + ' Servis')} className="w-full py-5 bg-gray-50 rounded-xl font-black text-[10px] uppercase tracking-widest group-hover:bg-black group-hover:text-white transition-all">Buyurtma berish</button>
                </div>
              ))}
            </section>
          </div>
        )}

        {view === 'cabinet' && user && (
          <div className="py-20 animate-spring space-y-12">
            <div className="apple-glass p-12 squircle-lg shadow-xl flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-black tracking-tighter mb-2">Salom, {user.name}!</h2>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Shaxsiy Garaj</p>
              </div>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-200">Yangi Mashina</button>
            </div>
            <div className="p-12 apple-glass squircle border-dashed border-2 border-gray-200 text-center">
              <i className="fas fa-car-side text-4xl text-gray-200 mb-6"></i>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Hozircha mashinalar qo'shilmagan</p>
            </div>
          </div>
        )}

        {view === 'about' && (
          <div className="py-20 animate-spring text-center space-y-10 max-w-4xl mx-auto">
            <h2 className="text-5xl font-black tracking-tighter uppercase">Million KM Oil</h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              Bizning vazifamiz — O'zbekistondagi har bir avtomobilning motor umrini 1 000 000 km gacha uzaytirish. 
              Sifatli moy, original filtrlar va professional ustalar jamoasi.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-10">
              <div className="p-8 apple-glass squircle"><div className="text-3xl font-black">10k+</div><div className="text-[10px] font-bold text-gray-400 uppercase">Mijoz</div></div>
              <div className="p-8 apple-glass squircle"><div className="text-3xl font-black">24/7</div><div className="text-[10px] font-bold text-gray-400 uppercase">Yordam</div></div>
              <div className="p-8 apple-glass squircle"><div className="text-3xl font-black">100%</div><div className="text-[10px] font-bold text-gray-400 uppercase">Original</div></div>
            </div>
          </div>
        )}
      </main>

      <AIConsultant />

      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] apple-glass px-8 py-4 squircle shadow-2xl border-l-4 border-l-blue-600 animate-spring">
          <span className="font-bold text-sm tracking-tight">{toast}</span>
        </div>
      )}

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
