import React from 'react';
import { CONTENT } from '../content.js';

const QuickServices = ({ onSelect }) => {
  const services = [
    {
      id: 'express',
      title: CONTENT.services.express.title,
      desc: CONTENT.services.express.desc,
      icon: "fas fa-bolt",
      color: "blue",
      view: "express",
      cta: CONTENT.services.express.cta
    },
    {
      id: 'fuel',
      title: CONTENT.services.fuel.title,
      desc: CONTENT.services.fuel.desc,
      icon: "fas fa-gas-pump",
      color: "indigo",
      view: "fuel",
      cta: CONTENT.services.fuel.cta
    }
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-8 md:mb-20 space-y-6 md:space-y-8 animate-fade-down">
          <div className="inline-flex items-center space-x-4 bg-gray-50 px-6 py-2.5 rounded-full border border-gray-100">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></span>
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Tezkor Xizmatlar</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 leading-[1.1]">
            Tezkor Xizmatlar
          </h2>
          <p className="text-sm md:text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed px-4">
            Bizning tezkor xizmatlarimiz sizning vaqtingizni va asabingizni tejaydi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-14 max-w-4xl mx-auto">
          {services.map((s, idx) => (
            <div key={s.id} onClick={() => onSelect(s.view)} className={`group p-8 md:p-12 bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 card-shadow hover:translate-y-[-10px] transition-all duration-500 animate-fade-up delay-${idx * 100} cursor-pointer`}>
              <div className={`w-16 h-16 md:w-20 md:h-20 bg-${s.color}-50 text-${s.color}-600 rounded-[20px] md:rounded-[24px] flex items-center justify-center text-2xl md:text-3xl mb-8 md:mb-12 group-hover:bg-${s.color}-600 group-hover:text-white transition-all duration-500 shadow-lg shadow-${s.color}-500/10`}>
                <i className={s.icon}></i>
              </div>
              <h3 className="text-lg md:text-2xl font-black tracking-tight text-slate-900 mb-4 md:mb-6 uppercase leading-tight">{s.title}</h3>
              <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed mb-6 md:mb-8">{s.desc}</p>
              <div className="flex items-center text-blue-600 font-bold text-[11px] md:text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                {s.cta} <i className="fas fa-arrow-right ml-3"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickServices;
