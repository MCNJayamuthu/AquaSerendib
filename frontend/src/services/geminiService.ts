import { GoogleGenAI, Type } from "@google/genai";
import { IdentificationResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Schema for structured output
const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    isEndemic: { type: Type.BOOLEAN, description: "True if the fish is an endemic freshwater species of Sri Lanka." },
    name: { type: Type.STRING, description: "Common name of the fish." },
    scientificName: { type: Type.STRING, description: "Scientific name of the fish." },
    description: { type: Type.STRING, description: "A brief description of the fish and its habitat." },
    confidence: { type: Type.STRING, description: "Confidence level of identification (High, Medium, Low)." },
  },
  required: ["isEndemic", "name", "scientificName", "description", "confidence"],
};

export const identifyFish = async (base64Image: string): Promise<IdentificationResult> => {
  try {
    // Strip header if present (e.g., data:image/jpeg;base64,)
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: `Analyze this image. Is this a freshwater fish endemic to Sri Lanka? 
                   Focus ONLY on Sri Lankan endemic freshwater species (e.g., Bulath Hapaya, Bandula Pethiya, etc.).
                   If it is a fish but not endemic to Sri Lanka, set isEndemic to false.
                   If it is not a fish, set isEndemic to false and provide a description stating it is not a fish.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "You are an expert ichthyologist specializing in Sri Lankan freshwater endemic species. Provide accurate, scientific identification."
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const result = JSON.parse(text);
    
    return {
      isEndemic: result.isEndemic,
      name: result.name,
      scientificName: result.scientificName,
      description: result.description,
      confidence: result.confidence
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      isEndemic: false,
      error: "Failed to identify image. Please try again or ensure the image is clear."
    };
  }
};