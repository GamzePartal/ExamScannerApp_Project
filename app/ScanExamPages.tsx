import { CameraView, useCameraPermissions } from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ScanExamPages() {

  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const { initialPhotos } = useLocalSearchParams();
  const [photos, setPhotos] = useState<string[]>([]);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    if (initialPhotos) {
      setPhotos(JSON.parse(initialPhotos as string));
    }
  }, []);


  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text>Kamera izni gerekli</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>İzin Ver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  
  const takePhoto = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
    setPhotos(prev => [...prev, photo.uri]);
  };

  const deletePhoto = (uri: string) => {
    setPhotos(prev => prev.filter(p => p !== uri));
    if (photos.length === 1) setDeleteMode(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} />

      <View style={styles.preview}>
        {photos.map((uri, i) => (
          <TouchableOpacity
            key={i}
            onLongPress={() => setDeleteMode(true)}
            activeOpacity={0.8}
            style={styles.previewItem}
          >
            <Image source={{ uri }} style={styles.previewImg} />

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
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.btn} onPress={takePhoto}>
          <Text style={styles.text}>Fotoğraf Çek ({photos.length})</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#16A34A" }]}
          onPress={() =>
            router.replace({
              pathname: "/LoadedExamPages",
              params: { photos: JSON.stringify(photos) },
            })
          }
        >
          <Text style={styles.text}>Yükle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Text style={{ color: "#fff" }}>Geri</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  preview: {
    position: "absolute",
    top: 50,
    flexDirection: "row",
    gap: 8,
    alignSelf: "center",
  },

  previewItem: {
    position: "relative",
  },

  previewImg: {
    width: 60,
    height: 90,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },

  deleteIcon: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#DC2626",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  bottom: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
    gap: 10,
  },

  btn: {
    width: 200,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },

  text: { color: "#fff", fontWeight: "700" },

  back: { marginTop: 10 },
});
