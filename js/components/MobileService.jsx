import React from 'react';

const MobileService = ({ type, user, onOrder, onOpenAuth }) => {
  const [formData, setFormData] = React.useState({ name: user?.name || '', phone: user?.phone || '', location: '', note: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return onOpenAuth();
    onOrder({
      serviceType: type === 'fuel' ? 'YOQILG\'I YETKAZISH' : 'EXPRESS SERVIS',
      userName: formData.name,
      phone: formData.phone,
      note: `Manzil: ${formData.location}. Izoh: ${formData.note}`
    });
  };

  return (
    <div className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative animate-fade-right">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px]"></div>
            <div className="relative z-10 space-y-12">
              <div className="inline-flex items-center space-x-4 bg-blue-50 px-6 py-2.5 rounded-full border border-blue-100">
                <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></span>
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">Tezkor Yordam</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9]">
                Sizga <br /> <span className="text-blue-600">Yordam</span> <br /> Kerakmi?
              </h2>
              <p className="text-lg md:text-2xl text-slate-500 font-medium leading-relaxed max-w-xl">
                {type === 'fuel' 
                  ? "Yo'lda yoqilg'ingiz tugab qoldimi? Biz sizga eng yaqin servisimizdan yoqilg'i yetkazib beramiz." 
                  : "Express servisimiz orqali avtomobilingizni joyida ko'rikdan o'tkazamiz va muammolarni hal qilamiz."}
              </p>
            </div>
          </div>

          <div className="relative group animate-fade-left">
            <div className="absolute inset-0 bg-blue-600 rounded-[3rem] md:rounded-[4rem] rotate-3 group-hover:rotate-6 transition-transform duration-700 opacity-5"></div>
            <div className="relative bg-white p-10 md:p-14 rounded-[3rem] md:rounded-[4rem] border border-slate-100 card-shadow">
               <h3 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 mb-10 uppercase leading-tight">So'rov qoldiring</h3>
               <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ismingiz</label>
                   <input required className="w-full h-14 px-6 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 font-semibold text-slate-900 transition-all outline-none" placeholder="Masalan: Azizbek" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Telefon raqam</label>
                   <input required type="tel" className="w-full h-14 px-6 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 font-semibold text-slate-900 transition-all outline-none" placeholder="+998" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Manzil</label>
                   <input required className="w-full h-14 px-6 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 font-semibold text-slate-900 transition-all outline-none" placeholder="Masalan: Sergeli-6" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Izoh</label>
                   <textarea className="w-full p-6 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 font-semibold text-slate-900 transition-all outline-none min-h-[100px] resize-none" placeholder="Qo'shimcha ma'lumot..." value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} />
                 </div>
                 <button type="submit" className="w-full h-16 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 active:scale-95 transition-all mt-4">
                   YUBORISH
                 </button>
               </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileService;
