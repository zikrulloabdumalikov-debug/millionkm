
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { CAR_DATA, ONE_TIME_SERVICES } from './constants';

// --- Services ---
const sendToTelegram = async (msg: string) => {
  const token = "7722483735:AAG_LZ1Bg0H-mnqAlnw4OknNj-BTrqM8CWM";
  const chat_id = "-1003461463026";
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, text: msg, parse_mode: 'HTML' })
    });
  } catch (e) { console.error(e); }
};

const getAIAdvice = async (model: string, problem: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Mijoz mashinasi: ${model}. Muammo: ${problem}. Million KM servis nomidan qisqa va aniq o'zbekcha maslahat ber.`
    });
    return response.text;
  } catch (e) { return "Kechirasiz, texnik nosozlik."; }
};

// --- Sub-Components ---
const Navbar = ({ view, setView, user, onLogin, onLogout }: any) => (
  <nav className="fixed top-0 left-0 right-0 z-[100] p-6">
    <div className="max-w-7xl mx-auto h-16 apple-glass squircle px-8 flex items-center justify-between shadow-2xl shadow-black/5">
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('home')}>
        <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center">
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
          <button onClick={() => setView('cabinet')} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center tap-active">
            <i className="fas fa-user text-xs"></i>
          </button>
        ) : (
          <button onClick={onLogin} className="bg-black text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest tap-active">Kirish</button>
        )}
      </div>
    </div>
  </nav>
);

const AIConsultant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Assalomu alaykum! Million KM AI mexanik xizmatingizda.' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);
    const advice = await getAIAdvice('Avtomobil', userText);
    setMessages(prev => [...prev, { role: 'ai', text: advice || '' }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[105]">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="w-16 h-16 bg-black text-white rounded-2xl shadow-2xl flex items-center justify-center tap-active">
          <i className="fas fa-robot text-xl"></i>
        </button>
      ) : (
        <div className="w-80 md:w-96 apple-glass squircle-lg shadow-[0_30px_100px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col animate-spring">
          <div className="p-6 bg-black text-white flex justify-between items-center">
            <span className="font-black text-[10px] uppercase tracking-widest">AI Mexanik</span>
            <button onClick={() => setIsOpen(false)}><i className="fas fa-times"></i></button>
          </div>
          <div className="h-80 overflow-y-auto p-6 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] font-semibold leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-slate-800'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-[10px] font-bold text-gray-400 animate-pulse">AI o'ylamoqda...</div>}
          </div>
          <div className="p-4 bg-white/50 border-t flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} className="flex-1 h-12 px-4 rounded-xl bg-gray-100/50 outline-none text-sm font-bold" placeholder="Muammo nima?" />
            <button onClick={handleSend} className="w-12 h-12 bg-black text-white rounded-xl"><i className="fas fa-paper-plane"></i></button>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [view, setView] = useState('home');
  const [user, setUser] = useState<any>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loginForm, setLoginForm] = useState({ name: '', phone: '' });
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('mkm_user_v2');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const showToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = () => {
    if (!loginForm.name || !loginForm.phone) return showToast("To'ldiring");
    const u = { name: loginForm.name, phone: loginForm.phone };
    setUser(u);
    localStorage.setItem('mkm_user_v2', JSON.stringify(u));
    setIsAuth(false);
    showToast(`Xush kelibsiz, ${u.name}`);
  };

  const createOrder = async (service: string) => {
    if (!user) return setIsAuth(true);
    const msg = `🚀 <b>Yangi Buyurtma</b>\n👤 Mijoz: ${user.name}\n📞 Tel: ${user.phone}\n🛠 Xizmat: ${service}`;
    await sendToTelegram(msg);
    showToast("Buyurtma qabul qilindi!");
  };

  return (
    <div className="min-h-screen bg-[#FBFBFF]">
      <Navbar view={view} setView={setView} user={user} onLogin={() => setIsAuth(true)} onLogout={() => setUser(null)} />
      
      <main className="max-w-7xl mx-auto pt-32 px-6">
        {view === 'home' && (
          <div className="space-y-24 animate-spring">
            {/* Hero */}
            <div className="text-center space-y-10 py-20">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                Premium Auto Service 2025
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-slate-900">
                Avtomobilingiz <br /> <span className="text-blue-600">Million KM</span> uchun tayyormi?
              </h1>
              <p className="max-w-2xl mx-auto text-gray-500 text-lg font-medium leading-relaxed">
                Biz nafaqat moy almashtiramiz, balki motor hayotini uzaytiramiz. <br /> Professional yondashuv va original sifat.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4 pt-6">
                <button onClick={() => setIsAuth(true)} className="px-12 h-16 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl tap-active">Hozir boshlash</button>
                <button onClick={() => setView('about')} className="px-12 h-16 bg-white border border-gray-100 rounded-2xl font-black uppercase tracking-widest text-xs tap-active">Biz haqimizda</button>
              </div>
            </div>

            {/* Brands */}
            <div id="brands" className="grid md:grid-cols-3 gap-8 py-20">
              {Object.keys(CAR_DATA).map(brand => (
                <div key={brand} className="apple-glass p-12 squircle hover:border-blue-500 transition-all cursor-pointer group">
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{brand}</h3>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-10">Premium Original Xizmat</p>
                  <button onClick={() => createOrder(`${brand.toUpperCase()} Servis`)} className="w-full py-5 bg-gray-100/50 rounded-xl font-black text-[10px] uppercase tracking-widest group-hover:bg-black group-hover:text-white transition-all">Buyurtma berish</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'about' && (
          <div className="py-20 max-w-3xl mx-auto text-center animate-spring space-y-8">
            <h2 className="text-5xl font-black tracking-tighter uppercase">Million KM Oil</h2>
            <p className="text-gray-500 leading-relaxed text-lg font-medium">
              Bizning asosiy maqsadimiz — O'zbekistondagi har bir avtomobil egasiga xalqaro standartdagi premium servisni taqdim etish.
              Dvigatel moyi, filtrlar va texnik ko'rik — bizda hamma narsa oliy darajada.
            </p>
            <button onClick={() => setView('home')} className="px-8 py-4 bg-black text-white rounded-xl font-black uppercase text-[10px]">Asosiyga qaytish</button>
          </div>
        )}

        {view === 'cabinet' && user && (
          <div className="py-20 animate-spring">
             <div className="apple-glass p-12 squircle-lg shadow-xl mb-10">
                <h2 className="text-4xl font-black tracking-tighter mb-4">Salom, {user.name}!</h2>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-8">Shaxsiy Garaj</p>
                <div className="p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100 flex items-center justify-between">
                   <div>
                     <span className="text-blue-600 font-black text-xs uppercase tracking-widest">Kutilayotgan servis</span>
                     <p className="text-2xl font-black text-slate-800 mt-2">Tez orada...</p>
                   </div>
                   <button onClick={() => createOrder('Garajdan so\'rov')} className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest">Xizmat so'rash</button>
                </div>
             </div>
          </div>
        )}
      </main>

      <AIConsultant />

      {/* Toast */}
      {toast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] apple-glass px-8 py-4 squircle shadow-2xl border-l-4 border-l-blue-600 animate-spring">
          <span className="font-bold text-sm tracking-tight">{toast}</span>
        </div>
      )}

      {/* Auth Modal */}
      {isAuth && (
        <div className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white/95 apple-glass p-12 squircle-lg w-full max-w-md shadow-2xl animate-spring">
            <h2 className="text-4xl font-black tracking-tighter mb-10">Kirish</h2>
            <div className="space-y-4">
              <input value={loginForm.name} onChange={e => setLoginForm({...loginForm, name: e.target.value})} placeholder="Ismingiz" className="w-full h-16 px-6 rounded-2xl bg-gray-100 border-none outline-none font-bold" />
              <input value={loginForm.phone} onChange={e => setLoginForm({...loginForm, phone: e.target.value})} placeholder="+998" className="w-full h-16 px-6 rounded-2xl bg-gray-100 border-none outline-none font-bold" />
              <button onClick={handleLogin} className="w-full h-16 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs tap-active mt-4 shadow-xl">Davom etish</button>
              <button onClick={() => setIsAuth(false)} className="w-full h-10 text-[10px] font-bold uppercase tracking-widest text-gray-400">Bekor qilish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
