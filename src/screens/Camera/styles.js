import { StyleSheet } from "react-native"
// import { Colors } from "@src/Theme"
import {  Colors  } from 'src/theme';


export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  },
  textWrapper: {
    width: 400,
    height: 40,
    backgroundColor: "#2C3841",
    borderBottomWidth: 1,
    borderColor: "#495A66"
  },
  touch: {
    justifyContent: "center",
    alignItems: "center"
  },
  topButtonWrapper: {
    position: "absolute"
  },
  filtersWrapper: {
    backgroundColor: "#2C3841",
    height: 118,
    borderWidth: 1,
    borderColor: Colors.riverbed
  },
  camButtonsWrapper: {
    width: "100%",
    height: 100,
    backgroundColor: "#495A66"
  },

  subTextWrapper: {
    backgroundColor: "#2C3841",
    height: 110,
    borderBottomColor: Colors.riverbed,
    borderWidth: 1
  },
  mediaImage: { width: 60, resizeMode: "contain" },
  record: {
    width: 62,
    height: 62,
    resizeMode: "contain"
  },
  refresh: { width: 48, height: 48 },
  camButtons: { marginBottom: 40 }
})
