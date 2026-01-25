
import React, { useState, useEffect, useCallback } from 'react';
import { User, Order } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatusChecker from './components/StatusChecker';
import BrandGrid from './components/BrandGrid';
import Cabinet from './components/Cabinet';
import Admin from './components/Admin';
import MobileService from './components/MobileService';
import AIConsultant from './components/AIConsultant';
import AboutUs from './components/AboutUs';
import NearestLocations from './components/NearestLocations';
import Benefits from './components/Benefits';
import QuickServices from './components/QuickServices';
import { sendTelegramNotification } from './services/telegramService';

type ToastType = 'success' | 'error';
interface ToastState {
  message: string;
  type: ToastType;
  isExiting: boolean;
}

type View = 'home' | 'cabinet' | 'admin' | 'express' | 'fuel' | 'about' | 'locations';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toast, setToast] = useState<ToastState | null>(null);

  const [loginForm, setLoginForm] = useState({ name: '', phone: '', password: '' });

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    setToast({ message, type, isExiting: false });
    setTimeout(() => setToast(prev => prev ? { ...prev, isExiting: true } : null), 3500);
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

    let tgMessage = `🚀 <b>YANGI BUYURTMA</b>\n\n`;
    tgMessage += `👤 Mijoz: ${newOrder.userName}\n`;
    tgMessage += `📞 Tel: ${newOrder.phone}\n`;
    tgMessage += `🚗 Avto: ${newOrder.brand} ${newOrder.model}\n`;
    tgMessage += `🛠 Xizmat: ${newOrder.serviceType}\n`;
    if (newOrder.totalPrice) {
      tgMessage += `💰 Narxi: ${newOrder.totalPrice.toLocaleString()} UZS\n`;
    }
    if (newOrder.note) {
      tgMessage += `\n📝 Izoh: ${newOrder.note}`;
    }

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
      showToast("Xush kelibsiz, Admin");
      return;
    }

    if (!loginForm.name || !loginForm.phone) {
      showToast("Ma'lumotlar to'liq emas", "error");
      return;
    }

    const user: User = { uid: 'u-' + Date.now(), name: loginForm.name, email: '', phone: loginForm.phone, gender: '', isAdmin: false };
    setCurrentUser(user);
    localStorage.setItem('million_km_user', JSON.stringify(user));
    setIsAuthModalOpen(false);
    showToast(`Salom, ${user.name}`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('million_km_user');
    setCurrentView('home');
    showToast("Tizimdan chiqdingiz");
  };

  const renderView = () => {
    switch (currentView) {
      case 'cabinet': return currentUser ? <Cabinet user={currentUser} showToast={showToast} onOrder={addOrder} /> : <Hero onStart={() => setIsAuthModalOpen(true)} />;
      case 'admin': return currentUser?.isAdmin ? <Admin orders={orders} /> : <div className="p-20 text-center font-bold text-red-500">Ruxsat yo'q</div>;
      case 'express':
      case 'fuel': return <MobileService type={currentView} user={currentUser} onOrder={addOrder} onOpenAuth={() => setIsAuthModalOpen(true)} />;
      case 'about': return <AboutUs />;
      default: return (
        <div className="space-y-32 pb-40">
          <Hero onStart={() => setIsAuthModalOpen(true)} />
          <div id="brands" className="max-w-[1200px] mx-auto px-6"><BrandGrid user={currentUser} onOrder={addOrder} onOpenAuth={() => setIsAuthModalOpen(true)} /></div>
          <div id="benefits" className="max-w-[1200px] mx-auto px-6"><Benefits /></div>
          <div id="status" className="max-w-[900px] mx-auto px-6"><StatusChecker showToast={showToast} onRegister={() => setIsAuthModalOpen(true)} onOneTime={() => setCurrentView('express')} /></div>
          <div id="quick-services-view" className="max-w-[1200px] mx-auto px-6"><QuickServices onSelect={setCurrentView} /></div>
          <div id="locations" className="max-w-[1200px] mx-auto px-6"><NearestLocations /></div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen selection:bg-blue-100 flex flex-col bg-[#F8F9FA]">
      <Navbar currentView={currentView} setView={setCurrentView} user={currentUser} onLogout={handleLogout} onLoginClick={() => setIsAuthModalOpen(true)} />
      
      <main className="flex-grow pt-16 md:pt-0">
        {renderView()}
      </main>

      <footer className="py-20 border-t border-gray-100 bg-white/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-extrabold tracking-tighter">Million KM</h3>
            <p className="text-sm text-gray-400 mt-2 font-medium italic">Premium avto servis xizmati</p>
          </div>
          <div className="flex space-x-10 text-[13px] font-bold text-gray-500 uppercase tracking-widest">
            <button onClick={() => setCurrentView('home')} className="hover:text-black">Bosh sahifa</button>
            <button onClick={() => setCurrentView('about')} className="hover:text-black">Biz haqimizda</button>
            <a href="tel:+998770200107" className="hover:text-black">Yordam</a>
          </div>
        </div>
      </footer>

      <AIConsultant />

      {toast && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[300] w-full max-w-[420px] px-6 pointer-events-none transition-all duration-700 ${toast.isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100 animate-spring'}`}>
          <div className={`p-5 rounded-[2.5rem] shadow-[0_25px_60px_-10px_rgba(0,0,0,0.2)] flex items-center space-x-5 border backdrop-blur-3xl ${toast.type === 'success' ? 'bg-[#1C1C1E] text-white border-white/10' : 'bg-[#FF3B30] text-white border-white/20'}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${toast.type === 'success' ? 'bg-blue-500/20 shadow-lg' : 'bg-white/20'}`}>
              <i className={`fas ${toast.type === 'success' ? 'fa-check' : 'fa-exclamation-triangle'} text-lg`}></i>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 leading-none mb-1.5">Million KM</span>
              <span className="font-bold text-[15px] tracking-tight">{toast.message}</span>
            </div>
          </div>
        </div>
      )}

      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
          <div className="bg-white/95 backdrop-blur-3xl rounded-[32px] p-10 w-full max-w-md shadow-2xl relative border border-white/50 animate-spring">
            <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors tap-active"><i className="fas fa-times text-xl"></i></button>
            <h2 className="text-3xl font-extrabold tracking-tight mb-8">Kirish</h2>
            <div className="space-y-5">
               <div className="space-y-2">
                 <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">To'liq ism</label>
                 <input type="text" value={loginForm.name} onChange={e => setLoginForm({...loginForm, name: e.target.value})} placeholder="Masalan: Azizbek" className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
               </div>
               {loginForm.name.toLowerCase() !== 'admin' ? (
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Telefon raqam</label>
                    <input type="tel" value={loginForm.phone} onChange={e => setLoginForm({...loginForm, phone: e.target.value})} placeholder="+998" className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
                  </div>
               ) : (
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Maxfiy kod</label>
                    <input type="password" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} placeholder="••••" className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold text-center tracking-[0.5em]" />
                  </div>
               )}
               <button onClick={handleLoginSubmit} className="w-full h-16 bg-black text-white rounded-2xl font-bold text-sm uppercase tracking-widest tap-active shadow-xl mt-4 active:scale-95 transition-all">Davom etish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
