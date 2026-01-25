// Status Checker
window.StatusChecker = ({ showToast, onRegister, onOneTime }) => {
  const [brand, setBrand] = React.useState('');
  const [model, setModel] = React.useState('');
  const [year, setYear] = React.useState('');
  const [km, setKm] = React.useState('');
  const [result, setResult] = React.useState({ status: null, message: '' });
  const { IOSDropdown, CAR_DATA } = window;

  const handleCheck = () => {
    if (!brand || !model || !year || !km) { showToast("Barcha maydonlarni to'ldiring", "error"); return; }
    const limits = CAR_DATA[brand.toLowerCase()]?.[model];
    
    if (!limits) { setResult({ status: 'error', message: "Bu model bazada topilmadi." }); return; }
    
    const carAge = new Date().getFullYear() - parseInt(year);
    const carKm = parseInt(km.replace(/\D/g, ''));
    
    // Logic: 5 years or 100k km limit example
    if (carAge <= limits.maxAge && carKm <= limits.maxKm) {
      setResult({ status: 'success', message: "Tabriklaymiz! Kafolat dasturiga mos keladi." });
    } else {
      setResult({ status: 'warning', message: "Kafolat muddati tugagan, lekin servis xizmati mavjud." });
    }
  };

  return (
    <div id="status" className="max-w-4xl mx-auto px-6 py-20">
      <div className="glass-panel p-8 md:p-16 rounded-[40px] text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-50"></div>
        
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Status Tekshiruvi</h2>
        <p className="text-gray-400 mb-10 max-w-lg mx-auto">Avtomobilingiz Million KM kafolat dasturiga tushishini tekshiring.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10">
          <IOSDropdown label="Brend" placeholder="Brendni tanlang" options={Object.keys(CAR_DATA)} value={brand} onChange={v => {setBrand(v); setModel('');}} />
          <IOSDropdown label="Model" placeholder="Modelni tanlang" disabled={!brand} options={brand ? Object.keys(CAR_DATA[brand.toLowerCase()]) : []} value={model} onChange={setModel} />
          <div>
             <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Yili</label>
             <input type="number" placeholder="2023" value={year} onChange={e => setYear(e.target.value)} className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-white font-bold outline-none focus:border-brand-blue/50 transition-colors" />
          </div>
          <div>
             <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Probeg (KM)</label>
             <input type="text" placeholder="35 000" value={km} onChange={e => setKm(e.target.value)} className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-white font-bold outline-none focus:border-brand-blue/50 transition-colors" />
          </div>
        </div>

        <button onClick={handleCheck} className="w-full md:w-auto px-12 py-5 bg-white text-black hover:bg-gray-200 rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          Tekshirish
        </button>
        
        {result.status && (
          <div className={`mt-10 p-6 rounded-2xl border flex flex-col items-center animate-slide-up ${result.status === 'success' ? 'bg-green-900/20 border-green-500/30 text-green-400' : 'bg-yellow-900/20 border-yellow-500/30 text-yellow-400'}`}>
            <i className={`fas ${result.status === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'} text-3xl mb-3`}></i>
            <h3 className="text-xl font-bold mb-4">{result.message}</h3>
            <button onClick={result.status === 'success' ? onRegister : () => onOneTime(brand, model)} className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm uppercase tracking-wide transition-all">
              Davom etish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Brand Grid
window.BrandGrid = ({ user, onOrder, onOpenAuth }) => {
  const [selectedBrand, setSelectedBrand] = React.useState(null);
  const [selectedModel, setSelectedModel] = React.useState(null);
  const { CAR_DATA, BRAND_LOGOS } = window;

  const submitOrder = (type) => {
    if (!user) return onOpenAuth();
    const price = CAR_DATA[selectedBrand.toLowerCase()][selectedModel].priceOneTime;
    onOrder({
      brand: selectedBrand,
      model: selectedModel,
      serviceType: type === 'yearly' ? '1 Yillik Premium' : 'Standart Xizmat',
      totalPrice: price,
      note: type
    });
    setSelectedModel(null);
  };

  return (
    <div id="brands" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4">Bizning Profil</h2>
        <p className="text-gray-400">Faqat quyidagi brendlar bo'yicha tor doiradagi mutaxassislik.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.keys(CAR_DATA).map((brand) => (
          <div 
            key={brand} 
            onClick={() => { setSelectedBrand(brand); setSelectedModel(null); }}
            className={`p-10 rounded-[32px] border cursor-pointer flex flex-col items-center transition-all duration-300 group ${selectedBrand === brand ? 'bg-brand-blue border-brand-blue' : 'bg-[#111] border-white/5 hover:border-white/20'}`}
          >
            <div className="h-20 w-full flex items-center justify-center mb-8">
               <img src={BRAND_LOGOS[brand]} alt={brand} className={`max-h-full object-contain transition-all group-hover:scale-110 ${selectedBrand === brand ? 'brightness-200 grayscale' : 'grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100'}`} />
            </div>
            <h3 className={`text-2xl font-black capitalize ${selectedBrand === brand ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>{brand === 'liauto' ? 'Li Auto' : brand}</h3>
          </div>
        ))}
      </div>
      
      {selectedBrand && (
        <div className="mt-12 animate-slide-up">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-white capitalize">{selectedBrand} Modellari</h3>
              <button onClick={() => setSelectedBrand(null)} className="text-gray-500 hover:text-white"><i className="fas fa-times"></i> Yopish</button>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
             {Object.keys(CAR_DATA[selectedBrand]).map(model => (
                <button 
                  key={model} 
                  onClick={() => setSelectedModel(model)} 
                  className={`p-6 rounded-2xl border text-left transition-all ${selectedModel === model ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-gray-400 hover:text-white hover:border-white/30'}`}
                >
                   <div className="text-lg font-bold">{model}</div>
                   <div className="text-xs opacity-60 uppercase tracking-wider mt-1">Premium Class</div>
                </button>
             ))}
           </div>
        </div>
      )}

      {selectedModel && (
         <div className="mt-12 p-8 md:p-12 glass-panel rounded-[32px] border border-brand-blue/30 text-center animate-slide-up relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-blue/5"></div>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-2 relative z-10">{selectedBrand} {selectedModel}</h3>
            <p className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-10 relative z-10">Tanlangan Konfiguratsiya</p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto relative z-10">
               <button onClick={() => submitOrder('one-time')} className="group p-6 rounded-2xl bg-[#000] border border-white/10 hover:border-white/30 transition-all text-left">
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Bazaviy</div>
                  <div className="text-2xl font-black text-white mb-1">1 Martalik</div>
                  <div className="text-gray-400 text-sm">Moy va filtr almashtirish + Diagnostika</div>
               </button>
               <button onClick={() => submitOrder('yearly')} className="group p-6 rounded-2xl bg-brand-blue text-white shadow-lg shadow-brand-blue/20 hover:scale-[1.02] transition-all text-left">
                  <div className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-2">Tavsiya etiladi</div>
                  <div className="text-2xl font-black mb-1">1 Yillik Obuna</div>
                  <div className="text-blue-100 text-sm">4 marta xizmat + 1M KM Kafolat</div>
               </button>
            </div>
         </div>
      )}
    </div>
  );
};