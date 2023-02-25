import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Image, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import RNFS from 'react-native-fs';
import { RNCamera } from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';

//components
import { CircularProgress } from 'src/components';
import { checkForPermissions } from '../../utils/Permission';
// styles
import styles from './styles';

import { Layout, Images, Gutters, Colors } from 'src/theme';

// import { Layout, Images, Gutters, Colors } from 'src/Theme';
const { row, fill, center, justifyContentBetween, alignItemsCenter } = Layout;
const { mediumTMargin, smallHPadding } = Gutters;

const Camera = (props) => {
  const {
    navigation: { navigate, goBack },
  } = props;
  const ref = useRef(null);
  const [timer, setTimer] = useState(null);
  const [fileName, setFileName] = useState('');
  const [video, setVideo] = useState(null);
  const [duration, setDuration] = useState(0);
  const [recording, setRecording] = useState(false);
  const [cameraType, setCameraType] = useState('front');
  const isMounted = useRef(true);

  useEffect(() => {
    checkForPermissions();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const changeCameraType = () => {
    if (cameraType === 'back') {
      setCameraType('front');
    } else {
      setCameraType('back');
    }
  };

  const onStartRec = async () => {
    const date = new Date();
    const name = `${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}_${date.getDate()}_${
      date.getMonth() + 1
    }_${date.getFullYear()}`;
    setFileName(name);
    const LOCAL_PATH_TO_VIDEO =
      Platform.OS === 'ios'
        ? `${RNFS.DocumentDirectoryPath}/${fileName}.mp4`
        : `${RNFS.DownloadDirectoryPath}/${fileName}.mp4`;
    try {
      if (recording) {
        return;
      }
      setRecording(true);
      setDuration(0);
      let t = setInterval(() => {
        setDuration((duration) => duration + 1);
      }, 1000);
      setTimer(t);
      let video = await ref.current.recordAsync({
        mirrorVideo: true,
        maxDuration: 120,
      });
      clearInterval(timer);
      setRecording(false);
      setVideo({ ...video, duration });
      CameraRoll.save(video.uri, LOCAL_PATH_TO_VIDEO).then((r) => {});
    } catch (error) {
      setRecording(false);
    }
  };

  const onStopRec = async () => {
    try {
      ref.current.stopRecording();
      clearInterval(timer);
    } catch (error) {
      setRecording(false);
    }
  };

  return (
    <SafeAreaView style={fill}>
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={cameraType}
          ref={ref}
          playSoundOnRecord={true}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          <View style={[row, mediumTMargin, smallHPadding, justifyContentBetween]}>
            <View style={{ marginTop: '-160%' }}>
              <TouchableOpacity onPress={() => goBack()}>
                <Text style={{ color: 'red', fontSize: 18 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={[fill, row, center, styles.camButtons]}>
              <View style={fill} />
              {recording ? (
                <>
                  <View style={[fill, alignItemsCenter]}>
                    <TouchableOpacity style={styles.record} onPress={onStopRec}>
                      <CircularProgress
                        progress={(duration * 100) / 120}
                        size={{ width: 62, height: 62 }}
                        strokeWidth={8}
                        progressColor={Colors.nileblue}
                      >
                        <View style={styles.recording} />
                      </CircularProgress>
                    </TouchableOpacity>
                  </View>
                  <View style={fill} />
                </>
              ) : (
                <View style={{ flex: 19, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View>
                    {/* <Button text={'Photo'}
                   rounded
                   full
                   style={{
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'red',
                    width:50,
                    borderRadius:50,
                    color:'white'
                   }}
                   onPress={() => navigate('Photo') }
                    /> */}
                  </View>
                  <View>
                    <TouchableOpacity style={[fill, alignItemsCenter]} onPress={onStartRec}>
                      <Image source={Images.record} style={styles.record} />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity onPress={changeCameraType} style={[fill, alignItemsCenter]}>
                      <Image source={Images.refresh} style={styles.refresh} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </RNCamera>
      </View>
    </SafeAreaView>
  );
};

export default Camera;
