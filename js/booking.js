// Status Checker (Clean)
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
      setResult({ status: 'success', message: "Kafolat dasturiga mos keladi" });
    } else {
      setResult({ status: 'warning', message: "Kafolat muddati tugagan" });
    }
  };

  return (
    <div id="status" className="py-24 bg-[#F5F5F7]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[32px] p-8 md:p-16 shadow-xl text-center">
           <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-4">Statusni tekshirish</h2>
           <p className="text-[#86868b] mb-10">Avtomobilingiz kafolatga tushishini bilib oling.</p>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10">
              <IOSDropdown label="Brend" placeholder="Tanlang" options={Object.keys(CAR_DATA)} value={brand} onChange={v => {setBrand(v); setModel('');}} />
              <IOSDropdown label="Model" placeholder="Tanlang" disabled={!brand} options={brand ? Object.keys(CAR_DATA[brand.toLowerCase()]) : []} value={model} onChange={setModel} />
              <div>
                 <label className="text-[12px] font-semibold text-[#86868b] mb-2 block ml-1">Yili</label>
                 <input type="number" placeholder="2023" value={year} onChange={e => setYear(e.target.value)} className="w-full h-14 px-4 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20 transition-all font-medium text-[#1d1d1f]" />
              </div>
              <div>
                 <label className="text-[12px] font-semibold text-[#86868b] mb-2 block ml-1">Probeg</label>
                 <input type="text" placeholder="35 000" value={km} onChange={e => setKm(e.target.value)} className="w-full h-14 px-4 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20 transition-all font-medium text-[#1d1d1f]" />
              </div>
           </div>

           <button onClick={handleCheck} className="apple-btn px-12 py-4 text-lg w-full md:w-auto shadow-lg shadow-blue-500/20">Tekshirish</button>

           {result.status && (
             <div className={`mt-8 p-6 rounded-2xl flex flex-col items-center animate-fade-up ${result.status === 'success' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                <h3 className="font-bold text-lg mb-4">{result.message}</h3>
                <button onClick={result.status === 'success' ? onRegister : () => onOneTime(brand, model)} className="bg-white border border-current px-6 py-2 rounded-full font-bold text-sm">
                   Davom etish
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

// Brand Grid (Apple App Store Style)
window.BrandGrid = ({ user, onOrder, onOpenAuth }) => {
  const [selectedBrand, setSelectedBrand] = React.useState(null);
  const [selectedModel, setSelectedModel] = React.useState(null);
  const { CAR_DATA, BRAND_LOGOS } = window;

  const submitOrder = (type) => {
    if (!user) return onOpenAuth();
    const price = CAR_DATA[selectedBrand.toLowerCase()][selectedModel].priceOneTime;
    onOrder({ brand: selectedBrand, model: selectedModel, serviceType: type === 'yearly' ? '1 Yillik' : '1 Martalik', totalPrice: price });
    setSelectedModel(null);
  };

  return (
    <div id="brands" className="py-24 bg-white">
      <div className="max-w-[1080px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-12 text-center">Brendlar</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {Object.keys(CAR_DATA).map(brand => (
             <div 
               key={brand}
               onClick={() => { setSelectedBrand(brand); setSelectedModel(null); }}
               className={`p-8 rounded-[24px] border cursor-pointer flex flex-col items-center transition-all duration-300 hover:shadow-xl ${selectedBrand === brand ? 'border-[#0071E3] ring-2 ring-[#0071E3]/20 bg-blue-50/50' : 'border-gray-100 bg-white'}`}
             >
                <img src={BRAND_LOGOS[brand]} className="h-16 object-contain mb-6 grayscale hover:grayscale-0 transition-all" />
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
                      className={`p-4 rounded-xl font-semibold text-sm transition-all border ${selectedModel === model ? 'bg-[#0071E3] text-white border-[#0071E3]' : 'bg-gray-50 text-[#1d1d1f] border-transparent hover:bg-gray-100'}`}
                    >
                       {model}
                    </button>
                 ))}
              </div>
           </div>
        )}

        {selectedModel && (
           <div className="mt-12 p-8 bg-[#F5F5F7] rounded-[24px] text-center animate-fade-up">
              <h3 className="text-3xl font-bold text-[#1d1d1f] mb-2">{selectedBrand} {selectedModel}</h3>
              <p className="text-[#86868b] mb-8">Kerakli xizmat turini tanlang</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <button onClick={() => submitOrder('one-time')} className="bg-white text-[#1d1d1f] px-8 py-4 rounded-xl font-bold shadow-sm hover:shadow-md transition-all">1 Martalik Xizmat</button>
                 <button onClick={() => submitOrder('yearly')} className="bg-[#0071E3] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-[#0077ED] transition-all">1 Yillik Obuna</button>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};