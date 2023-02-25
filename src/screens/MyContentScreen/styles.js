import { StyleSheet } from 'react-native';

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

export const styles = StyleSheet.create({
  headerTitleStyle: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2540',
  },
  headerTitleText: {
    color: '#FBFCFE',
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#2C2540',
    flex: 1,
  },
  cardViewContainer: {
    paddingHorizontal: 20,
    marginTop: 35,
  },
  cardViewTitle: {
    color: '#FBFCFE',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardMainStyle: {
    backgroundColor: Color.white,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  cardInnerStyle: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
  },
  card_left_image: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: Color.steel,
  },
  card_center_view: {
    marginLeft: 10,
    marginTop: 5,
  },
  inviteCollab: {
    marginTop: 7,
    color: Color.red,
  },
  card_center_email: {
    marginTop: 0,
    width: 190,
    height: 40,
  },
  card_right_view: {
    top: -15.4,
    width: 60,
    right: -14.9,
    height: 60,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
  },
  inviteButtonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  inviteButtonTextView: {
    width: 120,
    height: 45,
    backgroundColor: Color.red,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardLinestyle: {
    borderWidth: 0.3,
    borderColor: Color.black,
    marginBottom: 5,
  },
  card_bottom_view: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cardDeleteStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
