// Cabinet (Smart Monitoring System)
window.Cabinet = ({ user, showToast, onOrder }) => {
  // Boshlang'ich ma'lumotlar (namuna uchun)
  const [cars, setCars] = React.useState([
    { 
      id: 'c1', 
      brand: 'Chevrolet', 
      model: 'Cobalt', 
      year: 2023, 
      currentKm: 45200,      // Hozirgi probeg
      lastServiceKm: 41000,  // Oxirgi servis
      dailyKm: 45,           // Kunlik yurish
      serviceInterval: 8000, // Moy almashtirish intervali
      addedAt: new Date().toISOString()
    }
  ]);

  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(null); // Probegni yangilash uchun
  
  // Yangi mashina formasi
  const [newCar, setNewCar] = React.useState({ 
    brand: '', model: '', year: '', currentKm: '', lastServiceKm: '', dailyKm: '' 
  });

  // Raqamlarni chiroyli formatlash (10 000 ko'rinishida)
  const formatNum = (num) => {
    return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : "";
  };

  const parseNum = (str) => {
    return parseInt(str.replace(/\D/g, '')) || 0;
  };

  // Mashina qo'shish
  const addCar = () => {
    if(!newCar.brand || !newCar.model || !newCar.currentKm || !newCar.lastServiceKm) {
       showToast("Barcha maydonlarni to'ldiring", "error");
       return;
    }
    
    const current = parseNum(newCar.currentKm);
    const last = parseNum(newCar.lastServiceKm);
    
    if (current < last) {
       showToast("Hozirgi probeg oxirgi servisdan kam bo'lishi mumkin emas", "error");
       return;
    }

    const car = {
      id: Date.now(),
      brand: newCar.brand,
      model: newCar.model,
      year: newCar.year,
      currentKm: current,
      lastServiceKm: last,
      dailyKm: parseNum(newCar.dailyKm) || 40, // Agar kiritilmasa standart 40km
      serviceInterval: 8000,
      addedAt: new Date().toISOString()
    };

    setCars([...cars, car]);
    setIsAddOpen(false);
    setNewCar({ brand: '', model: '', year: '', currentKm: '', lastServiceKm: '', dailyKm: '' });
    showToast("Mashina garajga qo'shildi!");
  };

  // Probegni yangilash (Edit)
  const updateMileage = (carId, newKm) => {
    const km = parseNum(newKm);
    setCars(cars.map(c => {
      if (c.id === carId) {
        if (km < c.currentKm) return c; // Kamaytirib bo'lmaydi
        return { ...c, currentKm: km };
      }
      return c;
    }));
    setIsEditOpen(null);
    showToast("Probeg yangilandi!");
  };

  // Xizmatga yozilish (YANGILANGAN: To'liq ma'lumot uzatish)
  const requestService = (car, type) => {
    onOrder({
      brand: car.brand,
      model: car.model,
      serviceType: type,
      
      // Maxsus maydonlar (Telegram uchun)
      isGarageRequest: true,
      carYear: car.year,
      currentKm: car.currentKm,
      lastServiceKm: car.lastServiceKm,
      dailyKm: car.dailyKm,
      
      note: "Garaj bo'limidan avtomatik so'rov."
    });
  };

  // --- HISOBLASH MANTIQI (CORE LOGIC) ---
  const calculateHealth = (car) => {
    const drivenSinceService = car.currentKm - car.lastServiceKm;
    const remainingKm = car.serviceInterval - drivenSinceService;
    const healthPercent = Math.max(0, Math.min(100, (remainingKm / car.serviceInterval) * 100));
    
    // Kunlar hisobi
    const daysLeft = car.dailyKm > 0 ? Math.floor(remainingKm / car.dailyKm) : 0;
    
    // Sanani aniqlash
    const today = new Date();
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + daysLeft);
    
    const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = daysLeft > 365 ? "1 yildan ko'p" : targetDate.toLocaleDateString('uz-UZ', dateOptions);

    // Status rangi va matni
    let statusColor = "bg-[#34C759]"; // Yashil
    let statusText = "A'lo holatda";
    
    if (healthPercent < 30) {
      statusColor = "bg-[#FF3B30]"; // Qizil
      statusText = "Almashtirish kerak";
    } else if (healthPercent < 60) {
      statusColor = "bg-[#FF9500]"; // Sariq
      statusText = "O'rtacha";
    }

    return { drivenSinceService, remainingKm, healthPercent, daysLeft, formattedDate, statusColor, statusText };
  };

  return (
    <div className="py-24 px-6 max-w-[1080px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
         <div>
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Aqlli Monitoring</span>
            <h1 className="text-4xl font-extrabold text-[#1d1d1f] mb-2 tracking-tight">Mening Garajim</h1>
            <p className="text-[#86868b] font-medium">Xush kelibsiz, {user.name}. Avtomobillaringiz nazorat ostida.</p>
         </div>
         <button onClick={() => setIsAddOpen(true)} className="bg-[#1d1d1f] text-white px-8 py-4 rounded-[18px] font-bold text-sm shadow-xl hover:bg-blue-600 transition-all active:scale-95 flex items-center gap-2 w-full md:w-auto justify-center">
            <i className="fas fa-plus"></i> Yangi mashina
         </button>
      </div>

      {/* Cards Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
         {cars.map(car => {
            const stats = calculateHealth(car);
            
            return (
              <div key={car.id} className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all relative overflow-hidden group">
                 
                 {/* Top Info */}
                 <div className="flex justify-between items-start mb-8 relative z-10">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm text-gray-400 group-hover:text-blue-600 group-hover:scale-110 transition-all">
                        <i className="fas fa-car"></i>
                      </div>
                      <div>
                        <h3 className="text-2xl font-extrabold text-[#1d1d1f]">{car.brand} {car.model}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{car.year}</span>
                          <span className="text-[#86868b] text-xs font-bold">{formatNum(car.currentKm)} km</span>
                        </div>
                      </div>
                   </div>
                   
                   <div className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg ${stats.statusColor}`}>
                      {stats.statusText}
                   </div>
                 </div>

                 {/* Main Progress (Oil Life) */}
                 <div className="mb-10 relative z-10">
                    <div className="flex justify-between text-sm mb-2 font-bold text-gray-500">
                      <span>Moy resursi</span>
                      <span>{Math.round(stats.healthPercent)}% qoldi</span>
                    </div>
                    <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                       <div 
                         className={`h-full rounded-full transition-all duration-1000 ${stats.statusColor}`} 
                         style={{ width: `${stats.healthPercent}%` }}
                       ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 font-medium text-right">Keyingi servisgacha: <span className="text-[#1d1d1f] font-bold">{formatNum(stats.remainingKm)} km</span></p>
                 </div>

                 {/* Detailed Stats Grid */}
                 <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                    <div className="bg-[#F5F5F7] p-4 rounded-2xl">
                       <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Keyingi sana</div>
                       <div className="text-sm md:text-base font-bold text-[#1d1d1f]">{stats.formattedDate}</div>
                       <div className="text-[10px] text-blue-500 font-semibold">~{stats.daysLeft} kundan keyin</div>
                    </div>
                    <div className="bg-[#F5F5F7] p-4 rounded-2xl">
                       <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Kunlik yurish</div>
                       <div className="text-sm md:text-base font-bold text-[#1d1d1f]">{car.dailyKm} km</div>
                       <div className="text-[10px] text-gray-400 font-semibold">O'rtacha hisobda</div>
                    </div>
                 </div>

                 {/* Actions */}
                 <div className="flex gap-3 relative z-10">
                    <button 
                      onClick={() => setIsEditOpen(car.id)}
                      className="flex-1 py-4 bg-gray-50 text-[#1d1d1f] rounded-2xl font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-colors"
                    >
                      Probegni Yangilash
                    </button>
                    <button 
                      onClick={() => requestService(car, 'Rejali Moy Almashtirish')}
                      className="flex-1 py-4 bg-[#1d1d1f] text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-blue-600 transition-colors"
                    >
                      Servisga Yozilish
                    </button>
                 </div>

                 {/* Edit Modal (Inline) */}
                 {isEditOpen === car.id && (
                   <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex items-center justify-center p-6 animate-fade-up">
                      <div className="w-full text-center">
                        <h4 className="text-lg font-bold mb-4">Yangi probegni kiriting</h4>
                        <input 
                          type="number" 
                          placeholder={car.currentKm}
                          className="apple-input mb-4 text-center text-xl font-bold"
                          id={`update-km-${car.id}`}
                        />
                        <div className="flex gap-3">
                           <button 
                             onClick={() => updateMileage(car.id, document.getElementById(`update-km-${car.id}`).value)}
                             className="flex-1 apple-btn-primary"
                           >
                             Saqlash
                           </button>
                           <button onClick={() => setIsEditOpen(null)} className="flex-1 apple-btn-secondary">Bekor qilish</button>
                        </div>
                      </div>
                   </div>
                 )}
              </div>
            );
         })}
      </div>

      {/* Add Car Modal */}
      {isAddOpen && (
         <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-md p-6">
            <div className="bg-white p-8 md:p-10 rounded-[32px] w-full max-w-lg shadow-2xl animate-scale relative overflow-hidden">
               <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl font-extrabold text-[#1d1d1f]">Yangi Mashina</h2>
                 <button onClick={() => setIsAddOpen(false)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200"><i className="fas fa-times"></i></button>
               </div>
               
               <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="text-[11px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Brend</label>
                        <input className="apple-input bg-gray-50 border-transparent focus:bg-white" placeholder="Chevrolet" value={newCar.brand} onChange={e => setNewCar({...newCar, brand: e.target.value})} />
                     </div>
                     <div>
                        <label className="text-[11px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Model</label>
                        <input className="apple-input bg-gray-50 border-transparent focus:bg-white" placeholder="Malibu 2" value={newCar.model} onChange={e => setNewCar({...newCar, model: e.target.value})} />
                     </div>
                  </div>
                  
                  <div>
                      <label className="text-[11px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Yili</label>
                      <input type="number" className="apple-input bg-gray-50 border-transparent focus:bg-white" placeholder="2024" value={newCar.year} onChange={e => setNewCar({...newCar, year: e.target.value})} />
                  </div>

                  <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                    <div className="mb-4">
                        <label className="text-[11px] font-bold text-blue-600 uppercase ml-1 mb-1 block">Hozirgi Probeg (km)</label>
                        <input className="apple-input border-blue-200 text-blue-900 font-bold text-lg" placeholder="50 000" value={newCar.currentKm} onChange={e => setNewCar({...newCar, currentKm: e.target.value})} />
                    </div>
                    <div className="mb-4">
                        <label className="text-[11px] font-bold text-gray-500 uppercase ml-1 mb-1 block">Oxirgi Moy Almashtirish (km)</label>
                        <input className="apple-input border-gray-200" placeholder="42 000" value={newCar.lastServiceKm} onChange={e => setNewCar({...newCar, lastServiceKm: e.target.value})} />
                    </div>
                    <div>
                        <label className="text-[11px] font-bold text-gray-500 uppercase ml-1 mb-1 block">Kunlik O'rtacha Yurish (km)</label>
                        <input className="apple-input border-gray-200" placeholder="Masalan: 40" value={newCar.dailyKm} onChange={e => setNewCar({...newCar, dailyKm: e.target.value})} />
                        <p className="text-[10px] text-gray-400 mt-1 ml-1">Keyingi servis kunini aniqlash uchun kerak.</p>
                    </div>
                  </div>

                  <button onClick={addCar} className="w-full py-5 bg-[#1d1d1f] text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-black transition-all mt-4">
                    Monitoringni Boshlash
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};
