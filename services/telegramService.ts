
const TG_TOKEN = "7722483735:AAG_LZ1Bg0H-mnqAlnw4OknNj-BTrqM8CWM";
const TG_CHAT_ID = "-1003461463026";

export const sendTelegramNotification = async (message: string) => {
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

export const sendChatLogToTelegram = async (userModel: string, userProblem: string, aiAdvice: string) => {
  const message = `
<b>💬 Million KM AI Support</b>
<b>Mashina:</b> ${userModel}
<b>Muammo:</b> ${userProblem}
<b>AI Maslahati:</b> ${aiAdvice}
  `;
  return await sendTelegramNotification(message);
};
