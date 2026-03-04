import React from 'react';
import { CONTENT } from '../content.js';

const NearestLocations = () => {
  const loc = CONTENT.locations;

  return (
    <div className="py-16 md:py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-12 md:mb-20 animate-fade-down">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-4 bg-blue-50 px-6 py-2.5 rounded-full border border-blue-100">
              <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">{loc.title}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 leading-[1.1]">
              Sizga <br /> <span className="text-blue-600">Yaqinmiz.</span>
            </h2>
          </div>
          <p className="text-base md:text-lg text-slate-500 font-medium max-w-md leading-relaxed">
            {loc.subtitle}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-5xl group p-6 md:p-10 bg-white rounded-[3rem] border border-slate-100 card-shadow hover:translate-y-[-5px] transition-all duration-500 animate-fade-up">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[24px] flex items-center justify-center text-3xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-lg shadow-blue-500/10">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="px-5 py-2 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                    Ochiq
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 mb-4 uppercase leading-tight">{loc.map_region}</h3>
                  <p className="text-slate-500 font-medium text-sm md:text-lg leading-relaxed mb-4">{loc.map_address}</p>
                  <p className="text-slate-500 font-medium text-sm md:text-lg leading-relaxed"><i className="far fa-clock mr-2"></i> 08:00 — 22:00</p>
                </div>
                <div className="pt-8 border-t border-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <span className="text-xl md:text-2xl font-black text-slate-900">{loc.phone_display}</span>
                  <a href={`tel:${loc.phone}`} className="w-full sm:w-auto px-8 py-4 bg-slate-50 text-slate-900 font-bold rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all uppercase tracking-widest text-xs">
                    <i className="fas fa-phone-alt mr-3"></i> {loc.cta}
                  </a>
                </div>
              </div>

              <div className="h-[350px] md:h-full min-h-[350px] rounded-[2rem] overflow-hidden relative">
                <iframe 
                  src={loc.map_src} 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  allowFullScreen={true}
                  className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LocationsPreview = ({ onViewAll }) => {
  const loc = CONTENT.locations;
  return (
    <div className="py-16 md:py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-8 md:mb-12 animate-fade-down">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-4 bg-blue-50 px-6 py-2.5 rounded-full border border-blue-100">
              <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">{loc.title}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 leading-[1.1]">
              Sizga <br /> <span className="text-blue-600">Yaqinmiz.</span>
            </h2>
          </div>
          <p className="text-base md:text-lg text-slate-500 font-medium max-w-md leading-relaxed">
            {loc.subtitle}
          </p>
        </div>

        <div className="flex justify-center">
          <div onClick={onViewAll} className="w-full max-w-5xl group p-6 md:p-10 bg-white rounded-[3rem] border border-slate-100 card-shadow hover:translate-y-[-5px] transition-all duration-500 animate-fade-up cursor-pointer">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[24px] flex items-center justify-center text-3xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-lg shadow-blue-500/10">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="px-5 py-2 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                    Ochiq
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 mb-4 uppercase leading-tight">{loc.map_region}</h3>
                  <p className="text-slate-500 font-medium text-sm md:text-lg leading-relaxed mb-4">{loc.map_address}</p>
                </div>
                <div className="pt-8 border-t border-slate-50 flex items-center text-blue-600 font-bold text-[11px] md:text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  Filiallarni ko'rish <i className="fas fa-arrow-right ml-3"></i>
                </div>
              </div>
              <div className="h-[250px] md:h-[300px] rounded-[2rem] overflow-hidden relative bg-slate-100">
                 <iframe 
                   src={loc.map_src} 
                   width="100%" 
                   height="100%" 
                   frameBorder="0" 
                   allowFullScreen={true}
                   className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700 pointer-events-none"
                 ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { NearestLocations, LocationsPreview };
export default NearestLocations;
