import React from 'react';
import { CONTENT } from '../content.js';

const Benefits = ({ onAboutClick }) => {
  const colors = ["blue", "indigo", "emerald", "amber"];

  const benefits = CONTENT.benefits.items.map((item, index) => ({
    id: `b${index}`,
    title: item.title,
    desc: item.desc,
    icon: `fa-solid ${item.icon}`,
    color: colors[index % colors.length]
  }));

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-12 md:mb-20 space-y-6 animate-fade-down">
          <div className="inline-flex items-center space-x-4 bg-gray-50 px-6 py-2.5 rounded-full border border-gray-100">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></span>
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Nega Biz?</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 leading-[1.1]">
            {CONTENT.benefits.title}
          </h2>
          <p className="text-base md:text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            {CONTENT.benefits.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {benefits.map((b, idx) => (
            <div key={b.id} className={`group p-8 md:p-12 bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 card-shadow hover:translate-y-[-10px] transition-all duration-500 animate-fade-up delay-${(idx % 4) * 100}`}>
              <div className={`w-16 h-16 md:w-20 md:h-20 bg-${b.color}-50 text-${b.color}-600 rounded-[20px] md:rounded-[24px] flex items-center justify-center text-2xl md:text-3xl mb-8 md:mb-12 group-hover:bg-${b.color}-600 group-hover:text-white transition-all duration-500 shadow-lg shadow-${b.color}-500/10`}>
                <i className={b.icon}></i>
              </div>
              <h3 className="text-lg md:text-2xl font-black tracking-tight text-slate-900 mb-4 md:mb-6 uppercase leading-tight">{b.title}</h3>
              <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (onAboutClick) onAboutClick();
          }}
          className="mt-12 md:mt-20 bg-black text-white rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden animate-fade-up cursor-pointer group hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-full pointer-events-none">
            <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[60%] bg-blue-500/20 blur-[100px] rounded-full"></div>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1]">{CONTENT.benefits.cta_title}</h3>
            <p className="text-xl md:text-3xl font-medium text-gray-400 italic">
              {CONTENT.benefits.cta_quote}
            </p>
            <div className="pt-8">
              <button className="px-12 py-6 bg-white text-black rounded-full font-black uppercase tracking-[0.2em] text-xs md:text-sm shadow-[0_0_40px_rgba(255,255,255,0.3)] group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-blue-500/50 transition-all">
                {CONTENT.benefits.cta_label}
              </button>
              <div className="text-white/40 text-xs mt-6 uppercase tracking-widest font-bold group-hover:text-white/80 transition-colors">
                Batafsil o'qish uchun bosing <i className="fas fa-arrow-right ml-1 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Benefits;
