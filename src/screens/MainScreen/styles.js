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
  container: {
    // paddingVertical: 30,
    flex: 1,
    // justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2C2540',
    // backgroundColor: 'yellow',
  },
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
  video: {
    width: '80%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoArea: {
    marginTop: -220,
    width: 241,
    height: 241,
    backgroundColor: '#C4C4C4',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePhotos: {
    width: '100%',
    height: 200,
    position: 'absolute',
    zIndex: -1,
    bottom: 80,
  },
  textStep: {
    fontSize: 30,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#9C2B2E',
    textAlign: 'center',
  },
  textStepSmall: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: '400',
    color: 'black',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  stepText: { fontSize: 30, marginTop: 10, fontWeight: 'bold', color: 'white' },
  buttonText: {
    width: 213,
    height: 58,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9C2B2E',
    marginTop: '-10%',
    alignSelf: 'center',
  },
  textButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagePlay: {
    width: 68,
    height: 68,
  },
  videoInnerView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 241,
    height: 241,
    borderRadius: 20,
  },
  pauseImage: { width: 68, height: 68, position: 'absolute' },
});
