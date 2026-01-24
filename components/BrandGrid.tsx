
import React, { useState, useEffect, useRef } from 'react';
import { CAR_DATA } from '../constants';
import { User, Order } from '../types';

interface BrandGridProps {
  user: User | null;
  onOrder: (order: Partial<Order>) => void;
  onOpenAuth: () => void;
}

// Using high-quality, stable URLs for the logos
const BRAND_LOGOS: Record<string, string> = {
  "chevrolet": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo.png/800px-Chevrolet-logo.png",
  "kia": "https://www.citypng.com/photo/26824/kia-black-logo-png",
  "liauto": "https://1000logos.net/lixiang-logo/"
};

const BRAND_DESCS: Record<string, string> = {
  "chevrolet": "Million km standartlariga mos eng so'nggi Chevrolet modellari",
  "kia": "Million km standartlariga mos eng so'nggi Kia modellari",
  "liauto": "Million km standartlariga mos eng so'nggi Li Auto modellari"
};

const BrandGrid: React.FC<BrandGridProps> = ({ user, onOrder, onOpenAuth }) => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const modelsRef = useRef<HTMLDivElement>(null);

  const brands = Object.keys(CAR_DATA);

  useEffect(() => {
    if (selectedBrand && modelsRef.current) {
      setTimeout(() => {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = modelsRef.current?.getBoundingClientRect().top ?? 0;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 200);
    }
  }, [selectedBrand]);

  const handleOrder = (model: string, price: number) => {
    if (!user) {
      onOpenAuth();
      return;
    }
    onOrder({
      brand: selectedBrand || 'Unknown',
      model: model,
      serviceType: '1 Martalik Xizmat',
      note: `Brend: ${selectedBrand}, Model: ${model}, Narxi: ${price.toLocaleString()} so'm`
    });
  };

  return (
    <div className="py-20" id="brands">
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold text-[#1d1d1f] mb-6 tracking-tight">Qo'llab-quvvatlanadigan brendlar</h2>
        <p className="text-gray-500 text-xl font-medium">Eksklyuziv xizmat ko'rsatiladigan premium brendlar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {brands.map((brand) => (
          <div 
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`group relative overflow-hidden rounded-[2.5rem] bg-white border-2 transition-all duration-500 cursor-pointer p-10 flex flex-col items-center justify-center text-center ${selectedBrand === brand ? 'border-blue-600 scale-[1.03] shadow-2xl' : 'border-slate-100 shadow-xl hover:shadow-2xl'}`}
          >
            <div className="h-28 w-full flex items-center justify-center mb-10">
              <img 
                src={BRAND_LOGOS[brand]} 
                alt={`${brand} logo`} 
                className="max-h-full max-w-[90%] object-contain"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-black capitalize mb-3 text-[#1d1d1f]">
                {brand === 'liauto' ? 'Li Auto' : brand}
              </h3>
              <p className="text-sm text-gray-400 font-medium mb-8 max-w-[220px] leading-relaxed">{BRAND_DESCS[brand]}</p>
              <div className={`px-8 py-3.5 rounded-2xl font-bold text-[11px] uppercase tracking-[0.1em] text-center border transition-all ${selectedBrand === brand ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' : 'bg-transparent text-gray-500 border-gray-200 group-hover:border-blue-600 group-hover:text-blue-600'}`}>
                Modellarni tanlash
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedBrand && (
        <div ref={modelsRef} className="mt-16 p-8 md:p-16 bg-[#1d1d1f] rounded-[3rem] text-white animate-in relative overflow-hidden shadow-2xl">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-16 relative z-10">
            <div>
              <span className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-3 block">Premium Tanlov</span>
              <h3 className="text-3xl md:text-5xl font-extrabold capitalize tracking-tight">
                {selectedBrand === 'liauto' ? 'Li Auto' : selectedBrand} Modellari
              </h3>
            </div>
            <button 
              onClick={() => setSelectedBrand(null)} 
              className="w-14 h-14 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all group active:scale-95"
            >
                <i className="fas fa-times text-xl group-hover:rotate-90 transition-transform"></i>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {Object.entries(CAR_DATA[selectedBrand]).map(([model, info]) => (
              <div key={model} className="bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 flex flex-col h-full group hover:bg-white/10 transition-all border-b-4 border-b-transparent hover:border-b-blue-600 shadow-xl">
                <div className="flex justify-between items-start mb-8">
                   <h4 className="text-2xl font-black tracking-tight">{model}</h4>
                   <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                     <i className="fas fa-car text-blue-400 text-sm"></i>
                   </div>
                </div>
                
                <div className="space-y-4 mb-10 text-[13px] font-bold">
                  <div className="flex justify-between items-center text-white/50">
                    <span>Kafolat Limiti</span>
                    <span className="text-white bg-white/10 px-3 py-1 rounded-lg">{info.maxKm.toLocaleString()} km</span>
                  </div>
                  <div className="flex justify-between items-center text-white/50">
                    <span>Maksimal yosh</span>
                    <span className="text-white bg-white/10 px-3 py-1 rounded-lg">{info.maxAge} yil</span>
                  </div>
                </div>
                
                <p className="text-white/40 text-sm mb-12 leading-relaxed flex-grow italic font-medium">"{info.desc}"</p>
                
                <div className="pt-8 border-t border-white/10 mt-auto flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">Xizmat narxi</span>
                      <div className="font-black text-2xl text-blue-400 tracking-tight">{info.priceOneTime?.toLocaleString()} <span className="text-xs">so'm</span></div>
                    </div>
                    <button 
                      onClick={() => handleOrder(model, info.priceOneTime || 0)}
                      className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-[0.1em] text-[10px] hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-2xl shadow-black/20"
                    >
                      Buyurtma
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandGrid;
