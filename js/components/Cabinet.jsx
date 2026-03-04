import React from 'react';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";

const Cabinet = ({ db, user, showToast, onOrder }) => {
  const [cars, setCars] = React.useState([]);
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = React.useState(false);
  const [selectedCar, setSelectedCar] = React.useState(null);
  const [updateKm, setUpdateKm] = React.useState('');
  const [newCar, setNewCar] = React.useState({ brand: 'Chevrolet', model: '', year: 2024, currentKm: '', lastServiceKm: '', dailyKm: '' });

  // Real-time Cars from Firestore
  React.useEffect(() => {
    if (!user?.uid) return;
    const carsRef = collection(db, 'cars');
    const q = query(carsRef, where('userUid', '==', user.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCars(data);
    }, (error) => {
      console.error("Cars snapshot error:", error);
      showToast("Mashinalarni yuklashda xatolik", "error");
    });
    
    return () => unsubscribe();
  }, [user?.uid, showToast, db]);

  const addCar = async () => {
    if (!newCar.model || !newCar.currentKm) {
      showToast("Ma'lumotlarni to'ldiring", "error");
      return;
    }

    try {
      await addDoc(collection(db, 'cars'), {
        userUid: user.uid,
        brand: newCar.brand,
        model: newCar.model,
        year: parseInt(newCar.year),
        plateNumber: newCar.plateNumber || '',
        currentKm: parseInt(newCar.currentKm) || 0,
        lastServiceKm: parseInt(newCar.lastServiceKm) || parseInt(newCar.currentKm) || 0,
        dailyKm: parseInt(newCar.dailyKm) || 0,
        createdAt: serverTimestamp()
      });
      
      setIsAddOpen(false);
      setNewCar({ brand: 'Chevrolet', model: '', year: 2024, currentKm: '', lastServiceKm: '', dailyKm: '' });
      showToast("Mashina qo'shildi!");
    } catch (error) {
      console.error("Add car error:", error);
      showToast("Xatolik yuz berdi", "error");
    }
  };

  const deleteCar = async (carId) => {
    if (!window.confirm("Haqiqatan ham ushbu mashinani o'chirmoqchimisiz?")) return;
    try {
      await deleteDoc(doc(db, 'cars', carId));
      showToast("Mashina o'chirildi");
    } catch (error) {
      console.error("Delete car error:", error);
      showToast("Xatolik yuz berdi", "error");
    }
  };

  const updateCarKm = async () => {
    if (!selectedCar || !updateKm) return;
    try {
      await updateDoc(doc(db, 'cars', selectedCar.id), {
        currentKm: parseInt(updateKm),
        lastServiceKm: parseInt(updateKm), // Resetting last service km on update as requested or implied
        updatedAt: serverTimestamp()
      });
      setIsUpdateOpen(false);
      setUpdateKm('');
      setSelectedCar(null);
      showToast("Ma'lumotlar yangilandi!");
    } catch (error) {
      console.error("Update km error:", error);
      showToast("Xatolik yuz berdi", "error");
    }
  };

  const requestService = (car) => {
    onOrder({
      userName: user.name,
      phone: user.phone,
      brand: car.brand,
      model: car.model,
      serviceType: "Moy almashtirish (Garaj orqali)",
      isGarageRequest: true,
      currentKm: car.currentKm,
      lastServiceKm: car.lastServiceKm,
      dailyKm: car.dailyKm,
      carYear: car.year,
      note: `Garajdan so'rov: ${car.brand} ${car.model}. Hozirgi probeg: ${car.currentKm} km.`
    });
  };

  const calculateHealth = (car) => {
    const interval = 10000; // Standard interval
    const used = car.currentKm - car.lastServiceKm;
    const remaining = Math.max(0, interval - used);
    const percentage = Math.round((remaining / interval) * 100);
    
    let status = 'Ideal';
    let color = 'text-green-500';
    let bgColor = 'bg-green-50';
    
    if (percentage < 20) {
      status = 'Zudlik bilan';
      color = 'text-red-500';
      bgColor = 'bg-red-50';
    } else if (percentage < 50) {
      status = 'Yaqinda';
      color = 'text-orange-500';
      bgColor = 'bg-orange-50';
    }
    
    return { percentage, status, color, bgColor };
  };

  const predictServiceDate = (car) => {
    if (!car.dailyKm || car.dailyKm <= 0) return "Noma'lum";
    const interval = 10000;
    const used = car.currentKm - car.lastServiceKm;
    const remaining = Math.max(0, interval - used);
    const daysLeft = Math.floor(remaining / car.dailyKm);
    
    const date = new Date();
    date.setDate(date.getDate() + daysLeft);
    return date.toLocaleDateString('uz-UZ');
  };

  const formatWithSpaces = (val) => {
    if (val === undefined || val === null) return '0';
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-8">
        <div>
          <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Shaxsiy Garaj</div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">Mening Avtomobillarim</h1>
        </div>
        <button 
          onClick={() => setIsAddOpen(true)}
          className="bg-black text-white h-16 px-10 rounded-[24px] font-bold text-sm uppercase tracking-widest tap-active shadow-2xl shadow-gray-200 flex items-center"
        >
          <i className="fas fa-plus mr-3"></i> Yangi mashina
        </button>
      </div>

      {cars.length === 0 ? (
        <div className="py-12 md:py-20 text-center bg-white rounded-[2rem] md:rounded-[40px] border border-gray-100 shadow-sm mx-4 md:mx-0">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-full mx-auto mb-6 md:mb-8 flex items-center justify-center text-gray-200">
            <i className="fas fa-car text-3xl md:text-4xl"></i>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Garajingiz bo'sh</h3>
          <p className="text-sm md:text-base text-gray-400 font-medium max-w-sm mx-auto mb-8 md:mb-10 px-4">Avtomobilingizni qo'shing va biz uning texnik holatini kuzatib boramiz.</p>
          <button onClick={() => setIsAddOpen(true)} className="text-blue-600 font-black uppercase tracking-widest text-xs hover:underline">Mashina qo'shish</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
          {cars.map(car => {
            const health = calculateHealth(car);
            return (
              <div key={car.id} className="bg-white rounded-[2rem] md:rounded-[40px] p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 md:p-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <button onClick={() => deleteCar(car.id)} className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                    <i className="fas fa-trash-alt text-xs"></i>
                  </button>
                </div>

                <div className="flex items-center space-x-4 md:space-x-5 mb-8 md:mb-10">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-xl md:text-2xl shadow-xl shrink-0">
                    <i className="fas fa-car-side"></i>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{car.brand} {car.model}</h3>
                    <p className="text-gray-400 font-bold text-[10px] md:text-[11px] uppercase tracking-widest">{car.year}-yil • {car.plateNumber || 'Raqamsiz'}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Moy resursi</span>
                      <div className={`text-4xl font-black tracking-tighter ${health.color}`}>{health.percentage}%</div>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full ${health.bgColor} ${health.color} text-[10px] font-black uppercase tracking-widest`}>
                      {health.status}
                    </div>
                  </div>

                  <div className="h-3 bg-gray-50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${health.percentage > 50 ? 'bg-green-500' : health.percentage > 20 ? 'bg-orange-500' : 'bg-red-500'}`}
                      style={{ width: `${health.percentage}%` }}
                    ></div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Joriy probeg</span>
                      <div className="text-lg font-black text-slate-900">{formatWithSpaces(car.currentKm)} km</div>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Keyingi servis</span>
                      <div className="text-lg font-black text-blue-600">{predictServiceDate(car)}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex gap-3">
                  <button 
                    onClick={() => requestService(car)}
                    className="flex-1 h-14 bg-slate-900 text-white rounded-2xl font-bold text-[11px] uppercase tracking-widest tap-active hover:bg-blue-600 transition-all"
                  >
                    Servisga yozilish
                  </button>
                  <button 
                    onClick={() => { setSelectedCar(car); setUpdateKm(car.currentKm); setIsUpdateOpen(true); }}
                    className="w-14 h-14 bg-gray-50 text-slate-900 rounded-2xl flex items-center justify-center tap-active hover:bg-gray-100 transition-all"
                  >
                    <i className="fas fa-tachometer-alt"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Car Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
          <div className="bg-white rounded-[40px] p-10 w-full max-w-xl shadow-2xl relative animate-spring">
            <button onClick={() => setIsAddOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors"><i className="fas fa-times text-xl"></i></button>
            <h2 className="text-3xl font-black tracking-tight mb-10">Yangi mashina qo'shish</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Brend</label>
                <select value={newCar.brand} onChange={e => setNewCar({...newCar, brand: e.target.value})} className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold">
                  <option value="Chevrolet">Chevrolet</option>
                  <option value="Kia">Kia</option>
                  <option value="Li Auto">Li Auto</option>
                  <option value="Boshqa">Boshqa</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Model</label>
                <input type="text" value={newCar.model} onChange={e => setNewCar({...newCar, model: e.target.value})} placeholder="Masalan: Cobalt" className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Yili</label>
                <input type="number" value={newCar.year} onChange={e => setNewCar({...newCar, year: e.target.value})} className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Davlat raqami</label>
                <input type="text" value={newCar.plateNumber} onChange={e => setNewCar({...newCar, plateNumber: e.target.value})} placeholder="01 A 777 AA" className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Joriy probeg (km)</label>
                <input type="number" value={newCar.currentKm} onChange={e => setNewCar({...newCar, currentKm: e.target.value})} placeholder="55000" className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kunlik yurish (km)</label>
                <input type="number" value={newCar.dailyKm} onChange={e => setNewCar({...newCar, dailyKm: e.target.value})} placeholder="50" className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
              </div>
            </div>
            
            <button onClick={addCar} className="w-full h-16 bg-black text-white rounded-[24px] font-bold text-sm uppercase tracking-widest tap-active shadow-xl mt-10">Saqlash</button>
          </div>
        </div>
      )}

      {/* Update Km Modal */}
      {isUpdateOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
          <div className="bg-white rounded-[40px] p-10 w-full max-w-md shadow-2xl relative animate-spring">
            <button onClick={() => setIsUpdateOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors"><i className="fas fa-times text-xl"></i></button>
            <h2 className="text-2xl font-black tracking-tight mb-8">Probegni yangilash</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Yangi probeg (km)</label>
                <input 
                  type="number" 
                  value={updateKm} 
                  onChange={e => setUpdateKm(e.target.value)} 
                  className="w-full h-16 px-6 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-black text-2xl" 
                />
              </div>
              <button onClick={updateCarKm} className="w-full h-16 bg-black text-white rounded-[24px] font-bold text-sm uppercase tracking-widest tap-active shadow-xl">Yangilash</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cabinet;
