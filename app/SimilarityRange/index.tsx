import { IMAGES } from "@/constants/theme";
import Slider from "@react-native-community/slider";
import { router, useLocalSearchParams } from "expo-router"; // useLocalSearchParams EKLENDİ
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function SimilarityLevel() {
  
  // Önceki sayfadan gelen verileri alıyoruz
  const { studentPages, answerKeyPages } = useLocalSearchParams();
  const [value, setValue] = useState(70);

  const handleScan = () => {
    if(!studentPages || !answerKeyPages) {
        console.error("Veri eksik! Önceki sayfadan parametre gelmedi.");
        // Geliştirme aşamasında uyarı verelim
    }

    router.push({
        pathname: "/ScanScreen",
        params: {
            similarity: value,
            studentPages: studentPages, // Veriyi iletiyoruz
            answerKeyPages: answerKeyPages // Veriyi iletiyoruz
        },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cevapların Benzerlik{"\n"}Seviyesini Seç</Text>

      <View style={styles.sliderRow}>
        <Slider
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={value}
          onValueChange={setValue}
          minimumTrackTintColor="#2F6BFF"
          maximumTrackTintColor="#E0E0E0"
          thumbTintColor="#2F6BFF"
        />
        <Text style={styles.percent}>{value}%</Text>
      </View>

      <TouchableOpacity onPress={() => router.back()}>
        <Image source={IMAGES.BACK} style={styles.back} />
      </TouchableOpacity>

      <Image source={IMAGES.INFO} style={styles.infoIcon}></Image>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Cevap anahtarı : "Fotosentez bitkilerin ışıkla besin üretmesidir."{"\n"}{"\n"}
          Öğrencinin Cevabı : "Bitkiler ışık kullanarak kendi besinlerini üretir."{"\n"}
        </Text>
        <Text style= {styles.infoText2}> Anlam benzerliği %60 üzerinde olduğu için cevap doğru kabul edilir.</Text>
      </View>
      
      {/* Fonksiyonu buraya bağladık */}
      <TouchableOpacity style={styles.button} onPress={handleScan}>
        <Text style={styles.buttonText}>Tarat</Text>
      </TouchableOpacity>
    </View>
  );
}