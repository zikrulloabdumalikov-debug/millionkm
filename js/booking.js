// Status Checker
window.StatusChecker = ({ showToast, onRegister, onOneTime }) => {
  const [brand, setBrand] = React.useState('');
  const [model, setModel] = React.useState('');
  const [year, setYear] = React.useState('');
  const [km, setKm] = React.useState('');
  const [result, setResult] = React.useState({ status: null, message: '' });
  const { IOSDropdown, CAR_DATA } = window;

  const handleCheck = () => {
    if (!brand || !model || !year || !km) { showToast("Ma'lumotlar yetarli emas", "error"); return; }
    const limits = CAR_DATA[brand.toLowerCase()]?.[model];
    if (!limits) { setResult({ status: 'not_eligible', message: "Model topilmadi." }); return; }
    
    const carAge = new Date().getFullYear() - parseInt(year);
    const carKm = parseInt(km.replace(/\D/g, ''));
    
    if (carAge <= limits.maxAge && carKm <= limits.maxKm) {
      setResult({ status: 'eligible', message: "Kafolatga mos keladi!" });
    } else {
      setResult({ status: 'not_eligible', message: "Limitdan oshgan." });
    }
  };

  return (
    <div id="status" className="bg-white p-8 md:p-20 squircle border border-gray-100 shadow-xl text-center mx-4 md:mx-0">
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8">Statusni tekshirish</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <IOSDropdown label="Brend" placeholder="Brendni tanlang" options={Object.keys(CAR_DATA)} value={brand} onChange={v => {setBrand(v); setModel('');}} />
        <IOSDropdown label="Model" placeholder="Modelni tanlang" disabled={!brand} options={brand ? Object.keys(CAR_DATA[brand.toLowerCase()]) : []} value={model} onChange={setModel} />
        <input type="number" placeholder="Yili" value={year} onChange={e => setYear(e.target.value)} className="w-full h-14 px-6 rounded-2xl bg-gray-50 font-bold" />
        <input type="text" placeholder="KM" value={km} onChange={e => setKm(e.target.value)} className="w-full h-14 px-6 rounded-2xl bg-gray-50 font-bold" />
      </div>
      <button onClick={handleCheck} className="mt-10 px-12 py-5 bg-black text-white rounded-[22px] font-bold">Tekshirish</button>
      
      {result.status && (
        <div className={`mt-10 p-8 squircle border ${result.status === 'eligible' ? 'bg-blue-50 border-blue-100' : 'bg-red-50 border-red-100'}`}>
          <h3 className="text-2xl font-black mb-4">{result.message}</h3>
          <button onClick={result.status === 'eligible' ? onRegister : () => onOneTime(brand, model)} className="px-10 py-4 bg-black text-white rounded-full font-bold">Davom etish</button>
        </div>
      )}
    </div>
  );
};

// Brand Grid & Ordering
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
      serviceType: type === 'yearly' ? '1 Yillik Tarif' : '1 Martalik Xizmat',
      totalPrice: price,
      note: type
    });
    setSelectedModel(null);
  };

  return (
    <div className="py-10 px-4">
      <h2 className="text-4xl md:text-6xl font-extrabold mb-10 text-[#1D1D1F]">Brendlar</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.keys(CAR_DATA).map((brand) => (
          <div key={brand} onClick={() => { setSelectedBrand(brand); setSelectedModel(null); }} className={`p-8 squircle border cursor-pointer flex flex-col items-center bg-white ${selectedBrand === brand ? 'ring-4 ring-blue-500' : ''}`}>
            <img src={BRAND_LOGOS[brand]} alt={brand} className="h-20 object-contain mb-6" />
            <h3 className="text-2xl font-black capitalize">{brand}</h3>
          </div>
        ))}
      </div>
      
      {selectedBrand && (
        <div className="mt-12 p-10 bg-black rounded-[2.5rem] text-white">
           <h3 className="text-4xl font-black mb-8 capitalize">{selectedBrand} Modellari</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {Object.keys(CAR_DATA[selectedBrand]).map(model => (
                <div key={model} onClick={() => setSelectedModel(model)} className={`p-6 rounded-2xl border border-white/20 cursor-pointer ${selectedModel === model ? 'bg-blue-600 border-blue-600' : 'hover:bg-white/10'}`}>
                   <h4 className="text-xl font-bold">{model}</h4>
                </div>
             ))}
           </div>
        </div>
      )}

      {selectedModel && (
         <div className="mt-12 p-10 bg-white rounded-[2.5rem] border shadow-xl text-center">
            <h3 className="text-4xl font-black mb-8">{selectedBrand} {selectedModel}</h3>
            <div className="flex justify-center gap-6">
               <button onClick={() => submitOrder('one-time')} className="px-10 py-5 bg-gray-100 rounded-2xl font-bold hover:bg-gray-200">1 Martalik</button>
               <button onClick={() => submitOrder('yearly')} className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700">Yillik Tarif</button>
            </div>
         </div>
      )}
    </div>
  );
};