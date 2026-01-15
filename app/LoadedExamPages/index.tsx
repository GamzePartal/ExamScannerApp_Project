import { IMAGES } from "@/constants/theme";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ExamDataManager } from "../ExamDataManager"; // Manager eklendi
import styles from "./styles";

export default function LoadedExamPages() {
  const { photos } = useLocalSearchParams(); // Sadece ScanExamPages'den dönen fotoları alır
  const [photoList, setPhotoList] = useState<string[]>([]);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    if (photos) {
      try {
        const parsed = typeof photos === 'string' ? JSON.parse(photos) : photos;
        setPhotoList(parsed);
      } catch (e) {
        console.log("Parse hatası", e);
      }
    }
  }, [photos]);

  const deletePhoto = (uri: string) => {
    setPhotoList(prev => {
      const updated = prev.filter(p => p !== uri);
      if (updated.length === 0) setDeleteMode(false);
      return updated;
    });
  };

  const handleNext = () => {
    // 1. Ekrandaki öğrenci kağıtlarını KASAYA KAYDET
    ExamDataManager.setStudentPages(photoList);
    
    // 2. Sayfayı değiştir
    router.push("/SimilarityRange");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yüklenen Sınav Kağıtları</Text>

      <ScrollView contentContainerStyle={styles.grid}>
        {photoList.map((uri, i) => (
          <TouchableOpacity
            key={i}
            onLongPress={() => setDeleteMode(true)}
            activeOpacity={0.85}
            style={styles.photoWrapper}
          >
            <Image source={{ uri }} style={styles.image} />
            {deleteMode && (
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => deletePhoto(uri)}
              >
                <Text style={styles.deleteText}>✕</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {photoList.length > 0 && (
        <Text style={styles.hintText}>
          Silmek istediğiniz öğelerin üzerine basılı tutun
        </Text>
      )}

      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Image source={IMAGES.BACK} style={styles.back} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          router.push({
            pathname: "/ScanExamPages",
            params: { initialPhotos: JSON.stringify(photoList) },
          })
        }
      >
        <Text style={styles.text}>Sınav Kağıdı Ekle</Text>
      </TouchableOpacity>

      {/* İleri butonu veriyi kasaya kaydeder ve gider */}
      <TouchableOpacity style={styles.btn} onPress={handleNext}>
        <Text style={styles.buttonText}>İleri</Text>
      </TouchableOpacity>
    </View>
  );
}