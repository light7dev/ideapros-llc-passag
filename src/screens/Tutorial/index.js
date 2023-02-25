import React, { useState, useEffect, useRef } from 'react';
import Video from 'react-native-video';
import { connect } from 'react-redux';
import { Images } from 'src/theme';
import {
  View,
  Image,
  AppState,
  BackHandler,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const Tutorial = (props) => {
  const {
    navigation: { navigate },
    data,
  } = props;
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    setTimeout(() => {
      setPaused(false);
    }, 150);
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      }

      appState.current = nextAppState;
      if (!paused) {
        setPaused(true);
      }
    });

    return () => {
      // subscription.remove();
    };
  }, []);

  const backAction = () => {
    setPaused(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* {paused ? (
        <TouchableOpacity
          onPress={() => {
            setLoading(true);
            setPaused(false);
          }}
          style={{
            left: 20,
            top: 5,
            width: '13%',
            height: '7%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'green',
            zIndex: 9999,
          }}
        >
          <Image
            source={Images.BackAeroLight}
            style={{ height: 15, width: 30, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      ):null} */}

      <TouchableOpacity
        style={{ flex: 1, justifyContent: 'center' }}
        onPress={() => {
          setPaused(!paused);
        }}
        activeOpacity={1}
        disabled={loading}
      >
        <Video
          muted={false}
          repeat={true}
          autoplay={true}
          paused={paused}
          source={{
            uri: data?.introduction_video,
          }}
          onLoad={() => setLoading(false)}
          disableFocus={true}
          resizeMode={'stretch'}
          style={{ flex: 1 }}
        />
        {loading ? (
          <ActivityIndicator
            size="small"
            color="#9C2B2E"
            style={{ position: 'absolute', zIndex: 9999, alignSelf: 'center' }}
          />
        ) : null}
        {paused && !loading ? (
          <Image
            resizeMode="cover"
            style={{ width: 68, height: 68, alignSelf: 'center', position: 'absolute' }}
            source={Images.play}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({
  data: state.mainScreen.data,
});

const mapDispatchToProps = (dispatch) => ({
  getIntroAction: () => dispatch(getIntroAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
