// Status Checker (Compact & Clean)
window.StatusChecker = ({ showToast, onRegister, onOneTime }) => {
  const [brand, setBrand] = React.useState('');
  const [model, setModel] = React.useState('');
  const [year, setYear] = React.useState('');
  const [km, setKm] = React.useState('');
  const [result, setResult] = React.useState({ status: null, message: '' });
  const { IOSDropdown, CAR_DATA } = window;

  const handleCheck = () => {
    if (!brand || !model || !year || !km) { showToast("Ma'lumotlar to'liq emas", "error"); return; }
    const limits = CAR_DATA[brand.toLowerCase()]?.[model];
    if (!limits) { setResult({ status: 'error', message: "Model topilmadi." }); return; }
    
    const carAge = new Date().getFullYear() - parseInt(year);
    const carKm = parseInt(km.replace(/\D/g, ''));
    
    if (carAge <= limits.maxAge && carKm <= limits.maxKm) {
      setResult({ status: 'success', message: "Kafolat dasturiga mos!" });
    } else {
      setResult({ status: 'warning', message: "Kafolat muddati tugagan." });
    }
  };

  return (
    <div id="status" className="py-24 bg-[#F5F5F7]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-[#E5E5EA] text-center">
           <div className="mb-10">
             <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-3 tracking-tight">Statusni tekshirish</h2>
             <p className="text-[#86868B] font-medium text-sm md:text-base max-w-lg mx-auto">
               Avtomobilingiz Million KM kafolatiga to'g'ri kelishini bir daqiqada aniqlang.
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10 max-w-3xl mx-auto">
              <IOSDropdown label="Brend" placeholder="Tanlang" options={Object.keys(CAR_DATA)} value={brand} onChange={v => {setBrand(v); setModel('');}} />
              <IOSDropdown label="Model" placeholder="Tanlang" disabled={!brand} options={brand ? Object.keys(CAR_DATA[brand.toLowerCase()]) : []} value={model} onChange={setModel} />
              
              <div>
                 <label className="text-[12px] font-semibold text-[#86868B] mb-2 block ml-1">Yili</label>
                 <input type="number" placeholder="2023" value={year} onChange={e => setYear(e.target.value)} className="apple-input h-[52px]" />
              </div>
              <div>
                 <label className="text-[12px] font-semibold text-[#86868B] mb-2 block ml-1">Probeg (KM)</label>
                 <input type="text" placeholder="35 000" value={km} onChange={e => setKm(e.target.value)} className="apple-input h-[52px]" />
              </div>
           </div>

           <button onClick={handleCheck} className="apple-btn-blue w-full md:w-auto px-12 text-lg shadow-lg shadow-blue-500/20">
             Tekshirish
           </button>

           {result.status && (
             <div className={`mt-8 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-up border ${result.status === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-orange-50 text-orange-800 border-orange-200'}`}>
                <div className="flex items-center gap-4 text-left">
                   <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${result.status === 'success' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                     <i className={`fas ${result.status === 'success' ? 'fa-check' : 'fa-info'}`}></i>
                   </div>
                   <div>
                     <h3 className="font-bold text-lg">{result.message}</h3>
                     <p className="text-xs opacity-80">{result.status === 'success' ? 'Hoziroq ro\'yxatdan o\'ting' : 'Baribir sifatli xizmat ko\'rsatamiz'}</p>
                   </div>
                </div>
                <button onClick={result.status === 'success' ? onRegister : () => onOneTime(brand, model)} className="bg-white px-6 py-2.5 rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all whitespace-nowrap text-current">
                   {result.status === 'success' ? 'Kafolatni olish' : 'Xizmatga yozilish'}
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

// Brand Grid (Improved Cards)
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
      serviceType: type === 'yearly' ? '1 Yillik Premium' : '1 Martalik Standart', 
      totalPrice: price
    });
    setSelectedModel(null);
  };

  return (
    <div id="brands" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-[1080px] mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-[#1D1D1F] mb-4 text-center tracking-tight">Brendlar</h2>
        <p className="text-[#86868B] text-center mb-12 max-w-2xl mx-auto">Biz ixtisoslashgan avtomobil markalari.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {Object.keys(CAR_DATA).map(brand => (
             <div 
               key={brand}
               onClick={() => { setSelectedBrand(brand); setSelectedModel(null); }}
               className={`p-8 rounded-[24px] border cursor-pointer flex flex-col items-center justify-center h-[200px] transition-all duration-300 hover:shadow-xl ${selectedBrand === brand ? 'border-[#0071E3] ring-2 ring-[#0071E3]/20 bg-blue-50/20' : 'border-gray-100 bg-white hover:border-gray-200'}`}
             >
                <img src={BRAND_LOGOS[brand]} className={`h-16 object-contain transition-all duration-300 ${selectedBrand === brand ? 'scale-110' : 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100'}`} />
             </div>
           ))}
        </div>

        {selectedBrand && (
           <div className="mt-12 animate-fade-up">
              <h3 className="text-2xl font-bold text-[#1D1D1F] mb-6 capitalize px-2">{selectedBrand} Modellari</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {Object.keys(CAR_DATA[selectedBrand]).map(model => (
                    <button 
                      key={model} 
                      onClick={() => setSelectedModel(model)}
                      className={`p-4 rounded-xl font-semibold text-sm transition-all border ${selectedModel === model ? 'bg-[#1D1D1F] text-white border-black shadow-lg scale-[1.02]' : 'bg-[#F5F5F7] text-[#1D1D1F] border-transparent hover:bg-[#E8E8ED]'}`}
                    >
                       {model}
                    </button>
                 ))}
              </div>
           </div>
        )}

        {selectedModel && (
           <div className="mt-12 animate-fade-up">
              <div className="p-8 md:p-12 bg-[#F5F5F7] rounded-[32px] text-center border border-gray-200">
                 <h3 className="text-3xl font-bold text-[#1D1D1F] mb-2">{selectedBrand} {selectedModel}</h3>
                 <p className="text-[#86868B] mb-8">Ushbu model uchun maxsus takliflarimiz:</p>

                 <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <button onClick={() => submitOrder('one-time')} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all text-left group">
                       <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider block mb-2">Bazaviy</span>
                       <span className="text-xl font-bold text-[#1D1D1F] block mb-1 group-hover:text-[#0071E3] transition-colors">1 Martalik</span>
                       <span className="text-sm text-[#86868B]">Standart moy almashtirish xizmati</span>
                    </button>
                    
                    <button onClick={() => submitOrder('yearly')} className="bg-[#1D1D1F] p-6 rounded-2xl shadow-xl hover:bg-black transition-all text-left group relative overflow-hidden">
                       <div className="absolute top-0 right-0 bg-[#0071E3] text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl uppercase">Tavsiya</div>
                       <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Premium</span>
                       <span className="text-xl font-bold text-white block mb-1">1 Yillik Obuna</span>
                       <span className="text-sm text-gray-400 group-hover:text-white transition-colors">1M KM kafolat + Bepul diagnostika</span>
                    </button>
                 </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};