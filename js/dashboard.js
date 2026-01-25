// Cabinet (Clean & Light)
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
    <div className="py-24 px-6 max-w-[1080px] mx-auto min-h-screen">
      <div className="flex justify-between items-end mb-12">
         <div>
            <h1 className="text-4xl font-bold text-[#1d1d1f] mb-1">Mening Garajim</h1>
            <p className="text-[#86868b] font-medium">Xush kelibsiz, {user.name}</p>
         </div>
         <button onClick={() => setIsAddOpen(true)} className="bg-[#1d1d1f] text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:bg-[#333] transition-all flex items-center gap-2">
            <i className="fas fa-plus"></i> Qo'shish
         </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
         {cars.map(car => (
            <div key={car.id} className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 relative overflow-hidden hover:shadow-md transition-shadow">
               <div className="flex justify-between items-start mb-8">
                 <div>
                    <h3 className="text-2xl font-bold text-[#1d1d1f]">{car.brand} {car.model}</h3>
                    <p className="text-[#86868b] text-sm font-medium mt-1">{car.year} • {parseInt(car.lastOilKm).toLocaleString()} km</p>
                 </div>
                 <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                    <i className="fas fa-car"></i>
                 </div>
               </div>
                  
               <div className="bg-[#F5F5F7] p-6 rounded-[24px] mb-8">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-bold text-[#1d1d1f]">Moy holati</span>
                    <span className="text-[#34C759] font-bold">A'lo</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-[#34C759] rounded-full"></div>
                  </div>
                  <p className="text-xs text-[#86868b] mt-3 font-medium">Keyingi servisgacha: 5,400 km</p>
               </div>

               <button onClick={() => onOrder({ brand: car.brand, model: car.model, serviceType: 'Garajdan' })} className="w-full py-4 bg-[#0071E3] text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-[#0077ED] transition-all">
                 Xizmatga yozilish
               </button>
            </div>
         ))}
      </div>

      {isAddOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-6">
            <div className="bg-white p-8 rounded-[32px] w-full max-w-md shadow-2xl animate-scale border border-gray-100">
               <h3 className="text-2xl font-bold mb-6 text-[#1d1d1f]">Yangi Mashina</h3>
               <div className="space-y-4 mb-8">
                  <input className="w-full p-4 bg-[#F5F5F7] rounded-xl outline-none font-medium text-[#1d1d1f]" placeholder="Brend (masalan: Chevrolet)" onChange={e => setNewCar({...newCar, brand: e.target.value})} />
                  <input className="w-full p-4 bg-[#F5F5F7] rounded-xl outline-none font-medium text-[#1d1d1f]" placeholder="Model (masalan: Malibu)" onChange={e => setNewCar({...newCar, model: e.target.value})} />
                  <input className="w-full p-4 bg-[#F5F5F7] rounded-xl outline-none font-medium text-[#1d1d1f]" placeholder="Probeg (km)" type="number" onChange={e => setNewCar({...newCar, lastOil: e.target.value})} />
               </div>
               <div className="flex gap-3">
                  <button onClick={addCar} className="flex-1 py-4 bg-[#0071E3] text-white rounded-xl font-bold shadow-lg shadow-blue-500/20">Saqlash</button>
                  <button onClick={() => setIsAddOpen(false)} className="flex-1 py-4 text-[#86868b] font-medium hover:bg-gray-50 rounded-xl">Bekor qilish</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

// Admin (Simplified)
window.Admin = ({ orders }) => (
   <div className="py-24 px-6 max-w-[1080px] mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-[#1d1d1f]">Admin Dashboard</h1>
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
         <table className="w-full text-left">
            <thead className="bg-[#F5F5F7] text-xs uppercase font-bold text-[#86868b]"><tr><th className="p-5">Mijoz</th><th className="p-5">Mashina</th><th className="p-5">Xizmat</th></tr></thead>
            <tbody>
               {orders.map(o => (
                  <tr key={o.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                     <td className="p-5 font-bold text-[#1d1d1f]">{o.userName}<br/><span className="text-xs text-[#86868b] font-normal">{o.phone}</span></td>
                     <td className="p-5 text-sm font-medium">{o.brand} {o.model}</td>
                     <td className="p-5"><span className="bg-blue-50 text-[#0071E3] px-3 py-1 rounded-lg text-xs font-bold">{o.serviceType}</span></td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   </div>
);

// Smart Chat (Lead Gen Bot)
window.AIConsultant = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [step, setStep] = React.useState(0); // 0: Start, 1: Name, 2: Car, 3: Problem, 4: End
  const [messages, setMessages] = React.useState([{text: "Assalomu alaykum! Mashinangizda qanday muammo bor?", isBot: true}]);
  const [input, setInput] = React.useState('');
  const [userData, setUserData] = React.useState({});

  const handleSend = () => {
     if(!input.trim()) return;
     
     const newMsgs = [...messages, {text: input, isBot: false}];
     setMessages(newMsgs);
     const currentInput = input;
     setInput('');

     // Smart Flow Logic
     setTimeout(() => {
        let botReply = "";
        let nextStep = step;

        if (step === 0) {
           botReply = "Tushunarli. Ismingiz nima?";
           setUserData({...userData, problem: currentInput});
           nextStep = 1;
        } else if (step === 1) {
           botReply = "Juda soz. Mashinangiz modeli va yilini yozing?";
           setUserData({...userData, name: currentInput});
           nextStep = 2;
        } else if (step === 2) {
           botReply = "Qabul qilindi. Telefon raqamingizni qoldiring, mutaxassisimiz 5 daqiqada bog'lanadi.";
           setUserData({...userData, car: currentInput});
           nextStep = 3;
        } else if (step === 3) {
           botReply = "Rahmat! So'rovingiz yuborildi. Tez orada aloqaga chiqamiz.";
           window.sendTelegramNotification(`🚨 <b>CHAT LEAD</b>\n👤 ${userData.name}\n🚗 ${userData.car}\n🛠 ${userData.problem}\n📞 ${currentInput}`);
           nextStep = 4;
        }

        setStep(nextStep);
        setMessages([...newMsgs, {text: botReply, isBot: true}]);
     }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
       {isOpen && (
          <div className="mb-4 w-[340px] h-[450px] bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col overflow-hidden animate-scale">
             <div className="bg-[#1d1d1f] p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   <div className="font-bold text-sm">Million KM Assistant</div>
                </div>
                <button onClick={() => setIsOpen(false)} className="opacity-70 hover:opacity-100"><i className="fas fa-times"></i></button>
             </div>
             <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F5F5F7]">
                {messages.map((m, i) => (
                   <div key={i} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[85%] px-4 py-2.5 text-[14px] leading-snug font-medium shadow-sm ${m.isBot ? 'bg-white text-[#1d1d1f] rounded-tl-none rounded-2xl' : 'bg-[#0071E3] text-white rounded-tr-none rounded-2xl'}`}>{m.text}</div>
                   </div>
                ))}
             </div>
             {step < 4 && (
                <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                   <input className="flex-1 bg-[#F5F5F7] rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0071E3]/20 transition-all" placeholder="Javob yozing..." value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} />
                   <button onClick={handleSend} className="w-10 h-10 bg-[#0071E3] text-white rounded-full flex items-center justify-center hover:bg-[#0077ED] transition-colors"><i className="fas fa-arrow-up text-sm"></i></button>
                </div>
             )}
          </div>
       )}
       <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 rounded-full bg-[#1d1d1f] text-white text-xl shadow-xl flex items-center justify-center hover:scale-105 transition-transform hover:bg-[#0071E3]">
          {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-comment-dots"></i>}
       </button>
    </div>
  );
};