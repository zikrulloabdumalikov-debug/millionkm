const TG_TOKEN = "7722483735:AAG_LZ1Bg0H-mnqAlnw4OknNj-BTrqM8CWM";
const TG_CHAT_ID = "-1003461463026";

export const sendTelegramNotification = async (message) => {
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
    console.error("Telegram Notification Error:", error);
    return false;
  }
};

export const sendLeadToTelegram = async (data) => {
  const message = `
<b>🚨 YANGI AI MUROJAAT (LEAD)</b>

<b>👤 Mijoz:</b> ${data.name}
<b>📞 Tel:</b> ${data.phone}
<b>🚗 Avto:</b> ${data.model}
<b>🔢 Davlat raqami:</b> <code>${data.carPlate}</code>
<b>📊 Probeg:</b> ${data.mileage} KM
<b>🛠 Muammo tavsifi:</b> 
<i>"${data.problem}"</i>

------------------------------
Xabar AI mexanik orqali qabul qilindi.
  `;
  return await sendTelegramNotification(message);
};