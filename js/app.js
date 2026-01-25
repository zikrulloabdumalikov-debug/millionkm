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
    showToast("Buyurtma qabul qilindi!");
    
    // Telegramga yuborish
    let tgMsg = `📦 <b>Yangi Buyurtma</b>\n👤 ${newOrder.userName}\n📞 ${newOrder.phone}\n🛠 ${newOrder.serviceType}`;
    if(newOrder.brand) tgMsg += `\n🚗 ${newOrder.brand} ${newOrder.model}`;
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
        <div className="space-y-32 pb-40">
          <Hero onStart={() => setIsAuthModalOpen(true)} />
          <div id="brands"><BrandGrid user={currentUser} onOrder={addOrder} onOpenAuth={() => setIsAuthModalOpen(true)} /></div>
          <Benefits />
          <div id="status"><StatusChecker showToast={showToast} onRegister={() => setIsAuthModalOpen(true)} onOneTime={() => setCurrentView('express')} /></div>
          <QuickServices onSelect={setCurrentView} />
          <NearestLocations />
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Navbar currentView={currentView} setView={setCurrentView} user={currentUser} onLogout={() => {setCurrentUser(null); localStorage.removeItem('million_km_user');}} onLoginClick={() => setIsAuthModalOpen(true)} />
      <main className="flex-grow pt-16 md:pt-0">{renderView()}</main>
      <footer className="py-20 text-center text-gray-400 text-sm">© 2025 Million KM. Premium Service.</footer>
      <AIConsultant />
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[300] bg-black text-white px-8 py-4 rounded-full shadow-2xl animate-spring">
           {toast.message}
        </div>
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
           <div className="bg-white p-10 rounded-[2.5rem] w-full max-w-md space-y-4">
              <h2 className="text-3xl font-bold">Kirish</h2>
              <input className="w-full p-4 bg-gray-50 rounded-xl" placeholder="Ism" onChange={e => setLoginForm({...loginForm, name: e.target.value})} />
              {loginForm.name === 'admin' ? 
                 <input className="w-full p-4 bg-gray-50 rounded-xl" type="password" placeholder="Parol" onChange={e => setLoginForm({...loginForm, password: e.target.value})} /> :
                 <input className="w-full p-4 bg-gray-50 rounded-xl" placeholder="Telefon" onChange={e => setLoginForm({...loginForm, phone: e.target.value})} />
              }
              <button onClick={handleLogin} className="w-full py-4 bg-black text-white rounded-xl font-bold">Kirish</button>
              <button onClick={() => setIsAuthModalOpen(false)} className="w-full py-4 text-gray-500">Yopish</button>
           </div>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);