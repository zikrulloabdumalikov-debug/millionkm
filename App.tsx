
import React, { useState, useEffect, useCallback } from 'react';
import { User, Order } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatusChecker from './components/StatusChecker';
import BrandGrid from './components/BrandGrid';
import Cabinet from './components/Cabinet';
import MobileService from './components/MobileService';
import AIConsultant from './components/AIConsultant';
import AboutUs from './components/AboutUs';
import NearestLocations from './components/NearestLocations';
import Benefits from './components/Benefits';
import QuickServices from './components/QuickServices';
import { sendTelegramNotification } from './services/telegramService';

type View = 'home' | 'cabinet' | 'admin' | 'express' | 'fuel' | 'about';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [loginForm, setLoginForm] = useState({ name: '', phone: '', password: '' });

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('million_km_user');
    const savedOrders = localStorage.getItem('million_km_orders');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const addOrder = async (orderData: Partial<Order>) => {
    const newOrder: Order = {
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

    let tgMessage = `🚀 <b>Yangi Buyurtma</b>\n`;
    tgMessage += `👤 Mijoz: ${newOrder.userName}\n`;
    tgMessage += `📞 Tel: ${newOrder.phone}\n`;
    tgMessage += `🚗 Transport: ${newOrder.brand} ${newOrder.model}\n`;
    tgMessage += `🛠 Xizmat: ${newOrder.serviceType}\n`;
    if (newOrder.totalPrice) tgMessage += `💰 Narx: ${newOrder.totalPrice.toLocaleString()} UZS\n`;
    if (newOrder.note) tgMessage += `📝 Izoh: ${newOrder.note}`;

    await sendTelegramNotification(tgMessage);

    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem('million_km_orders', JSON.stringify(updated));
    showToast("Buyurtmangiz qabul qilindi!");
  };

  const handleLoginSubmit = () => {
    if (loginForm.name.toLowerCase() === 'admin' && loginForm.password === '123') {
      const adminUser: User = { uid: 'a1', name: 'Admin', email: '', phone: '', gender: '', isAdmin: true };
      setCurrentUser(adminUser);
      localStorage.setItem('million_km_user', JSON.stringify(adminUser));
      setIsAuthModalOpen(false);
      showToast("Admin tizimiga xush kelibsiz");
      return;
    }

    if (!loginForm.name || !loginForm.phone) {
      showToast("Ma'lumotlarni to'ldiring", "error");
      return;
    }

    const user: User = { uid: 'u-' + Date.now(), name: loginForm.name, email: '', phone: loginForm.phone, gender: '', isAdmin: false };
    setCurrentUser(user);
    localStorage.setItem('million_km_user', JSON.stringify(user));
    setIsAuthModalOpen(false);
    showToast(`Xush kelibsiz, ${user.name}`);
  };

  const renderView = () => {
    switch (currentView) {
      case 'cabinet': return currentUser ? <Cabinet user={currentUser} showToast={showToast} onOrder={addOrder} /> : <Hero onStart={() => setIsAuthModalOpen(true)} />;
      case 'about': return <AboutUs />;
      case 'express':
      case 'fuel': return <MobileService type={currentView} user={currentUser} onOrder={addOrder} onOpenAuth={() => setIsAuthModalOpen(true)} />;
      default: return (
        <div className="space-y-24 md:space-y-32 pb-40">
          <Hero onStart={() => setIsAuthModalOpen(true)} />
          <div id="brands" className="max-w-7xl mx-auto px-6"><BrandGrid user={currentUser} onOrder={addOrder} onOpenAuth={() => setIsAuthModalOpen(true)} /></div>
          <div id="benefits" className="max-w-7xl mx-auto px-6"><Benefits /></div>
          <div id="status" className="max-w-4xl mx-auto px-6"><StatusChecker showToast={showToast} onRegister={() => setIsAuthModalOpen(true)} onOneTime={() => setCurrentView('express')} /></div>
          <div id="quick-services" className="max-w-7xl mx-auto px-6"><QuickServices onSelect={setCurrentView} /></div>
          <div id="locations" className="max-w-7xl mx-auto px-6"><NearestLocations /></div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={currentView} setView={setCurrentView} user={currentUser} onLogout={() => { setCurrentUser(null); localStorage.removeItem('million_km_user'); showToast("Chiqdingiz"); }} onLoginClick={() => setIsAuthModalOpen(true)} />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <AIConsultant />

      {/* Dynamic Island Toast */}
      {toast && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[300] w-full max-w-sm px-4 pointer-events-none animate-dynamic-island">
          <div className={`apple-glass p-5 rounded-[2.5rem] shadow-2xl flex items-center space-x-4 border border-white/40 ${toast.type === 'error' ? 'bg-red-50/80' : 'bg-white/80'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'}`}>
              <i className={`fas ${toast.type === 'error' ? 'fa-times' : 'fa-check'} text-sm`}></i>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Tizim xabari</span>
              <span className="font-bold text-sm">{toast.message}</span>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/30 backdrop-blur-md">
          <div className="bg-white/95 apple-glass squircle-lg p-10 w-full max-w-md shadow-2xl relative animate-spring">
            <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors tap-active"><i className="fas fa-times text-xl"></i></button>
            <h2 className="text-3xl font-extrabold tracking-tight mb-8">Million KM</h2>
            <div className="space-y-6">
               <input type="text" value={loginForm.name} onChange={e => setLoginForm({...loginForm, name: e.target.value})} placeholder="Ismingiz" className="w-full h-16 px-6 rounded-2xl bg-gray-100/50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
               {loginForm.name.toLowerCase() === 'admin' ? (
                 <input type="password" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} placeholder="Pin" className="w-full h-16 px-6 rounded-2xl bg-gray-100/50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold text-center tracking-[0.5em]" />
               ) : (
                 <input type="tel" value={loginForm.phone} onChange={e => setLoginForm({...loginForm, phone: e.target.value})} placeholder="+998" className="w-full h-16 px-6 rounded-2xl bg-gray-100/50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
               )}
               <button onClick={handleLoginSubmit} className="w-full h-16 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs tap-active">Davom etish</button>
            </div>
          </div>
        </div>
      )}

      <footer className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-black tracking-tighter">Million KM</h3>
            <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-widest">Premium Auto Service 2025</p>
          </div>
          <div className="flex space-x-10 text-[11px] font-black text-gray-400 uppercase tracking-widest">
            <button onClick={() => setCurrentView('home')} className="hover:text-black">Asosiy</button>
            <button onClick={() => setCurrentView('about')} className="hover:text-black">Haqimizda</button>
            <a href="tel:+998770200107" className="hover:text-black">Aloqa</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
