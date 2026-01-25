
import React, { useState, useRef, useEffect } from 'react';
import { CAR_DATA } from '../constants';
import { User, Order } from '../types';

interface BrandGridProps {
  user: User | null;
  onOrder: (order: Partial<Order>) => void;
  onOpenAuth: () => void;
}

const BRAND_LOGOS: Record<string, string> = {
  "chevrolet": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo.png/800px-Chevrolet-logo.png",
  "kia": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Kia-logo.png/800px-Kia-logo.png",
  "liauto": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Li_Auto_logo.svg/1024px-Li_Auto_logo.svg.png"
};

const BrandGrid: React.FC<BrandGridProps> = ({ user, onOrder, onOpenAuth }) => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const modelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedBrand && modelsRef.current) {
      setTimeout(() => {
        modelsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [selectedBrand]);

  return (
    <div className="py-10">
      <div className="mb-20">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">Brendlar</h2>
        <p className="text-xl text-gray-500 font-medium">Faqat eng sara avtomobillar uchun.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {Object.keys(CAR_DATA).map((brand) => (
          <div 
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`ios-card bg-white/60 backdrop-blur-xl p-12 squircle border border-white/50 cursor-pointer flex flex-col items-center group ${selectedBrand === brand ? 'ring-4 ring-blue-500/20' : ''}`}
          >
            <div className="h-24 w-full flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110">
              <img src={BRAND_LOGOS[brand]} alt={brand} className="max-h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
            </div>
            <h3 className="text-2xl font-extrabold capitalize mb-8">{brand === 'liauto' ? 'Li Auto' : brand}</h3>
            <button className="px-8 py-3 bg-gray-100/50 text-gray-500 text-[11px] font-bold uppercase tracking-widest rounded-full transition-all group-hover:bg-blue-600 group-hover:text-white">
              Modellarni ko'rish
            </button>
          </div>
        ))}
      </div>

      {selectedBrand && (
        <div ref={modelsRef} className="mt-20 p-12 md:p-20 bg-black squircle text-white animate-spring relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-20">
            <div>
              <span className="text-blue-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-3 block">Premium Tanlov</span>
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight capitalize">{selectedBrand} To'plami</h3>
            </div>
            <button onClick={() => setSelectedBrand(null)} className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center tap-active hover:bg-white/20 transition-all">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(CAR_DATA[selectedBrand]).map(([model, info]) => (
              <div key={model} className="bg-white/5 p-10 squircle border border-white/10 flex flex-col hover:bg-white/10 transition-all ios-card">
                <div className="flex justify-between items-start mb-8">
                  <h4 className="text-2xl font-extrabold tracking-tight">{model}</h4>
                  <span className="bg-blue-500/20 text-blue-400 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">Yangi</span>
                </div>
                
                <p className="text-white/40 text-sm font-medium mb-12 italic">"{info.desc}"</p>
                
                <div className="mt-auto flex flex-col space-y-6 pt-8 border-t border-white/10">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Xizmat narxi</span>
                    <span className="text-2xl font-black text-blue-400">{info.priceOneTime?.toLocaleString()} <span className="text-xs">uzs</span></span>
                  </div>
                  <button 
                    onClick={() => {
                      if(!user) return onOpenAuth();
                      onOrder({ brand: selectedBrand, model, serviceType: 'Premium xizmat' });
                    }}
                    className="w-full py-4 bg-white text-black rounded-[18px] font-bold text-[13px] uppercase tracking-widest tap-active hover:bg-blue-500 hover:text-white"
                  >
                    Xizmatni so'rash
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
