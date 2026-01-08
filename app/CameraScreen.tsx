import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { DeviceEventEmitter, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function CameraScreen() {

  const cameraRef = useRef<CameraView | null>(null);
  const router = useRouter();

  const [permission, requestPermission] = useCameraPermissions();
  const [photos, setPhotos] = useState<string[]>([]);


  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text>Kamera izni gerekli</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>İzin ver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.7,
    });

    setPhotos(prev => [...prev, photo.uri]);
  };


  const removePhoto = (uri: string) => {
    setPhotos(prev => prev.filter(p => p !== uri));
  };


  const goToLoadedScreen = () => {
    if (photos.length === 0) return;

    DeviceEventEmitter.emit("onPhotosSelected", photos);
    router.back();
  };

  
  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} />

      <View style={styles.container}>
        {photos.map((uri, index) => (
          <View key={index} style={styles.previewItem}>
            <Image source={{ uri }} style={styles.previewImg} />
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => removePhoto(uri)}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.fotoBtn} onPress={takePhoto}>
          <Text style={styles.btnText}>
            Fotoğraf Çek ({photos.length})
          </Text>
        </TouchableOpacity>

        {photos.length > 0 && (
          <TouchableOpacity style={styles.doneBtn} onPress={goToLoadedScreen}>
            <Text style={styles.btnText}>Yükle</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                  <Text style={styles.btnText}>Geri</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    position: "absolute",
    top: 50,
    flexDirection: "row",
    gap: 10,
    alignSelf: "center",
  },

  previewItem: {
    position: "relative",
  },

  previewImg: {
    width: 65,
    height: 95,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#fff",
    top: 14,
  },

  removeBtn: {
    position: "absolute",
    top: 9,
    right: -8,
    backgroundColor: "#DC2626",
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },

  removeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  bottomBar: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },

  fotoBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 30,
    width: 220,
    alignItems: "center",
    marginBottom: 40,
  },

  doneBtn: {
    backgroundColor: "#16A34A",
    paddingVertical: 14,
    borderRadius: 30,
    width: 220,
    alignItems: "center",
    bottom : 25
  },

  btnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  backBtn: { bottom : 8}

  
});
