import { Alert } from 'react-native';

const API_KEY: string = "AIzaSyA7j7mJ8jk3elG62o3cYQ8Di5irBrcEWKs"; 
// Model ismini güncel ve görsel destekleyen bir model yapalım
const MODEL_NAME: string = "gemini-1.5-flash"; 
const BASE_URL: string = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

const GeminiService = {
  /**
   * Gemini'ye Metin + Resimler gönderir.
   * @param prompt Kullanıcının yazdığı prompt (Puanlama talimatı)
   * @param base64Images Base64 formatındaki resimlerin listesi
   */
  evaluateExam: async (prompt: string, base64Images: string[]): Promise<string> => {
    try {
      console.log("📤 [GeminiService] İstek hazırlanıyor...");

      // Resimleri Gemini formatına çeviriyoruz
      const imageParts = base64Images.map(base64 => ({
        inlineData: {
          mimeType: "image/jpeg",
          data: base64
        }
      }));

      // İstek gövdesini oluştur
      const requestBody = {
        contents: [
          {
            parts: [
              { text: prompt }, // Talimat
              ...imageParts     // Resimler
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
      Alert.alert("Hata", "Yapay zeka servisine ulaşılamadı.");
      throw error;
    }
  }
};

export default GeminiService;