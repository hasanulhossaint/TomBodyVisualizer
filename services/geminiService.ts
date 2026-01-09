
import { GoogleGenAI, Type } from "@google/genai";
import { BodyStats, HealthMetrics } from "../types";

// Service to fetch health insights from Gemini AI based on user biometrics.
export async function getAIHealthInsights(stats: BodyStats, metrics: HealthMetrics) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Based on the following user data, provide a short, professional health insight summary.
    Data:
    - Gender: ${stats.gender}
    - Age: ${stats.age}
    - BMI: ${metrics.bmi.toFixed(1)} (${metrics.category})
    - Estimated Body Fat: ${metrics.bodyFatEstimate.toFixed(1)}%
    
    Format the response as JSON with three fields: 
    1. 'summary': A 2-sentence summary of their current health status.
    2. 'tips': An array of 3 actionable lifestyle tips.
    3. 'disclaimer': Reiterate that this is an estimation, not a medical diagnosis.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            tips: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            disclaimer: { type: Type.STRING }
          },
          required: ["summary", "tips", "disclaimer"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI engine");
    }
    
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}
