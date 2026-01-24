
import React, { useState, useRef, useEffect } from 'react';
import { CAR_DATA } from '../constants';
import { User, Order } from '../types';

interface BrandGridProps {
  user: User | null;
  onOrder: (order: Partial<Order>) => void;
  onOpenAuth: () => void;
}

const BrandGrid: React.FC<BrandGridProps> = ({ user, onOrder, onOpenAuth }) => {
  const [step, setStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [tariff, setTariff] = useState<'one-time' | 'yearly' | null>(null);
  const [count, setCount] = useState(3);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step > 1 && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  const BRAND_LOGOS: any = {
    chevrolet: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo.png/1024px-Chevrolet-logo.png",
    kia: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Kia_logo.svg/2560px-Kia_logo.svg.png",
    liauto: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Li_Auto_logo.png/1200px-Li_Auto_logo.png"
  };

  const reset = () => {
    setStep(1);
    setSelectedBrand(null);
    setSelectedModel(null);
    setTariff(null);
  };

  const handleOrder = () => {
    if (!user) return onOpenAuth();
    if (!selectedBrand || !selectedModel || !tariff) return;

    const basePrice = CAR_DATA[selectedBrand.toLowerCase()][selectedModel].priceOneTime;
    const finalPrice = tariff === 'one-time' ? basePrice : basePrice * count;

    onOrder({
      brand: selectedBrand,
      model: selectedModel,
      serviceType: tariff === 'one-time' ? '1 MARTALIK XIZMAT' : `YILLIK TARIF (${count} marta)`,
      tariffType: tariff,
      servicesCount: tariff === 'one-time' ? 1 : count,
      totalPrice: finalPrice,
      note: `Brend: ${selectedBrand}, Model: ${selectedModel}, Tarif: ${tariff}`
    });
    reset();
  };

  return (
    <div className="py-12" ref={containerRef}>
      <div className="mb-16 text-center">
        <span className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4 block">Premium Servis</span>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">Xizmatni tanlang</h2>
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} className="mt-6 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
            <i className="fas fa-arrow-left mr-2"></i> Orqaga qaytish
          </button>
        )}
      </div>

      <div className="max-w-6xl mx-auto">
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {Object.keys(CAR_DATA).map(brand => (
              <div key={brand} onClick={() => { setSelectedBrand(brand); setStep(2); }} className="apple-glass p-12 squircle flex flex-col items-center cursor-pointer tap-active ios-card-shadow hover:scale-[1.02] transition-all">
                <img src={BRAND_LOGOS[brand]} alt={brand} className="h-16 md:h-20 object-contain mb-10 opacity-80 group-hover:opacity-100" />
                <h3 className="text-2xl font-black capitalize tracking-tight">{brand === 'liauto' ? 'Li Auto' : brand}</h3>
                <span className="mt-4 text-[10px] font-black text-blue-600 uppercase tracking-widest">Modellarni ko'rish</span>
              </div>
            ))}
          </div>
        )}

        {step === 2 && selectedBrand && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 animate-spring">
            {Object.entries(CAR_DATA[selectedBrand.toLowerCase()]).map(([model, info]) => (
              <div key={model} onClick={() => { setSelectedModel(model); setStep(3); }} className="bg-white p-10 squircle border border-gray-100 cursor-pointer tap-active ios-card-shadow">
                <h4 className="text-2xl font-black mb-4 tracking-tight">{model}</h4>
                <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed italic">"{info.desc}"</p>
                <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bazaviy narx</span>
                   <span className="text-xl font-black text-blue-600">{info.priceOneTime.toLocaleString()} <span className="text-xs">UZS</span></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 3 && selectedModel && selectedBrand && (
          <div className="max-w-4xl mx-auto animate-spring px-4">
            <div className="bg-white apple-glass p-8 md:p-16 squircle-lg shadow-2xl border border-white/40">
              <h3 className="text-3xl font-black mb-12 text-center tracking-tight">{selectedBrand} {selectedModel}</h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div onClick={() => setTariff('one-time')} className={`p-8 squircle border-2 transition-all cursor-pointer ${tariff === 'one-time' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-100 hover:bg-gray-50'}`}>
                  <h5 className="font-black text-xl mb-4">BIR MARTALIK</h5>
                  <p className="text-sm text-gray-500 font-medium mb-8">Faqat hozirgi muammoni hal qilish uchun.</p>
                  <div className="text-2xl font-black">{CAR_DATA[selectedBrand.toLowerCase()][selectedModel].priceOneTime.toLocaleString()} UZS</div>
                </div>
                <div onClick={() => setTariff('yearly')} className={`p-8 squircle border-2 transition-all cursor-pointer relative overflow-hidden ${tariff === 'yearly' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-100 hover:bg-gray-50'}`}>
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase">KAFOLAT</div>
                  <h5 className="font-black text-xl mb-4 text-blue-600">YILLIK TARIF</h5>
                  <p className="text-sm text-gray-500 font-medium mb-8">Dvigatelingizni Million KM kafolati bilan himoyalang.</p>
                  <div className="text-2xl font-black">Xususiy narx <i className="fas fa-chevron-right text-sm ml-2"></i></div>
                </div>
              </div>

              {tariff === 'yearly' && (
                <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] mb-12 animate-spring">
                   <h5 className="text-xl font-black mb-6">Xizmatlar soni: {count} marta</h5>
                   <div className="flex flex-wrap gap-3">
                     {[3,4,6,8,12].map(n => (
                       <button key={n} onClick={() => setCount(n)} className={`w-12 h-12 rounded-xl font-black text-sm transition-all ${count === n ? 'bg-blue-600' : 'bg-white/10 hover:bg-white/20'}`}>{n}</button>
                     ))}
                   </div>
                   <div className="mt-10 pt-8 border-t border-white/10 flex justify-between items-end">
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Yillik jami to'lov</span>
                      <span className="text-3xl font-black text-blue-400">{(CAR_DATA[selectedBrand.toLowerCase()][selectedModel].priceOneTime * count).toLocaleString()} UZS</span>
                   </div>
                </div>
              )}

              <button onClick={handleOrder} disabled={!tariff} className="w-full h-20 bg-black text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs tap-active shadow-2xl disabled:opacity-20">
                Buyurtmani tasdiqlash
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandGrid;
