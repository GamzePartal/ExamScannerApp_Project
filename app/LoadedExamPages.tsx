import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function LoadedExamPages() {

  const { photos } = useLocalSearchParams();
  const [photoList, setPhotoList] = useState<string[]>([]);
  const [deleteMode, setDeleteMode] = useState(false);


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

       <TouchableOpacity style={styles.back}>
              <Image source={require("../assets/images/back.png")} style={styles.back} />
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

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },

  title: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "700",
    marginTop : 60,
    bottom : 45
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 16,
    paddingBottom: 140,
  },

  photoWrapper: {
    position: "relative",
  },

  image: {
    width: 110,
    height: 160,
    borderRadius: 2,
    marginTop : 40
  },

  deleteIcon: {
    position: "absolute",
    top: 35,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#d23535ff",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  hintText: {
    position: "absolute",
    bottom: 170,
    width: "100%",
    textAlign: "center",
    fontSize: 12,
    color: "#6B7280",
  },

  btn: {
    marginTop: 20,
    width: 220,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    bottom : 40,
    left : 80
  },

  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "700" 
  },

  text: { color: "#fff", fontWeight: "700" , fontSize : 18},
  back: { position: "absolute", top:  40, left: 10, width : 16, height : 17 } 
});
