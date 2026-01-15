import { IMAGES } from "@/constants/theme";
import * as ImageManipulator from 'expo-image-manipulator';
import { router, useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { ExamDataManager } from "../ExamDataManager"; // Manager eklendi
import GeminiService from "../GeminiService";
import styles from "./styles";

export default function ScanScreen() {
  const { similarity } = useLocalSearchParams<any>(); 
  const [statusMessage, setStatusMessage] = useState("Veriler hazırlanıyor...");

  useEffect(() => {
    startAIProcess();
  }, []);

  const compressAndConvertToBase64 = async (uri: string) => {
    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }], // 800px yeterli
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
      // 1. KASADAN VERİLERİ ÇEK
      const studentPages = ExamDataManager.getStudentPages();
      const answerKeyPages = ExamDataManager.getAnswerKey();

      console.log("📥 [ScanScreen] Veriler Alındı:");
      console.log("   - Öğrenci Sayfa Sayısı:", studentPages.length);
      console.log("   - Cevap Anahtarı Sayısı:", answerKeyPages.length);

      if (studentPages.length === 0 || answerKeyPages.length === 0) {
        Alert.alert("Hata", "Veriler hafızada bulunamadı. Lütfen en baştan başlayın.");
        router.back();
        return;
      }

      setStatusMessage("Görseller işleniyor...");

      // 2. Base64 Dönüşümleri
      const studentBase64 = await Promise.all(
        studentPages.map(uri => compressAndConvertToBase64(uri))
      );

      const answerKeyBase64 = await Promise.all(
        answerKeyPages.map(uri => compressAndConvertToBase64(uri))
      );

      // 3. Prompt Hazırlığı
      const prompt = `
        Sen uzman bir öğretmensin. 
        Görevin: Sana verilen CEVAP ANAHTARI'na bakarak ÖĞRENCİ KAĞIDI'nı puanlamak.
        Benzerlik Toleransı: %${similarity || 70}

        Talimatlar:
        1. Önce Cevap Anahtarındaki soruları ve doğru yanıtları analiz et.
        2. Sonra Öğrenci Kağıdındaki yanıtları oku.
        3. Her soru için öğrencinin yanıtını cevap anahtarıyla kıyasla.
        4. Puan ver ve kısa bir açıklama yap.

        Lütfen sonucu JSON formatında ver:
        {
          "sonuc": [
            {"soru": 1, "puan": 10, "aciklama": "Tam doğru"},
            {"soru": 2, "puan": 5, "aciklama": "Kısmen doğru"}
          ],
          "toplamPuan": 15
        }
      `;

      setStatusMessage("Yapay zeka kağıdı okuyor...");

      // Tüm görselleri birleştirip gönderiyoruz
      // (Önce cevap anahtarını göndermek mantıklı olabilir ama model context'ten anlar)
      const allImages = [...answerKeyBase64, ...studentBase64];

      const result = await GeminiService.evaluateExam(prompt, allImages);
      
      console.log("✅ [ScanScreen] İşlem Başarılı");
      
      // Sonucu Alert ile göster veya Sonuç ekranına yönlendir
      Alert.alert("Sonuç", result);

      // İstersen burada sonuç sayfasına yönlendir:
      // router.replace({ pathname: "/ResultScreen", params: { result: result } });

    } catch (e: any) {
      console.error("Hata:", e);
      Alert.alert("Hata", "İşlem başarısız: " + e.message);
      router.back();
    }
  };

  return (
    <View style={styles.safe}>
      <LottieView
        source={require("../../assets/animations/scanning.json")}
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