
import { GoogleGenAI, Type } from "@google/genai";
import type { CharacterProfile } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const characterSchema = {
  type: Type.OBJECT,
  properties: {
    localizacion: {
      type: Type.STRING,
      description: "Una región o ciudad ficticia en un mundo Murim, con un nombre evocador y una breve descripción atmosférica."
    },
    secta: {
      type: Type.STRING,
      description: "El nombre de la secta marcial a la que pertenece o está afiliado el personaje. Debe sonar creíble dentro del género Murim."
    },
    arteMarcialDivina: {
      type: Type.STRING,
      description: "El nombre de una técnica o estilo de arte marcial único y poderoso. Debe ser creativo y descriptivo."
    },
    familia: {
      type: Type.STRING,
      description: "El nombre de la familia o clan del personaje, con una breve nota sobre su reputación (ej. 'famosos por su esgrima' o 'caídos en desgracia')."
    },
    destino: {
      type: Type.STRING,
      description: "Una profecía o destino grandioso y misterioso para el personaje, en una o dos frases."
    }
  },
  required: ["localizacion", "secta", "arteMarcialDivina", "familia", "destino"]
};

export const generateCharacterProfile = async (name: string): Promise<CharacterProfile> => {
  try {
    const prompt = `Crea un perfil de personaje para un Manhwa de estilo Murim. El nombre del personaje es "${name}". Genera detalles creativos y evocadores para cada categoría.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Eres un maestro narrador de historias de fantasía y artes marciales (Murim). Tu tarea es crear perfiles de personajes únicos y memorables con un tono épico y misterioso. Responde siempre en español.",
        responseMimeType: "application/json",
        responseSchema: characterSchema,
        temperature: 0.95,
        topP: 0.9,
      }
    });

    const jsonText = response.text.trim();
    // A simple guard against empty or malformed responses
    if (!jsonText.startsWith('{')) {
        throw new Error('Respuesta inválida de la API. No es un JSON.');
    }
    const characterData = JSON.parse(jsonText);

    if (!characterData.localizacion || !characterData.secta || !characterData.arteMarcialDivina || !characterData.familia || !characterData.destino) {
        throw new Error("Respuesta de la API incompleta o mal formada.");
    }

    return characterData as CharacterProfile;

  } catch (error) {
    console.error("Error al generar el perfil del personaje:", error);
    if (error instanceof Error) {
        throw new Error(`No se pudo generar el personaje. Por favor, inténtalo de nuevo. Detalle: ${error.message}`);
    }
    throw new Error("Ocurrió un error desconocido al contactar la API de Gemini.");
  }
};
