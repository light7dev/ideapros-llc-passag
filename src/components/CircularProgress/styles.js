import { StyleSheet } from "react-native"

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  progressContainer: {
    transform: [{ rotate: "-90deg" }]
  },
  placeholderCircle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center"
  },
  textHolder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    transform: [{ rotate: "90deg" }]
  }
})
