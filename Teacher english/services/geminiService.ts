
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "Siz Telegram Mini App-ning aqlli yordamchisisiz. Foydalanuvchilarga o'zbek tilida muloyim va foydali javoblar bering. Sizning ismingiz - TeleGem Bot.",
        temperature: 0.7,
      },
    });
    return response.text || "Uzr, hozirda javob bera olmayman.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Tizimda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.";
  }
};
