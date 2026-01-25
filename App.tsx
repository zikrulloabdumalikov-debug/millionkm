
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { CAR_DATA, ONE_TIME_SERVICES, YEARLY_BENEFITS } from './constants';

// --- Global Services ---
const TG_TOKEN = "7722483735:AAG_LZ1Bg0H-mnqAlnw4OknNj-BTrqM8CWM";
const TG_CHAT_ID = "-1003461463026";

const notifyTelegram = async (msg: string) => {
  try {
    await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, text: msg, parse_mode: 'HTML' })
    });
  } catch (e) { console.error("Telegram Error:", e); }
};

const getAIResponse = async (prompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt
    });
    return response.text;
  } catch (e) {
    console.error("AI Error:", e);
    return "Kechirasiz, mexanik AI hozircha javob bera olmaydi.";
  }
};

// --- View Components ---
const HomeView = ({ onStart, onCheck }: any) => (
  <div className="space-y-32 animate-spring">
    {/* Hero Section */}
    <section className="text-center py-20 px-4">
      <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-10">
        Million KM Premium Experience
      </div>
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-slate-900 mb-10">
        Dvigatelingizni <br /> <span className="text-blue-600">Million KM</span> ga <br /> tayyorlang.
      </h1>
      <p className="max-w-2xl mx-auto text-gray-400 text-lg font-medium leading-relaxed mb-12">
        Ko‘pchilik dvigatelni ta’mirlaydi. Biz esa uni saqlab qolamiz. <br /> Professional moy almashtirish va 1,000,000 km kafolati.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button onClick={onStart} className="px-12 h-16 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl tap-active">Brendni Tanlash</button>
        <button onClick={onCheck} className="px-12 h-16 bg-white border border-gray-100 rounded-2xl font-black uppercase tracking-widest text-xs tap-active">Statusni Tekshirish</button>
      </div>
    </section>

    {/* Brand Grid */}
    <section id="brands" className="grid md:grid-cols-3 gap-8 pb-32">
      {Object.keys(CAR_DATA).map(brand => (
        <div key={brand} className="apple-glass p-12 squircle hover:border-blue-500 transition-all cursor-pointer group">
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-slate-900">{brand}</h3>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-10 italic">Premium original servislar</p>
          <div className="space-y-3">
             <button className="w-full py-5 bg-gray-50 rounded-xl font-black text-[10px] uppercase tracking-widest group-hover:bg-black group-hover:text-white transition-all">Modellarni ko'rish</button>
          </div>
        </div>
      ))}
    </section>
  </div>
);

const App = () => {
  const [view, setView] = useState('home');
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [loginForm, setLoginForm] = useState({ name: '', phone: '' });
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('mkm_user_session');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const showMsg = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAuth = () => {
    if (!loginForm.name || !loginForm.phone) return showMsg("Ma'lumotlarni to'ldiring");
    const u = { name: loginForm.name, phone: loginForm.phone, uid: Date.now().toString() };
    setUser(u);
    localStorage.setItem('mkm_user_session', JSON.stringify(u));
    setShowAuth(false);
    showMsg(`Xush kelibsiz, ${u.name}`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mkm_user_session');
    setView('home');
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
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
              <div className="flex items-center space-x-4">
                <button onClick={() => setView('cabinet')} className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center tap-active">
                  <i className="fas fa-user-circle text-lg"></i>
                </button>
                <button onClick={handleLogout} className="w-10 h-10 rounded-full bg-red-50 text-red-400 flex items-center justify-center tap-active">
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
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {view === 'home' && <HomeView onStart={() => setView('home')} onCheck={() => setView('home')} />}
        
        {view === 'about' && (
          <div className="py-20 animate-spring max-w-4xl mx-auto text-center space-y-12">
             <h2 className="text-5xl font-black tracking-tighter uppercase text-slate-900">Biz Haqimizda</h2>
             <p className="text-gray-500 text-xl font-medium leading-relaxed">
               Million KM — bu O'zbekistondagi birinchi professional mobil servis tarmog'i. 
               Bizning maqsadimiz har bir avtomobilning motor umrini 1,000,000 kilometrgacha uzaytirishdir.
             </p>
             <div className="grid md:grid-cols-3 gap-6">
                <div className="p-8 apple-glass squircle border border-gray-100">
                   <div className="text-3xl font-black text-blue-600 mb-2">10k+</div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Baxtli Mijoz</div>
                </div>
                <div className="p-8 apple-glass squircle border border-gray-100">
                   <div className="text-3xl font-black text-slate-900 mb-2">24/7</div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mobil Yordam</div>
                </div>
                <div className="p-8 apple-glass squircle border border-gray-100">
                   <div className="text-3xl font-black text-green-600 mb-2">Original</div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mahsulotlar</div>
                </div>
             </div>
             <button onClick={() => setView('home')} className="px-10 py-4 bg-black text-white rounded-xl font-black uppercase text-[10px] tracking-widest">Asosiyga qaytish</button>
          </div>
        )}

        {view === 'cabinet' && user && (
          <div className="py-20 animate-spring space-y-12">
             <div className="apple-glass p-12 squircle-lg shadow-xl flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                   <h2 className="text-4xl font-black tracking-tighter mb-2">Salom, {user.name}!</h2>
                   <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Shaxsiy Garajingiz</p>
                </div>
                <button className="px-10 h-16 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-blue-200">Yangi Mashina Qo'shish</button>
             </div>
             <div className="grid md:grid-cols-2 gap-8">
                <div className="apple-glass p-10 squircle border border-blue-100 bg-blue-50/20">
                   <div className="flex items-center space-x-4 mb-8">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <i className="fas fa-car-side text-blue-600"></i>
                      </div>
                      <span className="font-black text-xl text-slate-800">Mening Avtomobillarim</span>
                   </div>
                   <p className="text-gray-400 font-medium italic">Hozircha mashinalar qo'shilmagan.</p>
                </div>
             </div>
          </div>
        )}
      </main>

      {/* AI Bot */}
      <div className="fixed bottom-10 right-10 z-[110]">
        <button className="w-16 h-16 bg-black text-white rounded-2xl shadow-2xl flex items-center justify-center tap-active group">
          <i className="fas fa-robot text-xl"></i>
          <span className="absolute right-20 bg-black text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">AI Mexanik</span>
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] apple-glass px-8 py-4 squircle shadow-2xl border-l-4 border-l-blue-600 animate-spring">
          <span className="font-bold text-sm">{toast}</span>
        </div>
      )}

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white apple-glass p-12 squircle-lg w-full max-w-md shadow-2xl animate-spring">
            <h2 className="text-4xl font-black tracking-tighter mb-10">Tizimga Kirish</h2>
            <div className="space-y-4">
              <input value={loginForm.name} onChange={e => setLoginForm({...loginForm, name: e.target.value})} placeholder="Ismingiz" className="w-full h-16 px-6 rounded-2xl bg-gray-50 border-none outline-none font-bold" />
              <input value={loginForm.phone} onChange={e => setLoginForm({...loginForm, phone: e.target.value})} placeholder="+998" className="w-full h-16 px-6 rounded-2xl bg-gray-50 border-none outline-none font-bold" />
              <button onClick={handleAuth} className="w-full h-16 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs tap-active mt-4">Kirish</button>
              <button onClick={() => setShowAuth(false)} className="w-full h-10 text-[10px] font-black uppercase tracking-widest text-gray-400">Yopish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
