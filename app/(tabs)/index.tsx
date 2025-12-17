import { Link } from "expo-router";
import { StyleSheet, Text, View } from 'react-native';


export default function HomeScree() {
 return(
 
 <View style = {style.container}>
    <Text style = {style.title}> Home Screen</Text>
    <Link href="/details" style={style.link}>detay için</Link>

  </View>

);
}

const style = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },


  title: {
    fontSize : 20
  },

  link: {
    marginTop: 20,
    fontSize: 20,
    color: "blue",
    textDecorationLine: "underline",
  },



});





























/*
const Counter = () => {

  const [count, setcount] = useState(0);
  

  return(
    <View style = {styles.container}>
      <Text style = {styles.text}>{count}</Text>
        <Button  title='Arttır' onPress={() => setcount(count+1)}> </Button>
        <Button color={"red"} title='Azalt' onPress={() => setcount(count -1)}></Button>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex :1,
    justifyContent : "center",
    alignItems : "center"
  },

  text: {
    fontSize : 30,
  }

});

export default Counter;
*/