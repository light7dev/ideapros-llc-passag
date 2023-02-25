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
  backArrowStyle: { height: 15, width: 30, resizeMode: 'contain' },
  splishImageStyle: {
    height: 91,
    width: 78,
    resizeMode: 'contain',
  },
  P28: { padding: 28 },
  PH_MT_25: { paddingHorizontal: 25, marginTop: 25 },
  rowPHMT25: { paddingHorizontal: 25, marginTop: 25, flexDirection: 'row' },
  PH28_MT10: {
    paddingHorizontal: 28,
    marginTop: 10,
  },
  mainTitle: {
    color: Color.stiletto,
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
    lineHeight: 24,
    justifyContent: 'center',
    textAlign: 'center',
  },
  eventTypeView: {
    left: 25,
    height: 28,
    width: 179,
    backgroundColor: 'rgba(156, 43, 46, 0.41)',
    borderRadius: 33,
  },
  eventTypeText: {
    textAlign: 'center',
    marginTop: 6,
    fontStyle: 'italic',
    fontSize: 14,
    fontFamily: 'Montserrat',
    lineHeight: 17,
  },
  mainTitle1: {
    color: Color.stiletto,
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
  },
  dedicateNameText: {
    paddingTop: 10,
    color: '#2C2540',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  dateImage: { height: 19, width: 20, resizeMode: 'contain' },
  dateText: {
    color: Color.stiletto,
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    left: 10,
  },
  videoWrapper: {
    flex: 1,
    // padding: 8,
    // backgroundColor: 'red',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  videoStyle: {
    height: 136,
    width: 136,
    borderRadius: 10,
    margin: 5,
    // backgroundColor: 'green',
  },
  imageWrapper: {
    flex: 1,
    // padding: 8,
    // backgroundColor: 'pink',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  imageStyle: {
    height: 136,
    width: 136,
    borderRadius: 10,
    resizeMode: 'cover',
    margin: 5,
  },
  multiTextView: {
    flex: 1,
    marginVertical: 10,
  },
  borderLineStyle: { borderWidth: 1, borderColor: '#C4C4C4' },
  initeCollabView: { marginTop: 10, flexDirection: 'row' },
  invitedCollabImageStyle: { height: 19, width: 21, borderRadius: 10, resizeMode: 'contain' },
  inviteCollabText: {
    marginLeft: 10,
    color: Color.stiletto,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardViewStyle: {
    height: 80,
    backgroundColor: 'white',
    marginTop: 20,
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
  cardViewMain: { flexDirection: 'row', paddingHorizontal: 15 },
  cardViewInner: {
    height: 80,
    justifyContent: 'center',
  },
  cardViewImage: { height: 50, width: 50, resizeMode: 'contain', borderRadius: 5 },
  cardDedicateName: { marginLeft: 10, marginTop: 20 },
  cardCollabEmail: { marginLeft: 10, color: '#2C2540' },
  backButtonStyle: {
    height: 62,
    marginVertical: 20,
    alignSelf: 'center',
    width: '50%',
  },
});

export const titleInputStyles = {
  container: {
    flex: 1,
    // backgroundColor: '#2C2540',
    backgroundColor: 'red',
  },
  labelParent: {
    // backgroundColor: 'red',
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoSecond: {
    flex: 1,
    backgroundColor: '#FBFCFE',
    // backgroundColor: 'red',
    // justifyContent: 'center',
  },
};
