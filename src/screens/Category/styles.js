import { StyleSheet } from 'react-native';
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
    marginBottom: 10,
    width: 230,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  videoArea: {
    marginTop: -40,
    width: 150,
    height: 150,
    backgroundColor: '#2C2540',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  imagePlay: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  stepText: {
    marginTop: 20,
  },
  textStep: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.stiletto,
  },
  textSubHeading: {
    marginTop: 20,
    fontSize: 15,
    color: 'black',
  },
  tabAdd: { color: Color.stiletto, fontWeight: 'bold' },
  profileImageStyle: {
    height: 60,
    width: 60,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  emptyImageStyle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Color.steel,
    marginTop: 10,
  },
  rowMT44: { flexDirection: 'row', marginTop: 40 },
});

export const titleInputStyles = {
  profileCard: { height: 50, width: 50, borderRadius: 10, borderColor: 'silver', marginBottom: 5 },
  container: {
    paddingTop: 30,
    backgroundColor: '#2C2540',
  },
  nameText: {
    fontSize: 16,
    color: '#E3F1E3',
    marginTop: 8,
    fontFamily: 'Montserrat-Bold',
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 20,
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  image: {
    width: 100,
    height: 120,
    position: 'absolute',
    right: 0,
    zIndex: -1,
  },
  logoSecond: {
    flex: 1,
    backgroundColor: '#FBFCFE',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
  },
  labelParent: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 36,
  },
  label: {
    color: Color.stiletto,
    fontSize: 25,
    fontWeight: 'bold',
  },
  cardStyle: {
    marginVertical: 10,
    marginLeft: 10,
  },
};
