import React from 'react';
import { CAR_DATA } from '../data.js';

const StatusChecker = ({ showToast, onRegister, onOneTime }) => {
  const [brand, setBrand] = React.useState('');
  const [model, setModel] = React.useState('');
  const [year, setYear] = React.useState('');
  const [km, setKm] = React.useState('');
  const [result, setResult] = React.useState(null);

  const brands = [
    { key: 'chevrolet', label: 'Chevrolet' },
    { key: 'kia', label: 'Kia' },
    { key: 'liauto', label: 'Li Auto' }
  ];

  const formatKm = (val) => {
    const num = val.replace(/\D/g, '');
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const handleCheck = () => {
    if (!brand || !model || !year || !km) {
      showToast("Barcha maydonlarni to'ldiring", "error");
      return;
    }

    const limits = CAR_DATA[brand]?.[model];
    if (!limits) {
      showToast("Model topilmadi", "error");
      return;
    }

    const currentYear = new Date().getFullYear();
    const carAge = currentYear - parseInt(year);
    const carKm = parseInt(km.replace(/\D/g, ''));

    const ageOk = carAge <= limits.maxAge;
    const kmOk = carKm <= limits.maxKm;
    const isEligible = ageOk && kmOk;

    setResult({
      isEligible,
      ageOk,
      kmOk,
      carAge,
      carKm,
      limits,
      brand,
      model,
      year,
      priceOneTime: limits.priceOneTime
    });
  };

  return (
    <div className="py-16 md:py-24 px-6 md:px-12 bg-white rounded-[32px] md:rounded-[48px] shadow-xl border border-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Moslikni <span className="text-blue-600">Aniqlash</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg">
            Avtomobilingiz kafolat dasturiga mos kelishini tekshiring.
          </p>
        </div>

        <div className="space-y-8">
          {/* Brand Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {brands.map((b) => (
              <button
                key={b.key}
                onClick={() => {
                  setBrand(b.key);
                  setModel('');
                  setResult(null);
                }}
                className={`h-16 rounded-2xl font-black uppercase tracking-widest transition-all ${
                  brand === b.key 
                    ? 'bg-slate-900 text-white shadow-lg scale-[1.02]' 
                    : 'bg-white text-slate-900 border-2 border-slate-100 hover:border-slate-300'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Model Selection */}
          {brand && (
            <div className="animate-fade-in">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Modelni tanlang</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.keys(CAR_DATA[brand]).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setModel(m);
                      setResult(null);
                    }}
                    className={`h-12 rounded-xl font-bold text-sm transition-all ${
                      model === m
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {m === 'liauto' ? 'Li Auto' : m}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Ishlab chiqarilgan yil</label>
              <input
                type="number"
                placeholder="2022"
                min="2000"
                max={new Date().getFullYear()}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full h-16 px-6 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold text-xl text-slate-900 placeholder:text-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Yurgan masofa (km)</label>
              <input
                type="text"
                placeholder="45 000"
                value={km}
                onChange={(e) => setKm(formatKm(e.target.value))}
                className="w-full h-16 px-6 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold text-xl text-slate-900 placeholder:text-slate-300"
              />
            </div>
          </div>

          {/* Check Button */}
          <button
            onClick={handleCheck}
            className="w-full h-16 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition-all"
          >
            Tekshirish
          </button>

          {/* Result Block */}
          {result && (
            <div className="animate-fade-up">
              {result.isEligible ? (
                // GREEN RESULT
                <div className="mt-10 bg-green-50 border-2 border-green-200 rounded-[32px] p-8 md:p-12 text-center">
                  <i className="fas fa-circle-check text-green-500 text-5xl mb-6"></i>
                  <h3 className="text-2xl md:text-3xl font-black text-green-700 mb-6">Tabriklaymiz! Kafolat dasturiga mos kelasiz</h3>
                  
                  <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-8 text-green-800 font-bold text-sm md:text-base">
                    <div className="flex items-center justify-center gap-2">
                      <i className="fas fa-check"></i>
                      Avtomobil yoshi: {result.carAge} yil — Limit: {result.limits.maxAge} yil ichida
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <i className="fas fa-check"></i>
                      Yurgan masofa: {result.carKm.toLocaleString()} km — Limit: {result.limits.maxKm.toLocaleString()} km ichida
                    </div>
                  </div>

                  <div className="w-full h-px bg-green-200 mb-8"></div>

                  <h4 className="text-xl font-black text-slate-900 uppercase tracking-wide mb-8">Siz uchun tavsiya:</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 1 Martalik */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-green-100 flex flex-col">
                      <h5 className="text-lg font-black text-slate-900 uppercase mb-4">1 MARTALIK XIZMAT</h5>
                      <div className="text-3xl font-black text-blue-600 mb-2">{result.priceOneTime.toLocaleString()} UZS</div>
                      <p className="text-slate-500 font-medium text-sm mb-6">Bir marta xizmat</p>
                      <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide mb-8 inline-flex items-center justify-center">
                        <i className="fas fa-shield-alt mr-2"></i> Kafolat: 10,000 km yoki 6 oy
                      </div>
                      <button onClick={onRegister} className="mt-auto w-full py-4 bg-slate-100 text-slate-900 rounded-xl font-bold uppercase tracking-wide hover:bg-slate-200 transition-colors">
                        Buyurtma berish
                      </button>
                    </div>

                    {/* 1 Yillik */}
                    <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-900/20 relative overflow-hidden flex flex-col">
                      <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">TAVSIYA ETILADI</div>
                      <h5 className="text-lg font-black text-white uppercase mb-4">1 YILLIK TARIF</h5>
                      <div className="text-3xl font-black text-white mb-2">{(result.priceOneTime * 3 * 0.85).toLocaleString()} UZS</div>
                      <p className="text-slate-400 font-medium text-sm mb-6">3 xizmat uchun (taxminan)</p>
                      <div className="space-y-2 mb-8">
                        <div className="flex items-center text-sm font-bold text-green-400">
                          <i className="fas fa-check mr-2"></i> Har xizmatda 15% tejaysiz
                        </div>
                        <div className="flex items-center text-sm font-bold text-green-400">
                          <i className="fas fa-shield-alt mr-2"></i> Kafolat: 1,000,000 km davomida
                        </div>
                      </div>
                      <button onClick={onRegister} className="mt-auto w-full py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-wide hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                        Yillikka yozilish
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // RED RESULT
                <div className="mt-10 bg-red-50 border-2 border-red-200 rounded-[32px] p-8 md:p-12 text-center">
                  <i className="fas fa-circle-xmark text-red-500 text-5xl mb-6"></i>
                  <h3 className="text-2xl md:text-3xl font-black text-red-600 mb-6">Kafolat dasturiga mos kelmaydi</h3>
                  
                  <div className="flex flex-col items-center gap-3 mb-8 text-sm md:text-base">
                    {!result.ageOk ? (
                      <div className="flex items-center gap-3 text-red-600 font-bold">
                        <i className="fas fa-xmark"></i>
                        Avtomobil yoshi: {result.carAge} yil — Limit: {result.limits.maxAge} yil
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-green-600 font-bold">
                        <i className="fas fa-check"></i>
                        Avtomobil yoshi: {result.carAge} yil — Limit: {result.limits.maxAge} yil ✓
                      </div>
                    )}

                    {!result.kmOk ? (
                      <div className="flex items-center gap-3 text-red-600 font-bold">
                        <i className="fas fa-xmark"></i>
                        Yurgan masofa: {result.carKm.toLocaleString()} km — Limit: {result.limits.maxKm.toLocaleString()} km
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-green-600 font-bold">
                        <i className="fas fa-check"></i>
                        Yurgan masofa: {result.carKm.toLocaleString()} km — Limit: {result.limits.maxKm.toLocaleString()} km ✓
                      </div>
                    )}
                  </div>

                  <div className="w-full h-px bg-red-200 mb-8"></div>

                  <h4 className="text-xl font-black text-slate-900 uppercase tracking-wide mb-8">Siz uchun tavsiya:</h4>

                  <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-red-100 max-w-2xl mx-auto">
                    <h5 className="text-xl font-black text-slate-900 uppercase mb-4">1 MARTALIK XIZMAT</h5>
                    <div className="text-4xl font-black text-blue-600 mb-6">{result.priceOneTime.toLocaleString()} UZS</div>
                    <p className="text-slate-600 font-medium leading-relaxed mb-8">
                      Avtomobilingiz kafolat dasturi limitidan o'tgan bo'lsa ham, siz bizning bir martalik original moy almashtirish xizmatimizdan foydalanishingiz mumkin. Sifat va ishonch kafolatlangan.
                    </p>
                    <button 
                      onClick={() => onOneTime(result.brand, result.model)} 
                      className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-wide hover:bg-black transition-colors shadow-lg"
                    >
                      Bir martalik xizmatga yozilish
                    </button>
                    <p className="text-xs text-slate-400 font-medium mt-6">
                      Kafolat dasturiga qaytish imkoniyati: Keyingi texnik xizmatda limit ichiga tushsangiz, yillik dasturga o'ta olasiz.
                    </p>
                  </div>
                </div>
              )}

              <button 
                onClick={() => setResult(null)}
                className="mt-8 text-slate-400 font-bold uppercase tracking-widest text-xs hover:text-slate-600 transition-colors"
              >
                <i className="fas fa-rotate-right mr-2"></i> Qayta tekshirish
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusChecker;
