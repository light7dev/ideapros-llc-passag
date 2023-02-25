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
  CoverPhotoView: { height: 200, width: '100%' },
  CoverPhotoImage: { height: 200, width: '100%', resizeMode: 'cover' },
  backArrowStyle: { height: 15, width: 30, resizeMode: 'contain' },
  profilePhotoImage: {
    height: 70,
    width: 70,
    marginTop: -30,
    resizeMode: 'cover',
    borderRadius: 10,
    // marginRight:140
  },
  editPhotoImage: { height: 25, width: 40, resizeMode: 'contain' },
  rowSB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prfileDetailView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  profileName: { color: Color.stiletto, fontSize: 20, fontWeight: 'bold' },
  profileBio: {
    // marginTop: 10,
    height: 30,
    // borderRadius: 8,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'black',
    margin: 0,
    padding: 0,
  },
  inviteCollabView: {
    flex: 1,
    // marginTop: 30,
    paddingHorizontal: 20,
  },
  inviteCollabText: { color: '#9C2B2E', fontSize: 16, fontWeight: 'bold' },
  cardMainView: {
    height: 80,
    width: 240,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 5,
  },
  cardWrapper: { flexDirection: 'row', paddingHorizontal: 15 },
  cardInnerView: {
    height: 60,
    width: 60,
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
    marginTop: 10,
  },
  inviteCollabName: { marginLeft: 10, marginTop: 20 },
  borderLineStyle: {
    width: 140,
    left: 10,
    top: -10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  deleteImage: {
    height: 15,
    width: 20,
    resizeMode: 'contain',
    marginLeft: 60,
  },

  modalView: { flex: 1, margin: 0, paddingHorizontal: 0 },

  AddTimeBtnStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 50,
    marginVertical: 20,
  },

  card2MainView: {
    height: 80,
    width: 240,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 15,
    marginStart: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 5,
  },
  leftAeroStyle: { height: 15, width: 20, resizeMode: 'contain' },
  myCollabView: {
    flex: 1,
    // justifyContent: 'space-between',
    justifyContent: 'space-evenly',
    // height: 200, // marginTop: -250,
    paddingHorizontal: 20,
  },
  myContentCardView: {
    marginBottom: 30,
    // flex: 0.4,
    height: 55,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // top: '-30%',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 5,
  },
  myContentCardImage: { height: 25, width: 30, resizeMode: 'contain' },
  myContentCardText: {
    color: Color.stiletto,
    fontSize: 18,
    fontWeight: 'bold',
    // marginLeft: '30%',
    // left: -46,
  },
  myContentCardText1: {
    color: Color.stiletto,
    fontSize: 20,
    fontWeight: 'bold',
    // marginLeft: 30,
    // left: -46,
  },
  myVaultCardView: {
    // flex: 0.4,
    height: 55,
    // top: -80,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 5,
  },
  myContentleftAero: {
    height: 15,
    width: 20,
    resizeMode: 'contain',
    // marginLeft: 150,
  },
  myContentleftAero1: {
    height: 15,
    width: 20,
    resizeMode: 'contain',
    marginLeft: 85,
  },
  changePasswordCardVie: {
    height: 55,
    backgroundColor: '#9C2B2E',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 5,
  },
  dardPassImage: { height: 25, width: 30, resizeMode: 'contain' },
  darkBackImage: {
    height: 15,
    width: 20,
    resizeMode: 'contain',
  },
  ModalMainView: { backgroundColor: 'rgba(0,0, 0,0.8)', margin: 0 },
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
    color: Color.steel,
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
  error: {
    color: Color.red,
    fontSize: 15,
    lineHeight: 17,
    marginHorizontal: 12,
    marginVertical: 8,
  },
};

export const titleInputStyles = {
  container: {
    flex: 1,
    // paddingTop: 30,
    // backgroundColor: 'red',
    backgroundColor: '#FBFCFE',
    // justifyContent: 'space-between',
  },
  labelParent: {
    paddingHorizontal: 20,
    // flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoSecond: {
    // flex: 1,
    // height: 740,
    backgroundColor: '#FBFCFE',
    // backgroundColor: 'yellow',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    justifyContent: 'flex-start',
  },
};

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
