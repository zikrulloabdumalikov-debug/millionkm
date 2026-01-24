
import React from 'react';

const Benefits: React.FC = () => {
  const benefitList = [
    {
      title: "1. Million kilometrgacha kafolat — bozorda yagona!",
      desc: "Avtomobilingizga million kmgacha texnik kafolat beramiz. Bu — sifatimizga va jamoamizga bo‘lgan to‘liq ishonchimiz natijasi.",
      icon: "fa-shield-heart"
    },
    {
      title: "2. Har safar moy almashtirishda — bepul avtomoyka",
      desc: "Mashinangiz nafaqat texnik jihatdan, balki tashqi ko‘rinishda ham doim silliq va toza bo‘ladi.",
      icon: "fa-droplet"
    },
    {
      title: "3. Faqat eng yuqori sifatdagi mahsulotlar",
      desc: "Bizda faqat isbotlangan, sertifikatlangan va original mahsulotlar ishlatiladi. Sifat — muqaddas!",
      icon: "fa-award"
    },
    {
      title: "4. Har qanday muammo — bitta joyda hal",
      desc: "Endi turli joylarga yugurish shart emas. Diagnostika, ta’mirlash, xizmat — hammasi bizda.",
      icon: "fa-screwdriver-wrench"
    },
    {
      title: "5. O‘zbekiston bo‘ylab eng tezkor servis tarmog‘i",
      desc: "Qayerda bo‘lishingizdan qat’i nazar, xizmatimiz sizga yaqin va har doim tayyor.",
      icon: "fa-map-location-dot"
    },
    {
      title: "6. Eng tajribali ustalar — Million km jamoasida",
      desc: "Avtomobilingizni oddiy qo‘lga emas, o‘z ishining haqiqiy ustasiga topshiring.",
      icon: "fa-user-gear"
    },
    {
      title: "7. Har yili — bepul to‘liq diagnostika",
      desc: "Yilga bir marta avtomobilingiz sog‘ligini to‘liq tekshirtiring. Oldini olish — muhimroq!",
      icon: "fa-clipboard-check"
    },
    {
      title: "8. Express xizmatlar — vaqt sizniki!",
      desc: "Tez, aniq, professional. Ortiqcha kutish — endi o‘tmishda qoldi.",
      icon: "fa-bolt-lightning"
    },
    {
      title: "9. Avtomobil holatini kuzatish — shaxsiy tizim",
      desc: "Online monitoring orqali mashinangizni masofadan nazorat qilish imkoniyati.",
      icon: "fa-mobile-screen-button"
    },
    {
      title: "10. Masofaviy diagnostika va yordam",
      desc: "Qanday muammo bo‘lishidan qat’i nazar, sizga telefon orqali professional yordam beramiz.",
      icon: "fa-headset"
    },
    {
      title: "11. Har yangi mijozga — original futbolka sovg‘a",
      desc: "Siz faqat xizmat emas, katta bir professionallar jamiyatining bir qismiga aylanasiz.",
      icon: "fa-shirt"
    },
    {
      title: "12. Doimiy mijozlarga — bonuslar va chegirmalar",
      desc: "Aqlli xizmat, doimiy sadoqat tizimi va kutilmagan bonuslar bilan birga.",
      icon: "fa-percent"
    }
  ];

  return (
    <div className="py-24 bg-white rounded-[4rem] border border-slate-50 shadow-sm overflow-hidden">
      <div className="text-center mb-20 px-6">
        <span className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4 block animate-fade-up">Nega biz?</span>
        <h2 className="text-4xl md:text-6xl font-extrabold text-[#1d1d1f] mb-8 tracking-tight animate-fade-up">
          Nega aynan Million km xizmatini tanlashingiz kerak?
        </h2>
        <p className="text-gray-500 font-medium max-w-3xl mx-auto text-xl leading-relaxed animate-fade-up delay-100">
          Chunki biz shunchaki avtomobilga xizmat ko'rsatmaymiz — sizga ishonch, kafolat va qulaylik hadya qilamiz. Quyidagi <span className="text-blue-600 font-bold">12 sababi</span> esa buni isbotlaydi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12">
        {benefitList.map((b, idx) => (
          <div 
            key={idx} 
            className="p-10 bg-slate-50/50 rounded-[2.5rem] hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-slate-100 group flex flex-col h-full animate-in"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl text-blue-600 mb-8 shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <i className={`fas ${b.icon}`}></i>
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#1d1d1f] leading-tight group-hover:text-blue-600 transition-colors">{b.title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed flex-grow text-sm">{b.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-24 text-center px-6">
        <div className="inline-block p-8 bg-black rounded-[2.5rem] text-white max-w-4xl shadow-2xl">
          <p className="text-lg md:text-xl font-medium leading-relaxed italic opacity-90 mb-4">
            "Million km — bu sizning yutug'ingiz! O'z vaqtida xizmat ko'rsatish — buzilishdan qutqaradi. 
            Buzilishning oldini olish — xarajat emas, eng katta tejashdir."
          </p>
          <div className="text-blue-400 font-bold uppercase tracking-widest text-xs">Sizning ertangi kuningizga investitsiya</div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
