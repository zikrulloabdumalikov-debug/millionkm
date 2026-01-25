import React, { useState } from 'react';

const MobileService = ({ type, user, onOrder, onOpenAuth }) => {
  const [formData, setFormData] = useState({ name: user?.name || '', phone: user?.phone || '', location: '', note: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      onOpenAuth();
      return;
    }
    if (!formData.phone || !formData.location) {
      alert("Iltimos, telefon va manzilni kiriting");
      return;
    }
    onOrder({
      userName: formData.name,
      phone: formData.phone,
      serviceType: type === 'express' ? 'EXPRESS XIZMAT' : 'YOQILG\'I YETKAZISH',
      note: `Manzil: ${formData.location}. Izoh: ${formData.note}`
    });
    setFormData({ ...formData, location: '', note: '' });
  };

  const isExpress = type === 'express';

  return (
    <div className="max-w-6xl mx-auto px-4 pt-40 pb-20">
      <div className={`p-10 md:p-24 rounded-[4rem] text-white shadow-2xl relative overflow-hidden transition-all duration-1000 ${isExpress ? 'bg-slate-900' : 'bg-[#FF3B30]'}`}>
        <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl ${isExpress ? 'bg-blue-600' : 'bg-white text-[#FF3B30]'}`}>
              <i className={`fas ${isExpress ? 'fa-bolt' : 'fa-gas-pump'} text-4xl`}></i>
            </div>
            <h1 className="text-6xl font-black mb-8 leading-tight tracking-tighter">
              Million KM <br /> {isExpress ? 'Express' : 'Fuel'}
            </h1>
            <p className="text-white/60 text-xl mb-12 leading-relaxed font-medium">
              {isExpress 
                ? "Vaqtingizni qadrlaymiz. Mutaxassislarimiz manzilingizga borib, motor moyini professional tarzda almashtirib berishadi."
                : "Yoqilg'ingiz tugab qoldimi? Xavotir olmang, biz eng yuqori sifatli yoqilg'ini 30 daqiqada yetkazamiz."}
            </p>
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-2">
                 <div className="text-3xl font-black">30 DAQ</div>
                 <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Yetkazib berish</div>
               </div>
               <div className="space-y-2">
                 <div className="text-3xl font-black">24/7</div>
                 <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Mavjudlik</div>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl">
             <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-8">
                  <h3 className="text-3xl font-black text-slate-900 mb-2">Buyurtma</h3>
                  <p className="text-slate-400 text-sm font-medium">Barcha maydonlarni to'ldiring</p>
                </div>
                
                <div className="space-y-4">
                  <input 
                    className="w-full h-16 px-8 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-blue-500 text-slate-900 font-bold transition-all outline-none" 
                    placeholder="Ismingiz"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    className="w-full h-16 px-8 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-blue-500 text-slate-900 font-bold transition-all outline-none" 
                    placeholder="Telefon"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                  <input 
                    className="w-full h-16 px-8 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-blue-500 text-slate-900 font-bold transition-all outline-none" 
                    placeholder="Manzil (lokatsiya)"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                  />
                  <textarea 
                    className="w-full px-8 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-blue-500 text-slate-900 font-bold transition-all min-h-[120px] outline-none" 
                    placeholder="Izoh (Mashina modeli va qo'shimcha ma'lumot)"
                    value={formData.note}
                    onChange={e => setFormData({...formData, note: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className={`w-full py-6 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl active:scale-95 mt-4 ${isExpress ? 'bg-blue-600 hover:bg-slate-900 shadow-blue-100' : 'bg-[#FF3B30] hover:bg-slate-900 shadow-red-100'}`}
                >
                  Buyurtmani tasdiqlash
                </button>
             </form>
          </div>
        </div>

        <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default MobileService;