import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import GeminiService from './GeminiService';




export default function App() {
  // State tanımları (TypeScript generic kullanımı ile <string>)
  const [inputText, setInputText] = useState<string>('');
  const [responseText, setResponseText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  

// Sayfa açılınca çalışsın
useEffect(() => {
    // Doğru çağırma yöntemi budur:
    GeminiService.checkAvailableModels();
  }, []);

  // Gönder butonuna basılınca çalışacak fonksiyon
  const handleSendRequest = async () => {
    // Boş metin kontrolü
    if (!inputText.trim()) {
      Alert.alert("Uyarı", "Lütfen bir şeyler yazın.");
      return;
    }

    // Yükleniyor durumunu başlat
    setLoading(true);
    setResponseText(''); // Önceki cevabı temizle

    try {
      // Servisten cevabı bekle
      const result = await GeminiService.askGemini(inputText);
      
      // Cevabı ekrana bas
      setResponseText(result);
    } catch (error: any) {
      // Hata olursa kullanıcıya bildir
      Alert.alert("Hata Oluştu", error.message || "Bilinmeyen bir hata.");
      setResponseText("Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      // İşlem bitince (başarılı veya hatalı) yükleniyor ikonunu kapat
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      <View style={styles.container}>
        {/* Başlık */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Gemini AI (Native)</Text>
          <Text style={styles.headerSubtitle}>SDK'sız Fetch Çözümü</Text>
        </View>

        {/* Sonuç Alanı (Kaydırılabilir) */}
        <View style={styles.resultArea}>
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4A90E2" />
                <Text style={styles.loadingText}>Gemini düşünüyor...</Text>
              </View>
            ) : (
              <Text style={styles.resultText}>
                {responseText || "Merhaba! Bana bir soru sor, cevaplayayım."}
              </Text>
            )}
          </ScrollView>
        </View>

        {/* Input Alanı (Klavye açılınca yukarı kayması için) */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
          style={styles.inputWrapper}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Buraya yazın..."
              placeholderTextColor="#999"
              value={inputText}
              onChangeText={setInputText}
              multiline={true} // Çok satırlı yazmaya izin ver
            />
            
            <TouchableOpacity 
              style={[styles.sendButton, loading && styles.disabledButton]} 
              onPress={handleSendRequest}
              disabled={loading} // Yüklenirken tıklanmasın
            >
              <Text style={styles.sendButtonText}>Gönder</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

      </View>
    </SafeAreaView>
  );
}

// Tasarım (StyleSheet)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  headerContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  resultArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    // Gölge efektleri (Shadow)
    elevation: 4, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scrollContent: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  resultText: {
    fontSize: 16,
    color: '#222',
    lineHeight: 24,
  },
  inputWrapper: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  textInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 5,
  },
  disabledButton: {
    backgroundColor: '#A0C4FF',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});