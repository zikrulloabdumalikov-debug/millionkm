
// --- ADMIN COMPONENT ---
const Admin = ({ orders }) => {
  const uniqueClients = new Set(orders.map(o => o.phone)).size;
  const totalOrders = orders.length;
  
  const todayStr = new Date().toLocaleDateString('uz-UZ');
  const todayOrders = orders.filter(o => o.timestamp.includes(todayStr)).length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Tizim Boshqaruvi</div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Admin Boshqaruvi</h1>
        </div>
        <div className="flex items-center bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm font-bold text-sm">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse mr-3"></span>
          Jonli monitoring faol
        </div>
      </div>
      
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 card-shadow overflow-hidden">
            <div className="p-10 border-b border-slate-50 flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center">
                <i className="fas fa-stream mr-4 text-blue-600 opacity-50"></i> Oxirgi kelgan so'rovlar
              </h2>
              <span className="text-xs font-bold text-slate-400">{orders.length} ta jami</span>
            </div>
            
            <div className="overflow-x-auto">
              {orders.length === 0 ? (
                <div className="py-32 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl mx-auto mb-6 flex items-center justify-center text-slate-200">
                    <i className="fas fa-inbox text-2xl"></i>
                  </div>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Hozircha buyurtmalar yo'q</p>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-10 py-5 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Mijoz</th>
                      <th className="px-10 py-5 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Transport</th>
                      <th className="px-10 py-5 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Xizmat</th>
                      <th className="px-10 py-5 font-bold text-slate-400 text-[10px] uppercase tracking-widest text-right">Amal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-10 py-6">
                          <div className="font-extrabold text-slate-900 text-sm">{order.userName}</div>
                          <div className="text-[11px] text-blue-600 font-bold mt-1 tracking-wide">{order.phone}</div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="font-bold text-slate-700 text-sm">{order.brand} {order.model}</div>
                          <div className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-tight">{order.timestamp}</div>
                        </td>
                        <td className="px-10 py-6">
                          <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest">
                            {order.serviceType}
                          </span>
                        </td>
                        <td className="px-10 py-6 text-right">
                          <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all">
                            <i className="fas fa-arrow-right text-xs"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
             <div className="relative z-10 space-y-12">
               <div>
                 <div className="text-white/30 text-[9px] font-bold uppercase tracking-widest mb-4">Jami Mijozlar</div>
                 <div className="text-5xl font-black tracking-tighter">{uniqueClients}</div>
               </div>
               <div>
                 <div className="text-white/30 text-[9px] font-bold uppercase tracking-widest mb-4">Jami Buyurtmalar</div>
                 <div className="text-5xl font-black tracking-tighter">{totalOrders}</div>
               </div>
               <div>
                 <div className="text-white/30 text-[9px] font-bold uppercase tracking-widest mb-4">Bugungi</div>
                 <div className="text-5xl font-black tracking-tighter text-blue-400">{todayOrders}</div>
               </div>
             </div>
             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>
           </div>

           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 card-shadow">
              <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-[10px]">Eksport qilish</h3>
              <div className="grid grid-cols-2 gap-4">
                 <button className="p-6 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-all text-center">
                    <i className="fas fa-file-excel text-xl text-slate-300 mb-3 block"></i>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Excel</span>
                 </button>
                 <button className="p-6 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-all text-center">
                    <i className="fas fa-file-pdf text-xl text-slate-300 mb-3 block"></i>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">PDF</span>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- AI CONSULTANT COMPONENT ---
const AIConsultant = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [step, setStep] = React.useState('welcome');
  const [isLoading, setIsLoading] = React.useState(false);
  
  const [data, setData] = React.useState({
    model: '',
    problem: '',
    name: '',
    phone: '',
    carPlate: '',
    mileage: ''
  });

  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [step, isOpen]);

  const handleNext = () => {
    if (step === 'welcome') setStep('model');
    else if (step === 'model' && data.model) setStep('problem');
    else if (step === 'problem' && data.problem) setStep('contact');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.phone) return;
    
    setIsLoading(true);
    // window.sendLeadToTelegram from js/data.js
    const success = await window.sendLeadToTelegram(data);
    setIsLoading(false);
    
    if (success) {
      setStep('success');
      setTimeout(() => {
        setIsOpen(false);
        resetChat();
      }, 5000);
    } else {
        alert("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    }
  };

  const resetChat = () => {
    setStep('welcome');
    setData({ model: '', problem: '', name: '', phone: '', carPlate: '', mileage: '' });
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[200]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 md:w-16 md:h-16 bg-black text-white rounded-[22px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all border border-white/10 group"
        >
          <i className="fas fa-comment-dots text-xl md:text-2xl group-hover:rotate-12 transition-transform"></i>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-black animate-pulse"></span>
        </button>
      ) : (
        <div className="w-[calc(100vw-32px)] sm:w-[380px] md:w-[420px] bg-white rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col overflow-hidden animate-spring max-h-[85vh]">
          {/* Header */}
          <div className="p-5 md:p-6 bg-black text-white flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <i className="fas fa-headset text-sm"></i>
              </div>
              <div>
                <h4 className="font-bold text-xs md:text-sm tracking-tight">Million KM Support</h4>
                <div className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Operator Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
              <i className="fas fa-times text-xs"></i>
            </button>
          </div>

          {/* Chat Body */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 ios-scroll bg-gray-50/30">
            
            {/* Step: Messages */}
            <div className="space-y-6">
              {/* Bot: Welcome */}
              <div className="flex justify-start animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="max-w-[85%] bg-white p-4 md:p-5 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm text-xs md:text-sm font-semibold text-slate-800 leading-relaxed">
                  Assalomu alaykum! Million KM servisiga xush kelibsiz. Biz bilan bog'lanish uchun bir nechta savolga javob bering.
                </div>
              </div>

              {/* Bot: Ask Model */}
              {(step === 'model' || step === 'problem' || step === 'contact' || step === 'success') && (
                <div className="flex justify-start animate-in fade-in slide-in-from-left-4 duration-500">
                  <div className="max-w-[85%] bg-white p-4 md:p-5 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm text-xs md:text-sm font-semibold text-slate-800">
                    Mashinangiz modelini yozing (masalan: Cobalt, Kia K5):
                  </div>
                </div>
              )}

              {/* User: Model Input UI */}
              {step === 'model' && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <input 
                    autoFocus
                    className="w-full h-12 md:h-14 px-5 bg-white border border-gray-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Avto modeli..."
                    value={data.model}
                    onChange={e => setData({...data, model: e.target.value})}
                    onKeyPress={e => e.key === 'Enter' && data.model && handleNext()}
                  />
                  <button onClick={handleNext} disabled={!data.model} className="w-full h-12 bg-black text-white rounded-xl font-bold text-[10px] uppercase tracking-widest disabled:opacity-20 transition-all active:scale-95">
                    Davom etish <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              )}

              {/* Bot: Ask Problem */}
              {(step === 'problem' || step === 'contact' || step === 'success') && (
                <div className="flex justify-start animate-in fade-in slide-in-from-left-4 duration-500">
                  <div className="max-w-[85%] bg-white p-4 md:p-5 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm text-xs md:text-sm font-semibold text-slate-800">
                    Muammoni qisqacha tushuntiring:
                  </div>
                </div>
              )}

              {/* User: Problem Input UI */}
              {step === 'problem' && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <textarea 
                    autoFocus
                    className="w-full p-5 bg-white border border-gray-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[100px] resize-none"
                    placeholder="Masalan: moy kamayishi, motor ovozi..."
                    value={data.problem}
                    onChange={e => setData({...data, problem: e.target.value})}
                  />
                  <button onClick={handleNext} disabled={!data.problem} className="w-full h-12 bg-black text-white rounded-xl font-bold text-[10px] uppercase tracking-widest disabled:opacity-20 transition-all active:scale-95">
                    Keyingi <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              )}

              {/* Bot: Ask Contact */}
              {(step === 'contact' || step === 'success') && (
                <div className="flex justify-start animate-in fade-in slide-in-from-left-4 duration-500">
                  <div className="max-w-[85%] bg-white p-4 md:p-5 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm text-xs md:text-sm font-semibold text-slate-800">
                    Ajoyib! Mutaxassis bog'lanishi uchun ma'lumotlarni qoldiring:
                  </div>
                </div>
              )}

              {/* User: Contact Form UI */}
              {step === 'contact' && (
                <form onSubmit={handleSubmit} className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="grid grid-cols-1 gap-3">
                    <input required className="w-full h-12 px-5 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ismingiz" value={data.name} onChange={e => setData({...data, name: e.target.value})} />
                    <input required type="tel" className="w-full h-12 px-5 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" placeholder="Telefon (901234567)" value={data.phone} onChange={e => setData({...data, phone: e.target.value})} />
                    <div className="grid grid-cols-2 gap-3">
                      <input className="w-full h-12 px-5 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" placeholder="Raqam" value={data.carPlate} onChange={e => setData({...data, carPlate: e.target.value})} />
                      <input type="number" className="w-full h-12 px-5 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" placeholder="Probeg" value={data.mileage} onChange={e => setData({...data, mileage: e.target.value})} />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 active:scale-95 transition-all mt-4"
                  >
                    {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : "YUBORISH"}
                  </button>
                </form>
              )}

              {/* Success State */}
              {step === 'success' && (
                <div className="text-center py-8 space-y-4 animate-in zoom-in duration-500">
                  <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-2xl mx-auto shadow-inner">
                    <i className="fas fa-check"></i>
                  </div>
                  <h3 className="text-lg font-black tracking-tight uppercase text-slate-900">Qabul qilindi!</h3>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                    Mutaxassisimiz tez orada siz bilan <br /> bog'lanadi.
                  </p>
                </div>
              )}
            </div>
            
            <div ref={scrollRef} />
          </div>

          {/* Footer Branding */}
          <div className="p-4 bg-white border-t border-gray-50 text-center shrink-0">
            <p className="text-[8px] font-bold text-gray-300 uppercase tracking-[0.3em]">Million KM Premium Intelligence</p>
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN APP COMPONENT ---
const App = () => {
  // Boshqa fayllardan (layout.js, content.js va h.k.) yuklangan komponentlarni olish
  const { 
    Navbar, Hero, AboutUs, Benefits, NearestLocations, 
    QuickServices, MobileService, StatusChecker, BrandGrid, Cabinet 
  } = window;
  
  const [currentView, setCurrentView] = React.useState('home');
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [toast, setToast] = React.useState(null);

  const [loginForm, setLoginForm] = React.useState({ name: '', phone: '', password: '' });

  const showToast = React.useCallback((message, type = 'success') => {
    setToast({ message, type, isExiting: false });
    setTimeout(() => setToast(prev => prev ? { ...prev, isExiting: true } : null), 3500);
    setTimeout(() => setToast(null), 4000);
  }, []);

  React.useEffect(() => {
    const savedUser = localStorage.getItem('million_km_user');
    const savedOrders = localStorage.getItem('million_km_orders');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const addOrder = async (orderData) => {
    const newOrder = {
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

    // Telegram uchun xabar formatlash (App logikasidan olingan)
    let tgMsg = "";
    if (orderData.isGarageRequest) {
        const kmDiff = orderData.currentKm - orderData.lastServiceKm;
        const daysAgo = orderData.dailyKm > 0 ? Math.floor(kmDiff / orderData.dailyKm) : "Noma'lum";

        tgMsg = `🚘 <b>SERVISGA YOZILISH (GARAJ)</b>\n\n`;
        tgMsg += `👤 <b>Mijoz:</b> ${newOrder.userName}\n`;
        tgMsg += `📞 <b>Telefon:</b> <code>${newOrder.phone}</code>\n\n`;
        tgMsg += `🚙 <b>Avtomobil:</b> ${newOrder.brand} ${newOrder.model} (${orderData.carYear}-yil)\n`;
        tgMsg += `📟 <b>Hozirgi probeg:</b> ${orderData.currentKm?.toLocaleString()} km\n`;
        tgMsg += `🛠 <b>Oxirgi servis:</b> ${orderData.lastServiceKm?.toLocaleString()} km\n`;
        tgMsg += `📉 <b>Yurilgan masofa:</b> ${kmDiff?.toLocaleString()} km\n`;
        tgMsg += `📅 <b>Vaqt oralig'i:</b> ~${daysAgo} kun oldin\n\n`;
        tgMsg += `📝 <b>Xizmat turi:</b> ${newOrder.serviceType}`;
    } else {
        tgMsg = `📦 <b>YANGI BUYURTMA</b>\n\n`;
        tgMsg += `👤 <b>Mijoz:</b> ${newOrder.userName}\n`;
        tgMsg += `📞 <b>Telefon:</b> <code>${newOrder.phone}</code>\n`;
        tgMsg += `🛠 <b>Xizmat:</b> ${newOrder.serviceType}\n`;
        if(newOrder.brand) tgMsg += `🚗 <b>Avto:</b> ${newOrder.brand} ${newOrder.model}\n`;
        if(newOrder.tariffType) tgMsg += `📋 <b>Tarif:</b> ${newOrder.tariffType === 'yearly' ? 'Yillik Obuna' : 'Bir Martalik'}\n`;
        if(newOrder.servicesCount) tgMsg += `🔢 <b>Soni:</b> ${newOrder.servicesCount} marta\n`;
        if(newOrder.totalPrice) tgMsg += `💰 <b>Jami Narx:</b> ${newOrder.totalPrice.toLocaleString()} UZS\n`;
        if(newOrder.note) tgMsg += `\n📝 <b>Izoh:</b> ${newOrder.note}`;
    }

    // window.sendTelegramNotification from js/data.js
    await window.sendTelegramNotification(tgMsg);

    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem('million_km_orders', JSON.stringify(updated));
    showToast("Buyurtmangiz qabul qilindi!");
  };

  const handleLoginSubmit = () => {
    if (loginForm.name.toLowerCase() === 'admin' && loginForm.password === '123') {
      const adminUser = { uid: 'a1', name: 'Admin', email: '', phone: '', gender: '', isAdmin: true };
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

    const user = { uid: 'u-' + Date.now(), name: loginForm.name, email: '', phone: loginForm.phone, gender: '', isAdmin: false };
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
      case 'cabinet': return currentUser ? <Cabinet user={currentUser} showToast={showToast} onOrder={addOrder} /> : <Hero user={currentUser} onStart={() => setIsAuthModalOpen(true)} />;
      case 'admin': return currentUser?.isAdmin ? <Admin orders={orders} /> : <div className="p-20 text-center font-bold text-red-500">Ruxsat yo'q</div>;
      case 'express':
      case 'fuel': return <MobileService type={currentView} user={currentUser} onOrder={addOrder} onOpenAuth={() => setIsAuthModalOpen(true)} />;
      case 'about': return <AboutUs />;
      default: return (
        <div className="space-y-32 pb-40">
          <Hero 
            user={currentUser} 
            onStart={() => {
              if (currentUser) {
                setCurrentView('cabinet');
              } else {
                setIsAuthModalOpen(true);
              }
            }} 
          />
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

// --- RENDER ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
