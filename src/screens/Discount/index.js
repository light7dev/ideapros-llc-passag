import React from 'react';
import { View, StyleSheet, Image, Text, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../../components';
import { Images } from 'src/theme';

const Discount = (props) => {
  const {
    navigation: { navigate },
  } = props;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.logo}>
        <Image resizeMode="cover" style={styles.image} source={Images.splash} />
        <Text style={styles.text}>Passages</Text>
      </SafeAreaView>
      <View style={styles.video}>
        <View style={styles.stepText}>
          <Text style={styles.textStep}>SAVE 20% on the Premium Package</Text>
          <Text style={styles.textStepSmall}>Press ‘’GO PREMIUM’’to receive the discount.</Text>
          <Text
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              marginTop: 10,
              color: '#9C2B2E',
              fontWeight: 'bold',
            }}
          >
            Skip
          </Text>
        </View>
      </View>
      <Button
        onPress={() => navigate('Eternal')}
        text={'GO PREMIUM'}
        color={'primary'}
        full
        style={styles.buttonText}
      />
      <Image resizeMode="cover" style={styles.imagePhotos} source={Images.photos} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2C2540',
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
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 50,
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
    // marginTop: 5,
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
});

// export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
export default Discount;
