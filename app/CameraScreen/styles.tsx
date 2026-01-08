import { StyleSheet } from "react-native";

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

export default styles;
