// Quick Services
window.QuickServices = ({ onSelect }) => {
  return (
    <div className="py-10 px-4">
      <div className="mb-12 md:mb-20">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-[#1D1D1F]">Talab bo'yicha</h2>
        <p className="text-lg md:text-xl text-gray-500 font-medium">Siz qayerda bo'lsangiz, biz o'sha yerda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        <div onClick={() => onSelect('express')} className="ios-card group relative min-h-[420px] md:h-[520px] squircle overflow-hidden cursor-pointer bg-[#1C1C1E] transition-all duration-500">
            <div className="relative h-full p-10 md:p-12 flex flex-col justify-between z-10 text-white">
               <i className="fas fa-bolt text-4xl mb-4"></i>
               <h3 className="text-4xl font-extrabold">Express <br/> Xizmat</h3>
            </div>
        </div>
        <div onClick={() => onSelect('fuel')} className="ios-card group relative min-h-[420px] md:h-[520px] squircle overflow-hidden cursor-pointer bg-[#FF3B30] transition-all duration-500">
            <div className="relative h-full p-10 md:p-12 flex flex-col justify-between z-10 text-white">
               <i className="fas fa-gas-pump text-4xl mb-4"></i>
               <h3 className="text-4xl font-extrabold">Shoshilinch <br/> Yoqilg'i</h3>
            </div>
        </div>
      </div>
    </div>
  );
};

// Mobile Service Form
window.MobileService = ({ type, user, onOrder, onOpenAuth }) => {
  const [formData, setFormData] = React.useState({ name: user?.name || '', phone: user?.phone || '', location: '', note: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return onOpenAuth();
    if (!formData.phone || !formData.location) { alert("Ma'lumotlarni to'ldiring"); return; }
    
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
      <div className={`p-10 md:p-24 rounded-[4rem] text-white shadow-2xl ${isExpress ? 'bg-slate-900' : 'bg-[#FF3B30]'}`}>
        <h1 className="text-6xl font-black mb-8">Million KM {isExpress ? 'Express' : 'Fuel'}</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] p-10 text-black space-y-4">
           <h3 className="text-3xl font-black">Buyurtma berish</h3>
           <input className="w-full h-16 px-6 bg-gray-50 rounded-2xl" placeholder="Manzil" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
           <input className="w-full h-16 px-6 bg-gray-50 rounded-2xl" placeholder="Telefon" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
           <button type="submit" className="w-full py-6 bg-black text-white rounded-2xl font-bold">Yuborish</button>
        </form>
      </div>
    </div>
  );
};