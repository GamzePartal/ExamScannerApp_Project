import { IMAGES } from "@/constants/theme";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { DeviceEventEmitter, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";


export default function LoadAnswerKey() {
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);
  const [pdf, setPdf] = useState<{ name: string; uri: string } | null>(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const isLoaded = photos.length > 0 || pdf !== null;

  useEffect(() => {
    const sub = DeviceEventEmitter.addListener(
      "onPhotosSelected",
      (incomingPhotos: string[]) => {
        setPhotos(prev =>
          [...prev, ...incomingPhotos.filter(p => !prev.includes(p))]
        );
        setPdf(null);
      }
    );
    return () => sub.remove();
  }, []);

  const pickPdf = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (res.canceled) return;

    const file = res.assets[0];
    setPdf({ name: file.name, uri: file.uri });
    setPhotos([]);
    setDeleteMode(false);
  };

  const deletePhoto = (uri: string) => {
    setPhotos(prev => prev.filter(p => p !== uri));
    setDeleteMode(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Image
          source={IMAGES.BACK}
          // @images, @constants... dynamic path
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.title}>
          {isLoaded ? "Cevap Anahtarı Yüklendi" : "Cevap Anahtarını Yükle"}
        </Text>

        <View style={styles.card}>
          {!isLoaded && (
            <>
              <Image
                source={require("../../assets/images/cloud2.png")}
                style={styles.cloud}
              />
              <Text style={styles.info}>
                Pdf yükleyin veya fotoğraf çekin
              </Text>
            </>
          )}

          {isLoaded && (<>
              <LottieView
                source={require("../../assets/animations/Success.json")}
                autoPlay
                loop={false}
                style={styles.success}/>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {photos.map((uri, i) => (
                  <TouchableOpacity
                    key={i}
                    onLongPress={() => setDeleteMode(true)}
                    activeOpacity={0.8}>
                    <Image source={{ uri }} style={styles.photo} />

                    {deleteMode && (
                      <TouchableOpacity
                        style={styles.delete}
                        onPress={() => deletePhoto(uri)}>
                        <Text style={styles.deleteText}>✕</Text>
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.hintText}>
                Silmek istediğiniz öğenin üstüne basılı tutun
              </Text>
            </>
          )}
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.push("/CameraScreen")}>
          <Text style={styles.buttonText}>Cevap Anahtarı Yükle(Fotoğraf)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={pickPdf}>
          <Text style={styles.buttonText}>Cevap Anahtarı Yükle(Pdf)</Text>
        </TouchableOpacity>

        {isLoaded && (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => router.push("/LoadedExamPages")}
          >
            <Text style={styles.buttonText}>Sınav Kağıdını Yükle</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
