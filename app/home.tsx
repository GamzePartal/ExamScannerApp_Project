import { Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';



export default function HomeScreen() {
  
  
    return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}/>
        <Text style={styles.appName}>ExamAI</Text>
      </View>

      <Text style={styles.title}>Taratılan Sınavlar</Text>

      <View style={styles.card}></View>


      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>＋ Sınav Tarat</Text>
      </TouchableOpacity>

    </View>


  );}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },


  logo: {
    width: 36,
    height: 36,
    marginRight: 8,
  },


  appName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F3C88',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },

 card: {
  flex: 1,
  width: '100%',
  maxWidth: 250,
  maxHeight: 400,
  backgroundColor: '#FFFFFF',   // İÇİ BEYAZ
  borderRadius: 16,
  borderWidth: 1,               // ÇERÇEVE
  borderColor: '#D1D5DB',       // GRİ (soft)
  padding: 20,
  alignSelf: 'center',
},



  button: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    backgroundColor: '#2563EB',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },


  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
