import { StyleSheet } from "react-native"
import { color } from "react-native-reanimated"


export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFCFE',
  },
  backArrowStyle:{ height: 15, width: 30, resizeMode: 'contain' },
  innerContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  screenTitle:{
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9C2B2E',
    lineHeight: 24,
  },
  firstText:{
    color: '#9C2B2E',
    // fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'auto',
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default StyleSheet.create({
  SubHeaders: {
    color: "#3A3A3A",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Inter"
  },
  TermText: {
    color: "#8C8C8C",
    fontFamily: "Inter",
    fontSize: 12,
    lineHeight: 20,
    height: 230,
    width: 297
  },
  TermTexts: {
    color: "#8C8C8C",
    fontFamily: "Inter",
    fontSize: 12,
    lineHeight: 20,
    height: 300,
    width: 297
  },
  scrollView: {
    marginHorizontal: 20
  },
  cameraImg: {
    height: 64,
    width: 64,
    resizeMode: "contain"
  },
  camContainer: { justifyContent: "center", alignItems: "center" }
})
