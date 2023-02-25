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
  righIconCardsViewStyle: {
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  leftIconCardsViewStyle: {
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  rightIconCardsText: {
    color: '#9C2B2E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightIconCardsImage: { height: 25, width: 25, resizeMode: 'contain' },
  leftIconCardsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  backArrowStyle: { height: 15, width: 30, resizeMode: 'contain' },
  headerTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9C2B2E',
  },
  cardMainView: {
    paddingHorizontal: 20,
    borderColor: '#2B395F',
  },
  ModalMainView: { backgroundColor: 'rgba(0,0, 0,0.8)', margin: 0 },
  SignOutModalInnerStyle: {
    marginHorizontal: 20,
    paddingHorizontal: 25,
    backgroundColor: '#9C2B2E',
    borderRadius: 38,
  },
  SignOutModalTextStyle: {
    textAlignVertical: 'center',
    textAlign: 'center',
    top: -40,
  },
  SignOutModalButtonView: {
    // top: 110,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  SignOutModalButtonStyle: {
    marginBottom: 30,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
  },
});

export const forgotModalStyles = {
  labelParent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
    textAlignVertical: 'center',
  },
  innerMainView: {
    flex: 1,
    backgroundColor: Color.stiletto,
    marginHorizontal: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelH2: {
    color: 'white',
    fontSize: 15,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  inPutStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderStyle: {
    flex: 1,
    width: Dimensions.get('window').width - 90,
  },
  imageStyle: {
    flex: 1,
    marginTop: 20,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    // width: 145,
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    borderWidth: 1,
  },
  textButton: {
    fontSize: 16,
    fontWeight: '700',
  },
};

export const textInputStyles = {
  textInput: {
    flex: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 7,
    color: 'white',
  },
  textInputParent: {
    borderColor: '#CCCCCC',
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
    height: 60,
  },
  imageStyle: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  label: { color: '#6A6A6A', fontSize: 12 },
  error: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 17,
    marginHorizontal: 12,
    marginVertical: 8,
  },
};
