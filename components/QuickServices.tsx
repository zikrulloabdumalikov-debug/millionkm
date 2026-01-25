
import React from 'react';

interface QuickServicesProps {
  onSelect: (type: 'express' | 'fuel') => void;
}

const QuickServices: React.FC<QuickServicesProps> = ({ onSelect }) => {
  return (
    <div className="py-10">
      <div className="mb-20">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">Talab bo'yicha</h2>
        <p className="text-xl text-gray-500 font-medium">Siz qayerda bo'lsangiz, biz o'sha yerda.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div 
          onClick={() => onSelect('express')}
          className="ios-card group relative h-[520px] squircle overflow-hidden cursor-pointer bg-black"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599256621730-535171e28e50?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:opacity-40 transition-opacity duration-1000"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          
          <div className="relative h-full p-12 flex flex-col justify-between z-10 text-white">
            <div className="w-20 h-20 bg-blue-600 rounded-[22px] flex items-center justify-center text-3xl shadow-2xl transition-transform group-hover:scale-110">
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

        <div 
          onClick={() => onSelect('fuel')}
          className="ios-card group relative h-[520px] squircle overflow-hidden cursor-pointer bg-[#FF3B30]"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-20 transition-opacity duration-1000"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-red-950/60 via-transparent to-transparent"></div>
          
          <div className="relative h-full p-12 flex flex-col justify-between z-10 text-white">
            <div className="w-20 h-20 bg-white text-red-600 rounded-[22px] flex items-center justify-center text-3xl shadow-2xl transition-transform group-hover:scale-110">
              <i className="fas fa-gas-pump"></i>
            </div>
            <div>
              <h3 className="text-5xl font-extrabold mb-4 tracking-tighter leading-none">Shoshilinch <br/> Yoqilg'i</h3>
              <p className="text-white/60 font-medium text-lg leading-snug mb-8">Yoqilg'i tugab qoldimi? Biz 30 daqiqa ichida yuqori sifatli yoqilg'i yetkazamiz.</p>
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
