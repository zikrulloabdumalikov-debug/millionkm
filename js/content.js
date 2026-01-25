// About Us
window.AboutUs = () => {
  return (
    <div className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-[1080px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div>
              <span className="text-[#0071E3] font-bold uppercase tracking-widest text-xs mb-3 block">Bizning Falsafa</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1D1D1F] mb-6 tracking-tight">Sifat — bu tasodif emas.</h2>
              <p className="text-base md:text-lg text-[#86868B] mb-8 leading-relaxed">
                 Million KM bu shunchaki ustaxona emas, bu sizning avtomobilingiz uchun "shifoxona". 
                 Biz kasallikni davolamaymiz, biz uning oldini olamiz. Har bir detalga e'tibor beramiz.
              </p>
              
              <div className="flex gap-4">
                 <div className="flex-1 bg-[#F5F5F7] p-5 rounded-2xl">
                    <div className="text-2xl font-bold text-[#1D1D1F] mb-1">25K+</div>
                    <div className="text-[10px] text-[#86868B] font-bold uppercase tracking-wider">Mijozlar</div>
                 </div>
                 <div className="flex-1 bg-[#F5F5F7] p-5 rounded-2xl">
                    <div className="text-2xl font-bold text-[#1D1D1F] mb-1">100%</div>
                    <div className="text-[10px] text-[#86868B] font-bold uppercase tracking-wider">Kafolat</div>
                 </div>
              </div>
           </div>
           <div className="relative rounded-[32px] overflow-hidden shadow-xl aspect-square">
              <img src="https://images.unsplash.com/photo-1486262715619-01b8c22971f5?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                 <h3 className="text-xl font-bold">Professional Jamoa</h3>
                 <p className="opacity-80 text-sm">Germaniya standartlari asosida</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// 12 Reasons (Optimized Grid)
window.Benefits = () => {
  const benefits = [
    { title: "1M KM Kafolat", desc: "Bozorda yagona yozma kafolat.", icon: "fa-shield-halved" },
    { title: "Bepul Avtomoyka", desc: "Har servisda toza mashina.", icon: "fa-droplet" },
    { title: "Original Mahsulot", desc: "Sertifikatlangan moylar.", icon: "fa-award" },
    { title: "Barchasi bittada", desc: "Diagnostika va servis.", icon: "fa-screwdriver-wrench" },
    { title: "Butun O'zbekiston", desc: "Keng servis tarmog'i.", icon: "fa-map-location-dot" },
    { title: "Tajribali Ustalar", desc: "Malakali muhandislar.", icon: "fa-user-gear" },
    { title: "Yillik Diagnostika", desc: "Bepul to'liq tekshiruv.", icon: "fa-clipboard-check" },
    { title: "Express Xizmat", desc: "Vaqtni tejovchi tezlik.", icon: "fa-bolt" },
    { title: "Online Nazorat", desc: "Shaxsiy kabinet tizimi.", icon: "fa-mobile-screen-button" },
    { title: "Masofaviy Yordam", desc: "24/7 aloqa markazi.", icon: "fa-headset" },
    { title: "Maxsus Sovg'a", desc: "Brend futbolkasi.", icon: "fa-shirt" },
    { title: "Sadoqat Tizimi", desc: "Doimiy bonuslar.", icon: "fa-percent" }
  ];

  return (
    <div className="py-24 bg-[#F5F5F7]">
      <div className="max-w-[1080px] mx-auto px-6">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-bold text-[#1D1D1F] mb-6 tracking-tight">Nega aynan <span className="text-[#0071E3]">Million KM?</span></h2>
           <p className="text-[#86868B] max-w-2xl mx-auto text-lg leading-relaxed">
             Ishonch, kafolat va qulaylik. Bizning 12 ustunligimiz:
           </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
           {benefits.map((b, i) => (
             <div key={i} className="apple-card p-5 bg-white flex flex-col items-center text-center hover:scale-[1.02] transition-transform">
                <div className="w-10 h-10 bg-blue-50 text-[#0071E3] rounded-xl flex items-center justify-center text-lg mb-3">
                   <i className={`fas ${b.icon}`}></i>
                </div>
                <h3 className="text-sm font-bold text-[#1D1D1F] mb-1 leading-tight">{b.title}</h3>
                <p className="text-[#86868B] text-[11px] font-medium leading-tight">{b.desc}</p>
             </div>
           ))}
        </div>
        
        <div className="mt-16 text-center">
           <div className="inline-block p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
              <p className="text-[#1D1D1F] font-medium text-sm italic">"Muammoni kutish — eskicha. Oldini olish — zamonaviy."</p>
           </div>
        </div>
      </div>
    </div>
  );
};

// Locations (Clean Map)
window.NearestLocations = () => {
  return (
    <div id="locations" className="py-24 bg-white">
      <div className="max-w-[1080px] mx-auto px-6">
         <div className="grid md:grid-cols-3 gap-8 items-center mb-12">
            <div className="md:col-span-2">
               <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-3">Bizning Manzil</h2>
               <p className="text-[#86868B]">Markaziy filial va ofis.</p>
            </div>
            <div className="text-right">
               <a href="tel:+998770200107" className="apple-btn-blue inline-flex items-center gap-2">
                 <i className="fas fa-phone-alt"></i> Qo'ng'iroq qilish
               </a>
            </div>
         </div>

         <div className="apple-card overflow-hidden h-[350px] relative shadow-lg border-0">
            <iframe 
              src="https://yandex.uz/map-widget/v1/?ll=70.893061,40.546387&z=16&l=map&pt=70.893061,40.546387,pm2rdm" 
              width="100%" 
              height="100%" 
              frameBorder="0"
              className="w-full h-full"
            ></iframe>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg max-w-xs">
               <div className="font-bold text-[#1D1D1F] text-sm mb-1">Farg'ona viloyati</div>
               <div className="text-xs text-[#86868B]">Dang'ara tumani, Sayxunobod 65-uy</div>
            </div>
         </div>
      </div>
    </div>
  );
};
