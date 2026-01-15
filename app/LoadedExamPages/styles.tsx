import { StyleSheet } from "react-native";

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

export default styles