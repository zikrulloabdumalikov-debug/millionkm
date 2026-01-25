// Status Checker (Clean White)
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
    if (!limits) { setResult({ status: 'error', message: "Model topilmadi." }); return; }
    
    const carAge = new Date().getFullYear() - parseInt(year);
    const carKm = parseInt(km.replace(/\D/g, ''));
    
    if (carAge <= limits.maxAge && carKm <= limits.maxKm) {
      setResult({ status: 'success', message: "Tabriklaymiz! Kafolatga mos." });
    } else {
      setResult({ status: 'warning', message: "Kafolat muddati tugagan." });
    }
  };

  return (
    <div id="status" className="py-24 bg-[#F5F5F7]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[32px] p-10 md:p-16 shadow-xl text-center border border-gray-100">
           <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-4 tracking-tight">Statusni tekshirish</h2>
           <p className="text-[#86868b] mb-10 max-w-lg mx-auto">Avtomobilingiz Million KM kafolat dasturiga tushishini bir zumda aniqlang.</p>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10">
              <IOSDropdown label="Brend" placeholder="Tanlang" options={Object.keys(CAR_DATA)} value={brand} onChange={v => {setBrand(v); setModel('');}} />
              <IOSDropdown label="Model" placeholder="Tanlang" disabled={!brand} options={brand ? Object.keys(CAR_DATA[brand.toLowerCase()]) : []} value={model} onChange={setModel} />
              <div>
                 <label className="text-[12px] font-bold text-[#86868b] uppercase tracking-wider mb-2 block ml-1">Yili</label>
                 <input type="number" placeholder="2023" value={year} onChange={e => setYear(e.target.value)} className="w-full h-14 px-5 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all font-semibold text-[#1d1d1f]" />
              </div>
              <div>
                 <label className="text-[12px] font-bold text-[#86868b] uppercase tracking-wider mb-2 block ml-1">Probeg (KM)</label>
                 <input type="text" placeholder="35 000" value={km} onChange={e => setKm(e.target.value)} className="w-full h-14 px-5 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all font-semibold text-[#1d1d1f]" />
              </div>
           </div>

           <button onClick={handleCheck} className="apple-btn blue px-12 py-4 text-lg w-full md:w-auto shadow-lg shadow-blue-500/20">Tekshirish</button>

           {result.status && (
             <div className={`mt-10 p-6 rounded-2xl flex flex-col items-center animate-fade-up border ${result.status === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 text-xl ${result.status === 'success' ? 'bg-green-100' : 'bg-orange-100'}`}>
                  <i className={`fas ${result.status === 'success' ? 'fa-check' : 'fa-exclamation'}`}></i>
                </div>
                <h3 className="font-bold text-lg mb-4">{result.message}</h3>
                <button onClick={result.status === 'success' ? onRegister : () => onOneTime(brand, model)} className="bg-white border border-current px-8 py-2.5 rounded-full font-bold text-sm hover:bg-opacity-50 transition-all">
                   {result.status === 'success' ? 'Kafolatni olish' : 'Xizmatga yozilish'}
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

// Brand Grid (Marketing & Sales Focused)
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
      totalPrice: price,
      note: type === 'yearly' ? 'Mijoz 1 yillik tarifni tanladi (High Priority)' : 'Bir martalik xizmat'
    });
    setSelectedModel(null);
  };

  return (
    <div id="brands" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-[1080px] mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-12 text-center tracking-tight">Brendlar</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {Object.keys(CAR_DATA).map(brand => (
             <div 
               key={brand}
               onClick={() => { setSelectedBrand(brand); setSelectedModel(null); }}
               className={`p-10 rounded-[32px] border cursor-pointer flex flex-col items-center transition-all duration-300 hover:shadow-xl ${selectedBrand === brand ? 'border-[#0071E3] ring-4 ring-[#0071E3]/10 bg-blue-50/30' : 'border-gray-100 bg-white hover:border-gray-200'}`}
             >
                <img src={BRAND_LOGOS[brand]} className={`h-20 object-contain mb-8 transition-all duration-300 ${selectedBrand === brand ? 'scale-110' : 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100'}`} />
                <h3 className="text-xl font-bold capitalize text-[#1d1d1f]">{brand === 'liauto' ? 'Li Auto' : brand}</h3>
             </div>
           ))}
        </div>

        {selectedBrand && (
           <div className="mt-16 animate-fade-up">
              <h3 className="text-2xl font-bold text-[#1d1d1f] mb-6 capitalize">{selectedBrand} Modellari</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {Object.keys(CAR_DATA[selectedBrand]).map(model => (
                    <button 
                      key={model} 
                      onClick={() => setSelectedModel(model)}
                      className={`p-5 rounded-2xl font-bold text-sm transition-all border ${selectedModel === model ? 'bg-[#1d1d1f] text-white border-black shadow-lg' : 'bg-[#F5F5F7] text-[#1d1d1f] border-transparent hover:bg-[#E8E8ED]'}`}
                    >
                       {model}
                    </button>
                 ))}
              </div>
           </div>
        )}

        {selectedModel && (
           <div className="mt-16 animate-scale">
              <div className="text-center mb-10">
                 <h3 className="text-4xl font-bold text-[#1d1d1f] mb-2">{selectedBrand} {selectedModel}</h3>
                 <p className="text-[#86868b]">Eng yaxshi taklifni tanlang</p>
              </div>

              {/* Marketing Pricing Table */}
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                 {/* Standard Option */}
                 <div className="p-8 rounded-[32px] border border-gray-200 bg-white hover:border-gray-300 transition-all flex flex-col">
                    <div className="mb-6">
                       <span className="text-xs font-bold text-[#86868b] uppercase tracking-widest">Bazaviy</span>
                       <h4 className="text-2xl font-bold text-[#1d1d1f] mt-1">1 Martalik</h4>
                       <p className="text-sm text-[#86868b] mt-2">Shunchaki moy almashtirish.</p>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                       <li className="flex items-center gap-3 text-sm font-medium text-[#1d1d1f]"><i className="fas fa-check text-gray-400"></i> Moy almashtirish</li>
                       <li className="flex items-center gap-3 text-sm font-medium text-[#1d1d1f]"><i className="fas fa-check text-gray-400"></i> Filtrlar</li>
                       <li className="flex items-center gap-3 text-sm font-medium text-gray-400"><i className="fas fa-times text-gray-300"></i> 1M KM Kafolat</li>
                       <li className="flex items-center gap-3 text-sm font-medium text-gray-400"><i className="fas fa-times text-gray-300"></i> Bepul diagnostika</li>
                    </ul>
                    <button onClick={() => submitOrder('one-time')} className="w-full py-4 rounded-full border border-gray-200 font-bold text-[#1d1d1f] hover:bg-gray-50 transition-colors">Tanlash</button>
                 </div>

                 {/* Premium Option (Recommended) */}
                 <div className="p-8 rounded-[32px] border-2 border-[#0071E3] bg-[#0071E3]/5 relative flex flex-col shadow-2xl shadow-blue-500/10">
                    <div className="absolute top-0 right-0 bg-[#0071E3] text-white text-[10px] font-bold px-4 py-2 rounded-bl-2xl rounded-tr-[30px] uppercase tracking-widest">Tavsiya etiladi</div>
                    <div className="mb-6">
                       <span className="text-xs font-bold text-[#0071E3] uppercase tracking-widest">Premium</span>
                       <h4 className="text-2xl font-bold text-[#1d1d1f] mt-1">1 Yillik Obuna</h4>
                       <p className="text-sm text-[#86868b] mt-2">To'liq xotirjamlik va kafolat.</p>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                       <li className="flex items-center gap-3 text-sm font-bold text-[#1d1d1f]"><i className="fas fa-check-circle text-[#0071E3]"></i> 4 marta moy almashtirish</li>
                       <li className="flex items-center gap-3 text-sm font-bold text-[#1d1d1f]"><i className="fas fa-check-circle text-[#0071E3]"></i> 1,000,000 KM Kafolat</li>
                       <li className="flex items-center gap-3 text-sm font-bold text-[#1d1d1f]"><i className="fas fa-check-circle text-[#0071E3]"></i> Yillik to'liq diagnostika</li>
                       <li className="flex items-center gap-3 text-sm font-bold text-[#1d1d1f]"><i className="fas fa-check-circle text-[#0071E3]"></i> Bepul avtomoyka</li>
                    </ul>
                    <button onClick={() => submitOrder('yearly')} className="w-full py-4 rounded-full bg-[#0071E3] text-white font-bold shadow-lg shadow-blue-500/30 hover:bg-[#0077ED] transition-all transform hover:scale-[1.02]">
                       Obuna bo'lish
                    </button>
                    <p className="text-center text-xs text-[#86868b] mt-4 font-medium">Eng ko'p tanlanadigan tarif</p>
                 </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};