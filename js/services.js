// Quick Services
window.QuickServices = ({ onSelect }) => {
  return (
    <div className="py-24 bg-[#F5F5F7]">
      <div className="max-w-[1080px] mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-12 tracking-tight text-center">Mobil Xizmatlar</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
           {/* Express Service */}
           <div 
             onClick={() => onSelect('express')}
             className="group relative h-[450px] rounded-[32px] overflow-hidden cursor-pointer shadow-xl transition-all hover:shadow-2xl hover:scale-[1.01] bg-white"
           >
              <img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10 text-white">
                 <div className="w-12 h-12 bg-[#0071E3] rounded-2xl flex items-center justify-center text-xl mb-6 shadow-lg">
                    <i className="fas fa-bolt"></i>
                 </div>
                 <h3 className="text-3xl font-bold mb-3">Express Service</h3>
                 <p className="text-white/80 font-medium mb-8 max-w-xs">Vaqt tig'iz paytida ustani chaqiring. 45 daqiqada yetib boramiz.</p>
                 <span className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm">Buyurtma berish</span>
              </div>
           </div>

           {/* Fuel Service */}
           <div 
             onClick={() => onSelect('fuel')}
             className="group relative h-[450px] rounded-[32px] overflow-hidden cursor-pointer shadow-xl transition-all hover:shadow-2xl hover:scale-[1.01] bg-white"
           >
              <img src="https://images.unsplash.com/photo-1632823471565-1ec2bdc12297?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10 text-white">
                 <div className="w-12 h-12 bg-[#FF3B30] rounded-2xl flex items-center justify-center text-xl mb-6 shadow-lg">
                    <i className="fas fa-gas-pump"></i>
                 </div>
                 <h3 className="text-3xl font-bold mb-3">Yoqilg'i Yetkazish</h3>
                 <p className="text-white/80 font-medium mb-8 max-w-xs">Yo'lda qolib ketmang. Yuqori sifatli benzin yetkazamiz.</p>
                 <span className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm">Chaqirish</span>
              </div>
           </div>
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
    <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center bg-[#F5F5F7]">
      <div className="w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden animate-fade-up border border-gray-100">
        <div className={`p-10 text-center ${isExpress ? 'bg-[#0071E3]' : 'bg-[#FF3B30]'}`}>
           <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl text-white mx-auto mb-4 backdrop-blur-md">
             <i className={`fas ${isExpress ? 'fa-bolt' : 'fa-gas-pump'}`}></i>
           </div>
           <h2 className="text-3xl font-bold text-white tracking-tight">{isExpress ? 'Express Service' : 'Yoqilg\'i yetkazish'}</h2>
           <p className="text-white/80 text-sm mt-2 font-medium">Professional yordam joyiga boradi</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
           <div className="space-y-4">
             <input className="w-full p-4 bg-[#F5F5F7] rounded-xl border border-transparent outline-none focus:bg-white focus:border-[#0071E3] focus:shadow-[0_0_0_4px_rgba(0,113,227,0.1)] transition-all font-medium" placeholder="Ismingiz" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
             <input className="w-full p-4 bg-[#F5F5F7] rounded-xl border border-transparent outline-none focus:bg-white focus:border-[#0071E3] focus:shadow-[0_0_0_4px_rgba(0,113,227,0.1)] transition-all font-medium" placeholder="Telefon (+998)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
             <input className="w-full p-4 bg-[#F5F5F7] rounded-xl border border-transparent outline-none focus:bg-white focus:border-[#0071E3] focus:shadow-[0_0_0_4px_rgba(0,113,227,0.1)] transition-all font-medium" placeholder="Aniq manzil yoki lokatsiya" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
           </div>
           
           <button type="submit" className={`w-full py-4 text-white rounded-xl font-bold text-lg shadow-lg transition-transform active:scale-95 ${isExpress ? 'bg-[#0071E3] shadow-blue-200' : 'bg-[#FF3B30] shadow-red-200'}`}>
             Tasdiqlash
           </button>
           <button type="button" onClick={() => window.location.reload()} className="w-full py-3 text-[#86868b] font-medium text-sm hover:bg-gray-50 rounded-xl transition-colors">Bekor qilish</button>
        </form>
      </div>
    </div>
  );
};