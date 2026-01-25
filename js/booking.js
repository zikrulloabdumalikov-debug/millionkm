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
      setResult({ status: 'success', message: "Kafolat dasturiga mos!" });
    } else {
      setResult({ status: 'warning', message: "Kafolat muddati tugagan." });
    }
  };

  return (
    <div id="status" className="py-24 bg-[#F5F5F7]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[40px] p-8 md:p-14 shadow-2xl border border-[#E5E5EA] text-center">
           <div className="mb-10">
             <h2 className="text-3xl md:text-5xl font-extrabold text-[#1D1D1F] mb-3 tracking-tight">Statusni tekshirish</h2>
             <p className="text-[#86868B] font-medium text-sm md:text-base max-w-lg mx-auto">
               Avtomobilingiz Million KM kafolatiga to'g'ri kelishini bir daqiqada aniqlang.
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10 max-w-3xl mx-auto">
              <IOSDropdown label="Brend" placeholder="Tanlang" options={Object.keys(CAR_DATA)} value={brand} onChange={v => {setBrand(v); setModel('');}} />
              <IOSDropdown label="Model" placeholder="Tanlang" disabled={!brand} options={brand ? Object.keys(CAR_DATA[brand.toLowerCase()]) : []} value={model} onChange={setModel} />
              
              <div>
                 <label className="text-[11px] font-bold text-[#86868B] uppercase tracking-widest mb-2 block ml-2">Yili</label>
                 <input type="number" placeholder="2023" value={year} onChange={e => setYear(e.target.value)} className="apple-input h-[56px] rounded-[18px]" />
              </div>
              <div>
                 <label className="text-[11px] font-bold text-[#86868B] uppercase tracking-widest mb-2 block ml-2">Probeg (KM)</label>
                 <input type="text" placeholder="35 000" value={km} onChange={e => setKm(e.target.value)} className="apple-input h-[56px] rounded-[18px]" />
              </div>
           </div>

           <button onClick={handleCheck} className="apple-btn-blue w-full md:w-auto px-16 py-5 text-lg shadow-xl shadow-blue-500/30 rounded-full">
             Tekshirish
           </button>

           {result.status && (
             <div className={`mt-10 p-8 rounded-[30px] flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-up border ${result.status === 'success' ? 'bg-green-50 text-green-900 border-green-200' : 'bg-orange-50 text-orange-900 border-orange-200'}`}>
                <div className="flex items-center gap-5 text-left">
                   <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-sm ${result.status === 'success' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                     <i className={`fas ${result.status === 'success' ? 'fa-check' : 'fa-info'}`}></i>
                   </div>
                   <div>
                     <h3 className="font-extrabold text-xl">{result.message}</h3>
                     <p className="text-sm opacity-80 mt-1">{result.status === 'success' ? 'Hoziroq ro\'yxatdan o\'ting' : 'Baribir sifatli xizmat ko\'rsatamiz'}</p>
                   </div>
                </div>
                <button onClick={result.status === 'success' ? onRegister : () => onOneTime(brand, model)} className="bg-white px-8 py-4 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all whitespace-nowrap text-current">
                   {result.status === 'success' ? 'Kafolatni olish' : 'Xizmatga yozilish'}
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

// Brand Grid (Pricing Logic Updated)
window.BrandGrid = ({ user, onOrder, onOpenAuth }) => {
  const [selectedBrand, setSelectedBrand] = React.useState(null);
  const [selectedModel, setSelectedModel] = React.useState(null);
  const [tariffType, setTariffType] = React.useState(null);
  const [yearlyCount, setYearlyCount] = React.useState(3);
  
  const modelsRef = React.useRef(null);
  const checkoutRef = React.useRef(null);
  const { CAR_DATA, BRAND_LOGOS } = window;

  React.useEffect(() => {
    if (selectedBrand && modelsRef.current) {
      setTimeout(() => modelsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    }
  }, [selectedBrand]);

  React.useEffect(() => {
    if (selectedModel && checkoutRef.current) {
      setTimeout(() => checkoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    }
  }, [selectedModel]);

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setTariffType(null);
    setYearlyCount(3); // Reset to minimum
  };

  const calculateYearlyPrice = (basePrice, count) => {
    return basePrice * count;
  };

  const submitOrder = () => {
    if (!user) return onOpenAuth();
    if (!selectedBrand || !selectedModel || !tariffType) return;

    const basePrice = CAR_DATA[selectedBrand.toLowerCase()][selectedModel].priceOneTime;
    const finalPrice = tariffType === 'one-time' ? basePrice : calculateYearlyPrice(basePrice, yearlyCount);

    onOrder({
      brand: selectedBrand,
      model: selectedModel,
      serviceType: tariffType === 'one-time' ? '1 MARTALIK XIZMAT' : `1 YILLIK TARIF (${yearlyCount} marta)`,
      tariffType,
      servicesCount: tariffType === 'one-time' ? 1 : yearlyCount,
      totalPrice: finalPrice,
      note: `Tanlangan xizmat: ${tariffType === 'one-time' ? 'Bir martalik' : 'Yillik'}. Jami narx: ${finalPrice.toLocaleString()} UZS.`
    });

    setSelectedModel(null);
    setTariffType(null);
  };

  return (
    <div className="py-10">
      <div className="mb-12 md:mb-20 px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-[#1D1D1F]">Markani Tanlang</h2>
        <p className="text-lg md:text-xl text-gray-500 font-medium">Faqat eng sara avtomobillar uchun.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 max-w-[1200px] mx-auto">
        {Object.keys(CAR_DATA).map((brand) => (
          <div 
            key={brand}
            onClick={() => { setSelectedBrand(brand); setSelectedModel(null); }}
            className={`ios-card bg-white p-8 md:p-12 rounded-[40px] border border-gray-100 cursor-pointer flex flex-col items-center group transition-all duration-300 ${selectedBrand === brand ? 'ring-4 ring-blue-500/20 shadow-2xl scale-[1.02]' : 'hover:shadow-xl'}`}
          >
            <div className="h-20 md:h-28 w-full flex items-center justify-center mb-6 md:mb-10 transition-transform duration-500 group-hover:scale-110">
              <img src={BRAND_LOGOS[brand]} alt={brand} className="max-h-full object-contain" />
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold capitalize mb-6 md:mb-8">{brand === 'liauto' ? 'Li Auto' : brand}</h3>
            <button className={`w-full md:w-auto px-8 py-3 text-[10px] md:text-[11px] font-bold uppercase tracking-widest rounded-full transition-all ${selectedBrand === brand ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-600 group-hover:text-white'}`}>
              Modellarni ko'rish
            </button>
          </div>
        ))}
      </div>

      {selectedBrand && (
        <div ref={modelsRef} className="mt-12 md:mt-20 p-8 md:p-20 bg-[#1D1D1F] text-white animate-spring relative overflow-hidden shadow-2xl rounded-[40px] mx-4 md:mx-auto max-w-[1200px]">
          <div className="absolute top-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-12 md:mb-20 relative z-10">
            <div>
              <span className="text-blue-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-3 block">Premium Tanlov</span>
              <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight capitalize">{selectedBrand === 'liauto' ? 'Li Auto' : selectedBrand} Modellari</h3>
            </div>
            <button onClick={() => {setSelectedBrand(null); setSelectedModel(null);}} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center tap-active hover:bg-white/20 transition-all">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
            {Object.entries(CAR_DATA[selectedBrand]).map(([model, info]) => (
              <div 
                key={model} 
                onClick={() => handleModelSelect(model)}
                className={`bg-white/5 p-8 md:p-10 rounded-[32px] border transition-all cursor-pointer flex flex-col hover:bg-white/10 ${selectedModel === model ? 'border-blue-500 bg-white/10 ring-2 ring-blue-500/30' : 'border-white/10'}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-2xl font-extrabold tracking-tight">{model}</h4>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${selectedModel === model ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'}`}>Tanlash</span>
                </div>
                <p className="text-white/40 text-sm font-medium mb-10 italic leading-snug">"{info.desc}"</p>
                <div className="mt-auto space-y-3">
                   {info.reductorPrice && (
                      <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs text-white/60">
                         <span>Reduktor moyi:</span>
                         <span className="font-bold">{info.reductorPrice.toLocaleString()}</span>
                      </div>
                   )}
                   <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                     <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Motor moyi</span>
                     <span className="text-xl font-black text-blue-400">{info.priceOneTime.toLocaleString()} <span className="text-xs">uzs</span></span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedModel && selectedBrand && (
        <div ref={checkoutRef} className="mt-12 md:mt-20 p-8 md:p-20 bg-white border border-gray-100 shadow-2xl animate-spring rounded-[40px] mx-4 md:mx-auto max-w-[1200px]">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block">Kalkulyator</span>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">{selectedBrand} {selectedModel}</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12">
            {/* One Time Choice */}
            <div 
              onClick={() => setTariffType('one-time')}
              className={`p-8 md:p-12 rounded-[32px] border-2 transition-all cursor-pointer flex flex-col justify-between ${tariffType === 'one-time' ? 'border-blue-600 bg-blue-50/30' : 'border-gray-100 bg-gray-50/30 hover:bg-gray-100'}`}
            >
              <div>
                <h4 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tighter">1 MARTALIK</h4>
                <p className="text-sm md:text-base text-gray-500 mb-8 font-medium">Bir martalik premium xizmat.</p>
                <ul className="space-y-4 mb-10">
                   {['Modelga mos moy', 'Original filtrlar', 'Dvigatel nazorati', 'Bepul avtomoyka'].map(i => (
                     <li key={i} className="flex items-center text-xs md:text-sm font-bold text-gray-700">
                       <i className="fas fa-check-circle text-blue-500 mr-3"></i> {i}
                     </li>
                   ))}
                </ul>
              </div>
              <div className="text-3xl font-black text-slate-900">{CAR_DATA[selectedBrand.toLowerCase()][selectedModel].priceOneTime.toLocaleString()} <span className="text-xs text-gray-400">UZS</span></div>
            </div>

            {/* Yearly Choice */}
            <div 
              onClick={() => setTariffType('yearly')}
              className={`p-8 md:p-12 rounded-[32px] border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${tariffType === 'yearly' ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-100 bg-gray-50/30 hover:bg-gray-100'}`}
            >
              <div className="absolute top-6 right-6 bg-white text-blue-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">TAVSIYA</div>
              <div>
                <h4 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tighter">1 YILLIK OBUNA</h4>
                <p className={`text-sm md:text-base mb-8 font-medium ${tariffType === 'yearly' ? 'text-blue-100' : 'text-gray-500'}`}>Sizning maqsadingizga moslashtirilgan.</p>
                <ul className="space-y-4 mb-10">
                   {[
                     'Har safar bepul avtomoyka', 
                     '1 000 000 KM kafolati', 
                     'Doimiy monitoring', 
                     'Telegram yopiq guruh'
                   ].map(i => (
                     <li key={i} className={`flex items-center text-xs md:text-sm font-bold ${tariffType === 'yearly' ? 'text-white' : 'text-gray-800'}`}>
                       <i className={`fas fa-star mr-3 ${tariffType === 'yearly' ? 'text-yellow-400' : 'text-yellow-500'}`}></i> {i}
                     </li>
                   ))}
                </ul>
              </div>
              
              {tariffType === 'yearly' ? (
                 <div className="animate-fade-up">
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-80">Jami hisob</div>
                    <div className="text-3xl font-black">{calculateYearlyPrice(CAR_DATA[selectedBrand.toLowerCase()][selectedModel].priceOneTime, yearlyCount).toLocaleString()} <span className="text-xs opacity-70">UZS</span></div>
                 </div>
              ) : (
                 <div className="text-blue-600 font-bold flex items-center">
                    Konfiguratsiya qilish <i className="fas fa-arrow-right ml-2"></i>
                 </div>
              )}
            </div>
          </div>

          {/* Yearly Selector */}
          {tariffType === 'yearly' && (
            <div className="bg-[#1D1D1F] rounded-[32px] p-8 md:p-12 text-white mb-12 animate-spring relative overflow-hidden">
               <div className="relative z-10">
                  <h4 className="text-2xl font-bold mb-2">Yillik rejangizni tuzing</h4>
                  <p className="text-white/50 text-sm mb-8">Bir yilda necha marta moy almashtirishni rejalashtiryapsiz?</p>
                  
                  <div className="flex flex-wrap gap-3">
                    {[3,4,5,6,7,8,9,10,11,12].map(num => (
                      <button 
                        key={num}
                        onClick={() => setYearlyCount(num)}
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-full font-bold text-sm transition-all active:scale-90 ${yearlyCount === num ? 'bg-blue-600 text-white scale-110 shadow-[0_0_20px_rgba(37,99,235,0.5)]' : 'bg-white/10 text-white/50 hover:bg-white/20'}`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                     <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{selectedModel} uchun {yearlyCount} marta xizmat</span>
                     <span className="text-2xl font-black text-blue-400">{calculateYearlyPrice(CAR_DATA[selectedBrand.toLowerCase()][selectedModel].priceOneTime, yearlyCount).toLocaleString()} <span className="text-xs text-white">UZS</span></span>
                  </div>
               </div>
            </div>
          )}

          <div className="flex justify-center">
            <button 
              onClick={submitOrder}
              disabled={!tariffType}
              className={`w-full md:w-auto px-16 py-6 rounded-full font-black uppercase tracking-[0.2em] text-sm transition-all shadow-2xl active:scale-95 disabled:opacity-30 disabled:scale-100 ${tariffType === 'yearly' ? 'bg-blue-600 text-white shadow-blue-500/40' : 'bg-black text-white shadow-black/30'}`}
            >
              {tariffType === 'yearly' ? 'Obunani Rasmiylashtirish' : 'Band Qilish'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};