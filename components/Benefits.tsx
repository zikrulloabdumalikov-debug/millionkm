
import React from 'react';

const Benefits: React.FC = () => {
  const benefitList = [
    {
      title: "Million kilometrgacha kafolat — bozorda yagona!",
      desc: "Avtomobilingizga million kmgacha texnik kafolat beramiz.",
      icon: "fa-shield-heart"
    },
    {
      title: "Har safar moy almashtirishda — bepul avtomoyka",
      desc: "Mashinangiz doim silliq va toza bo'ladi.",
      icon: "fa-droplet"
    },
    {
      title: "Faqat eng yuqori sifatdagi mahsulotlar",
      desc: "Faqat original mahsulotlar ishlatiladi.",
      icon: "fa-award"
    }
  ];

  return (
    <div className="py-20 bg-white rounded-[3rem] border border-slate-50">
      <div className="text-center mb-16 px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1d1d1f] mb-6 tracking-tight">
          Nega aynan Million km xizmatini tanlashingiz kerak?
        </h2>
        <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">
          Chunki biz shunchaki avtomobilga xizmat ko'rsatmaymiz — sizga ishonch, kafolat va qulaylik hadya qilamiz.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 px-8">
        {benefitList.map((b, idx) => (
          <div key={idx} className="p-10 bg-slate-50/50 rounded-[2.5rem] hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl text-blue-600 mb-8 shadow-sm group-hover:scale-110 transition-transform">
              <i className={`fas ${b.icon}`}></i>
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#1d1d1f] leading-tight">{b.title}</h3>
            <p className="text-gray-500 font-medium">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
