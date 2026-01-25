
import { GoogleGenAI } from "@google/genai";

export const getCarAdvice = async (carModel: string, problem: string): Promise<string> => {
  try {
    // API Key process.env.API_KEY orqali avtomatik olinadi
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Mijozning mashinasi: ${carModel}. Muammo: ${problem}.`,
      config: {
        systemInstruction: `Siz "Million KM" premium avtoservisining tajribali va xushmuomala bosh mexanigisiz. 
        Vazifangiz:
        1. Mijozning muammosini professional tahlil qiling va o'zbek tilida qisqa, tushunarli maslahat bering.
        2. Dvigatelni saqlab qolishning muhimligini ta'kidlang.
        3. Maslahat oxirida mijozga yordam berish uchun servisga taklif qiling.
        4. Javobingiz samimiy va ishonchli bo'lsin.`,
        temperature: 0.8,
        topP: 0.95,
      },
    });
    
    return response.text || "Kechirasiz, texnik muammo yuz berdi. Iltimos, mutaxassis bilan bog'laning: +998 77 020 01 07";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Hozirda AI xizmati band. Iltimos, birozdan so'ng qayta urinib ko'ring yoki servisga qo'ng'iroq qiling.";
  }
};
