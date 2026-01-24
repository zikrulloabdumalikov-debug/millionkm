
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getCarAdvice = async (carModel, problem) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Siz professional avtomobil ustasisiz (Million KM servisidan). Mijozning mashinasi: ${carModel}. Muammo: ${problem}. Mijozga qisqa, tushunarli va foydali maslahat bering (o'zbek tilida).`,
    });
    return response.text || "Kechirasiz, hozircha maslahat bera olmayman.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Texnik nosozlik yuz berdi.";
  }
};
