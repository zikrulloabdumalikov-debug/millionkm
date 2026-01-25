// About Us
window.AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-20">
        <span className="text-brand-blue font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Bizning Falsafa</span>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Sifat — bu tasodif emas.</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">Million KM bu shunchaki ustaxona emas, bu sizning avtomobilingiz uchun "shifoxona". Biz kasallikni davolamaymiz, biz uning oldini olamiz.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="glass-card p-10 rounded-[2rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/20 blur-[50px] rounded-full group-hover:bg-brand-blue/30 transition-all"></div>
          <i className="fas fa-microchip text-4xl text-brand-blue mb-6"></i>
          <h3 className="text-2xl font-bold text-white mb-4">Raqamli Diagnostika</h3>
          <p className="text-gray-400">Har bir xizmatdan oldin kompyuter diagnostikasi. Biz hech narsani taxmin qilmaymiz, faqat aniq faktlar.</p>
        </div>
        <div className="glass-card p-10 rounded-[2rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[50px] rounded-full group-hover:bg-purple-500/30 transition-all"></div>
          <i className="fas fa-certificate text-4xl text-purple-500 mb-6"></i>
          <h3 className="text-2xl font-bold text-white mb-4">Original Kafolati</h3>
          <p className="text-gray-400">Biz rasmiy dilerlardan to'g'ridan-to'g'ri xarid qilamiz. Qalbaki mahsulotlarga o'rin yo'q.</p>
        </div>
      </div>
    </div>
  );
};

// Benefits
window.Benefits = () => {
  const benefitList = [
    { title: "1M KM Kafolat", desc: "Dvigatelning uzoq umr ko'rishiga yozma kafolat.", icon: "fa-shield-halved", color: "text-brand-blue" },
    { title: "Tezkor Servis", desc: "O'rtacha xizmat vaqti — 45 daqiqa.", icon: "fa-stopwatch", color: "text-red-500" },
    { title: "Shaffof Narx", desc: "Yashirin to'lovlar yo'q. Barchasi hisobotda.", icon: "fa-file-invoice-dollar", color: "text-green-500" }
  ];

  return (
    <div className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-12 text-center">Nega <span className="text-brand-blue">Million KM?</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefitList.map((b, idx) => (
            <div key={idx} className="glass-card p-8 rounded-[24px] hover:bg-white/5 transition-all">
              <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl mb-6 ${b.color}`}>
                <i className={`fas ${b.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{b.title}</h3>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Locations
window.NearestLocations = () => {
  return (
    <div id="locations" className="max-w-7xl mx-auto px-6 py-24">
      <div className="glass-card p-2 rounded-[32px] border border-white/10">
        <div className="bg-[#121212] rounded-[30px] overflow-hidden relative h-[400px]">
          <div className="absolute top-6 left-6 z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 max-w-xs">
            <h4 className="text-white font-bold text-lg mb-1">Bosh Filial</h4>
            <p className="text-gray-400 text-sm mb-4">Farg'ona vil, Dang'ara tumani, Sayxunobod 65.</p>
            <a href="tel:+998770200107" className="block w-full py-3 bg-brand-blue text-white text-center rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors">
              <i className="fas fa-phone mr-2"></i> Qo'ng'iroq qilish
            </a>
          </div>
          <iframe 
            src="https://yandex.uz/map-widget/v1/?ll=70.893061,40.546387&z=16&l=map&pt=70.893061,40.546387,pm2rdm" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            className="opacity-80 grayscale hover:grayscale-0 transition-all duration-700"
          ></iframe>
        </div>
      </div>
    </div>
  );
};