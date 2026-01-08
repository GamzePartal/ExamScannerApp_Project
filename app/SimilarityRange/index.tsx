import { IMAGES } from "@/constants/theme";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";


export default function SimilarityLevel() {
  const [value, setValue] = useState(60);

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

      <Image
        source={IMAGES.INFO}
        style={styles.infoIcon}>
      </Image>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Cevap anahtarı : "Fotosentez bitkilerin ışıkla besin üretmesidir."{"\n"}{"\n"}
          Öğrencinin Cevabı : "Bitkiler ışık kullanarak kendi besinlerini üretir."{"\n"}
        </Text>
        <Text style= {styles.infoText2}> Anlam benzerliği %60 üzerinde olduğu için cevap doğru kabul edilir.</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Tarat</Text>
      </TouchableOpacity>
    </View>
  );
}