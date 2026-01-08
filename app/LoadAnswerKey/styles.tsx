import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },

  container: {
    flex: 1,
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 95,
  },

  card: {
    width: 320,
    height: 380,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    marginTop: 40,
    alignItems: "center",
    paddingTop: 20,
  },

  cloud: {
    width: 120,
    height: 120,
    marginTop: 80,
  },

  info: {
    marginTop: 16,
    textAlign: "center",
    color: "#374151",
    fontSize: 11,
  },

  success: {
    width: 140,
    height: 140,
  },

  photo: {
    width: 80,
    height: 110,
    margin: 6,
    borderRadius: 8,
    marginTop: 10,
  },

  delete: {
    position: "absolute",
    top: 6,
    right: 2,
    backgroundColor: "#DC2626",
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },

  deleteText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  hintText: {
    fontSize: 13,
    color: "#6B7280",
    bottom: 13
  },

  btn: {
    marginTop: 20,
    width: 255,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  backBtn: {
    position: "absolute",
    top: 90,
    left: 16,
    zIndex: 10,
  },

  backIcon: {
    width: 16,
    height: 17,
  },
});

export default styles;