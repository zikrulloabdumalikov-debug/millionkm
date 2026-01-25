
// About Us (Clean Text Only)
window.AboutUs = () => {
  return (
    <div className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-[900px] mx-auto px-6 text-center">
         <span className="text-[#0071E3] font-bold uppercase tracking-widest text-xs mb-4 block">Bizning Falsafa</span>
         <h2 className="text-4xl md:text-6xl font-bold text-[#1D1D1F] mb-8 tracking-tight leading-tight">Sifat — bu tasodif emas.</h2>
         <p className="text-lg md:text-xl text-[#86868B] mb-12 leading-relaxed font-medium">
            Million KM bu shunchaki ustaxona emas, bu sizning avtomobilingiz uchun "shifoxona". 
            Biz kasallikni davolamaymiz, biz uning oldini olamiz. Har bir detalga e'tibor beramiz.
         </p>
         
         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
             <div className="bg-[#F5F5F7] p-6 rounded-[24px]">
                <div className="text-3xl font-bold text-[#1D1D1F] mb-1">25K+</div>
                <div className="text-[10px] text-[#86868B] font-bold uppercase tracking-wider">Mijozlar</div>
             </div>
             <div className="bg-[#F5F5F7] p-6 rounded-[24px]">
                <div className="text-3xl font-bold text-[#1D1D1F] mb-1">100%</div>
                <div className="text-[10px] text-[#86868B] font-bold uppercase tracking-wider">Kafolat</div>
             </div>
             <div className="bg-[#F5F5F7] p-6 rounded-[24px] col-span-2 md:col-span-1">
                <div className="text-3xl font-bold text-[#1D1D1F] mb-1">24/7</div>
                <div className="text-[10px] text-[#86868B] font-bold uppercase tracking-wider">Qo'llab-quvvatlash</div>
             </div>
         </div>
      </div>
    </div>
  );
};

// 12 Reasons (Updated Text)
window.Benefits = () => {
  const benefits = [
    { title: "1. Million KM Kafolat", desc: "Avtomobilingizga million kmgacha texnik kafolat beramiz. Bozorda yagona!", icon: "fa-shield-halved" },
    { title: "2. Bepul Avtomoyka", desc: "Har safar moy almashtirishda mashinangiz toza va silliq bo'ladi.", icon: "fa-droplet" },
    { title: "3. Original Mahsulotlar", desc: "Faqat isbotlangan, sertifikatlangan va original mahsulotlar. Sifat — muqaddas!", icon: "fa-award" },
    { title: "4. Barchasi bittada", desc: "Turli joylarga yugurish shart emas. Diagnostika, ta’mirlash, xizmat — hammasi bizda.", icon: "fa-screwdriver-wrench" },
    { title: "5. Keng Servis Tarmog‘i", desc: "O‘zbekiston bo‘ylab eng tezkor va sifatli servis tarmog‘i. Biz sizga yaqinmiz.", icon: "fa-map-location-dot" },
    { title: "6. Tajribali Ustalar", desc: "Avtomobilingizni oddiy qo‘lga emas, o‘z ishining haqiqiy ustasiga topshiring.", icon: "fa-user-gear" },
    { title: "7. Yillik Diagnostika", desc: "Yilga bir marta bepul to‘liq tekshiruv. Oldini olish — muhimroq!", icon: "fa-clipboard-check" },
    { title: "8. Express Xizmat", desc: "Tez, aniq, professional. Kutish — o‘tmishda qoldi. Vaqt sizniki!", icon: "fa-bolt" },
    { title: "9. Shaxsiy Nazorat", desc: "Online monitoring orqali mashinangiz holatini masofadan kuzatib boring.", icon: "fa-mobile-screen-button" },
    { title: "10. Masofaviy Yordam", desc: "Qanday muammo bo‘lmasin, telefon orqali professional yordam beramiz.", icon: "fa-headset" },
    { title: "11. Original Sovg‘a", desc: "Har yangi mijozga original Million KM futbolkasi sovg‘a qilinadi.", icon: "fa-shirt" },
    { title: "12. Bonus va Chegirmalar", desc: "Doimiy mijozlar uchun aqlli sadoqat tizimi va kutilmagan bonuslar.", icon: "fa-percent" }
  ];

  return (
    <div className="py-24 bg-[#F5F5F7]">
      <div className="max-w-[1080px] mx-auto px-6">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-extrabold text-[#1D1D1F] mb-6 tracking-tight">Nega aynan <span className="text-[#0071E3]">Million KM?</span></h2>
           <p className="text-[#86868B] max-w-2xl mx-auto text-lg leading-relaxed font-medium">
             Chunki biz shunchaki xizmat ko'rsatmaymiz — sizga ishonch va qulaylik hadya qilamiz.
           </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {benefits.map((b, i) => (
             <div key={i} className="apple-card p-8 bg-white flex flex-col items-center text-center hover:scale-[1.02] transition-transform rounded-[32px] shadow-sm hover:shadow-xl border border-transparent hover:border-blue-100 group">
                <div className="w-14 h-14 bg-blue-50 text-[#0071E3] rounded-[20px] flex items-center justify-center text-xl mb-5 group-hover:bg-[#0071E3] group-hover:text-white transition-colors duration-300">
                   <i className={`fas ${b.icon}`}></i>
                </div>
                <h3 className="text-lg font-bold text-[#1D1D1F] mb-3 leading-tight">{b.title}</h3>
                <p className="text-[#86868B] text-sm font-medium leading-relaxed">{b.desc}</p>
             </div>
           ))}
        </div>
        
        <div className="mt-20 text-center">
           <div className="inline-block p-10 bg-black rounded-[32px] shadow-2xl relative overflow-hidden text-white max-w-3xl mx-auto">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Million KM — bu sizning yutug'ingiz!</h3>
                <p className="text-white/70 font-medium text-base italic mb-4">"Buzilishning oldini olish — xarajat emas, eng katta tejashdir."</p>
                <div className="text-blue-400 text-xs font-bold uppercase tracking-widest">Ertangi kunga investitsiya</div>
              </div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/30 blur-[60px] rounded-full pointer-events-none"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

// Locations (Call button made bigger)
window.NearestLocations = () => {
  return (
    <div id="locations" className="py-24 bg-white">
      <div className="max-w-[1080px] mx-auto px-6">
         <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-12">
            <div className="text-center md:text-left">
               <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-3">Bizning Manzil</h2>
               <p className="text-[#86868B]">Markaziy filial va ofis.</p>
            </div>
            <div className="w-full md:w-auto">
               <a href="tel:+998770200107" className="apple-btn-blue w-full md:w-auto px-10 py-5 text-lg rounded-full flex items-center justify-center gap-3 shadow-xl">
                 <i className="fas fa-phone-alt"></i> Hozir Qo'ng'iroq Qilish
               </a>
            </div>
         </div>

         <div className="apple-card overflow-hidden h-[350px] relative shadow-lg border-0 rounded-[32px]">
            <iframe 
              src="https://yandex.uz/map-widget/v1/?ll=70.893061,40.546387&z=16&l=map&pt=70.893061,40.546387,pm2rdm" 
              width="100%" 
              height="100%" 
              frameBorder="0"
              className="w-full h-full"
            ></iframe>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-5 rounded-[20px] shadow-lg max-w-xs">
               <div className="font-bold text-[#1D1D1F] text-sm mb-1">Farg'ona viloyati</div>
               <div className="text-xs text-[#86868B]">Dang'ara tumani, Sayxunobod 65-uy</div>
            </div>
         </div>
      </div>
    </div>
  );
};
