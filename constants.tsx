
import { BrandData } from './types';

export const CAR_DATA: Record<string, BrandData> = {
  "chevrolet": {
    "Nexia 3": { "maxAge": 5, "maxKm": 100000, "priceOneTime": 849000, "desc": "Ishonchli va tejamkor Nexia 3 uchun original xizmat." },
    "Cobalt": { "maxAge": 5, "maxKm": 100000, "priceOneTime": 849000, "desc": "Oila avtomobili Cobalt uchun uzoq muddatli kafolat." },
    "Gentra": { "maxAge": 5, "maxKm": 100000, "priceOneTime": 849000, "desc": "Komfortli Gentra uchun premium xizmat paketi." },
    "Onix": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1049000, "desc": "Zamonaviy Onix turbo motorlari uchun maxsus moylar." },
    "Tracker": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1049000, "desc": "Krossover Tracker uchun ishonchli texnik nazorat." },
    "Malibu": { "maxAge": 5, "maxKm": 50000, "priceOneTime": 1299000, "desc": "Biznes klass Malibu uchun oliy darajadagi xizmat." }
  },
  "kia": {
    "Sonet": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 990000, "desc": "Yangi Sonet krossoveri uchun original KIA standartlari." },
    "K5": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1350000, "desc": "Elegant K5 uchun yuqori sifatli texnik ko'rik." },
    "Sportage": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1550000, "desc": "Sportage yo'ltanlamasi uchun ishonchli million km kafolati." }
  },
  "liauto": {
    "L6": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1800000, "desc": "Premium Li Auto L6 uchun maxsus xizmat turi." },
    "L7": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1900000, "desc": "Li L7 gibrid tizimlari uchun professional yondashuv." },
    "L9": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 2100000, "desc": "Flagman Li L9 uchun eng oliy darajadagi Million KM xizmati." }
  }
};

export const ONE_TIME_SERVICES = [
  "Avtomobil modeli bo'yicha to'g'ri motor moyi tanlovi",
  "Dvigatel uchun aniq va yetarli hajmda motor moyi",
  "Moy filtrini almashtirish",
  "Havo filtrini almashtirish",
  "Salon filtrini almashtirish",
  "Bonus: avtomobil ustki qismini bepul avtomoyka"
];

export const YEARLY_BENEFITS = [
  "Million km oila a'zolari safiga qo'shilasiz",
  "Maxsus oilaviy futbolka sovg'a",
  "1 000 000 km gacha muammosiz yurish kafolati",
  "Shukurullohon Abdumalikov bilan 12 marta jonli efir"
];
