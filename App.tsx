
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
import { sendTelegramNotification } from './services/telegramService';

// Firebase Config Mock
const firebaseConfig = {
  apiKey: "AIzaSyA0zyqs1BrDKKS7kkq3nqmJSj_VpM6CVcM",
  authDomain: "millionkm-a42ee.firebaseapp.com",
  projectId: "millionkm-a42ee",
  storageBucket: "millionkm-a42ee.firebasestorage.app",
  messagingSenderId: "594685468082",
  appId: "1:594685468082:web:e44c081e0617f0016998ab"
};

type View = 'home' | 'cabinet' | 'admin' | 'express' | 'fuel' | 'about' | 'locations';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Login Form State
  const [loginForm, setLoginForm] = useState({ name: '', phone: '', password: '' });

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
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
    };

    const tgMessage = `
<b>🚀 Yangi Buyurtma!</b>
<b>Mijoz:</b> ${newOrder.userName}
<b>Telefon:</b> ${newOrder.phone}
<b>Mashina:</b> ${newOrder.brand} ${newOrder.model}
<b>Xizmat:</b> ${newOrder.serviceType}
<b>Izoh:</b> ${newOrder.note}
<b>Vaqt:</b> ${newOrder.timestamp}
    `;

    await sendTelegramNotification(tgMessage);

    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem('million_km_orders', JSON.stringify(updated));
    showToast("Buyurtmangiz qabul qilindi va Telegram guruhga yuborildi!", "success");
  };

  const handleLoginSubmit = () => {
    const isAdminMode = loginForm.name.toLowerCase() === 'admin';
    
    // 1. Admin Login Check (Login: admin, Parol: 123)
    if (isAdminMode && loginForm.password === '123') {
      const adminUser: User = {
        uid: 'admin-1',
        name: 'Administrator',
        email: 'admin@million.km',
        phone: '+9980000000',
        gender: 'male',
        isAdmin: true
      };
      
      setCurrentUser(adminUser);
      localStorage.setItem('million_km_user', JSON.stringify(adminUser));
      setIsAuthModalOpen(false);
      setLoginForm({ name: '', phone: '', password: '' });
      showToast("Admin rejimi faollashtirildi!", "success");
      return;
    } else if (isAdminMode && loginForm.password !== '123') {
      showToast("Admin paroli noto'g'ri", "error");
      return;
    }

    // 2. Regular User Validation
    if (!loginForm.name || !loginForm.phone) {
      showToast("Iltimos, ism va telefon raqamingizni kiriting", "error");
      return;
    }

    // 3. Regular User Login
    const user: User = {
      uid: 'user-' + Math.random().toString(36).substr(2, 9),
      name: loginForm.name,
      email: 'user@mail.com',
      phone: loginForm.phone,
      gender: 'male',
      isAdmin: false
    };

    setCurrentUser(user);
    localStorage.setItem('million_km_user', JSON.stringify(user));
    setIsAuthModalOpen(false);
    setLoginForm({ name: '', phone: '', password: '' }); 
    showToast(`Xush kelibsiz, ${user.name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('million_km_user');
    setCurrentView('home');
    showToast("Tizimdan chiqdingiz.");
  };

  const renderView = () => {
    switch (currentView) {
      case 'cabinet':
        return currentUser ? <Cabinet user={currentUser} showToast={showToast} onOrder={addOrder} /> : <Hero onStart={() => setIsAuthModalOpen(true)} />;
      case 'admin':
        return currentUser?.isAdmin ? <Admin orders={orders} /> : <div className="p-20 text-center font-bold text-red-500">Ruxsat yo'q. Faqat adminlar uchun.</div>;
      case 'express':
      case 'fuel':
        return <MobileService type={currentView} user={currentUser} onOrder={addOrder} onOpenAuth={() => setIsAuthModalOpen(true)} />;
      case 'about':
        return <AboutUs />;
      case 'locations':
        return (
          <div className="animate-in pt-10">
            <NearestLocations />
          </div>
        );
      default:
        return (
          <div className="animate-in">
            <Hero onStart={() => setIsAuthModalOpen(true)} />
            <div id="status" className="max-w-7xl mx-auto px-4 py-16">
               <StatusChecker showToast={showToast} onRegister={() => setIsAuthModalOpen(true)} onOneTime={(brand, model) => {
                 setCurrentView('express');
                 window.scrollTo(0,0);
               }} />
            </div>
            <div id="benefits" className="max-w-7xl mx-auto px-4 py-16">
              <Benefits />
            </div>
            <div id="brands" className="max-w-7xl mx-auto px-4 py-16">
              <BrandGrid user={currentUser} onOrder={addOrder} onOpenAuth={() => setIsAuthModalOpen(true)} />
            </div>
            <div id="locations" className="max-w-7xl mx-auto px-4 py-16">
              <NearestLocations />
            </div>
          </div>
        );
    }
  };

  useEffect(() => {
    if (isAuthModalOpen) document.body.classList.add('modal-open');
    else document.body.classList.remove('modal-open');
  }, [isAuthModalOpen]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-100 relative">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        user={currentUser} 
        onLogout={handleLogout} 
        onLoginClick={() => setIsAuthModalOpen(true)} 
      />
      
      <main className="flex-grow pt-20">
        {renderView()}
      </main>

      <footer className="bg-white border-t border-slate-100 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <div className="text-2xl font-black mb-4 tracking-tighter text-[#1d1d1f]">Million KM</div>
            <p className="text-gray-500 font-medium leading-relaxed">
              Dvigatel uchun yangi avlod ishonchi. Biz shunchaki avtomobilga xizmat ko'rsatmaymiz — sizga ishonch, kafolat va qulaylik hadya qilamiz.
            </p>
          </div>
          <div className="flex flex-col space-y-3">
             <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-2">Bo'limlar</h4>
             <button onClick={() => setCurrentView('home')} className="text-gray-500 hover:text-blue-600 transition-colors w-fit mx-auto md:mx-0">Bosh sahifa</button>
             <button onClick={() => setCurrentView('about')} className="text-gray-500 hover:text-blue-600 transition-colors w-fit mx-auto md:mx-0">Biz haqimizda</button>
             <button 
              onClick={() => {
                if (currentView === 'home') {
                  document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setCurrentView('home');
                  setTimeout(() => document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }
              }} 
              className="text-gray-500 hover:text-blue-600 transition-colors w-fit mx-auto md:mx-0"
             >
              Manzillarimiz
             </button>
          </div>
          <div className="flex flex-col space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-2">Bog'lanish</h4>
            <div className="text-sm font-bold text-gray-900">📞 Call centr: +998 71 123 45 67</div>
            <div className="flex justify-center md:justify-start space-x-6 text-xl text-gray-400">
              <a href="#" className="hover:text-blue-600 transition-colors"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-blue-600 transition-colors"><i className="fab fa-telegram-plane"></i></a>
              <a href="#" className="hover:text-blue-600 transition-colors"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-50 text-center text-[10px] text-gray-300 font-bold uppercase tracking-widest">
           © 2024 Million KM Service. Barcha huquqlar himoyalangan.
        </div>
      </footer>

      <AIConsultant />

      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in">
          <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl relative overflow-hidden">
            <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-8 right-8 text-gray-300 hover:text-gray-900 transition-colors">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h2 className="text-3xl font-extrabold text-[#1d1d1f] text-center mb-10 tracking-tight">Kirish</h2>
            
            <div className="space-y-6">
               <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-2">Ismingiz</label>
                  <input 
                    type="text" 
                    value={loginForm.name}
                    onChange={(e) => setLoginForm({...loginForm, name: e.target.value})}
                    placeholder="Masalan: Azizbek"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                  />
               </div>

               {/* Regular customer sees phone field, unless 'admin' is typed */}
               {loginForm.name.toLowerCase() !== 'admin' && (
                  <div className="animate-in fade-in duration-300">
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-2">Telefon raqam</label>
                    <input 
                      type="tel" 
                      value={loginForm.phone}
                      onChange={(e) => setLoginForm({...loginForm, phone: e.target.value})}
                      placeholder="+998 90 123 45 67"
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                    />
                  </div>
               )}
               
               <button 
                onClick={handleLoginSubmit} 
                className="w-full bg-[#1d1d1f] text-white py-5 rounded-[1.5rem] font-bold hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 mt-4 active:scale-95 uppercase tracking-widest text-xs"
               >
                 {loginForm.name.toLowerCase() === 'admin' ? 'Admin sifatida kirish' : 'Tizimga kirish'}
               </button>

               {/* HIDDEN Admin Password Field - only appears if name is 'admin' */}
               {loginForm.name.toLowerCase() === 'admin' && (
                 <div className="pt-6 border-t border-gray-100 mt-6 animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col items-start bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                      <label className="text-[10px] font-black uppercase text-blue-600 mb-2 ml-1">Admin PIN kodi</label>
                      <input 
                        type="password" 
                        autoFocus
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        placeholder="••••"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold tracking-widest"
                      />
                      <p className="mt-2 text-[8px] font-bold text-blue-400 uppercase tracking-tight">Faqat tizim boshqaruvchilari uchun</p>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[120] px-8 py-4.5 rounded-2xl shadow-2xl flex items-center space-x-4 text-white animate-in ${toast.type === 'success' ? 'bg-[#1d1d1f]' : 'bg-red-600'}`}>
          <i className={`fas ${toast.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
          <span className="font-bold text-sm tracking-wide">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default App;
