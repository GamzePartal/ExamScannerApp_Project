import { Alert } from 'react-native';

// API Key'ini buraya kendi keyinle değiştir
const API_KEY: string = "AIzaSyA7j7mJ8jk3elG62o3cYQ8Di5irBrcEWKs"; 

// Model ismini şimdilik en garantisi olan bu yapalım
const MODEL_NAME: string = "gemini-flash-latest"; 
const BASE_URL: string = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

const GeminiService = {
  /**
   * 1. Hangi modellerin açık olduğunu kontrol eder (DEBUG İÇİN)
   */
  checkAvailableModels: async () => {
    try {
      console.log("🔍 Modeller kontrol ediliyor...");
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
      const data = await response.json();
      console.log("🛠️ KULLANILABİLİR MODELLER:", JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("❌ Model listesi alınamadı:", error);
    }
  },

  /**
   * 2. Basit Metin Soruları İçin (Test Ekranı İçin)
   */
  askGemini: async (prompt: string): Promise<string> => {
    try {
      const response = await fetch(`${BASE_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
      });

      const json = await response.json();
      
      if (!response.ok) {
         console.error("API Hatası Detay:", json);
         throw new Error(json.error?.message || "API Hatası");
      }

      if (json.candidates && json.candidates.length > 0) {
        return json.candidates[0].content.parts[0].text;
      }
      return "Yanıt alınamadı.";
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  },

  /**
   * 3. Sınav Kağıdı Okumak İçin (Resimli)
   */
  evaluateExam: async (prompt: string, base64Images: string[]): Promise<string> => {
    try {
      console.log("📤 [GeminiService] İstek hazırlanıyor...");

      const imageParts = base64Images.map(base64 => ({
        inlineData: {
          mimeType: "image/jpeg",
          data: base64
        }
      }));

      const requestBody = {
        contents: [
          {
            parts: [
              { text: prompt },
              ...imageParts 
            ]
          }
        ]
      };

      const response = await fetch(`${BASE_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const jsonResponse = await response.json();

      if (!response.ok) {
        const errorMessage = jsonResponse.error?.message || "Bilinmeyen API Hatası";
        console.error("❌ API Hatası:", errorMessage);
        throw new Error(errorMessage);
      }

      if (jsonResponse.candidates && jsonResponse.candidates.length > 0) {
        return jsonResponse.candidates[0].content.parts[0].text;
      } else {
        return "Yanıt boş döndü.";
      }

    } catch (error: any) {
      console.error("❌ Gemini Servis Hatası:", error);
      Alert.alert("Bağlantı Hatası", "Yapay zeka servisine ulaşılamadı.");
      throw error;
    }
  }
};

export default GeminiService;