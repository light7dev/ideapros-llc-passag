import React, { useEffect } from 'react';
import { View, Image, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button } from '../../components';
import { styles } from './styles';
import { connect } from 'react-redux';
import { Images } from 'src/theme';
import { getIntroAction } from './redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainScreen = (props) => {
  const {
    navigation: { navigate },
    data,
  } = props;

  useEffect(() => {
    props.getIntroAction();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={styles.logo}>
          <Image resizeMode="cover" style={styles.image} source={Images.splash} />
          <Text style={styles.text}>Passages</Text>
        </SafeAreaView>
        <View style={styles.video}>
          <View style={styles.videoArea}>
            {data ? (
              <TouchableOpacity
                onPress={() => {
                  navigate('Tutorial');
                }}
                style={styles.videoInnerView}
              >
                <Image resizeMode="cover" style={styles.pauseImage} source={Images.play} />
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.stepText}>
            <Text style={styles.textStep}>{data?.title}</Text>
            <Text style={styles.textStepSmall}>{data?.description}</Text>
          </View>
        </View>
        <Button
          onPress={() => {
            AsyncStorage.getItem('authToken').then((token) => {
              if (token) {
                navigate('Category');
              } else {
                navigate('Login');
              }
            });
          }}
          text={'GET STARTED'}
          color={'primary'}
          full
          style={styles.buttonText}
        />
        <Image resizeMode="cover" style={styles.imagePhotos} source={Images.photos} />
      </View>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.mainScreen.data,
});

const mapDispatchToProps = (dispatch) => ({
  getIntroAction: () => dispatch(getIntroAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
