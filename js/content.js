// About Us
window.AboutUs = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-[1080px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
           <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] mb-6 tracking-tight">Bizning standart. <br/>Sizning xotirjamligingiz.</h2>
              <p className="text-lg text-[#86868b] mb-6 leading-relaxed">
                 Million KM bu shunchaki avtoservis emas. Bu sizning avtomobilingizga bo'lgan g'amxo'rlikning eng yuqori darajasi. 
                 Biz har bir detalga e'tibor beramiz, chunki xavfsizlik mayda narsalardan boshlanadi.
              </p>
              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#E8F2FF] flex items-center justify-center text-[#0071E3] font-bold"><i className="fas fa-check"></i></div>
                    <span className="font-semibold text-[#1d1d1f]">100% Original ehtiyot qismlar</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#E8F2FF] flex items-center justify-center text-[#0071E3] font-bold"><i className="fas fa-check"></i></div>
                    <span className="font-semibold text-[#1d1d1f]">Malakali muhandislar jamoasi</span>
                 </div>
              </div>
           </div>
           <div className="relative">
              <div className="apple-card aspect-square bg-[#F5F5F7] flex items-center justify-center">
                 <i className="fas fa-certificate text-8xl text-[#d1d1d6]"></i>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                 <div className="text-4xl font-bold text-[#1d1d1f]">25K+</div>
                 <div className="text-sm text-[#86868b] font-medium">Mamnun mijozlar</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// Benefits (Grid Style)
window.Benefits = () => {
  const benefits = [
    { title: "Kafolat", desc: "1,000,000 km yozma kafolat.", icon: "fa-shield-halved" },
    { title: "Tezkorlik", desc: "O'rtacha xizmat vaqti 45 daqiqa.", icon: "fa-stopwatch" },
    { title: "Shaffoflik", desc: "Barcha jarayon sizning ko'z o'ngingizda.", icon: "fa-eye" }
  ];

  return (
    <div className="py-24 bg-[#F5F5F7]">
      <div className="max-w-[1080px] mx-auto px-6">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-4">Afzalliklar</h2>
           <p className="text-[#86868b] max-w-xl mx-auto">Nega minglab haydovchilar aynan bizni tanlashadi?</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
           {benefits.map((b, i) => (
             <div key={i} className="apple-card p-8 bg-white">
                <div className="w-12 h-12 bg-[#0071E3] text-white rounded-full flex items-center justify-center text-xl mb-6 shadow-lg shadow-blue-500/30">
                   <i className={`fas ${b.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold text-[#1d1d1f] mb-2">{b.title}</h3>
                <p className="text-[#86868b] text-sm leading-relaxed">{b.desc}</p>
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
    <div id="locations" className="py-24 bg-white">
      <div className="max-w-[1080px] mx-auto px-6">
         <div className="apple-card overflow-hidden border border-gray-100 shadow-lg">
            <div className="grid md:grid-cols-3">
               <div className="p-10 md:col-span-1 bg-white relative z-10">
                  <h3 className="text-2xl font-bold text-[#1d1d1f] mb-6">Bizning Manzil</h3>
                  <div className="space-y-6">
                     <div>
                        <div className="text-xs font-bold text-[#86868b] uppercase mb-1">Farg'ona</div>
                        <p className="font-medium text-[#1d1d1f]">Dang'ara tumani,<br/>Sayxunobod 65-uy</p>
                     </div>
                     <div>
                        <div className="text-xs font-bold text-[#86868b] uppercase mb-1">Aloqa</div>
                        <p className="font-medium text-[#1d1d1f]">+998 77 020 01 07</p>
                     </div>
                     <a href="tel:+998770200107" className="apple-btn w-full py-3 block text-center text-sm">
                        Qo'ng'iroq qilish
                     </a>
                  </div>
               </div>
               <div className="md:col-span-2 h-[300px] md:h-auto bg-[#F5F5F7]">
                  <iframe 
                    src="https://yandex.uz/map-widget/v1/?ll=70.893061,40.546387&z=16&l=map&pt=70.893061,40.546387,pm2rdm" 
                    width="100%" 
                    height="100%" 
                    frameBorder="0"
                    className="w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  ></iframe>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};