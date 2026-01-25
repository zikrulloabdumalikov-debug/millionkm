const App = () => {
  const { Navbar, Hero, AboutUs, Benefits, NearestLocations, QuickServices, MobileService, StatusChecker, BrandGrid, Cabinet, Admin, AIConsultant } = window;
  
  const [currentView, setCurrentView] = React.useState('home');
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [toast, setToast] = React.useState(null);
  const [loginForm, setLoginForm] = React.useState({ name: '', phone: '', password: '' });

  React.useEffect(() => {
    const savedUser = localStorage.getItem('million_km_user');
    const savedOrders = localStorage.getItem('million_km_orders');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addOrder = async (orderData) => {
    const newOrder = { ...orderData, id: Date.now(), timestamp: new Date().toLocaleString(), userName: currentUser?.name || orderData.userName || 'Mehmon' };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem('million_km_orders', JSON.stringify(updated));
    showToast("Buyurtma muvaffaqiyatli qabul qilindi!");
    
    // Telegramga yuborish
    let tgMsg = `📦 <b>Yangi Buyurtma</b>\n👤 ${newOrder.userName}\n📞 ${newOrder.phone}\n🛠 ${newOrder.serviceType}`;
    if(newOrder.brand) tgMsg += `\n🚗 ${newOrder.brand} ${newOrder.model}`;
    if(newOrder.totalPrice) tgMsg += `\n💰 ${newOrder.totalPrice} so'm`;
    await window.sendTelegramNotification(tgMsg);
  };

  const handleLogin = () => {
    if (loginForm.name === 'admin' && loginForm.password === '123') {
       const admin = { name: 'Admin', isAdmin: true };
       setCurrentUser(admin); localStorage.setItem('million_km_user', JSON.stringify(admin));
    } else {
       const user = { name: loginForm.name, phone: loginForm.phone, isAdmin: false };
       setCurrentUser(user); localStorage.setItem('million_km_user', JSON.stringify(user));
    }
    setIsAuthModalOpen(false);
  };

  const renderView = () => {
    switch (currentView) {
      case 'cabinet': return currentUser ? <Cabinet user={currentUser} showToast={showToast} onOrder={addOrder} /> : <Hero onStart={() => setIsAuthModalOpen(true)} />;
      case 'admin': return currentUser?.isAdmin ? <Admin orders={orders} /> : <div className="p-20 text-center font-bold text-red-500">Ruxsat yo'q</div>;
      case 'express':
      case 'fuel': return <MobileService type={currentView} user={currentUser} onOrder={addOrder} onOpenAuth={() => setIsAuthModalOpen(true)} />;
      case 'about': return <AboutUs />;
      default: return (
        <div>
          <Hero onStart={() => setIsAuthModalOpen(true)} />
          <BrandGrid user={currentUser} onOrder={addOrder} onOpenAuth={() => setIsAuthModalOpen(true)} />
          <Benefits />
          <StatusChecker showToast={showToast} onRegister={() => setIsAuthModalOpen(true)} onOneTime={() => setCurrentView('express')} />
          <QuickServices onSelect={setCurrentView} />
          <NearestLocations />
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7]">
      <Navbar currentView={currentView} setView={setCurrentView} user={currentUser} onLogout={() => {setCurrentUser(null); localStorage.removeItem('million_km_user');}} onLoginClick={() => setIsAuthModalOpen(true)} />
      <main className="flex-grow">{renderView()}</main>
      <footer className="py-10 bg-white border-t border-gray-100 text-center">
         <div className="mb-4">
            <span className="text-xl font-bold tracking-tight text-[#1d1d1f]">Million<span className="text-[#0071E3]">KM</span></span>
         </div>
         <p className="text-xs text-[#86868b] font-medium">© 2025 Premium Service. Barcha huquqlar himoyalangan.</p>
      </footer>
      <AIConsultant />
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[300] bg-white text-[#1d1d1f] px-6 py-3 rounded-full shadow-xl border border-gray-100 font-bold animate-fade-up flex items-center gap-2">
           <i className="fas fa-check-circle text-[#34C759]"></i> {toast.message}
        </div>
      )}

      {/* Auth Modal (Clean) */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
           <div className="bg-white p-8 rounded-[24px] w-full max-w-sm shadow-2xl relative animate-fade-up">
              <div className="text-center mb-6">
                 <h2 className="text-2xl font-bold text-[#1d1d1f] mb-1">Kirish</h2>
                 <p className="text-[#86868b] text-sm">Shaxsiy kabinetga xush kelibsiz.</p>
              </div>
              <div className="space-y-4">
                 <div>
                   <label className="text-xs font-bold text-[#86868B] uppercase ml-1 mb-1 block">Ismingiz</label>
                   <input className="apple-input bg-[#F5F5F7] border-transparent focus:bg-white" placeholder="Ism" onChange={e => setLoginForm({...loginForm, name: e.target.value})} />
                 </div>
                 {loginForm.name === 'admin' ? 
                    <div>
                      <label className="text-xs font-bold text-[#86868B] uppercase ml-1 mb-1 block">Parol</label>
                      <input className="apple-input bg-[#F5F5F7] border-transparent focus:bg-white" type="password" placeholder="***" onChange={e => setLoginForm({...loginForm, password: e.target.value})} /> 
                    </div> :
                    <div>
                      <label className="text-xs font-bold text-[#86868B] uppercase ml-1 mb-1 block">Telefon</label>
                      <input className="apple-input bg-[#F5F5F7] border-transparent focus:bg-white" placeholder="+998" onChange={e => setLoginForm({...loginForm, phone: e.target.value})} />
                    </div>
                 }
                 <button onClick={handleLogin} className="apple-btn-primary w-full py-3.5 shadow-lg mt-2">Kirish</button>
                 <button onClick={() => setIsAuthModalOpen(false)} className="w-full py-2 text-[#86868b] text-sm font-medium hover:text-[#1d1d1f]">Bekor qilish</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
