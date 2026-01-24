
import React from 'react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden hero-gradient">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50/50 border border-blue-100/30 mb-10 animate-fade-up">
            <span className="text-[10px] font-extrabold text-blue-600 tracking-[0.2em] uppercase">Premium Automotive Intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-[92px] font-extrabold tracking-tight text-[#1d1d1f] mb-8 leading-[1.0] animate-fade-up">
            Million KM
          </h1>
          
          <div className="text-xl md:text-3xl font-medium text-gray-500 max-w-3xl mx-auto mb-14 leading-relaxed animate-fade-up delay-100">
            Ko'pchilik dvigatelni ta'mirlaydi. <br />
            <span className="text-[#1d1d1f] font-bold">Biz esa uni saqlab qolamiz.</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-5 animate-fade-up delay-200">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-12 py-5 bg-black text-white rounded-full font-bold text-lg hover:opacity-90 transition-all active:scale-95 shadow-2xl shadow-gray-200"
            >
              Hozir boshlash
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('status');
                if (el) {
                  window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto px-12 py-5 bg-white text-black rounded-full font-bold text-lg border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center"
            >
              Statusni tekshirish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
