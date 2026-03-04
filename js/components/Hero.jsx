import React from 'react';
import { CONTENT } from '../content.js';

const Hero = ({ user, onStart, onStatusCheck }) => {
  return (
    <div className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 md:pt-0 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center max-w-[1000px] mx-auto space-y-6 md:space-y-8">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[#1D1D1F] leading-[1.1] animate-fade-up">
          {CONTENT.hero.title_line1} <br />
          <span className="text-blue-600">{CONTENT.hero.title_line2}</span>
        </h1>

        <p className="text-sm sm:text-base md:text-xl text-slate-600 font-medium max-w-[700px] mx-auto leading-relaxed animate-fade-up delay-200 px-4 md:px-0">
          {CONTENT.hero.subtitle}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6 animate-fade-up delay-300">
          <button 
            onClick={onStart}
            className="w-full md:w-auto px-12 py-6 bg-black text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[12px] md:text-sm shadow-2xl shadow-gray-300 hover:scale-105 active:scale-95 transition-all"
          >
            {user ? CONTENT.hero.cta_auth : CONTENT.hero.cta_guest}
          </button>
          <button 
            onClick={onStatusCheck}
            className="w-full md:w-auto px-12 py-6 bg-white text-black rounded-[24px] font-black uppercase tracking-[0.2em] text-[12px] md:text-sm border border-gray-100 hover:bg-gray-50 transition-all flex items-center justify-center"
          >
            <i className="fas fa-play-circle mr-3 text-blue-600"></i> {CONTENT.hero.cta_secondary}
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
        <i className="fas fa-chevron-down text-2xl"></i>
      </div>
    </div>
  );
};

export default Hero;
