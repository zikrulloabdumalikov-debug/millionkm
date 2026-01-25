import React, { useState, useRef, useEffect } from 'react';
import { CAR_DATA } from '../constants';

const IOSDropdown = ({ label, options, value, onChange, disabled, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">{label}</label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-14 md:h-16 px-6 rounded-2xl flex items-center justify-between font-bold text-left transition-all tap-active ${disabled ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 text-black hover:bg-white ring-1 ring-gray-100 hover:ring-blue-200'} ${isOpen ? 'ring-2 ring-blue-500 bg-white' : ''}`}
      >
        <span className={`text-sm md:text-base ${!value ? 'text-gray-400' : ''}`}>{value || placeholder}</span>
        <i className={`fas fa-chevron-down text-[9px] md:text-[10px] transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white/90 backdrop-blur-3xl rounded-[20px] md:rounded-[24px] shadow-2xl border border-white/20 overflow-hidden animate-spring origin-top">
          <div className="max-h-64 overflow-y-auto py-2 ios-scroll">
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={`w-full text-left px-6 py-4 font-bold text-[13px] md:text-[14px] hover:bg-blue-50 transition-colors ${value === opt ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'}`}
              >
                {opt.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const StatusChecker = ({ showToast, onRegister, onOneTime }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [km, setKm] = useState('');
  const [result, setResult] = useState({ status: null, message: '' });

  const handleCheck = () => {
    if (!brand || !model || !year || !km) {
      showToast("Ma'lumotlar to'liq emas", "error");
      return;
    }
    const limits = CAR_DATA[brand.toLowerCase()]?.[model];
    if (!limits) {
      setResult({ status: 'not_eligible', message: "Bu model hali tizimda mavjud emas." });
      return;
    }
    const currentYear = new Date().getFullYear();
    const carAge = currentYear - parseInt(year);
    const carKm = parseInt(km.replace(/\D/g, ''));
    
    if (carAge <= limits.maxAge && carKm <= limits.maxKm) {
      setResult({ status: 'eligible', message: "Mashina Million KM dasturiga mos keladi" });
    } else {
      setResult({ status: 'not_eligible', message: "Chegaraviy limitlardan oshib ketgan" });
    }
  };

  return (
    <div id="status" className="bg-white p-8 md:p-20 squircle border border-gray-100 shadow-xl text-center mx-4 md:mx-0">
      <div className="mb-10 md:mb-16">
        <span className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4 block">Dvigatel intellekti</span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Statusni tekshirish</h2>
        <p className="text-sm md:text-lg text-gray-400 font-medium mt-3 md:mt-4">Kafolatga mosligini aniqlang.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
        <div className="space-y-6">
          <IOSDropdown label="Brend" placeholder="Brendni tanlang" options={Object.keys(CAR_DATA)} value={brand} onChange={v => {setBrand(v); setModel('');}} />
          <IOSDropdown label="Model" placeholder="Modelni tanlang" disabled={!brand} options={brand ? Object.keys(CAR_DATA[brand.toLowerCase()]) : []} value={model} onChange={setModel} />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 block">Yili</label>
            <input type="number" placeholder="2022" value={year} onChange={e => setYear(e.target.value)} className="w-full h-14 md:h-16 px-6 rounded-2xl bg-gray-50 font-bold border-none outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 block">Yurgan masofasi (KM)</label>
            <input type="text" placeholder="45 000" value={km} onChange={e => setKm(e.target.value)} className="w-full h-14 md:h-16 px-6 rounded-2xl bg-gray-50 font-bold border-none outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base" />
          </div>
        </div>
      </div>

      <button onClick={handleCheck} className="w-full md:w-auto mt-10 md:mt-16 px-12 md:px-20 py-4 md:py-5 bg-black text-white rounded-[18px] md:rounded-[22px] font-bold text-xs md:text-sm uppercase tracking-widest tap-active shadow-2xl">
        Tahlilni boshlash
      </button>

      {result.status && (
        <div className={`mt-10 md:mt-16 p-8 md:p-12 squircle border animate-spring ${result.status === 'eligible' ? 'bg-blue-50/40 border-blue-100' : 'bg-red-50/40 border-red-100'}`}>
          <h3 className={`text-xl md:text-2xl font-extrabold mb-4 tracking-tight ${result.status === 'eligible' ? 'text-blue-900' : 'text-red-900'}`}>{result.message}</h3>
          <p className="text-xs md:text-base text-gray-500 font-medium mb-8 md:mb-10 leading-relaxed">{result.status === 'eligible' ? 'Sizning avtomobilingiz barcha texnik talablariga javob beradi.' : 'Standart kafolat mavjud bo\'lmasa-da, boshqa xizmatlarimiz mavjud.'}</p>
          <button 
            onClick={result.status === 'eligible' ? onRegister : () => onOneTime(brand, model)}
            className={`w-full md:w-auto px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] tap-active ${result.status === 'eligible' ? 'bg-blue-600 text-white' : 'bg-black text-white'}`}
          >
            {result.status === 'eligible' ? 'Kafolatni faollashtirish' : 'Xizmatga yozilish'}
          </button>
        </div>
      )}
    </div>
  );
};

export default StatusChecker;