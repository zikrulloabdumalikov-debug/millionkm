// Quick Services
window.QuickServices = ({ onSelect }) => {
  return (
    <div className="py-24 bg-[#F5F5F7]">
      <div className="max-w-[1080px] mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-[#1D1D1F] mb-12 tracking-tight text-center">Mobil Xizmatlar</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
           {/* Express Service */}
           <div 
             onClick={() => onSelect('express')}
             className="group relative h-[380px] rounded-[32px] overflow-hidden cursor-pointer shadow-lg transition-all hover:shadow-2xl hover:scale-[1.01] bg-white"
           >
              <img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                 <div className="flex justify-between items-end">
                   <div>
                     <div className="w-10 h-10 bg-[#0071E3] rounded-xl flex items-center justify-center text-lg mb-4 shadow-lg">
                        <i className="fas fa-bolt"></i>
                     </div>
                     <h3 className="text-2xl font-bold mb-2">Express Service</h3>
                     <p className="text-white/80 font-medium text-sm max-w-[250px]">45 daqiqada joyiga borib xizmat ko'rsatamiz.</p>
                   </div>
                   <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-bold text-xs hover:bg-white hover:text-black transition-all">
                     Buyurtma <i className="fas fa-arrow-right ml-1"></i>
                   </span>
                 </div>
              </div>
           </div>

           {/* Fuel Service */}
           <div 
             onClick={() => onSelect('fuel')}
             className="group relative h-[380px] rounded-[32px] overflow-hidden cursor-pointer shadow-lg transition-all hover:shadow-2xl hover:scale-[1.01] bg-white"
           >
              <img src="https://images.unsplash.com/photo-1632823471565-1ec2bdc12297?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                 <div className="flex justify-between items-end">
                   <div>
                     <div className="w-10 h-10 bg-[#FF3B30] rounded-xl flex items-center justify-center text-lg mb-4 shadow-lg">
                        <i className="fas fa-gas-pump"></i>
                     </div>
                     <h3 className="text-2xl font-bold mb-2">Yoqilg'i Yetkazish</h3>
                     <p className="text-white/80 font-medium text-sm max-w-[250px]">Yo'lda qolmang. Benzin yetkazib beramiz.</p>
                   </div>
                   <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-bold text-xs hover:bg-white hover:text-black transition-all">
                     Chaqirish <i className="fas fa-arrow-right ml-1"></i>
                   </span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// Mobile Service Form (Polished)
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
    <div className="min-h-screen pt-28 pb-12 px-6 flex items-center justify-center bg-[#F5F5F7]">
      <div className="w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden animate-fade-up border border-gray-100">
        <div className={`p-8 text-center relative overflow-hidden ${isExpress ? 'bg-[#0071E3]' : 'bg-[#FF3B30]'}`}>
           <div className="relative z-10">
             <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-3 backdrop-blur-md">
               <i className={`fas ${isExpress ? 'fa-bolt' : 'fa-gas-pump'}`}></i>
             </div>
             <h2 className="text-2xl font-bold text-white tracking-tight">{isExpress ? 'Express Service' : 'Yoqilg\'i yetkazish'}</h2>
             <p className="text-white/80 text-sm mt-1 font-medium">Professional yordam chaqiruvi</p>
           </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
           <div className="space-y-4">
             <div>
               <label className="text-xs font-bold text-[#86868B] uppercase ml-1 mb-1 block">Ismingiz</label>
               <input className="apple-input bg-[#F5F5F7] border-transparent focus:bg-white" placeholder="Ism" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
             </div>
             <div>
               <label className="text-xs font-bold text-[#86868B] uppercase ml-1 mb-1 block">Telefon</label>
               <input className="apple-input bg-[#F5F5F7] border-transparent focus:bg-white" placeholder="+998" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
             </div>
             <div>
               <label className="text-xs font-bold text-[#86868B] uppercase ml-1 mb-1 block">Manzil</label>
               <input className="apple-input bg-[#F5F5F7] border-transparent focus:bg-white" placeholder="Lokatsiya yoki manzil" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
             </div>
           </div>
           
           <div className="pt-4 flex flex-col gap-3">
             <button type="submit" className={`apple-btn-primary w-full shadow-lg ${isExpress ? 'bg-[#0071E3]' : 'bg-[#FF3B30]'}`}>
               Tasdiqlash
             </button>
             <button type="button" onClick={() => window.location.reload()} className="apple-btn-secondary w-full text-sm">Bekor qilish</button>
           </div>
        </form>
      </div>
    </div>
  );
};