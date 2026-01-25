
import React from 'react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative pt-44 pb-32 md:pt-60 md:pb-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-white/40 border border-white/50 backdrop-blur-md mb-12 animate-spring">
            <span className="text-[11px] font-bold text-blue-600 tracking-[0.15em] uppercase">2025 Texnologiyasi</span>
          </div>
          
          <h1 className="text-[64px] md:text-[112px] font-[850] tracking-[-0.06em] leading-[0.95] text-[#1D1D1F] mb-10 animate-spring" style={{ animationDelay: '0.1s' }}>
            Million KM
          </h1>
          
          <div className="p-8 md:p-12 mb-16 animate-spring" style={{ animationDelay: '0.2s' }}>
            <p className="text-2xl md:text-4xl font-medium text-[#86868B] max-w-[800px] leading-tight">
              Ko‘pchilik dvigatelni ta’mirlaydi. <br />
              <span className="text-black font-extrabold">Biz esa uni saqlab qolamiz.</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-spring" style={{ animationDelay: '0.3s' }}>
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-16 py-5 bg-black text-white rounded-[22px] font-bold text-lg tap-active shadow-2xl shadow-gray-200 transition-all hover:bg-[#333]"
            >
              Boshlash
            </button>
            <button 
              onClick={() => document.getElementById('status')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              className="w-full sm:w-auto px-16 py-5 bg-white text-black rounded-[22px] font-bold text-lg border border-gray-100 tap-active hover:bg-gray-50 transition-all"
            >
              Statusni tekshirish
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-blue-50/40 to-transparent pointer-events-none -z-10"></div>
    </div>
  );
};

export default Hero;
