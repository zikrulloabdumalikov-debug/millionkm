import React from 'react';
import { CONTENT } from '../content.js';

const ServiceInfo = ({ onSelectModel }) => {
  const info = CONTENT.infoModal;

  return (
    <div className="animate-fade-in pb-20">
      <div className="bg-white rounded-[32px] w-full shadow-xl border border-gray-100 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md z-10 px-6 py-8 md:px-10 border-b border-gray-100">
          <h3 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2">{info.title}</h3>
          <p className="text-sm md:text-lg text-slate-500 font-medium">{info.tagline}</p>
        </div>

        <div className="p-6 md:p-10 space-y-10 md:space-y-16">
          
          {/* Intro */}
          <div className="space-y-4">
            <h4 className="text-lg md:text-2xl font-black text-slate-900 uppercase tracking-wide">{info.intro.title}</h4>
            <p className="text-slate-600 leading-relaxed font-medium text-base md:text-lg">{info.intro.text}</p>
          </div>

          {/* Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* One Time */}
            <div className="bg-blue-50/50 rounded-[24px] p-6 md:p-10 border border-blue-100">
              <h4 className="text-lg md:text-xl font-black text-blue-600 uppercase tracking-tight mb-6">{info.comparison.oneTime.title}</h4>
              <ul className="space-y-4 mb-8">
                {info.comparison.oneTime.features.map((f, i) => (
                  <li key={i} className="flex items-start text-sm md:text-base font-bold text-slate-700">
                    <i className="fas fa-check text-blue-500 mt-1 mr-3 shrink-0"></i> {f}
                  </li>
                ))}
              </ul>
              <div className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">{info.comparison.oneTime.price}</div>
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-xs md:text-sm font-black uppercase tracking-wide inline-flex items-center">
                <i className="fas fa-shield-alt mr-2"></i> {info.comparison.oneTime.guarantee}
              </div>
            </div>

            {/* Yearly */}
            <div className="bg-slate-900 text-white rounded-[24px] p-6 md:p-10 relative overflow-hidden shadow-xl shadow-blue-900/20">
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] md:text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">{info.comparison.yearly.badge}</div>
              <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-tight mb-6">{info.comparison.yearly.title}</h4>
              <ul className="space-y-4 mb-8">
                {info.comparison.yearly.features.map((f, i) => (
                  <li key={i} className="flex items-start text-sm md:text-base font-bold text-slate-300">
                    <i className="fas fa-star text-yellow-500 mt-1 mr-3 shrink-0"></i> {f}
                  </li>
                ))}
              </ul>
              <div className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">{info.comparison.yearly.price}</div>
              <div className="bg-green-500 text-white px-4 py-2 rounded-xl text-xs md:text-sm font-black uppercase tracking-wide inline-flex items-center shadow-lg shadow-green-500/30">
                <i className="fas fa-shield-alt mr-2"></i> {info.comparison.yearly.guarantee}
              </div>
            </div>
          </div>

          {/* Steps */}
          <div>
            <h4 className="text-lg md:text-2xl font-black text-slate-900 uppercase tracking-wide mb-8">{info.steps.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {info.steps.items.map((step, idx) => (
                <div key={idx} className="bg-gray-50 rounded-[24px] p-6 md:p-8 border border-gray-100">
                  <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
                    <i className={`fas ${step.icon}`}></i>
                  </div>
                  <h5 className="font-black text-slate-900 mb-3 text-lg">{step.title}</h5>
                  <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h4 className="text-lg md:text-2xl font-black text-slate-900 uppercase tracking-wide mb-8">{info.faq.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12 md:gap-y-10">
              {info.faq.items.map((item, idx) => (
                <div key={idx} className="space-y-3">
                  <h5 className="font-bold text-slate-900 flex items-start text-base md:text-lg">
                    <span className="text-blue-600 mr-3">Q:</span> {item.q}
                  </h5>
                  <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed pl-8">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer CTA */}
        <div className="bg-green-50 border-t border-green-100 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-green-800 font-bold text-sm md:text-lg text-center md:text-left">{info.cta.text}</p>
          <button 
            onClick={onSelectModel}
            className="w-full md:w-auto px-10 py-5 bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm shadow-xl shadow-green-600/20 hover:bg-green-700 transition-all active:scale-95"
          >
            {info.cta.button}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ServiceInfo;
