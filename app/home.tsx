import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";



export default function HomeScreen() {

  const router = useRouter();
  
  
    return (

    <SafeAreaView style={{ flex: 1, backgroundColor:"white" }}>
    <View style={styles.container}>

      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}/>
        <Text style={styles.appName}>ExamAI</Text>
      </View>

      <Text style={styles.title}>Taratılan Sınavlar</Text>

      <View style={styles.card}></View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/LoadAnswerKey")}
          //</View>onPress={() => router.push(`/#${VIEWS2.ANSWER_KEY}`)}
          >
         <Text style={styles.buttonText}>＋ Sınav Tarat</Text>
        </TouchableOpacity>


     </View>
     </SafeAreaView>

  );}


/*
  enum VIEWS  {
    ANSWER_KEY = "/LoadAnswerKey"
  }


  const VIEWS2 :  { [key: string]: string }  = {
    ANSWER_KEY : "/LoadAnswerKey", 
  }
*/

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
    marginBottom: 20,
    marginTop : 25,
  },

 card: {
  flex: 1,
  width: '100%',
  maxWidth: 300,
  maxHeight: 450,
  backgroundColor: '#FFFFFF',  
  borderRadius: 16,
  borderWidth: 1,               
  borderColor: '#D1D5DB',       
  padding: 20,
  alignSelf: 'center',
},



  button: {
    position: 'absolute',
    bottom: 15,
    right: 35,
    backgroundColor: '#2F61E2',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },


  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
