import React from 'react';

const NearestLocations = () => {
  return (
    <div id="locations" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1d1d1f] tracking-tight mb-4">Million km filiallari</h2>
        <p className="text-gray-500 font-medium text-lg italic">O'zbekiston bo'ylab premium servis tarmog'i</p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-3 border border-slate-100 shadow-2xl overflow-hidden mb-12 relative group">
        <div className="aspect-video w-full rounded-[2rem] overflow-hidden transition-all duration-700">
          <iframe 
            src="https://yandex.uz/map-widget/v1/?ll=70.893061,40.546387&z=15&l=map&pt=70.893061,40.546387,pm2rdm" 
            width="100%" 
            height="100%" 
            frameBorder="0"
            title="Million KM Locations Map"
            className="rounded-[2rem]"
          ></iframe>
        </div>
        <div className="absolute top-8 right-8 bg-black text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl">
          Jonli Xarita
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Markaziy Filial */}
        <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-gray-100/50 flex flex-col justify-between group hover:border-blue-600 transition-all duration-300">
          <div className="flex items-center space-x-5 mb-6">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div>
              <h4 className="font-black text-xl text-slate-900 tracking-tight">Markaziy Filial</h4>
              <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest">Bosh ofis</p>
            </div>
          </div>
          <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6">
            Farg'ona viloyati, Dang'ara tumani, <br /> 
            Yangizamon MFY, Sayxunobod 1-o'tish yo'li, 65-uy.
          </p>
          <div className="flex items-center text-blue-600 font-bold text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform cursor-pointer">
            Yo'nalish olish <i className="fas fa-arrow-right ml-2 text-[10px]"></i>
          </div>
        </div>

        {/* Coming Soon Card */}
        <div className="p-8 bg-blue-600 rounded-[2.5rem] flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-slate-900 transition-all duration-500 shadow-2xl shadow-blue-200">
          <div className="w-16 h-16 bg-white/20 text-white rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
            <i className="fas fa-plus"></i>
          </div>
          <h4 className="font-black text-2xl text-white tracking-tight mb-2">Qolgan filiallar</h4>
          <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">Tez orada butun Respublika bo'ylab</p>
        </div>

        {/* Contact Card */}
        <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-gray-100/50 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
            <i className="fas fa-phone-volume"></i>
          </div>
          <h4 className="font-black text-xl text-slate-900 tracking-tight mb-2">Markaziy aloqa</h4>
          <p className="text-gray-400 font-bold text-lg">+998 77 020 01 07</p>
          <div className="mt-4 flex space-x-3">
             <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"><i className="fab fa-telegram-plane"></i></div>
             <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all cursor-pointer"><i className="fab fa-instagram"></i></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearestLocations;