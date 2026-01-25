
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 animate-fade-up">
      <div className="text-center mb-24 md:mb-32">
        <span className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] mb-6 block">Kompaniya haqida</span>
        <h1 className="text-4xl md:text-7xl font-extrabold text-[#1D1D1F] tracking-tight mb-8">Million KM — <br />Dvigatelingiz hayoti.</h1>
        <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium">
          Biz faqat moy almashtirmaymiz. Biz har bir mijozimizga ishonchli va xavfsiz haydash tajribasini yetkazamiz.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-32">
        <div className="bg-gray-50 p-12 rounded-[3rem] border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl mb-10 shadow-lg shadow-blue-100">
              <i className="fas fa-microchip"></i>
            </div>
            <h3 className="text-3xl font-extrabold mb-6 tracking-tight">Texnologik Yondashuv</h3>
            <p className="text-gray-500 leading-relaxed font-medium text-lg">
              Raqamli monitoring va AI yordamida har bir xizmatni soniya aniqligida nazorat qilamiz. Sizning ma'lumotlaringiz doimo saqlanadi.
            </p>
          </div>
        </div>
        <div className="bg-gray-50 p-12 rounded-[3rem] border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center text-xl mb-10 shadow-lg shadow-gray-200">
              <i className="fas fa-gem"></i>
            </div>
            <h3 className="text-3xl font-extrabold mb-6 tracking-tight">Premium Standartlar</h3>
            <p className="text-gray-500 leading-relaxed font-medium text-lg">
              Faqat original moylar va filtrlar. Million KM Oil — bu sizning mashinangiz uchun xalqaro darajadagi servis sifati.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-black rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden group">
        <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">O'zbekiston bo'ylab 100+ jamoa.</h2>
            <p className="text-white/50 text-xl leading-relaxed mb-12 font-medium">
              Bizning muhandislar har yili Germaniya va Koreya standartlari asosida malaka oshirishadi. Biz faqat eng yaxshilarini tanlaymiz.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="flex -space-x-4">
                   {[1,2,3,4].map(i => <div key={i} className="w-14 h-14 rounded-full border-4 border-black bg-gray-800 flex items-center justify-center text-xs font-bold text-white/50">M{i}</div>)}
                </div>
                <div className="text-sm font-bold tracking-widest text-blue-400 uppercase">Bizga qo'shiling</div>
              </div>
              
              <div className="flex items-center space-x-4">
                 <a href="#" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                    <i className="fab fa-instagram text-2xl"></i>
                 </a>
                 <a href="#" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                    <i className="fab fa-telegram-plane text-2xl"></i>
                 </a>
                 <a href="#" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                    <i className="fab fa-youtube text-2xl"></i>
                 </a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
             <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-colors">
               <div className="text-5xl font-extrabold mb-2 text-blue-400 tracking-tighter">25k+</div>
               <div className="text-white/30 text-xs font-black uppercase tracking-[0.2em]">Baxtli mijozlar</div>
             </div>
             <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-colors">
               <div className="text-5xl font-extrabold mb-2 text-white tracking-tighter">10+</div>
               <div className="text-white/30 text-xs font-black uppercase tracking-[0.2em]">Viloyatlarda mavjud</div>
             </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/10 blur-[120px] rounded-full group-hover:bg-blue-600/20 transition-all duration-1000"></div>
      </div>
    </div>
  );
};

export default AboutUs;
