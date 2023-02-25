import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size) => (width / guidelineBaseWidth) * size;
const scaleVertical = (size) => (height / guidelineBaseHeight) * size;

export const Color = {
  malibu: '#46E1FD',
  white: '#fff',
  whiteOff: '#F4F5F9',
  steel: '#CCCCCC',
  black: '#000',
  facebook: '#3b5998',
  google: '#4285F4',
  red: 'red',
  stiletto: '#9C2B2E',
};

export const styles = StyleSheet.create({
  eventType: {
    color: Color.stiletto,
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addImagesStyle: {
    color: Color.stiletto,
    paddingVertical: 15,
  },
  uploadStyle: {
    flex: 1,
    height: 145,
    // width: 153,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#000000',
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadImageStyle: { height: 25, width: 40, resizeMode: 'contain' },
  backAndSaveView: {
    flex: 1,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addVideoText: { color: Color.stiletto, paddingBottom: 15 },
  plusColor: { color: Color.stiletto },
  rowSB: { flexDirection: 'row', justifyContent: 'space-between' },
  rowPV20: { flexDirection: 'row', paddingVertical: 20 },
  PH28_MT10: { paddingHorizontal: 28, marginTop: 10 },
  PH_MT_25: { paddingHorizontal: 25, marginTop: 25 },
  ShareButtonStyle: {
    height: 62,
    marginVertical: 20,
    alignSelf: 'center',
    width: '50%',
  },
  PH15: { paddingHorizontal: 15 },
  P28: { padding: 28 },
  P25: { padding: 25 },
  timePressStyle: { flex: 1, zIndex: 2 },
  mainTitle: {
    color: Color.stiletto,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    lineHeight: 24,
  },
  staticTitle: {
    color: '#8D8D8D',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Montserrat-Bold',
  },
  splishImageStyle: {
    height: 91,
    width: 78,
    resizeMode: 'contain',
  },
  backArrowStyle: { height: 15, width: 30, resizeMode: 'contain' },
  dateTimeBoxStyle: {
    paddingHorizontal: 25,
    marginTop: 25,
    paddingTop: 10,
    borderWidth: 2,
    borderRadius: 17,
    borderColor: '#9C2B2E',
    margin: 10,
  },
  addMultiVideoView: { flexDirection: 'row', marginTop: 20 },
  addTextView: { flexDirection: 'row', paddingVertical: 20 },
  previewButtonStyle: { marginTop: 20, marginBottom: 10, height: 62 },
  primaryButtonStyle: { height: 62, flex: 1 },
  AddTimeBtnStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 50,
    marginVertical: 20,
  },
  modalView: { flex: 1, margin: 0, padding: 0 },
});

export const titleInputStyles = {
  container: {
    flex: 1,
    // backgroundColor: '#2C2540',
    backgroundColor: 'red',
  },
  textInput: {
    borderColor: Color.stiletto,
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: 18,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 7,
    color: Color.black,
  },
  labelParent: {
    // backgroundColor: 'red',
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: { color: Color.stiletto, fontSize: 10, fontWeight: 'bold' },

  inviteCard: {
    top: 50,
    height: 80,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  cardCVV: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  error: { color: Color.red, fontSize: 9, marginLeft: 12 },
  image: { width: 100, height: 120 },
  text: {
    fontSize: 25,
    color: 'white',
    marginTop: 8,
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 25,
    color: 'white',
    marginTop: 8,
    // fontWeight: 'bold',
  },
  logo: {
    marginTop: -30,
    paddingHorizontal: 30,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoSecond: {
    flex: 1,
    backgroundColor: '#FBFCFE',
    // backgroundColor: 'red',
    // justifyContent: 'center',
  },
};
