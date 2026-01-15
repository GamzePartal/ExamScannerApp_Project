import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center" 
  },

  preview: {
    position: "absolute",
    top: 65,
    flexDirection: "row",
    gap: 8,
    alignSelf: "center",
  },

  previewItem: {
    position: "relative",
  },

  previewImg: {
    width: 64,
    height: 90,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },

  deleteIcon: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#DC2626",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },

  bottom: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
    gap: 10,
  },

  btn: {
    width: 200,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },

  text: { color: "#fff", fontWeight: "700" },

  back: { marginTop: 10 },
});

export default styles