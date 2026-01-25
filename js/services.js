// Quick Services
window.QuickServices = ({ onSelect }) => {
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-2">Shoshilinch Yordam</h2>
          <p className="text-gray-400 text-lg">Siz qayerda bo'lsangiz, biz o'sha yerdamiz.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div onClick={() => onSelect('express')} className="group relative h-[300px] rounded-[32px] overflow-hidden cursor-pointer bg-[#111] border border-white/5 hover:border-brand-blue/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-black via-black/80 to-transparent">
               <div className="w-14 h-14 bg-brand-blue rounded-2xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg shadow-brand-blue/30 group-hover:scale-110 transition-transform">
                 <i className="fas fa-bolt"></i>
               </div>
               <h3 className="text-3xl font-bold text-white mb-2">Express Service</h3>
               <p className="text-gray-400 text-sm font-medium">Motor moyini joyida almashtirish xizmati. Usta boradi.</p>
            </div>
            <img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 -z-10" />
        </div>

        <div onClick={() => onSelect('fuel')} className="group relative h-[300px] rounded-[32px] overflow-hidden cursor-pointer bg-[#111] border border-white/5 hover:border-red-500/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-black via-black/80 to-transparent">
               <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg shadow-red-600/30 group-hover:scale-110 transition-transform">
                 <i className="fas fa-gas-pump"></i>
               </div>
               <h3 className="text-3xl font-bold text-white mb-2">Fuel Delivery</h3>
               <p className="text-gray-400 text-sm font-medium">Benzin tugab qoldimi? 30 daqiqada yetkazib beramiz.</p>
            </div>
            <img src="https://images.unsplash.com/photo-1632823471565-1ec2bdc12297?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 -z-10" />
        </div>
      </div>
    </div>
  );
};

// Mobile Service Form
window.MobileService = ({ type, user, onOrder, onOpenAuth }) => {
  const [formData, setFormData] = React.useState({ name: user?.name || '', phone: user?.phone || '', location: '', note: '' });
  const isExpress = type === 'express';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return onOpenAuth();
    if (!formData.phone || !formData.location) { alert("Ma'lumotlarni to'ldiring"); return; }
    onOrder({ ...formData, serviceType: isExpress ? 'Express Service' : 'Fuel Delivery' });
  };

  return (
    <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
      <div className={`w-full max-w-4xl grid md:grid-cols-2 rounded-[40px] overflow-hidden border border-white/10 ${isExpress ? 'bg-[#0a1a2f]' : 'bg-[#2f0a0a]'}`}>
        <div className="p-10 md:p-16 flex flex-col justify-center text-white relative overflow-hidden">
           <div className={`absolute top-0 left-0 w-64 h-64 blur-[100px] rounded-full opacity-50 ${isExpress ? 'bg-blue-600' : 'bg-red-600'}`}></div>
           <i className={`fas ${isExpress ? 'fa-bolt' : 'fa-gas-pump'} text-5xl mb-6 relative z-10`}></i>
           <h1 className="text-4xl md:text-5xl font-black mb-6 relative z-10 uppercase tracking-tighter">{isExpress ? 'Express Servis' : 'Yoqilg\'i yetkazish'}</h1>
           <p className="opacity-70 text-lg relative z-10">Bizning maxsus jihozlangan avtomobilimiz siz turgan manzilga boradi.</p>
        </div>
        <div className="bg-[#121212] p-10 md:p-16">
           <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Ismingiz</label>
                <input className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-white/30 outline-none" placeholder="Ism" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Telefon</label>
                <input className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-white/30 outline-none" placeholder="+998" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Manzil</label>
                <input className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-white/30 outline-none" placeholder="Geolakatsiya yoki manzil" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>
              <button type="submit" className={`w-full py-5 rounded-2xl font-bold text-white uppercase tracking-widest hover:opacity-90 transition-all shadow-lg ${isExpress ? 'bg-brand-blue shadow-brand-blue/20' : 'bg-red-600 shadow-red-600/20'}`}>
                Buyurtma berish
              </button>
           </form>
        </div>
      </div>
    </div>
  );
};