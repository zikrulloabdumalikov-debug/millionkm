// Quick Services
window.QuickServices = ({ onSelect }) => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-[1080px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-12">Mobil Xizmatlar</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
           {/* Express Service Card */}
           <div 
             onClick={() => onSelect('express')}
             className="group relative h-[400px] rounded-[30px] overflow-hidden cursor-pointer shadow-lg transition-all hover:shadow-2xl hover:scale-[1.01]"
           >
              <img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-0 left-0 p-10 text-white">
                 <h3 className="text-3xl font-bold mb-2">Express Service</h3>
                 <p className="text-white/80 font-medium mb-6">Uyingizga borib xizmat ko'rsatamiz.</p>
                 <span className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm">Buyurtma berish</span>
              </div>
           </div>

           {/* Fuel Service Card */}
           <div 
             onClick={() => onSelect('fuel')}
             className="group relative h-[400px] rounded-[30px] overflow-hidden cursor-pointer shadow-lg transition-all hover:shadow-2xl hover:scale-[1.01]"
           >
              <img src="https://images.unsplash.com/photo-1632823471565-1ec2bdc12297?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-0 left-0 p-10 text-white">
                 <h3 className="text-3xl font-bold mb-2">Yoqilg'i Yetkazish</h3>
                 <p className="text-white/80 font-medium mb-6">Yo'lda qolib ketmang. 30 daqiqada.</p>
                 <span className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm">Chaqirish</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// Mobile Service Form (Clean Modal Style)
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
      <div className="w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden animate-fade-up">
        <div className={`p-8 text-center ${isExpress ? 'bg-[#0071E3]' : 'bg-[#FF3B30]'}`}>
           <i className={`fas ${isExpress ? 'fa-bolt' : 'fa-gas-pump'} text-4xl text-white mb-4`}></i>
           <h2 className="text-2xl font-bold text-white">{isExpress ? 'Express Service' : 'Yoqilg\'i yetkazish'}</h2>
           <p className="text-white/80 text-sm mt-2">Mutaxassis joyiga chiqadi</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
           <div>
             <label className="text-xs font-bold text-[#86868b] uppercase ml-1 mb-1 block">Ismingiz</label>
             <input className="w-full p-4 bg-[#F5F5F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#0071E3] transition-all font-medium" placeholder="Ism" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
           </div>
           <div>
             <label className="text-xs font-bold text-[#86868b] uppercase ml-1 mb-1 block">Telefon</label>
             <input className="w-full p-4 bg-[#F5F5F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#0071E3] transition-all font-medium" placeholder="+998" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
           </div>
           <div>
             <label className="text-xs font-bold text-[#86868b] uppercase ml-1 mb-1 block">Manzil</label>
             <input className="w-full p-4 bg-[#F5F5F7] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#0071E3] transition-all font-medium" placeholder="Lokatsiya" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
           </div>
           
           <button type="submit" className={`w-full py-4 text-white rounded-xl font-bold shadow-lg transition-transform active:scale-95 ${isExpress ? 'bg-[#0071E3] shadow-blue-200' : 'bg-[#FF3B30] shadow-red-200'}`}>
             Tasdiqlash
           </button>
           <button type="button" onClick={() => window.location.reload()} className="w-full py-4 text-[#86868b] font-medium text-sm">Bekor qilish</button>
        </form>
      </div>
    </div>
  );
};