import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  title: {
    fontSize: 23,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    marginTop : 30
  },
  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 210,
    marginTop : 50,
  },
  percent: {
    textAlign: "right",
    left: 10,
    fontWeight: "600",
    fontSize : 22
  },
  infoBox: {
    borderWidth : 2,
    borderColor : "#d3d7d2ff",
    borderRadius: 30,
    padding: 13,
    marginBottom: 60,
    height : 160,
    width : 300,
    right : 20
  },
  infoText: {
    fontSize: 10,
    color: "#8e8686ff",
    fontFamily : "arial"
  },
  infoText2:{
    fontSize: 10,
    fontWeight : "800",
    color: "rgba(125, 168, 205, 1)",
    fontFamily : "arial"
  },
  infoIcon: {
    height : 30,
    width : 30,
    alignItems : "center",
    bottom : 20
  },
  button: {
    backgroundColor: "#2F6BFF",
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    width : 200,
    left : 78
  },
  buttonText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "600",
  },
});
export default styles;
