import React from 'react';

const AboutUs = ({ onCheckStatus }) => {
  return (
    <div className="bg-white">
      {/* BLOK 1 — KIRISH (Hero qismi) */}
      <div className="pt-24 pb-12 px-6 bg-[#F5F5F7] text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-3 bg-white px-5 py-2 rounded-full border border-slate-200 mb-8 shadow-sm">
            <span className="w-2 h-2 bg-slate-900 rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Bizning Falsafa</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.95] mb-12">
            Million KM — <br />
            <span className="text-blue-600">bu sizning yutug'ingiz!</span>
          </h1>

          <div className="bg-black text-white p-8 md:p-16 rounded-[32px] md:rounded-[48px] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full group-hover:bg-blue-600/30 transition-all duration-700"></div>
            <div className="relative z-10">
              <i className="fas fa-quote-left text-4xl md:text-6xl text-white/10 absolute -top-4 -left-4"></i>
              <p className="text-xl md:text-4xl font-black leading-tight tracking-tight italic">
                "Buzilishning oldini olish — <br className="hidden md:block" />
                xarajat emas, eng katta tejashdir."
              </p>
              <div className="mt-8 text-blue-500 font-bold uppercase tracking-widest text-xs md:text-sm">
                Ertangi kunga investitsiya
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BLOK 2 — NIMA UCHUN BUNDAY DEYILADI? */}
      <div className="py-12 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Nega bu haqiqat? <br />
              <span className="text-slate-400">Raqamlar va faktlar bilan</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Karta 1 */}
            <div className="bg-black text-white p-8 md:p-10 rounded-[32px] flex flex-col justify-between min-h-[320px] group hover:scale-[1.02] transition-transform duration-500">
              <div>
                <div className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white/20 group-hover:text-white transition-colors duration-500">3-5x</div>
                <h3 className="text-xl font-black uppercase tracking-wide mb-4">Qimmatroq ta'mirlash</h3>
              </div>
              <p className="text-white/60 font-medium leading-relaxed text-sm md:text-base">
                Dvigatel buzilgandan keyin ta'mirlash xarajati oddiy moy almashtirish xarajatidan 3 dan 5 martagacha qimmat tushadi. Oldini olish — doimo arzonroq.
              </p>
            </div>

            {/* Karta 2 */}
            <div className="bg-blue-600 text-white p-8 md:p-10 rounded-[32px] flex flex-col justify-between min-h-[320px] group hover:scale-[1.02] transition-transform duration-500 shadow-xl shadow-blue-600/20">
              <div>
                <div className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white/30 group-hover:text-white transition-colors duration-500">10k</div>
                <h3 className="text-xl font-black uppercase tracking-wide mb-4">Xavfsiz interval</h3>
              </div>
              <p className="text-white/80 font-medium leading-relaxed text-sm md:text-base">
                Avtomobil zavodi tomonidan belgilangan moy almashtirish muddati. Bu muddat o'tgach dvigatel ichida aşınma 40% ga oshadi.
              </p>
            </div>

            {/* Karta 3 */}
            <div className="bg-emerald-900 text-white p-8 md:p-10 rounded-[32px] flex flex-col justify-between min-h-[320px] group hover:scale-[1.02] transition-transform duration-500 shadow-xl shadow-emerald-900/20">
              <div>
                <div className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white/30 group-hover:text-white transition-colors duration-500">1M km</div>
                <h3 className="text-xl font-black uppercase tracking-wide mb-4">Bizning kafolat</h3>
              </div>
              <p className="text-white/70 font-medium leading-relaxed text-sm md:text-base">
                O'z vaqtida xizmat olgan mijozlarning dvigatellarida bizning monitoring davomida hech qanday kritik muammo kuzatilmagan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BLOK 3 — BIZ HAQIMIZDA */}
      <div className="py-12 md:py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs md:text-sm mb-4 block">Biz Haqimizda</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              Biz shunchaki ustaxona emasmiz
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* Chap ustun */}
            <div className="space-y-10">
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.9]">
                "Sifat — bu <br /> <span className="text-blue-600">tasodif emas.</span>"
              </h3>
              
              <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
                <p>
                  Million KM — bu sizning avtomobilingiz uchun "shifoxona". Biz kasallikni davolamaymiz, biz uning oldini olamiz. Har bir detalga e'tibor beramiz. Har bir xizmatdan keyin raqamli hisobot beramiz.
                </p>
                <p>
                  Biz 2020-yildan beri O'zbekistonda faqat original moy va ehtiyot qismlar bilan ishlaymiz. Har bir usta bizning 6 oylik sertifikatsiya dasturidan o'tgan.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                {[
                  { icon: "fa-shield-halved", text: "Sertifikatlangan ustalar" },
                  { icon: "fa-oil-can", text: "Faqat original mahsulotlar" },
                  { icon: "fa-mobile-screen-button", text: "Raqamli monitoring" },
                  { icon: "fa-award", text: "1 000 000 km kafolat" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-lg">
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <span className="font-bold text-slate-900 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* O'ng ustun - Statistika */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[
                { val: "25K+", label: "Mijozlar" },
                { val: "100%", label: "Kafolat" },
                { val: "24/7", label: "Qo'llab-quvvatlash" },
                { val: "3 yil", label: "Bozorda" }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 md:p-10 rounded-[24px] shadow-lg border border-slate-100 flex flex-col justify-center items-center text-center aspect-square hover:translate-y-[-5px] transition-transform duration-300">
                  <div className="text-3xl md:text-5xl font-black text-slate-900 mb-2 tracking-tighter">{stat.val}</div>
                  <div className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BLOK 4 — QANDAY ISHLAYDI */}
      <div className="py-12 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
              Kafolat tizimi qanday ishlaydi?
            </h2>
            <p className="text-lg md:text-xl text-slate-500 font-medium">
              3 ta oddiy qadam — va dvigatelingiz 1,000,000 km himoyalangan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Arrows for desktop */}
            <div className="hidden md:block absolute top-12 left-[30%] text-slate-200 text-4xl"><i className="fas fa-chevron-right"></i></div>
            <div className="hidden md:block absolute top-12 right-[30%] text-slate-200 text-4xl"><i className="fas fa-chevron-right"></i></div>

            {[
              { num: "01", icon: "fa-calendar-check", title: "Yozilasiz", text: "Telefon, sayt yoki mini-chat orqali qulay vaqtni tanlab yozilasiz. Kutish yo'q — jadval sizga mos keladi." },
              { num: "02", icon: "fa-oil-can", title: "Xizmat bajariladi", text: "Sertifikatlangan usta original moy va filtr bilan 20-45 daqiqada xizmat ko'rsatadi. Siz kuzatishingiz mumkin." },
              { num: "03", icon: "fa-shield-halved", title: "Kafolat beriladi", text: "Raqamli kafolat xati yuboriladi. Keyingi xizmatgacha muammo bo'lsa — bepul ko'ramiz. Bu va'da emas, shartnoma." }
            ].map((step, i) => (
              <div key={i} className="text-center relative group">
                <div className="w-24 h-24 mx-auto bg-slate-50 rounded-full flex items-center justify-center text-3xl text-slate-400 mb-8 border-2 border-slate-100 group-hover:border-blue-500 group-hover:text-blue-600 transition-all duration-500 relative">
                  <i className={`fas ${step.icon}`}></i>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-black border-2 border-white">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base px-4">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BLOK 5 — CTA */}
      <div className="bg-black py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
              Hoziroq boshlang
            </h2>
            <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
              Avtomobilingizni tekshirib, siz uchun eng mos xizmat variantini toping. Bepul status tekshiruvi — 1 daqiqa.
            </p>
          </div>
          <div className="flex flex-col w-full md:w-auto gap-4">
            <button 
              onClick={onCheckStatus}
              className="px-10 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm hover:bg-slate-200 transition-colors active:scale-95"
            >
              Statusni tekshirish
            </button>
            <a 
              href="tel:+998770200107"
              className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm hover:bg-blue-700 transition-colors active:scale-95 flex items-center justify-center"
            >
              <i className="fas fa-phone-alt mr-3"></i> Hozir qo'ng'iroq qilish
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
