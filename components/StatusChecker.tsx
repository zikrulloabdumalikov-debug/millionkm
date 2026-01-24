
import React, { useState, useRef, useEffect } from 'react';
import { CAR_DATA } from '../constants';

interface StatusCheckerProps {
  showToast: (msg: string, type: any) => void;
  onRegister: () => void;
  onOneTime: (brand: string, model: string) => void;
}

const IOSDropdown: React.FC<{
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  placeholder: string;
}> = ({ label, options, value, onChange, disabled, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">{label}</label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-16 px-6 rounded-2xl flex items-center justify-between font-bold text-left transition-all tap-active ${disabled ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 text-black hover:bg-white ring-1 ring-gray-100 hover:ring-blue-200'} ${isOpen ? 'ring-2 ring-blue-500 bg-white' : ''}`}
      >
        <span className={!value ? 'text-gray-400' : ''}>{value || placeholder}</span>
        <i className={`fas fa-chevron-down text-[10px] transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white/80 backdrop-blur-3xl rounded-[24px] shadow-2xl border border-white/20 overflow-hidden animate-spring origin-top">
          <div className="max-h-64 overflow-y-auto py-2 ios-scroll">
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={`w-full text-left px-6 py-4 font-bold text-[14px] hover:bg-blue-50 transition-colors ${value === opt ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'}`}
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

const StatusChecker: React.FC<StatusCheckerProps> = ({ showToast, onRegister, onOneTime }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [km, setKm] = useState('');
  const [result, setResult] = useState<{ status: 'eligible' | 'not_eligible' | null; message: string }>({ status: null, message: '' });

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
    <div className="bg-white p-12 md:p-20 squircle border border-gray-100 shadow-xl text-center">
      <div className="mb-16">
        <span className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4 block">Dvigatel intellekti</span>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Statusni tekshirish</h2>
        <p className="text-gray-400 font-medium mt-4">Avtomobilingiz 1,000,000 KM kafolatiga mosligini aniqlang.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 text-left">
        <div className="space-y-6">
          <IOSDropdown label="Brend" placeholder="Brendni tanlang" options={Object.keys(CAR_DATA)} value={brand} onChange={v => {setBrand(v); setModel('');}} />
          <IOSDropdown label="Model" placeholder="Modelni tanlang" disabled={!brand} options={brand ? Object.keys(CAR_DATA[brand.toLowerCase()]) : []} value={model} onChange={setModel} />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 block">Ishlab chiqarilgan yili</label>
            <input type="number" placeholder="2022" value={year} onChange={e => setYear(e.target.value)} className="w-full h-16 px-6 rounded-2xl bg-gray-50 font-bold border-none outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 block">Yurgan masofasi (KM)</label>
            <input type="text" placeholder="45 000" value={km} onChange={e => setKm(e.target.value)} className="w-full h-16 px-6 rounded-2xl bg-gray-50 font-bold border-none outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      <button onClick={handleCheck} className="mt-16 px-20 py-5 bg-black text-white rounded-[22px] font-bold text-sm uppercase tracking-widest tap-active shadow-2xl shadow-gray-200">
        Tahlilni boshlash
      </button>

      {result.status && (
        <div className={`mt-16 p-12 squircle border animate-spring ${result.status === 'eligible' ? 'bg-blue-50/40 border-blue-100' : 'bg-red-50/40 border-red-100'}`}>
          <h3 className={`text-2xl font-extrabold mb-4 tracking-tight ${result.status === 'eligible' ? 'text-blue-900' : 'text-red-900'}`}>{result.message}</h3>
          <p className="text-gray-500 font-medium mb-10">{result.status === 'eligible' ? 'Sizning avtomobilingiz bizning flagman dasturimizning barcha texnik talablariga javob beradi.' : 'Standart kafolat mavjud bo\'lmasa-da, siz bizning premium mobil xizmatlarimizdan foydalanishingiz mumkin.'}</p>
          <button 
            onClick={result.status === 'eligible' ? onRegister : () => onOneTime(brand, model)}
            className={`px-12 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] tap-active ${result.status === 'eligible' ? 'bg-blue-600 text-white' : 'bg-black text-white'}`}
          >
            {result.status === 'eligible' ? 'Kafolatni faollashtirish' : 'Xizmatga yozilish'}
          </button>
        </div>
      )}
    </div>
  );
};

export default StatusChecker;
