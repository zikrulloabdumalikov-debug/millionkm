
import React, { useState } from 'react';
import { User, Car, Order } from '../types';

interface CabinetProps {
  user: User;
  showToast: (msg: string, type: any) => void;
  onOrder: (order: Partial<Order>) => void;
}

const Cabinet: React.FC<CabinetProps> = ({ user, showToast, onOrder }) => {
  const [cars, setCars] = useState<Car[]>([
    { 
      id: 'c1', 
      userUid: user.uid, 
      brand: 'Chevrolet', 
      model: 'Cobalt', 
      year: 2022, 
      lastOilKm: 42000, 
      dailyKm: 45, 
      createdAt: new Date().toISOString() 
    }
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newCar, setNewCar] = useState({ brand: '', model: '', year: '', lastOil: '', daily: '' });
  const [displayLastOil, setDisplayLastOil] = useState('');
  const [displayDaily, setDisplayDaily] = useState('');

  const formatWithSpaces = (val: string) => {
    const raw = val.replace(/\D/g, '');
    return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const addCar = () => {
    if (!newCar.brand || !newCar.model || !newCar.year || !newCar.lastOil) {
      showToast("Iltimos, barcha maydonlarni to'ldiring", 'error');
      return;
    }
    const car: Car = {
      id: Math.random().toString(36).substr(2, 9),
      userUid: user.uid,
      brand: newCar.brand,
      model: newCar.model,
      year: parseInt(newCar.year),
      lastOilKm: parseInt(newCar.lastOil),
      dailyKm: parseInt(newCar.daily) || 30,
      createdAt: new Date().toISOString()
    };
    setCars([...cars, car]);
    setIsAddOpen(false);
    setNewCar({ brand: '', model: '', year: '', lastOil: '', daily: '' });
    setDisplayLastOil('');
    setDisplayDaily('');
    showToast("Mashina garajga qo'shildi!", 'success');
  };

  const requestService = (car: Car) => {
    onOrder({
      brand: car.brand,
      model: car.model,
      serviceType: 'Garajdan xizmat so\'rovi',
      note: `Garajdan so'rov: ${car.lastOilKm} km da oxirgi moy almashtirilgan.`
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-white rounded-[2.5rem] p-10 md:p-14 border border-slate-100 card-shadow mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Shaxsiy profil boshqaruvi</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Salom, {user.name}!</h1>
            <p className="text-slate-500 mt-2 font-medium">Barcha avtomobillaringiz holati bir joyda.</p>
          </div>
          <button 
            onClick={() => setIsAddOpen(true)}
            className="group bg-slate-900 text-white px-8 py-4.5 rounded-[1.25rem] font-bold shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all flex items-center active:scale-95"
          >
            <i className="fas fa-plus mr-3 group-hover:rotate-90 transition-transform"></i> 
            Yangi mashina
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {cars.map(car => {
          const serviceInterval = 8000;
          const nextServiceKm = car.lastOilKm + serviceInterval;
          const drivenSinceLast = 2100; 
          const remainingKm = serviceInterval - drivenSinceLast;
          const progress = (drivenSinceLast / serviceInterval) * 100;
          const daysToService = Math.max(1, Math.ceil(remainingKm / car.dailyKm));

          return (
            <div key={car.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 card-shadow hover:translate-y-[-4px] transition-all group">
              <div className="p-10">
                <div className="flex justify-between items-start mb-12">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      <i className="fas fa-car-side"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{car.brand} {car.model}</h3>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">{car.year}-yil • {car.lastOilKm.toLocaleString()} km</p>
                    </div>
                  </div>
                  <div className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-100">
                    Xavfsiz haydash
                  </div>
                </div>

                <div className="space-y-12">
                  <div>
                    <div className="flex justify-between items-end mb-4">
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Keyingi servisgacha</span>
                        <span className="text-3xl font-black text-slate-900 tracking-tight">{remainingKm.toLocaleString().replace(/,/g, ' ')} KM</span>
                      </div>
                      <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">~{daysToService} kun</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${progress > 80 ? 'bg-red-500' : 'bg-blue-600'}`} 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50/50 p-6 rounded-[1.5rem] border border-slate-50">
                      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-2 text-center">Xizmat chegarasi</div>
                      <div className="text-lg font-extrabold text-slate-900 text-center">{nextServiceKm.toLocaleString().replace(/,/g, ' ')} km</div>
                    </div>
                    <div className="bg-slate-50/50 p-6 rounded-[1.5rem] border border-slate-50">
                      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-2 text-center">Kunlik yurish</div>
                      <div className="text-lg font-extrabold text-slate-900 text-center">{car.dailyKm} km</div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-10 border-t border-slate-50 flex space-x-4">
                   <button 
                    onClick={() => requestService(car)}
                    className="flex-1 py-4.5 bg-slate-900 text-white rounded-[1rem] font-bold uppercase tracking-widest text-[11px] hover:bg-blue-600 transition-all shadow-xl shadow-slate-100"
                   >
                     Servisga yozilish
                   </button>
                   <button className="w-14 h-14 bg-slate-50 text-slate-400 rounded-[1rem] flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all">
                     <i className="fas fa-trash-alt"></i>
                   </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
           <div className="bg-white rounded-[3rem] p-12 w-full max-w-lg shadow-2xl relative animate-in zoom-in duration-300">
              <button onClick={() => setIsAddOpen(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition-colors">
                <i className="fas fa-times text-2xl"></i>
              </button>
              <h2 className="text-2xl font-extrabold mb-10 text-slate-900 tracking-tight">Mashina qo'shish</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 font-semibold text-slate-900 transition-all outline-none" 
                    placeholder="Brend" 
                    value={newCar.brand}
                    onChange={e => setNewCar({...newCar, brand: e.target.value})}
                  />
                  <input 
                    className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 font-semibold text-slate-900 transition-all outline-none" 
                    placeholder="Model" 
                    value={newCar.model}
                    onChange={e => setNewCar({...newCar, model: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="number"
                    className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 font-semibold text-slate-900 transition-all outline-none" 
                    placeholder="Yili" 
                    value={newCar.year}
                    onChange={e => setNewCar({...newCar, year: e.target.value})}
                  />
                  <input 
                    type="text"
                    className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 font-semibold text-slate-900 transition-all outline-none" 
                    placeholder="Moy km (masalan: 40 000)" 
                    value={displayLastOil}
                    onChange={e => {
                      const raw = e.target.value.replace(/\D/g, '');
                      setNewCar({...newCar, lastOil: raw});
                      setDisplayLastOil(formatWithSpaces(raw));
                    }}
                  />
                </div>
                <input 
                  type="text"
                  className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 font-semibold text-slate-900 transition-all outline-none" 
                  placeholder="Kunlik yurish (km)" 
                  value={displayDaily}
                  onChange={e => {
                    const raw = e.target.value.replace(/\D/g, '');
                    setNewCar({...newCar, daily: raw});
                    setDisplayDaily(formatWithSpaces(raw));
                  }}
                />
                <button 
                  onClick={addCar}
                  className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-slate-900 transition-all shadow-xl shadow-blue-50 mt-6"
                >
                  Saqlash
                </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Cabinet;
