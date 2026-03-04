export const CAR_DATA = {
  "chevrolet": {
    "Nexia 3": { "maxAge": 5, "maxKm": 100000, "priceOneTime": 849000, "desc": "Ishonchli va tejamkor Nexia 3 uchun original xizmat." },
    "Cobalt": { "maxAge": 5, "maxKm": 100000, "priceOneTime": 849000, "desc": "Oila avtomobili Cobalt uchun uzoq muddatli kafolat." },
    "Gentra": { "maxAge": 5, "maxKm": 100000, "priceOneTime": 849000, "desc": "Komfortli Gentra uchun premium xizmat paketi." },
    "Onix": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1049000, "desc": "Zamonaviy Onix turbo motorlari uchun maxsus moylar." },
    "Tracker": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1049000, "desc": "Krossover Tracker uchun ishonchli texnik nazorat." },
    "Malibu": { "maxAge": 5, "maxKm": 50000, "priceOneTime": 1299000, "desc": "Biznes klass Malibu uchun oliy darajadagi xizmat." },
    "Equinox": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1499000, "desc": "Equinox uchun maxsus sintetik moylar va filtrlar." },
    "Traverse": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1899000, "desc": "Katta oilaviy Traverse uchun kuchaytirilgan himoya." },
    "Tahoe": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 2199000, "desc": "Gigant Tahoe dvigateli uchun eng yuqori sifat standarti." }
  },
  "kia": {
    "Sonet": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1049000, "desc": "Yangi Sonet krossoveri uchun original KIA standartlari." },
    "K5": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1399000, "desc": "Elegant K5 uchun yuqori sifatli texnik ko'rik." },
    "Sportage": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1299000, "desc": "Sportage yo'ltanlamasi uchun ishonchli million km kafolati." }
  },
  "liauto": {
    "L6": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1299000, "reductorPrice": 949000, "desc": "Premium krossover. Dvigatel va reductor uchun maxsus yondashuv." },
    "L7": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1299000, "reductorPrice": 949000, "desc": "L7 gibrid tizimi uchun original sintetik moylar." },
    "L8": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1299000, "reductorPrice": 949000, "desc": "Oilaviy L8 uchun mukammal himoya va servis." },
    "L9": { "maxAge": 3, "maxKm": 50000, "priceOneTime": 1299000, "reductorPrice": 949000, "desc": "Flagman L9. Eng yuqori sifat standarti." }
  }
};

export const BRAND_LOGOS = {
  "chevrolet": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo.png/1200px-Chevrolet-logo.png",
  "kia": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Kia_logo.svg/2560px-Kia_logo.svg.png",
  "liauto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Li_Auto_logo.png/1200px-Li_Auto_logo.png"
};

export const sendTelegramNotification = async (message) => {
  const TG_TOKEN = "7722483735:AAG_LZ1Bg0H-mnqAlnw4OknNj-BTrqM8CWM";
  const TG_CHAT_ID = "-1003461463026";
  const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });
    const result = await response.json();
    if (!response.ok) {
      console.error("Telegram API error:", result);
    }
    return response.ok;
  } catch (error) {
    console.error("Telegram Error:", error);
    return false;
  }
};

export const sendLeadToTelegram = async (data) => {
  const message = `
🤖 <b>YANGI LEAD (AI CHAT)</b>

👤 <b>Mijoz:</b> ${data.name}
📞 <b>Telefon:</b> <code>${data.phone}</code>
🚗 <b>Avto:</b> ${data.model}
🔢 <b>Davlat raqami:</b> ${data.carPlate || 'Kiritilmadi'}
📊 <b>Probeg:</b> ${data.mileage ? data.mileage + ' km' : 'Kiritilmadi'}

🛠 <b>Muammo tavsifi:</b> 
<i>"${data.problem}"</i>
  `;
  return await sendTelegramNotification(message);
};
