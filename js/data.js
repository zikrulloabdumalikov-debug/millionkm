// Ma'lumotlar bazasi
window.CAR_DATA = {
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

window.BRAND_LOGOS = {
  "chevrolet": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo.png/1200px-Chevrolet-logo.png",
  "kia": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Kia_logo.svg/2560px-Kia_logo.svg.png",
  "liauto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Li_Auto_logo.png/1200px-Li_Auto_logo.png"
};

// Telegram Sozlamalari
const TG_TOKEN = "7722483735:AAG_LZ1Bg0H-mnqAlnw4OknNj-BTrqM8CWM";
const TG_CHAT_ID = "-1003461463026";

window.sendTelegramNotification = async (message) => {
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
    return response.ok;
  } catch (error) {
    console.error("Telegram Error:", error);
    return false;
  }
};

window.sendLeadToTelegram = async (data) => {
  const message = `
<b>🚨 YANGI AI MUROJAAT (LEAD)</b>

<b>👤 Mijoz:</b> ${data.name}
<b>📞 Tel:</b> ${data.phone}
<b>🚗 Avto:</b> ${data.model}
<b>🔢 Davlat raqami:</b> <code>${data.carPlate}</code>
<b>📊 Probeg:</b> ${data.mileage} KM
<b>🛠 Muammo tavsifi:</b> 
<i>"${data.problem}"</i>
  `;
  return await window.sendTelegramNotification(message);
};