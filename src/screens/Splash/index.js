import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// components
import { Layout, Images } from 'src/theme';

const SplashScreen = () => {
  const { fill, center } = Layout;
  return (
    <View style={[fill, center, styles.container]}>
      <Image resizeMode="cover" style={styles.image} source={Images.splash} />
      <Text style={styles.text}>Passages</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9C2B2E',
  },
  image: { width: 92, height: 110, resizeMode: 'contain' },
  text: {
    fontSize: 30,
    color: 'white',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
