// Cabinet
window.Cabinet = ({ user, showToast, onOrder }) => {
  const [cars, setCars] = React.useState([{ id: 'c1', brand: 'Chevrolet', model: 'Cobalt', year: 2022, lastOilKm: 42000 }]);
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [newCar, setNewCar] = React.useState({ brand: '', model: '', year: '', lastOil: '' });

  const addCar = () => {
    setCars([...cars, { ...newCar, id: Date.now() }]);
    setIsAddOpen(false);
    showToast("Mashina qo'shildi!");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-white rounded-[2.5rem] p-10 mb-12 flex justify-between items-center">
        <div><h1 className="text-4xl font-extrabold">Salom, {user.name}!</h1></div>
        <button onClick={() => setIsAddOpen(true)} className="bg-black text-white px-8 py-4 rounded-2xl font-bold">+ Yangi mashina</button>
      </div>
      <div className="grid lg:grid-cols-2 gap-10">
        {cars.map(car => (
          <div key={car.id} className="bg-white p-10 rounded-[2.5rem] border shadow-sm">
             <h3 className="text-2xl font-bold">{car.brand} {car.model}</h3>
             <p className="text-gray-500 mb-6">{car.year}-yil • {car.lastOilKm} km</p>
             <button onClick={() => onOrder({ brand: car.brand, model: car.model, serviceType: 'Garajdan' })} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold">Servisga yozilish</button>
          </div>
        ))}
      </div>
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
           <div className="bg-white p-10 rounded-[2.5rem] w-full max-w-lg space-y-4">
              <h2 className="text-2xl font-bold">Yangi mashina</h2>
              <input className="w-full p-4 bg-gray-50 rounded-xl" placeholder="Brend" onChange={e => setNewCar({...newCar, brand: e.target.value})} />
              <input className="w-full p-4 bg-gray-50 rounded-xl" placeholder="Model" onChange={e => setNewCar({...newCar, model: e.target.value})} />
              <button onClick={addCar} className="w-full py-4 bg-black text-white rounded-xl font-bold">Saqlash</button>
              <button onClick={() => setIsAddOpen(false)} className="w-full py-4 text-gray-500">Yopish</button>
           </div>
        </div>
      )}
    </div>
  );
};

// Admin
window.Admin = ({ orders }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-10">Admin Panel</h1>
      <div className="bg-white rounded-[2.5rem] p-8 border shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead><tr className="bg-gray-50"><th className="p-4">Mijoz</th><th className="p-4">Avto</th><th className="p-4">Xizmat</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-b"><td className="p-4">{o.userName}<br/><span className="text-blue-600 text-xs">{o.phone}</span></td><td className="p-4">{o.brand} {o.model}</td><td className="p-4">{o.serviceType}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// AI Consultant
window.AIConsultant = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState({ name: '', phone: '', model: '', problem: '' });
  const [step, setStep] = React.useState(0);

  const handleSend = async () => {
     await window.sendLeadToTelegram(data);
     setStep(2);
     setTimeout(() => { setIsOpen(false); setStep(0); }, 3000);
  };

  if (!isOpen) return <button onClick={() => setIsOpen(true)} className="fixed bottom-8 right-8 w-16 h-16 bg-black text-white rounded-full shadow-2xl flex items-center justify-center text-2xl z-50"><i className="fas fa-comment-dots"></i></button>;

  return (
    <div className="fixed bottom-8 right-8 w-[350px] bg-white rounded-[2rem] shadow-2xl border p-6 z-50 animate-spring">
       <div className="flex justify-between items-center mb-4">
         <h3 className="font-bold">AI Yordamchi</h3>
         <button onClick={() => setIsOpen(false)}><i className="fas fa-times"></i></button>
       </div>
       {step === 0 && (
         <div className="space-y-3">
           <p className="text-sm bg-gray-100 p-3 rounded-xl">Salom! Mashinangiz modeli qanaqa?</p>
           <input className="w-full p-3 border rounded-xl" placeholder="Masalan: Cobalt" onChange={e => setData({...data, model: e.target.value})} />
           <button onClick={() => setStep(1)} className="w-full py-2 bg-black text-white rounded-xl text-xs font-bold">Davom etish</button>
         </div>
       )}
       {step === 1 && (
         <div className="space-y-3">
           <p className="text-sm bg-gray-100 p-3 rounded-xl">Muammo nimada? Telefon raqamingizni ham qoldiring.</p>
           <input className="w-full p-3 border rounded-xl" placeholder="Muammo" onChange={e => setData({...data, problem: e.target.value})} />
           <input className="w-full p-3 border rounded-xl" placeholder="Telefon" onChange={e => setData({...data, name: 'AI User', phone: e.target.value})} />
           <button onClick={handleSend} className="w-full py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">Yuborish</button>
         </div>
       )}
       {step === 2 && <div className="text-center py-10 text-green-500 font-bold">Xabar yuborildi! ✅</div>}
    </div>
  );
};