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
  ModalMainView:{ backgroundColor: 'rgba(0,0, 0,0.8)', margin: 0 },
  SignOutModalInnerStyle:{
    marginHorizontal: 20,
    paddingHorizontal: 25,
    backgroundColor: '#9C2B2E',
    borderRadius: 38,
  },
  SignOutModalTextStyle:{ 
    textAlignVertical: 'center', 
    textAlign: 'center', 
    top: -40 
  },
  SignOutModalButtonView:{
    // top: 110,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  SignOutModalButtonStyle:{
    marginBottom: 30,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
  },
})

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
  innerMainView:{
    flex:1, 
    backgroundColor:Color.stiletto,
    marginHorizontal:30, 
    borderRadius:15, 
    alignItems:'center',
    justifyContent:'center'
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
  }
};
