import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  lottie: {
    width: 280,
    height: 280,
    alignSelf: "center",
    marginTop: 260,
    alignContent : "center",
    justifyContent : "center"
  },
  text: {
    fontSize: 26,
    textAlign: "center",
    bottom : 30,
    fontFamily : "Inter",
    fontWeight : 600,
    letterSpacing:1,
  },
  cancelIcon : {
    width:20,
    height:20,
    bottom : 244,
    left : 166,
  }

})

export default styles;

