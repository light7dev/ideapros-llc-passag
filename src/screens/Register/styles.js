import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size) => (width / guidelineBaseWidth) * size;
const scaleVertical = (size) => (height / guidelineBaseHeight) * size;

export const forgotModalStyles = { 
  // tockeImg: { width: 50, height: 50, resizeMode: 'contain', flex: 1 },
  otpBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  otpImage2: { width: 35, height: 35, resizeMode: 'contain' },
  // image: { width: 80, height: 100, resizeMode: 'contain' },
};


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

export const buttonStyles = {
  viewStyle: {
    backgroundColor: Color.stiletto,
    borderRadius: 16,
    borderColor: Color.stiletto,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    height: 62,
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
    borderColor: Color.steel,
    borderRadius: 5,
    fontSize: 18,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 7,
    color: Color.black,
    flex: 1,
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
    marginLeft: 8,
  },
  imageStyle: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  checkBoxParent: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 10,
  },
  checkBox: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: Color.stiletto,
    marginHorizontal: 15,
  },
  checkBoxText: { marginLeft: 5 },
  termsText: {
    color: Color.stiletto,
    fontSize: 14,
    fontWeight: 'bold',
  },
  socialImages: { width: 55, height: 55, resizeMode: 'contain' },
  socialImagesParent: {
    top:-1,
    flex: 1,height:40,
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  otpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 15,
    padding: 0,
  },
  otpInputText: {
    borderWidth: 3,
    borderRadius: 8,
    width: 30,
    height: 30,
    fontSize: 16,
    lineHeight: 16,
    padding: 0,
  },
  // label: { color: '#6A6A6A', fontSize: 12 },
  error: {
    color: Color.red,
    fontSize: 15,
    lineHeight: 17,
    marginHorizontal: 12,
    marginVertical: 8,
  },
};

export const titleInputStyles = {
  labelParent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 87,
    paddingHorizontal: 36,
  },
  label: { color: Color.stiletto, fontSize: 30, fontWeight: 'bold' },
  tickImageStyle:{
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
};
