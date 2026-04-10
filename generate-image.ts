import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generate() {
  try {
    console.log("Generating image...");
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: 'A beautiful, elegant watercolor floral bouquet decoration for a wedding invitation, featuring soft pastel pink and burgundy roses, peonies, and eucalyptus leaves on a solid white background. High quality, delicate, romantic, isolated on white.' }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        fs.mkdirSync('public', { recursive: true });
        fs.writeFileSync('public/floral.png', base64Data, 'base64');
        console.log('Image saved to public/floral.png');
        break;
      }
    }
  } catch (e) {
    console.error("Error generating image:", e);
  }
}
generate();
