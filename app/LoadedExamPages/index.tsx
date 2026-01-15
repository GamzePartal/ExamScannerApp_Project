import { IMAGES } from "@/constants/theme";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function LoadedExamPages() {

  const [photoList, setPhotoList] = useState<string[]>([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const { photos, answerKeyPhotos } = useLocalSearchParams();

  useEffect(() => {
    if (photos) setPhotoList(JSON.parse(photos as string));
  }, [photos]);
  

  const deletePhoto = (uri: string) => {
    setPhotoList(prev => {
      const updated = prev.filter(p => p !== uri);
      if (updated.length === 0) setDeleteMode(false);
      return updated;
    });
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
            style={styles.photoWrapper}>
            <Image source={{ uri }} style={styles.image} />

            {deleteMode && (
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => deletePhoto(uri)}>
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

       <TouchableOpacity style={styles.back}
        onPress={() => router.back()}>
            <Image source={IMAGES.BACK} style={styles.back} />
       </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push({ pathname: "/ScanExamPages",
            params: { initialPhotos: JSON.stringify(photoList) },})}>
        <Text style={styles.text}>Sınav Kağıdı Ekle</Text>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.btn} 
          onPress={() => router.push("/SimilarityRange")} >
        <Text style = {styles.buttonText}>İleri</Text>

      </TouchableOpacity>
    </View>
  );
}
