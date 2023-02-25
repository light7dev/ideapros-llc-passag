export const Color = {
  malibu: '#46E1FD',
  white: '#fff',
  whiteOff: '#F4F5F9',
  steel: '#CCCCCC',
  black: '#000',
  facebook: '#3b5998',
  google: '#4285F4',
  red: '#9C2B2E',
  stiletto: '#9C2B2E',
};
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size) => (width / guidelineBaseWidth) * size;
const scaleVertical = (size) => (height / guidelineBaseHeight) * size;

export const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    width: 129,
    // flex: 1,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    borderWidth: 1,
  },
  textButton: {
    fontSize: 16,
    fontWeight: '700',
    position: 'absolute',
  },
  backArrowStyle: { height: 15, width: 30, resizeMode: 'contain' },
  mainViewAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  screenTitle: { textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#9C2B2E' },
  cardWrapper: {
    flex: 1,
    marginHorizontal: 20,
    borderColor: '#2B395F',
    marginTop: 60,
  },
  addCardBtn: { height: 62, marginVertical: 20, alignSelf: 'center', width: '50%' },
  modalView: { backgroundColor: 'rgba(0,0, 0,0.8)', margin: 0 },
  modalInnerView: { flex: 1, backgroundColor: 'rgba(0,0, 0,0.8)' },
  PH15: { paddingHorizontal: 15 },
  addandBackBtnStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 65,
  },
  modalDateMainView: { backgroundColor: 'black', margin: 0 },
  modalDateInnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalAddBtn: {
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 50,
    marginVertical: 20,
  },
});

export const textInputStyles = {
  textInput: {
    flex: 1,
    borderColor: Color.steel,
    borderRadius: 5,
    fontSize: 18,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 7,
    color: Color.black,
  },
  textInputParent: {
    borderColor: Color.steel,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  textInputParentInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  label: { color: '#6A6A6A', fontSize: 12 },
  error: {
    color: Color.red,
    fontSize: 15,
    lineHeight: 17,
    marginHorizontal: 12,
    marginVertical: 8,
  },
};

export const cardStyles = {
  mainView: {
    backgroundColor: Color.red,
    height: 179,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  firstView: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  lTitleStyles: { color: Color.white, fontSize: 14, fontWeight: 'bold' },
  rTitleStyles: { color: Color.white, fontSize: 14, fontWeight: 'bold' },
  secondView: { flexDirection: 'row', justifyContent: 'flex-start', marginTop: 38 },
  starStyle: { color: Color.white, marginRight: 20, lineHeight: 20 },
  thirdView: { flexDirection: 'row', justifyContent: 'flex-end' },
  deleteBtnStyle: { height: 45, marginVertical: 20, alignSelf: 'center', width: '45%' },
};

export const titleInputStyles = {
  container: {
    flex: 1,
    // backgroundColor: 'yellow',
    // paddingTop: 30,
    // backgroundColor: 'transparent',
    // justifyContent: 'space-between',
  },
  labelParent: {
    // backgroundColor: 'red',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // marginTop: -54,
    paddingHorizontal: 36,
  },
  label: {
    color: Color.stiletto,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30, // backgroundColor: 'yellow',
  },
  cardStyle: {
    // height: 420,
    // marginVertical: 10,
    marginHorizontal: 15,
  },
  logoSecond: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 229,
    // justifyContent: 'center',
  },
};
