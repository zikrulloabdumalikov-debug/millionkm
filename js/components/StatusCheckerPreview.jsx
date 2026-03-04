import React from 'react';

const StatusCheckerPreview = ({ onCheck }) => {
  return (
    <div className="py-12 md:py-16 px-6 md:px-12 bg-slate-900 rounded-[32px] md:rounded-[48px] text-white relative overflow-hidden shadow-2xl shadow-blue-500/10 text-center">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        <div className="inline-flex items-center space-x-4 bg-white/10 px-6 py-2.5 rounded-full border border-white/20">
          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-white/80">Holatni Tekshirish</span>
        </div>
        
        <h2 className="text-3xl md:text-6xl font-black tracking-tighter text-white leading-[1.1]">
          Avtomobilingiz <br /> <span className="text-blue-500">Kafolatda</span>mi?
        </h2>
        
        <p className="text-base md:text-xl text-white/70 font-medium max-w-xl mx-auto leading-relaxed">
          Bir necha soniya ichida avtomobilingiz kafolat dasturiga mos kelishini tekshiring va shaxsiy taklif oling.
        </p>

        <button 
          onClick={onCheck}
          className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:scale-105 transition-all active:scale-95"
        >
          Hozir tekshirish
        </button>
      </div>
    </div>
  );
};

export default StatusCheckerPreview;
