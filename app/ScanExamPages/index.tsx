import { CameraView, useCameraPermissions } from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function ScanExamPages() {
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const { initialPhotos } = useLocalSearchParams();
  const [photos, setPhotos] = useState<string[]>([]);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    if (initialPhotos) {
        try {
            setPhotos(JSON.parse(initialPhotos as string));
        } catch(e) {}
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
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
    if(photo?.uri) setPhotos(prev => [...prev, photo.uri]);
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

        {/* Yükle butonu sadece parametre ile geri döner (Local Loop) */}
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