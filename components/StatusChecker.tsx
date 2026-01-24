
import React, { useState } from 'react';
import { CAR_DATA } from '../constants';

interface StatusCheckerProps {
  showToast: (msg: string, type: any) => void;
  onRegister: () => void;
  onOneTime: (brand: string, model: string) => void;
}

const StatusChecker: React.FC<StatusCheckerProps> = ({ showToast, onRegister, onOneTime }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [km, setKm] = useState('');
  const [result, setResult] = useState<{ status: 'eligible' | 'not_eligible' | null; message: string }>({ status: null, message: '' });

  const handleCheck = () => {
    if (!brand || !model || !year || !km) {
      showToast("Iltimos, barcha maydonlarni to'ldiring", "error");
      return;
    }

    const currentYear = new Date().getFullYear();
    const carAge = currentYear - parseInt(year);
    const carKm = parseInt(km);
    const limits = CAR_DATA[brand.toLowerCase()]?.[model];

    if (!limits) {
      setResult({ status: 'not_eligible', message: "Afsuski, ushbu model uchun dastur hali ishga tushmagan." });
      return;
    }

    if (carAge <= limits.maxAge && carKm <= limits.maxKm) {
      setResult({ 
        status: 'eligible', 
        message: `✅ Tabriklaymiz! Mashinangiz Million KM dasturiga to'liq mos keladi.` 
      });
    } else {
      setResult({ 
        status: 'not_eligible', 
        message: "⚠️ Afsuski, limitlar oshib ketgan bo'lsa-da, siz premium bir martalik xizmatimizdan foydalanishingiz mumkin." 
      });
    }
  };

  return (
    <div id="status" className="max-w-4xl mx-auto">
      <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-gray-100 card-shadow text-center">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Mashinangiz statusini tekshiring</h2>
          <p className="text-gray-500 font-medium">Million km xizmatiga mos ekanligini aniqlang</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4 mb-2 block">Brend</label>
              <select 
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 font-bold outline-none appearance-none"
                value={brand}
                onChange={(e) => { setBrand(e.target.value); setModel(''); }}
              >
                <option value="">Brendni tanlang</option>
                {Object.keys(CAR_DATA).map(b => <option key={b} value={b}>{b.toUpperCase()}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4 mb-2 block">Model</label>
              <select 
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 font-bold outline-none disabled:opacity-50"
                disabled={!brand}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="">Modelni tanlang</option>
                {brand && Object.keys(CAR_DATA[brand.toLowerCase()]).map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4 mb-2 block">Yili</label>
              <input 
                type="number" 
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 font-bold outline-none"
                placeholder="2022"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4 mb-2 block">Masofa (km)</label>
              <input 
                type="number" 
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 font-bold outline-none"
                placeholder="45000"
                value={km}
                onChange={(e) => setKm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleCheck}
          className="mt-12 px-16 py-5 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-blue-100"
        >
          Tekshirish
        </button>

        {result.status && (
          <div className={`mt-12 p-10 rounded-[2.5rem] animate-fade-up ${result.status === 'eligible' ? 'bg-blue-50/50' : 'bg-red-50/50'}`}>
            <h3 className={`text-2xl font-extrabold mb-4 ${result.status === 'eligible' ? 'text-blue-900' : 'text-red-900'}`}>
              {result.message}
            </h3>
            <div className="flex justify-center mt-8">
              {result.status === 'eligible' ? (
                <button onClick={onRegister} className="px-10 py-4 bg-blue-600 text-white rounded-full font-bold uppercase tracking-widest text-xs">Ro'yxatdan o'tish</button>
              ) : (
                <button onClick={() => onOneTime(brand, model)} className="px-10 py-4 bg-red-600 text-white rounded-full font-bold uppercase tracking-widest text-xs">Bir martalik xizmat</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusChecker;
