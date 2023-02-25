// import React,{useState} from 'react';
// import {
//     View,
//     StyleSheet,
//     TouchableOpacity,
//     Image,
//     Text
// } from 'react-native';
// import { RNCamera } from 'react-native-camera';
// import { useCamera } from 'react-native-camera-hooks';
// import CustomButton from '../../utils/CustonButton'
// import RNFS from 'react-native-fs';
// import { Button } from '../../components';

// import { Layout, Images, Gutters, Colors , } from 'src/theme';
// import { BackgroundImage } from 'react-native-elements/dist/config';


// const Photo=(props)=> {
//     const {
//         navigation: {navigate, goBack }
//       } = props

//     const [{ cameraRef }, { takePicture }] = useCamera(null);
//     const [cameraType, setCameraType] = useState("front")

//     const captureHandle = async () => {
//         try {
//             const data = await takePicture();
//             console.log(data.uri);
//             const filePath = data.uri;
//             const newFilePath = RNFS.ExternalDirectoryPath + '/MyTest.jpg';
//             RNFS.moveFile(filePath, newFilePath)
//                 .then(() => {
//                     console.log('IMAGE MOVED', filePath, '-- to --', newFilePath);
//                 })
//                 CameraRoll.save(video.uri, LOCAL_PATH_TO_VIDEO).then(r => {
//                     console.log("Saved directory path", r)
//                   })
//                 .catch(error => {
//                     console.log(error);
//                 })
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     const changeCameraType = () => {
//         if (cameraType === "back") {
//           setCameraType("front")
//         } else {
//           setCameraType("back")
//         }
//       }

//     return (
//         <View style={styles.body}>
//             <RNCamera
//                 ref={cameraRef}
//                 type={RNCamera.Constants.Type.back}
//                 style={styles.preview}
//             >
             
//                 {/* <CustomButton
//                     title="Capture"
//                     color='white'
                   
//                     onPressFunction={() => captureHandle()}
//                 /> */}
//                 <View style={{flexDirection:'row'}}>
//                 <View style={{marginTop:39 }}>
//                     <TouchableOpacity onPress={() => goBack()}>
//                       <Text style={{ color: "red", fontSize: 18 }}>Cancel</Text>
//                     </TouchableOpacity>
//                   </View>
//                   <View>
//                   <Button text={'Photo'}
//             rounded
//             full
//             style={styles.buttonText}   onPress={() => captureHandle()} />
//                   </View>
            
                 
//                 </View>
                
//             </RNCamera>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     body: {
//         flex: 1,
//     },
//     preview: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'flex-end',
//     },
//     buttonText:{
//         justifyContent:'center',
//         alignItems:'center',
//         backgroundColor:'red',
//         left:'20%',
//         margin:30,
//         width:50,
//         borderRadius:50,
//         color:'white'
//     }
// });
// export default Photo
import React, { useState, useRef, useEffect } from "react"
import {
  Text,
  View,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity
} from "react-native"
import RNFS from "react-native-fs"
import { RNCamera } from "react-native-camera"
import CameraRoll from "@react-native-community/cameraroll"

import {
  check,
  checkMultiple,
  request,
  requestMultiple,
  PERMISSIONS,
  RESULTS
} from "react-native-permissions"

//components
import { CircularProgress } from 'src/components';
import { Button } from '../../components';

// import { CircularProgress } from "src/Components"
import { checkForPermissions } from "../../utils/Permission"
// styles
import styles from "./styles"


import { Layout, Images, Gutters, Colors  } from 'src/theme';


const { row, fill, center, justifyContentBetween, alignItemsCenter } = Layout
const { mediumTMargin, smallHPadding } = Gutters

const Camera = props => {
  const {
    navigation: { goBack }
  } = props
  const ref = useRef(null)
  const [timer, setTimer] = useState(null)
  const [fileName, setFileName] = useState("")
  const [video, setVideo] = useState(null)
  const [duration, setDuration] = useState(0)
  const [recording, setRecording] = useState(false)
  const [cameraType, setCameraType] = useState("front")
  const isMounted = useRef(true);


  useEffect(() => {
    checkForPermissions()
    return () => {
      isMounted.current = false;
    };
  }, [])


  const captureHandle = async () => {
    try {
        const data = await takePicture();

        const filePath = data.uri;
        const newFilePath = RNFS.ExternalDirectoryPath + '/MyTest.jpg';
        RNFS.moveFile(filePath, newFilePath)
            .then(() => {
        
            })
            CameraRoll.save(video.uri, LOCAL_PATH_TO_VIDEO).then(r => {
  
              })
            .catch(error => {

            })
    } catch (error) {

    }
}

  const changeCameraType = () => {
    if (cameraType === "back") {
      setCameraType("front")
    } else {
      setCameraType("back")
    }
  }

  

  

  return (
    <SafeAreaView style={fill}>
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={cameraType}
          ref={cameraRef}
          playSoundOnRecord={true}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonPositive: "Ok",
            buttonNegative: "Cancel"
          }}
          androidRecordAudioPermissionOptions={{
            title: "Permission to use audio recording",
            message: "We need your permission to use your audio",
            buttonPositive: "Ok",
            buttonNegative: "Cancel"
          }}
        >
          <View
            style={[row, mediumTMargin, smallHPadding, justifyContentBetween]}
          >
                
            <View style={[fill, row, center, styles.camButtons]}>
              <View style={fill} />
              {recording ? (
                <>
                  <View style={[fill, alignItemsCenter]}>
                    
                  </View>
                  <View style={fill} />
                </>
              ) : (
                <View style={{ flex:19, flexDirection:'row',justifyContent:'space-between'}}> 
                  <View style={{ top:13 }}>
                    <TouchableOpacity onPress={() => goBack()}>
                      <Text style={{ color: "red", fontSize: 18 }}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                  <Button text={'Photo'}
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
                   onPress={() => captureHandle()}
                    />
                  </View>
               
                  <View>
                  <TouchableOpacity
                    onPress={changeCameraType}
                    style={[fill, alignItemsCenter]}
                  >
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
  )
}

export default Camera;
