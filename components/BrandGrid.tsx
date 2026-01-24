
import React, { useState, useRef, useEffect } from 'react';
import { CAR_DATA } from '../constants';
import { User, Order } from '../types';

interface BrandGridProps {
  user: User | null;
  onOrder: (order: Partial<Order>) => void;
  onOpenAuth: () => void;
}

const BRAND_LOGOS: Record<string, string> = {
  "chevrolet": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo.png/1200px-Chevrolet-logo.png",
  "kia": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Kia_logo.svg/2560px-Kia_logo.svg.png",
  "liauto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Li_Auto_logo.png/1200px-Li_Auto_logo.png"
};

const BrandGrid: React.FC<BrandGridProps> = ({ user, onOrder, onOpenAuth }) => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [tariffType, setTariffType] = useState<'one-time' | 'yearly' | null>(null);
  const [yearlyCount, setYearlyCount] = useState(3);
  
  const modelsRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedBrand && modelsRef.current) {
      setTimeout(() => modelsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedModel && checkoutRef.current) {
      setTimeout(() => checkoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    }
  }, [selectedModel]);

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    setTariffType(null);
  };

  const calculateYearlyPrice = (basePrice: number, count: number) => {
    return basePrice * count;
  };

  const submitOrder = () => {
    if (!user) return onOpenAuth();
    if (!selectedBrand || !selectedModel || !tariffType) return;

    const basePrice = CAR_DATA[selectedBrand.toLowerCase()][selectedModel].priceOneTime;
    const finalPrice = tariffType === 'one-time' ? basePrice : calculateYearlyPrice(basePrice, yearlyCount);

    onOrder({
      brand: selectedBrand,
      model: selectedModel,
      serviceType: tariffType === 'one-time' ? '1 MARTALIK XIZMAT' : `1 YILLIK TARIF (${yearlyCount} marta)`,
      tariffType,
      servicesCount: tariffType === 'one-time' ? 1 : yearlyCount,
      totalPrice: finalPrice,
      note: `Tanlangan xizmat: ${tariffType === 'one-time' ? 'Bir martalik' : 'Yillik'}. Jami narx: ${finalPrice.toLocaleString()} UZS.`
    });

    setSelectedModel(null);
    setTariffType(null);
  };

  return (
    <div className="py-10">
      <div className="mb-12 md:mb-20 px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-[#1D1D1F]">Brendlar</h2>
        <p className="text-lg md:text-xl text-gray-500 font-medium">Faqat eng sara avtomobillar uchun.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
        {Object.keys(CAR_DATA).map((brand) => (
          <div 
            key={brand}
            onClick={() => { setSelectedBrand(brand); setSelectedModel(null); }}
            className={`ios-card bg-white/60 backdrop-blur-xl p-8 md:p-12 squircle border border-white/50 cursor-pointer flex flex-col items-center group ${selectedBrand === brand ? 'ring-4 ring-blue-500/20 shadow-2xl scale-[1.02]' : ''}`}
          >
            <div className="h-20 md:h-28 w-full flex items-center justify-center mb-6 md:mb-10 transition-transform duration-500 group-hover:scale-110">
              <img src={BRAND_LOGOS[brand]} alt={brand} className="max-h-full object-contain" />
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold capitalize mb-6 md:mb-8">{brand === 'liauto' ? 'Li Auto' : brand}</h3>
            <button className="w-full md:w-auto px-8 py-3 bg-gray-100 text-gray-900 text-[10px] md:text-[11px] font-bold uppercase tracking-widest rounded-full transition-all group-hover:bg-blue-600 group-hover:text-white">
              Modellarni ko'rish
            </button>
          </div>
        ))}
      </div>

      {selectedBrand && (
        <div ref={modelsRef} className="mt-12 md:mt-20 p-8 md:p-20 bg-black md:squircle text-white animate-spring relative overflow-hidden shadow-2xl rounded-[2.5rem] md:rounded-[36px] mx-4 md:mx-0">
          <div className="absolute top-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-blue-500/10 blur-[60px] md:blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-12 md:mb-20">
            <div>
              <span className="text-blue-400 font-bold uppercase tracking-[0.2em] text-[9px] md:text-[10px] mb-3 block">Premium Tanlov</span>
              <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight capitalize">{selectedBrand === 'liauto' ? 'Li Auto' : selectedBrand} To'plami</h3>
            </div>
            <button onClick={() => {setSelectedBrand(null); setSelectedModel(null);}} className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center tap-active hover:bg-white/20 transition-all">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(CAR_DATA[selectedBrand]).map(([model, info]) => (
              <div 
                key={model} 
                onClick={() => handleModelSelect(model)}
                className={`bg-white/5 p-8 md:p-10 squircle border transition-all ios-card cursor-pointer flex flex-col ${selectedModel === model ? 'border-blue-500 bg-white/10 ring-2 ring-blue-500/20' : 'border-white/10 hover:bg-white/10'}`}
              >
                <div className="flex justify-between items-start mb-6 md:mb-8">
                  <h4 className="text-xl md:text-2xl font-extrabold tracking-tight">{model}</h4>
                  <span className="bg-blue-500/20 text-blue-400 text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">Tanlash</span>
                </div>
                <p className="text-white/40 text-sm font-medium mb-10 md:mb-12 italic leading-snug">"{info.desc}"</p>
                <div className="mt-auto pt-6 md:pt-8 border-t border-white/10 flex justify-between items-end">
                  <span className="text-[9px] md:text-[10px] text-white/30 font-bold uppercase tracking-widest">Bazaviy narx</span>
                  <span className="text-xl md:text-2xl font-black text-blue-400">{info.priceOneTime.toLocaleString()} <span className="text-xs">uzs</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedModel && selectedBrand && (
        <div ref={checkoutRef} className="mt-12 md:mt-20 p-8 md:p-20 bg-white md:squircle border border-gray-100 shadow-2xl animate-spring rounded-[2.5rem] md:rounded-[36px] mx-4 md:mx-0">
          <div className="text-center mb-12 md:mb-20">
            <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block">Xizmat Turini Tanlang</span>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">{selectedBrand} {selectedModel}</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20">
            {/* One Time Choice */}
            <div 
              onClick={() => setTariffType('one-time')}
              className={`p-8 md:p-10 squircle border-2 transition-all cursor-pointer flex flex-col justify-between ${tariffType === 'one-time' ? 'border-blue-600 bg-blue-50/20' : 'border-gray-100 bg-gray-50/50'}`}
            >
              <div>
                <h4 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tighter">1 MARTALIK XIZMAT</h4>
                <p className="text-sm md:text-base text-gray-500 mb-8 font-medium">Faqat hozir moy almashtirib olishni xohlaydiganlar uchun.</p>
                <ul className="space-y-4 mb-10">
                   {['Modelga mos moy', 'Original filtrlar', 'Dvigatel nazorati', 'Bepul avtomoyka'].map(i => (
                     <li key={i} className="flex items-center text-xs md:text-sm font-bold text-gray-700">
                       <i className="fas fa-check-circle text-blue-500 mr-3"></i> {i}
                     </li>
                   ))}
                   <li className="flex items-center text-xs md:text-sm font-bold text-red-400 pt-4 border-t border-gray-200/50 mt-4">
                     <i className="fas fa-times-circle mr-3"></i> Million KM kafolati yo'q
                   </li>
                </ul>
              </div>
              <div className="text-2xl md:text-3xl font-black text-slate-900">{CAR_DATA[selectedBrand.toLowerCase()][selectedModel].priceOneTime.toLocaleString()} <span className="text-xs">UZS</span></div>
            </div>

            {/* Yearly Choice */}
            <div 
              onClick={() => setTariffType('yearly')}
              className={`p-8 md:p-10 squircle border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${tariffType === 'yearly' ? 'border-blue-600 bg-blue-50/20' : 'border-gray-100 bg-gray-50/50'}`}
            >
              <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-blue-600 text-white text-[8px] md:text-[10px] font-black px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-widest shadow-lg">TAVSIYA ETILADI</div>
              <div>
                <h4 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tighter text-blue-600">1 YILLIK TARIF</h4>
                <p className="text-sm md:text-base text-gray-500 mb-8 font-medium italic leading-snug">"Dvigatelni ta’mirlash emas, saqlab qolish uchun"</p>
                <ul className="space-y-4 mb-10">
                   {[
                     'Har safar bepul avtomoyka', 
                     '1 000 000 KM kafolati', 
                     'Doimiy monitoring', 
                     'Telegram yopiq guruh'
                   ].map(i => (
                     <li key={i} className="flex items-center text-xs md:text-sm font-bold text-gray-800">
                       <i className="fas fa-star text-yellow-500 mr-3"></i> {i}
                     </li>
                   ))}
                </ul>
              </div>
              <div className="text-blue-600 font-black text-[10px] md:text-sm uppercase tracking-widest mb-2 flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span> Doimiy nazorat
              </div>
              <div className="text-2xl md:text-3xl font-black text-slate-900">Konfiguratsiya <i className="fas fa-arrow-down text-sm ml-2 text-blue-600"></i></div>
            </div>
          </div>

          {tariffType === 'yearly' && (
            <div className="bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 text-white mb-12 md:mb-20 animate-spring border border-white/5">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
                <div className="flex-1 text-center md:text-left w-full">
                  <h4 className="text-2xl md:text-3xl font-black mb-3 md:mb-4 tracking-tight">Xizmatlar soni</h4>
                  <p className="text-white/40 text-xs md:text-base font-medium mb-8 md:mb-10">Bir yillik rejangiz: 3–12 marta</p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4">
                    {[3,4,5,6,8,10,12].map(num => (
                      <button 
                        key={num}
                        onClick={() => setYearlyCount(num)}
                        className={`w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl font-black text-xs md:text-sm transition-all active:scale-95 ${yearlyCount === num ? 'bg-blue-600 text-white scale-110 shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="w-full md:w-[350px] bg-white/5 backdrop-blur-3xl rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border border-white/10 text-center relative overflow-hidden group">
                   <div className="text-[9px] md:text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3 md:mb-4">Jami Yillik To'lov</div>
                   <div className="text-3xl md:text-4xl font-black mb-2 tracking-tighter">
                     {calculateYearlyPrice(CAR_DATA[selectedBrand.toLowerCase()][selectedModel].priceOneTime, yearlyCount).toLocaleString()}
                   </div>
                   <div className="text-[8px] md:text-[10px] text-white/30 font-bold uppercase tracking-widest">
                     UZS / YILIGA
                   </div>
                   <div className="mt-6 pt-6 border-t border-white/10 flex justify-center items-center text-[10px] font-bold text-white/60">
                     <i className="fas fa-info-circle mr-2 text-blue-400"></i> Premium servislar ichida
                   </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center">
            <button 
              onClick={submitOrder}
              disabled={!tariffType}
              className={`w-full md:w-auto px-12 md:px-24 py-5 md:py-6 rounded-[18px] md:rounded-[22px] font-black uppercase tracking-[0.2em] text-[12px] md:text-sm transition-all shadow-2xl active:scale-95 disabled:opacity-30 ${tariffType === 'yearly' ? 'bg-blue-600 text-white' : 'bg-black text-white'}`}
            >
              {tariffType === 'yearly' ? 'Tasdiqlash' : 'Band qilish'}
            </button>
            <p className="mt-6 md:mt-8 text-gray-400 text-[10px] font-bold uppercase tracking-widest text-center max-w-xs md:max-w-md">
              {tariffType === 'yearly' 
                ? "Yillik tarif — muammoning oldini oladi." 
                : "1 martalik xizmat — muammoni hozircha hal qiladi."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandGrid;
