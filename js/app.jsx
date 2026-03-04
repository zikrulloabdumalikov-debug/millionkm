import React from 'react';
import ReactDOM from 'react-dom/client';
import { db, auth } from './firebase.js';
import { collection, query, where, getDocs, addDoc, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { sendTelegramNotification } from './data.js';
import { CONTENT } from './content.js';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import AboutUs from './components/AboutUs.jsx';
import Benefits from './components/Benefits.jsx';
import { NearestLocations, LocationsPreview } from './components/NearestLocations.jsx';
import QuickServices from './components/QuickServices.jsx';
import MobileService from './components/MobileService.jsx';
import StatusChecker from './components/StatusChecker.jsx';
import StatusCheckerPreview from './components/StatusCheckerPreview.jsx';
import { BrandGrid, BrandModels } from './components/BrandGrid.jsx';
import ServiceInfo from './components/ServiceInfo.jsx';
import Cabinet from './components/Cabinet.jsx';
import { AdminCheck } from './components/Admin.jsx';
import AIConsultant from './components/AIConsultant.jsx';

// Global utilities
window.sanitize = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/[<>]/g, '').trim();
};
window.sendTelegramNotification = sendTelegramNotification;

const App = () => {
  const [currentView, setCurrentView] = React.useState('home');
  const [selectedBrand, setSelectedBrand] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [toast, setToast] = React.useState(null);
  const scrollYRef = React.useRef(0);

  const [loginForm, setLoginForm] = React.useState({ name: '', phone: '', password: '' });

  const showToast = React.useCallback((message, type = 'success') => {
    setToast({ message, type, isExiting: false });
    setTimeout(() => setToast(prev => prev ? { ...prev, isExiting: true } : null), 3500);
    setTimeout(() => setToast(null), 4000);
  }, []);

  const handleLogout = React.useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('million_km_user');
    setCurrentView('home');
    showToast("Tizimdan chiqdingiz");
  }, [showToast]);

  // Scroll handling
  React.useEffect(() => {
    if (currentView === 'home') {
      // Restore scroll position when returning to home
      setTimeout(() => {
        window.scrollTo({ top: scrollYRef.current, behavior: 'auto' });
      }, 0);
    } else {
      // Scroll to top for other views
      window.scrollTo(0, 0);
    }
  }, [currentView]);

  const goToView = (view) => {
    if (currentView === 'home') {
      scrollYRef.current = window.scrollY;
    }
    setCurrentView(view);
  };

  const goBack = () => {
    setCurrentView('home');
  };

  // Initial Auth Verification
  React.useEffect(() => {
    const saved = localStorage.getItem('million_km_user');
    if (saved) {
      const localUser = JSON.parse(saved);
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('uid', '==', localUser.uid));
      
      getDocs(q).then(snap => {
        if (!snap.empty) {
          const data = snap.docs[0].data();
          setCurrentUser({
            uid: data.uid,
            name: data.name,
            phone: data.phone,
            isAdmin: data.isAdmin || false
          });
        } else {
          localStorage.removeItem('million_km_user');
        }
      }).catch(err => {
        console.error("Auth verification error:", err);
        showToast("Sessiya xatosi", "error");
      });
    }
  }, [showToast]);

  // Real-time Orders for Admin
  React.useEffect(() => {
    if (!currentUser?.isAdmin) return;
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    }, (error) => {
      console.error("Orders snapshot error:", error);
      showToast("Buyurtmalarni yuklashda xatolik", "error");
    });
    
    return () => unsubscribe();
  }, [currentUser?.isAdmin, showToast]);

  const addOrder = async (orderData) => {
    const newOrder = {
      userUid: currentUser?.uid || 'guest',
      userName: window.sanitize(orderData.userName || currentUser?.name || 'Mehmon'),
      phone: window.sanitize(orderData.phone || currentUser?.phone || ''),
      brand: window.sanitize(orderData.brand || 'Noma\'lum'),
      model: window.sanitize(orderData.model || 'Noma\'lum'),
      serviceType: window.sanitize(orderData.serviceType || 'Xizmat'),
      note: window.sanitize(orderData.note || ''),
      tariffType: orderData.tariffType || null,
      servicesCount: orderData.servicesCount || null,
      totalPrice: orderData.totalPrice || null,
      isGarageRequest: orderData.isGarageRequest || false,
      createdAt: serverTimestamp(),
      timestamp: new Date().toLocaleString('uz-UZ')
    };

    try {
      await addDoc(collection(db, 'orders'), newOrder);

      let tgMsg = '';
      if (orderData.isGarageRequest) {
        tgMsg = `🚘 <b>SERVISGA YOZILISH (GARAJ)</b>\n\n`;
        tgMsg += `👤 <b>Mijoz:</b> ${newOrder.userName}\n`;
        tgMsg += `📞 <b>Telefon:</b> <code>${newOrder.phone}</code>\n`;
        tgMsg += `🚙 <b>Avtomobil:</b> ${newOrder.brand} ${newOrder.model}\n`;
        tgMsg += `🛠 <b>Xizmat:</b> ${newOrder.serviceType}`;
      } else {
        tgMsg = `📦 <b>YANGI BUYURTMA</b>\n\n`;
        tgMsg += `👤 <b>Mijoz:</b> ${newOrder.userName}\n`;
        tgMsg += `📞 <b>Telefon:</b> <code>${newOrder.phone}</code>\n`;
        tgMsg += `🛠 <b>Xizmat:</b> ${newOrder.serviceType}\n`;
        tgMsg += `🚗 <b>Avto:</b> ${newOrder.brand} ${newOrder.model}`;
        if (newOrder.totalPrice) tgMsg += `\n💰 <b>Narx:</b> ${newOrder.totalPrice.toLocaleString()} UZS`;
      }

      await window.sendTelegramNotification(tgMsg);
      showToast("Buyurtmangiz qabul qilindi!");
    } catch (error) {
      console.error("Order error:", error);
      showToast("Xatolik yuz berdi", "error");
    }
  };

  const handleLoginSubmit = async () => {
    if (!loginForm.name || !loginForm.phone) {
      showToast("Ma'lumotlar to'liq emas", "error");
      return;
    }

    try {
      const usersRef = collection(db, 'users');
      // Note: We search for non-admin users first, or just by phone.
      const phoneQuery = query(usersRef, where('phone', '==', loginForm.phone));
      const snapshot = await getDocs(phoneQuery);

      let userData;

      if (!snapshot.empty) {
        userData = snapshot.docs[0].data();
      } else {
        const newUser = {
          uid: crypto.randomUUID(),
          name: loginForm.name,
          phone: loginForm.phone,
          isAdmin: false,
          createdAt: serverTimestamp()
        };
        await addDoc(usersRef, newUser);
        userData = newUser;
      }

      // Firebase Anonymous Auth
      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }

      const user = {
        uid: userData.uid,
        name: userData.name,
        phone: userData.phone,
        isAdmin: userData.isAdmin || false
      };

      setCurrentUser(user);
      localStorage.setItem('million_km_user', JSON.stringify({
        uid: user.uid,
        name: user.name,
        phone: user.phone
      }));

      setIsAuthModalOpen(false);
      showToast(`Xush kelibsiz, ${user.name}!`);

    } catch (error) {
      console.error("Login error:", error);
      showToast("Xatolik yuz berdi", "error");
    }
  };

  const handlePhoneChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith('+998')) {
      val = '+998' + val.replace(/\D/g, '');
    } else {
      val = '+998' + val.substring(4).replace(/\D/g, '');
    }
    val = val.substring(0, 13);
    setLoginForm({ ...loginForm, phone: val });
  };

  const renderView = () => {
    switch (currentView) {
      case 'cabinet': return currentUser ? <Cabinet db={db} user={currentUser} showToast={showToast} onOrder={addOrder} /> : <Hero user={currentUser} onStart={() => setIsAuthModalOpen(true)} />;
      case 'admin': 
        if (!currentUser) {
          setIsAuthModalOpen(true);
          setCurrentView('home');
          return null;
        }
        return <AdminCheck orders={orders} currentUser={currentUser} showToast={showToast} setCurrentView={setCurrentView} />;
      case 'express':
      case 'fuel': return <MobileService type={currentView} user={currentUser} onOrder={addOrder} onOpenAuth={() => setIsAuthModalOpen(true)} />;
      case 'brand-details': return (
        <div className="pt-24 pb-12 px-6 max-w-[1200px] mx-auto">
          <BrandModels brand={selectedBrand} user={currentUser} onOrder={addOrder} onOpenAuth={() => setIsAuthModalOpen(true)} />
        </div>
      );
      case 'service-info': return (
        <div className="pt-24 pb-12 px-6 max-w-[1200px] mx-auto">
          <ServiceInfo 
            onBack={goBack} 
            onSelectModel={() => {
              goBack();
              setTimeout(() => {
                const el = document.getElementById('brands');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }} 
          />
        </div>
      );
      case 'status-check': return (
        <div className="pt-24 pb-12 px-6 max-w-[1200px] mx-auto">
          <StatusChecker showToast={showToast} onRegister={() => setIsAuthModalOpen(true)} onOneTime={() => goToView('express')} />
        </div>
      );
      case 'locations': return (
        <div className="pt-24 pb-12 px-6 max-w-[1200px] mx-auto">
          <NearestLocations />
        </div>
      );
      case 'about': return (
        <AboutUs 
          onCheckStatus={() => {
            setCurrentView('home');
            setTimeout(() => {
              const el = document.getElementById('status');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
          }}
          onStartBooking={() => setCurrentView('home')}
        />
      );
      default: return (
        <div className="space-y-16 pb-20">
          <Hero 
            user={currentUser} 
            onStart={() => {
              if (currentUser) {
                setCurrentView('cabinet');
              } else {
                setIsAuthModalOpen(true);
              }
            }}
            onStatusCheck={() => goToView('status-check')}
          />
          <div id="brands" className="max-w-[1200px] mx-auto px-6">
            <BrandGrid 
              user={currentUser} 
              onBrandSelect={(brand) => {
                setSelectedBrand(brand);
                goToView('brand-details');
              }} 
              onInfoSelect={() => goToView('service-info')}
            />
          </div>
          <div id="benefits" className="max-w-[1200px] mx-auto px-6"><Benefits onAboutClick={() => setCurrentView('about')} /></div>
          <div id="status" className="max-w-[900px] mx-auto px-6"><StatusCheckerPreview onCheck={() => goToView('status-check')} /></div>
          <div id="quick-services-view" className="max-w-[1200px] mx-auto px-6"><QuickServices onSelect={setCurrentView} /></div>
          <div id="locations" className="max-w-[1200px] mx-auto px-6"><LocationsPreview onViewAll={() => goToView('locations')} /></div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen selection:bg-blue-100 flex flex-col bg-[#F8F9FA]">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        user={currentUser} 
        onLogout={handleLogout} 
        onLoginClick={() => setIsAuthModalOpen(true)} 
        showBack={currentView !== 'home'}
        onBack={goBack}
      />
      
      <main className="flex-grow pt-16 md:pt-0">
        {renderView()}
      </main>

      <footer className="py-20 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-extrabold tracking-tighter text-slate-900">{CONTENT.footer.brand || "Million KM"}</h3>
            <p className="text-sm text-slate-600 mt-2 font-medium italic">{CONTENT.footer.tagline || CONTENT.footer.text}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-10 text-[13px] font-bold text-slate-600 uppercase tracking-widest">
            <div className="flex space-x-10">
              <button onClick={() => setCurrentView('home')} className="hover:text-slate-900 transition-colors">Bosh sahifa</button>
              <button onClick={() => setCurrentView('about')} className="hover:text-slate-900 transition-colors">Biz haqimizda</button>
            </div>
            <a href={`tel:${(CONTENT.footer.phone || CONTENT.footer.contact.phone).replace(/\s/g, '')}`} className="bg-black text-white px-6 py-3 rounded-full hover:scale-105 transition-all">{CONTENT.footer.phone || CONTENT.footer.contact.phone}</a>
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
                 <input type="text" value={loginForm.name} onChange={e => setLoginForm({...loginForm, name: e.target.value})} placeholder="Masalan: Azizbek" className="w-full h-16 px-6 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold text-lg text-slate-900" />
               </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Telefon raqam</label>
                  <input 
                    type="tel" 
                    value={loginForm.phone} 
                    onChange={handlePhoneChange}
                    placeholder="+998" 
                    className="w-full h-16 px-6 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold text-lg text-slate-900" 
                  />
                </div>
               <button onClick={handleLoginSubmit} className="w-full h-16 bg-black text-white rounded-2xl font-bold text-sm uppercase tracking-widest tap-active shadow-xl mt-4 active:scale-95 transition-all">Davom etish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
