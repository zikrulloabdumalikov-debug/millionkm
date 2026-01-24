
import React from 'react';

interface QuickServicesProps {
  onSelect: (type: 'express' | 'fuel') => void;
}

const QuickServices: React.FC<QuickServicesProps> = ({ onSelect }) => {
  return (
    <div className="py-10">
      <div className="mb-20">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-[#1D1D1F]">Talab bo'yicha</h2>
        <p className="text-xl text-gray-500 font-medium">Siz qayerda bo'lsangiz, biz o'sha yerda.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Express Maintenance Card */}
        <div 
          onClick={() => onSelect('express')}
          className="ios-card group relative h-[520px] squircle overflow-hidden cursor-pointer bg-[#1C1C1E] transition-all duration-500"
        >
          {/* Decorative subtle glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative h-full p-12 flex flex-col justify-between z-10 text-white">
            <div className="w-20 h-20 bg-blue-600 rounded-[22px] flex items-center justify-center text-3xl shadow-2xl transition-transform duration-500 group-hover:scale-110">
              <i className="fas fa-bolt"></i>
            </div>
            <div>
              <h3 className="text-5xl font-extrabold mb-4 tracking-tighter leading-none">Express <br/> Xizmat</h3>
              <p className="text-white/60 font-medium text-lg leading-snug mb-8">Sizning manzilingizda professional moy almashtirish. Tez, toza, ishonchli.</p>
              <span className="inline-flex items-center text-blue-400 font-bold uppercase tracking-widest text-xs">
                Hozir so'rash <i className="fas fa-chevron-right ml-3 text-[10px]"></i>
              </span>
            </div>
          </div>
        </div>

        {/* Emergency Fuel Card */}
        <div 
          onClick={() => onSelect('fuel')}
          className="ios-card group relative h-[520px] squircle overflow-hidden cursor-pointer bg-[#FF3B30] transition-all duration-500"
        >
          {/* Decorative subtle glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <div className="relative h-full p-12 flex flex-col justify-between z-10 text-white">
            <div className="w-20 h-20 bg-white text-[#FF3B30] rounded-[22px] flex items-center justify-center text-3xl shadow-2xl transition-transform duration-500 group-hover:scale-110">
              <i className="fas fa-gas-pump"></i>
            </div>
            <div>
              <h3 className="text-5xl font-extrabold mb-4 tracking-tighter leading-none">Shoshilinch <br/> Yoqilg'i</h3>
              <p className="text-white/80 font-medium text-lg leading-snug mb-8">Yoqilg'i tugab qoldimi? Biz 30 daqiqa ichida yuqori sifatli yoqilg'i yetkazamiz.</p>
              <span className="inline-flex items-center text-white font-bold uppercase tracking-widest text-xs">
                Buyurtma berish <i className="fas fa-chevron-right ml-3 text-[10px]"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickServices;
