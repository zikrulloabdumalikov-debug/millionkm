// Cabinet (Apple Health Style)
window.Cabinet = ({ user, showToast, onOrder }) => {
  const [cars, setCars] = React.useState([{ id: 'c1', brand: 'Chevrolet', model: 'Cobalt', year: 2022, lastOilKm: 42000 }]);
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [newCar, setNewCar] = React.useState({ brand: '', model: '', year: '', lastOil: '' });

  const addCar = () => {
    if(!newCar.brand) return;
    setCars([...cars, { ...newCar, id: Date.now() }]);
    setIsAddOpen(false);
    showToast("Mashina qo'shildi!");
  };

  return (
    <div className="py-24 px-6 max-w-[1080px] mx-auto">
      <div className="flex justify-between items-end mb-10">
         <div>
            <h1 className="text-4xl font-bold text-[#1d1d1f] mb-1">Mening Garajim</h1>
            <p className="text-[#86868b] font-medium">Xush kelibsiz, {user.name}</p>
         </div>
         <button onClick={() => setIsAddOpen(true)} className="w-10 h-10 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center hover:bg-[#333] transition-all"><i className="fas fa-plus"></i></button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
         {cars.map(car => (
            <div key={car.id} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -mr-10 -mt-10"></div>
               <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-[#1d1d1f]">{car.brand} {car.model}</h3>
                  <p className="text-[#86868b] text-sm font-medium mb-6">{car.year} • {parseInt(car.lastOilKm).toLocaleString()} km</p>
                  
                  <div className="bg-[#F5F5F7] p-4 rounded-xl mb-6">
                     <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold text-[#1d1d1f]">Moy holati</span>
                        <span className="text-[#0071E3] font-bold">Yaxshi</span>
                     </div>
                     <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-[70%] bg-[#34C759] rounded-full"></div>
                     </div>
                  </div>

                  <button onClick={() => onOrder({ brand: car.brand, model: car.model, serviceType: 'Garajdan' })} className="w-full py-3 bg-[#1d1d1f] text-white rounded-xl font-semibold text-sm">Xizmatga yozilish</button>
               </div>
            </div>
         ))}
      </div>

      {isAddOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-6">
            <div className="bg-white p-8 rounded-[32px] w-full max-w-md shadow-2xl animate-fade-up">
               <h3 className="text-2xl font-bold mb-6">Yangi Mashina</h3>
               <div className="space-y-4 mb-6">
                  <input className="w-full p-4 bg-[#F5F5F7] rounded-xl outline-none font-medium" placeholder="Brend" onChange={e => setNewCar({...newCar, brand: e.target.value})} />
                  <input className="w-full p-4 bg-[#F5F5F7] rounded-xl outline-none font-medium" placeholder="Model" onChange={e => setNewCar({...newCar, model: e.target.value})} />
                  <input className="w-full p-4 bg-[#F5F5F7] rounded-xl outline-none font-medium" placeholder="Probeg" type="number" onChange={e => setNewCar({...newCar, lastOil: e.target.value})} />
               </div>
               <div className="flex gap-3">
                  <button onClick={addCar} className="flex-1 py-3 bg-[#0071E3] text-white rounded-xl font-bold">Saqlash</button>
                  <button onClick={() => setIsAddOpen(false)} className="flex-1 py-3 text-[#86868b] font-medium">Bekor qilish</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

// Admin
window.Admin = ({ orders }) => (
   <div className="py-24 px-6 max-w-[1080px] mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
         <table className="w-full text-left">
            <thead className="bg-[#F5F5F7] text-xs uppercase font-bold text-[#86868b]"><tr><th className="p-4">Mijoz</th><th className="p-4">Mashina</th><th className="p-4">Xizmat</th></tr></thead>
            <tbody>
               {orders.map(o => (
                  <tr key={o.id} className="border-b border-gray-50 last:border-0"><td className="p-4 font-medium">{o.userName}<br/><span className="text-xs text-gray-400">{o.phone}</span></td><td className="p-4">{o.brand} {o.model}</td><td className="p-4"><span className="bg-blue-50 text-[#0071E3] px-2 py-1 rounded text-xs font-bold">{o.serviceType}</span></td></tr>
               ))}
            </tbody>
         </table>
      </div>
   </div>
);

// iMessage Style Chat
window.AIConsultant = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([{text: "Assalomu alaykum! Qanday yordam bera olaman?", isBot: true}]);
  const [input, setInput] = React.useState('');

  const handleSend = () => {
     if(!input.trim()) return;
     const newMsgs = [...messages, {text: input, isBot: false}];
     setMessages(newMsgs);
     setInput('');
     setTimeout(() => {
        setMessages([...newMsgs, {text: "Mutaxassisimiz tez orada siz bilan bog'lanadi.", isBot: true}]);
        window.sendTelegramNotification(`💬 Chat: ${input}`);
     }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
       {isOpen && (
          <div className="mb-4 w-[350px] h-[500px] bg-white rounded-[24px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-fade-up">
             <div className="bg-[#F5F5F7] p-4 flex justify-between items-center border-b border-gray-200">
                <div className="font-bold text-[#1d1d1f]">AI Support</div>
                <button onClick={() => setIsOpen(false)} className="text-[#0071E3] font-medium text-sm">Yopish</button>
             </div>
             <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
                {messages.map((m, i) => (
                   <div key={i} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[80%] px-4 py-2 text-[15px] leading-snug ${m.isBot ? 'chat-bubble-bot' : 'chat-bubble-user'}`}>{m.text}</div>
                   </div>
                ))}
             </div>
             <div className="p-3 bg-[#F5F5F7] border-t border-gray-200 flex gap-2">
                <input className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-[#0071E3]" placeholder="iMessage" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} />
                <button onClick={handleSend} className="w-8 h-8 bg-[#0071E3] text-white rounded-full flex items-center justify-center"><i className="fas fa-arrow-up text-xs"></i></button>
             </div>
          </div>
       )}
       <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 rounded-full bg-[#1d1d1f] text-white text-xl shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
          {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-comment"></i>}
       </button>
    </div>
  );
};