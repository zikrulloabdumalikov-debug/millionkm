// About Us
window.AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 animate-fade-up">
      <div className="text-center mb-24 md:mb-32">
        <span className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] mb-6 block">Kompaniya haqida</span>
        <h1 className="text-4xl md:text-7xl font-extrabold text-[#1D1D1F] tracking-tight mb-8">Million KM — <br />Dvigatelingiz hayoti.</h1>
        <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium">
          Biz faqat moy almashtirmaymiz. Biz har bir mijozimizga ishonchli va xavfsiz haydash tajribasini yetkazamiz.
        </p>
      </div>
      {/* ... qisqartirilgan kontent ... */}
      <div className="bg-black rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-8">O'zbekiston bo'ylab 100+ jamoa.</h2>
        <p className="text-white/50 text-xl">Bizning muhandislar har yili malaka oshirishadi.</p>
      </div>
    </div>
  );
};

// Benefits
window.Benefits = () => {
  const benefitList = [
    { title: "1. Million kilometrgacha kafolat", desc: "Avtomobilingizga million kmgacha texnik kafolat.", icon: "fa-shield-heart" },
    { title: "2. Bepul avtomoyka", desc: "Har safar moy almashtirishda.", icon: "fa-droplet" },
    { title: "3. Original mahsulotlar", desc: "Faqat sertifikatlangan moylar.", icon: "fa-award" }
  ];

  return (
    <div className="py-24 bg-white rounded-[4rem] border border-slate-50 shadow-sm overflow-hidden">
      <div className="text-center mb-20 px-6">
        <h2 className="text-4xl md:text-6xl font-extrabold text-[#1d1d1f] mb-8">Nega aynan Million km?</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-12">
        {benefitList.map((b, idx) => (
          <div key={idx} className="p-10 bg-slate-50/50 rounded-[2.5rem] hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-slate-100 group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl text-blue-600 mb-8 shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <i className={`fas ${b.icon}`}></i>
            </div>
            <h3 className="text-xl font-bold mb-4">{b.title}</h3>
            <p className="text-gray-500 font-medium text-sm">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Locations
window.NearestLocations = () => {
  return (
    <div id="locations" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1d1d1f] tracking-tight mb-4">Filiallarimiz</h2>
      </div>
      <div className="bg-white rounded-[2.5rem] p-3 border border-slate-100 shadow-2xl overflow-hidden mb-12 relative">
        <div className="aspect-video w-full rounded-[2rem] overflow-hidden">
          <iframe src="https://yandex.uz/map-widget/v1/?ll=70.893061,40.546387&z=15&l=map&pt=70.893061,40.546387,pm2rdm" width="100%" height="100%" frameBorder="0"></iframe>
        </div>
      </div>
    </div>
  );
};