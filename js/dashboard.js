// Cabinet Component (Dashboard Style)
window.Cabinet = ({ user, showToast, onOrder }) => {
  const [cars, setCars] = React.useState([{ id: 'c1', brand: 'Chevrolet', model: 'Cobalt', year: 2022, lastOilKm: 42000, nextOilKm: 49000 }]);
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [newCar, setNewCar] = React.useState({ brand: '', model: '', year: '', lastOil: '' });

  const addCar = () => {
    if(!newCar.brand || !newCar.model) return;
    const lastKm = parseInt(newCar.lastOil) || 0;
    setCars([...cars, { ...newCar, id: Date.now(), lastOilKm: lastKm, nextOilKm: lastKm + 7000 }]);
    setIsAddOpen(false);
    showToast("Mashina garajga qo'shildi!");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Mijoz Portali</div>
          <h1 className="text-4xl md:text-5xl font-black text-white">Salom, {user.name}</h1>
        </div>
        <button onClick={() => setIsAddOpen(true)} className="mt-6 md:mt-0 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-bold text-sm transition-all border border-white/10">
          <i className="fas fa-plus mr-2"></i> Yangi mashina
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {cars.map(car => {
          const percent = Math.min(100, Math.max(0, ((car.lastOilKm % 7000) / 7000) * 100)); // Demo logic
          const remaining = car.nextOilKm - car.lastOilKm;
          
          return (
            <div key={car.id} className="glass-panel p-8 rounded-[32px] relative overflow-hidden group">
               <div className="flex justify-between items-start mb-8">
                 <div>
                   <h3 className="text-2xl font-black text-white">{car.brand} {car.model}</h3>
                   <div className="text-gray-400 font-medium">{car.year}-yil</div>
                 </div>
                 <div className="w-12 h-12 bg-brand-blue/20 rounded-full flex items-center justify-center text-brand-blue">
                   <i className="fas fa-car"></i>
                 </div>
               </div>

               {/* Dashboard Metrics */}
               <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                   <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Odometr</div>
                   <div className="text-xl font-bold text-white">{car.lastOilKm.toLocaleString()} <span className="text-xs font-normal text-gray-600">km</span></div>
                 </div>
                 <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                   <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Keyingi servis</div>
                   <div className="text-xl font-bold text-brand-blue">{car.nextOilKm.toLocaleString()} <span className="text-xs font-normal text-gray-600">km</span></div>
                 </div>
               </div>

               {/* Progress Bar */}
               <div className="mb-8">
                 <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                   <span>Moy holati</span>
                   <span>{100 - Math.round(percent)}% qoldi</span>
                 </div>
                 <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-brand-blue to-cyan-400 rounded-full" style={{width: `${100 - percent}%`}}></div>
                 </div>
               </div>

               <button onClick={() => onOrder({ brand: car.brand, model: car.model, serviceType: 'Garajdan' })} className="w-full py-4 bg-white text-black rounded-xl font-bold uppercase tracking-widest hover:bg-gray-200 transition-all">
                 Xizmatga yozilish
               </button>
            </div>
          );
        })}
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
           <div className="bg-[#1a1a1a] p-8 rounded-[32px] w-full max-w-md border border-white/10 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Yangi mashina</h2>
              <div className="space-y-4 mb-6">
                <input className="w-full p-4 bg-black border border-white/10 rounded-xl text-white outline-none focus:border-brand-blue" placeholder="Brend (Chevrolet)" onChange={e => setNewCar({...newCar, brand: e.target.value})} />
                <input className="w-full p-4 bg-black border border-white/10 rounded-xl text-white outline-none focus:border-brand-blue" placeholder="Model (Malibu)" onChange={e => setNewCar({...newCar, model: e.target.value})} />
                <input className="w-full p-4 bg-black border border-white/10 rounded-xl text-white outline-none focus:border-brand-blue" placeholder="Hozirgi probeg (km)" type="number" onChange={e => setNewCar({...newCar, lastOil: e.target.value})} />
              </div>
              <div className="flex gap-3">
                <button onClick={addCar} className="flex-1 py-3 bg-brand-blue text-white rounded-xl font-bold">Qo'shish</button>
                <button onClick={() => setIsAddOpen(false)} className="flex-1 py-3 bg-white/10 text-white rounded-xl font-bold">Bekor qilish</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

// Admin Panel (Simplified Dark Mode)
window.Admin = ({ orders }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-black text-white mb-8">Admin Dashboard</h1>
      <div className="bg-[#111] rounded-[32px] border border-white/10 overflow-hidden">
        <table className="w-full text-left text-gray-400">
          <thead className="bg-white/5 text-xs uppercase tracking-widest font-bold text-white">
            <tr><th className="p-6">Mijoz</th><th className="p-6">Avto</th><th className="p-6">Xizmat</th><th className="p-6">Vaqt</th></tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map(o => (
              <tr key={o.id} className="hover:bg-white/5 transition-colors">
                <td className="p-6 font-bold text-white">{o.userName}<br/><span className="text-xs text-brand-blue font-normal">{o.phone}</span></td>
                <td className="p-6">{o.brand} {o.model}</td>
                <td className="p-6"><span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold text-white">{o.serviceType}</span></td>
                <td className="p-6 text-sm">{o.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Improved AI Consultant (Smart Chat)
window.AIConsultant = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([{text: "Assalomu alaykum! Mashinangizda qanday muammo bor?", isBot: true}]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);

  const handleSend = async () => {
    if(!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, {text: userMsg, isBot: false}]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and sending lead
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {text: "Tushunarli. Mutaxassisimiz siz bilan 5 daqiqa ichida bog'lanadi.", isBot: true}]);
      // Real app would send data here
      window.sendTelegramNotification(`💬 <b>CHAT LEAD</b>\nMessage: ${userMsg}`);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] bg-[#1a1a1a] rounded-[24px] border border-white/10 shadow-2xl overflow-hidden animate-slide-up flex flex-col h-[450px]">
           {/* Header */}
           <div className="p-4 bg-[#111] border-b border-white/5 flex justify-between items-center">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center text-white"><i className="fas fa-robot"></i></div>
               <div>
                 <div className="font-bold text-white text-sm">AI Mexanik</div>
                 <div className="text-[10px] text-green-500 font-bold uppercase tracking-wider flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online</div>
               </div>
             </div>
             <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white"><i className="fas fa-times"></i></button>
           </div>

           {/* Messages */}
           <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-black/20">
             {messages.map((m, i) => (
               <div key={i} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}>
                 <div className={`max-w-[80%] p-3 rounded-2xl text-sm font-medium ${m.isBot ? 'bg-[#333] text-white rounded-tl-none' : 'bg-brand-blue text-white rounded-tr-none'}`}>
                   {m.text}
                 </div>
               </div>
             ))}
             {isTyping && (
               <div className="flex justify-start">
                 <div className="bg-[#333] px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                   <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                   <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                   <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                 </div>
               </div>
             )}
           </div>

           {/* Input */}
           <div className="p-3 bg-[#111] border-t border-white/5">
             <div className="flex gap-2">
               <input 
                 className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brand-blue/50" 
                 placeholder="Xabar yozing..." 
                 value={input} 
                 onChange={e => setInput(e.target.value)}
                 onKeyPress={e => e.key === 'Enter' && handleSend()}
               />
               <button onClick={handleSend} className="w-12 h-12 bg-brand-blue rounded-xl text-white flex items-center justify-center hover:bg-blue-600 transition-colors">
                 <i className="fas fa-paper-plane"></i>
               </button>
             </div>
           </div>
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-brand-blue rounded-full shadow-[0_0_30px_rgba(0,102,255,0.5)] flex items-center justify-center text-white text-2xl hover:scale-110 transition-transform animate-glow">
        {isOpen ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-comment-dots"></i>}
      </button>
    </div>
  );
};