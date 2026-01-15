import { IMAGES } from "@/constants/theme";
import * as ImageManipulator from 'expo-image-manipulator';
import { router, useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import GeminiService from "./GeminiServices"; // Servisi import ettik
import styles from "./styles";

export default function ScanScreen() {
  const { studentPages, answerKeyPages, similarity } = useLocalSearchParams<any>();
  const [statusMessage, setStatusMessage] = useState("Görseller hazırlanıyor...");

  useEffect(() => {
    startAIProcess();
  }, []);

  const compressAndConvertToBase64 = async (uri: string) => {
    try {
      // 800px yeterli, kalite 0.6 yapıldı (hız için)
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }], 
        { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );
      return manipulatedImage.base64 || "";
    } catch (err) {
      console.error("Resim hatası:", uri, err);
      throw err;
    }
  };

  const startAIProcess = async () => {
    try {
      console.log("🚀 [ScanScreen] İşlem Başladı");

      if (!studentPages || !answerKeyPages) {
        Alert.alert("Hata", "Fotoğraf verisi eksik geldi.");
        router.back();
        return;
      }

      setStatusMessage("Resimler işleniyor...");
      
      // JSON Parse İşlemleri
      let parsedStudentPages: string[] = [];
      let parsedAnswerKey: string[] = [];

      try {
        parsedStudentPages = typeof studentPages === 'string' ? JSON.parse(studentPages) : studentPages;
        parsedAnswerKey = typeof answerKeyPages === 'string' ? JSON.parse(answerKeyPages) : answerKeyPages;
      } catch (e) {
        console.error("JSON Parse Hatası:", e);
        Alert.alert("Hata", "Veri formatı bozuk.");
        router.back();
        return;
      }

      // Base64 Dönüşümleri
      const studentBase64 = await Promise.all(
        parsedStudentPages.map((uri: string) => compressAndConvertToBase64(uri))
      );

      const answerKeyBase64 = await Promise.all(
        parsedAnswerKey.map((uri: string) => compressAndConvertToBase64(uri))
      );

      setStatusMessage("Yapay zeka puanlıyor...");

      // Gemini Prompt Hazırlığı
      const prompt = `
        Sen bir öğretmensin. Aşağıda sana önce ÖĞRENCİ KAĞITLARI, sonra CEVAP ANAHTARI resimleri verilecek.
        Benzerlik oranı: %${similarity || 70}
        
        Görev:
        1. Cevap anahtarındaki soruları ve cevapları oku.
        2. Öğrencinin kağıdındaki cevapları bul.
        3. Her soru için puan ver.
        4. Toplam puanı hesapla.
        
        Lütfen sonucu sadece JSON formatında döndür:
        { "sorular": [{ "soru": 1, "puan": 10, "aciklama": "Tam doğru" }], "toplamPuan": 90 }
      `;

      // Resimlerin hepsini tek bir listeye koyuyoruz (Sırası önemli: önce öğrenci, sonra cevap anahtarı)
      // Gemini'ye hangi resmin ne olduğunu prompt'ta söyleyebiliriz veya sırayla atarız.
      // Burada hepsini gönderiyoruz.
      const allImages = [...studentBase64, ...answerKeyBase64];

      const aiResult = await GeminiService.evaluateExam(prompt, allImages);

      console.log("✅ Sonuç:", aiResult);

      // Sonuç sayfasına yönlendir (AIScreen sayfanın olduğunu varsayıyorum)
       /* router.replace({ 
         pathname: "/AIScreen", 
         params: { result: aiResult } 
       }); */
       
       // Şimdilik sonucu alert ile görelim:
       Alert.alert("Sonuç", aiResult);
       setStatusMessage("Tamamlandı.");

    } catch (e: any) {
      console.error("❌ Hata:", e);
      Alert.alert("Hata", "İşlem başarısız oldu: " + e.message);
      router.back();
    }
  };

  return (
    <View style={styles.safe}>
      <LottieView
        source={require("../../assets/animations/scanning.json")} // Dosya yolunun doğru olduğundan emin ol
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text style={styles.text}>{statusMessage}</Text>
      <TouchableOpacity style={styles.cancelIcon} onPress={() => router.back()}>
        <Image source={IMAGES.CANCEL} style={styles.cancelIcon} />
      </TouchableOpacity>
    </View>
  );
}