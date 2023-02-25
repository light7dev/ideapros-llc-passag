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
  video: {
    flex: 1,
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 28,
    paddingHorizontal: 18,
    backgroundColor: Color.stiletto,
    borderRadius: 38,
  },
  dotStyle: {
    height: 30,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
  },
  dotImage: {
    margin: 10,
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
  },
  dotImageStyle: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    marginTop: 8,
  },
});
export const buttonStyles = {
  viewStyle: {
    backgroundColor: Color.stiletto,
    borderRadius: 16,
    borderColor: Color.stiletto,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    height: 62,
    marginTop: 31,
  },
  textStyleParent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    color: Color.white,
    textAlignVertical: 'center',
    fontFamily: 'Montserrat-Bold',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 20,
    /* identical to box height */
    textTransform: 'uppercase',
  },
};

export const textInputStyles = {
  textInput: {
    flex: 1,
    borderColor: Color.steel,
    borderRadius: 5,
    fontSize: 18,
    fontWeight: '400',
    marginVertical: 10,
    marginHorizontal: 10,
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
    height: 60,
  },
  imageStyle: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  checkBoxParent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  checkBoxText: { marginLeft: 5 },
  termsText: {
    color: Color.stiletto,
    fontSize: 14,
    fontWeight: 'bold',
  },
  socialImages: { width: 55, height: 55, resizeMode: 'contain' },
  socialImagesParent: {
    flex: 1,
    height: 40,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  signInText: {
    textAlign: 'center',
    width: '100%',
    fontSize: 14,
    marginTop: 28,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  otpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 15,
    padding: 0,
  },
  otpInputText: {
    borderWidth: 2,
    borderRadius: 5,
    borderBottomWidth: 2,
    width: 30,
    height: 30,
    fontSize: 16,
    // lineHeight: 16,
    padding: 0,
  },
  // label: { color: '#6A6A6A', fontSize: 12 },
  error: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 17,
    marginHorizontal: 12,
    marginVertical: 8,
  },
};

export const titleInputStyles = {
  container: {
    paddingTop: 30,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#2C2540',
  },
  labelParent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 44,
    paddingHorizontal: 36,
  },
  label: { color: Color.stiletto, fontSize: 30, fontWeight: 'bold' },
  // error: { color: Color.red, fontSize: 9, marginLeft: 12 },
  image: { width: 80, height: 100, resizeMode: 'contain' },
  text: {
    fontSize: 25,
    color: 'white',
    marginTop: 8,
    fontWeight: 'bold',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSecond: {
    flex: 1,
    backgroundColor: Color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 40,
  },
};

export const forgotModalStyles = {
  labelParent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tockeImg: { width: 50, height: 50, resizeMode: 'contain', flex: 1 },
  otpBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  otpImage2: { width: 23, height: 18, resizeMode: 'contain' },
  label: {
    color: Color.white,
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
    textAlignVertical: 'center',
  },
  labelH2: {
    color: Color.white,
    fontSize: 15,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  inPutStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: { color: Color.red, fontSize: 9, marginLeft: 12 },
  errorMessageStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#f7f7f7',
    marginVertical: 10,
    borderRadius: 10,
  },
  errorMessageTextStyle: {
    color: '#9c2b2e',
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 17,
    marginHorizontal: 12,
    marginVertical: 8,
  },
  renderStyle: {
    flex: 1,
    width: Dimensions.get('window').width - 90,
    height: Dimensions.get('window').height - 220,
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
