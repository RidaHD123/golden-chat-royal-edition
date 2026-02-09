
import { GoogleGenAI } from "@google/genai";
import { PremiumContact } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIResponse = async (contact: PremiumContact, userMessage: string): Promise<string> => {
  try {
    const prompt = `You are ${contact.name}, ${contact.title}. 
    Bio: ${contact.bio}. 
    Interests: ${contact.interests.join(', ')}.
    
    The user is sending you a message in the Golden Chat luxury app. 
    Respond as this persona with the appropriate level of formality, wisdom, and personality.
    Keep the response concise and sophisticated.
    
    User Message: "${userMessage}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "I am currently indisposed. Please contact my secretariat.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The royal communication lines are currently busy. Please try again shortly.";
  }
};
