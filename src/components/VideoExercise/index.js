import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const VideoExercise = ({ videoUrl, containerStyle, paused, onLoad }) => (
  <View style={[styles.videoContainer, containerStyle]}>
    <Video
      muted={true}
      repeat={true}
      autoplay={true}
      onLoad={onLoad}
      paused={paused}
      resizeMode={'cover'}
      source={videoUrl}
      disableFocus={true}
      mixWithOthers={'mix'}
      playInBackground={true}
      playWhenInactive={true}
      style={styles.videoStyle}
      ignoreSilentSwitch="ignore"
    />
  </View>
);

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 10,
    borderRadius: 20,
  },
  videoStyle: { height: 241, width: '100%', borderRadius: 20 },
});

export default VideoExercise;
