import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  AppState,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { titleInputStyles, Color, styles } from './styles';
import { Layout, Images } from 'src/theme';
import { Button } from '../../components';
import Video from 'react-native-video';
import moment from 'moment';

const Preview = (props) => {
  const {
    navigation: { goBack },
    route: {
      params: { data },
    },
  } = props;

  const [address, setAddress] = useState('');
  const { fill, center, fillGrow } = Layout;
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      }

      appState.current = nextAppState;
      setAddress('');
    });

    return () => {
      // subscription.remove();
    };
  }, []);

  const onPlay = (item) => {
    if (address == item.uri || address == item.video) {
      setAddress('');
    } else {
      setAddress(item.uri ? item.uri : item.video);
    }
  };
  return (
    <KeyboardAvoidingView
      style={fill}
      enabled
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS == 'android' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={fillGrow}
        keyboardShouldPersistTaps={'always'}
        showsVerticalScrollIndicator={false}
      >
        <View style={titleInputStyles.container}>
          <View style={titleInputStyles.logoSecond}>
            <SafeAreaView>
              <View style={titleInputStyles.labelParent}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                  <Image source={Images.BackAeroLight} style={styles.backArrowStyle} />
                </TouchableOpacity>
              </View>
              <View style={center}>
                <Image source={Images.splish1} style={styles.splishImageStyle} />
              </View>
            </SafeAreaView>
            <View style={styles.P28}>
              <Text style={styles.mainTitle}>Preview your story</Text>
            </View>
            <View style={styles.eventTypeView}>
              <Text style={styles.eventTypeText}>{data.event_name}</Text>
            </View>

            <View style={styles.PH_MT_25}>
              <Text style={styles.mainTitle1}>
                {data?.title != '' ? data?.title : 'Happy 50th Birthday Jane'}
              </Text>
              {data?.dedicate_to_name ? (
                <Text style={styles.dedicateNameText}>
                  {data?.dedicate_to_name != '' ? data.dedicate_to_name : 'Dedicated to Jane Doe'}
                </Text>
              ) : null}
            </View>

            <View style={styles.rowPHMT25}>
              <TouchableOpacity>
                <Image source={Images.date} style={styles.dateImage} />
              </TouchableOpacity>

              <Text style={styles.dateText}>
                {data?.date != '' ? moment(data.date).format('MM-DD-YYYY') : 'Date'}
                {/* {data?.date? data.date: ''} */}
              </Text>
            </View>
            <View style={styles.rowPHMT25}>
              <TouchableOpacity>
                <Image source={Images.time} style={styles.dateImage} />
              </TouchableOpacity>

              <Text style={styles.dateText}>{data?.time != '' ? data.time : '7:00'}</Text>
            </View>

            <View style={styles.PH28_MT10}>
              {
                <View style={styles.videoWrapper}>
                  {data?.vid
                    ? data['vid'] &&
                      data['vid'] != '' &&
                      (data?.vid[0]?.uri || data?.vid[0]?.video != null) &&
                      data.vid.map((item, index) => {
                        return (
                          <TouchableOpacity onPress={() => onPlay(item)}>
                            {(item?.uri && address == item?.uri) ||
                            (item?.video && address == item?.video) ? (
                              <Video
                                muted={false}
                                repeat={false}
                                onEnd={() => setAddress('')}
                                playWhenInactive={false}
                                paused={
                                  (item?.uri && address != item?.uri) ||
                                  (item?.video && address != item?.video)
                                }
                                currentTime={0}
                                bufferConfig={{
                                  minBufferMs: 15000,
                                  maxBufferMs: 50000,
                                  bufferForPlaybackMs: 2500,
                                  bufferForPlaybackAfterRebufferMs: 5000,
                                }}
                                resizeMode="cover"
                                posterResizeMode="cover"
                                playInBackground={false}
                                rate={1}
                                volume={1}
                                fullscreenOrientation="all"
                                source={{
                                  uri: address,
                                }}
                                style={[styles.videoStyle]}
                                preventsDisplaySleepDuringVideoPlayback={true}
                              />
                            ) : (
                              <View
                                style={[
                                  styles.videoStyle,
                                  { backgroundColor: '#2C2540', borderRadius: 10 },
                                ]}
                              />
                            )}
                            {(item.uri && address != item?.uri) ||
                            (item.video && address != item.video) ? (
                              <Image
                                source={Images.play}
                                style={{
                                  width: 40,
                                  height: 40,
                                  position: 'absolute',
                                  alignSelf: 'center',
                                  top: 50,
                                }}
                              />
                            ) : null}
                          </TouchableOpacity>
                        );
                      })
                    : data['event_video'] &&
                      data['event_video'] != '' &&
                      (data?.event_video[0]?.uri || data?.event_video[0]?.video != null) &&
                      data.event_video.map((item, index) => {
                        return (
                          <TouchableOpacity onPress={() => onPlay(item)}>
                            {(item?.uri && address == item?.uri) ||
                            (item?.video && address == item?.video) ? (
                              <Video
                                muted={false}
                                playWhenInactive={false}
                                paused={
                                  (item?.uri && address != item?.uri) ||
                                  (item?.video && address != item?.video)
                                }
                                repeat={false}
                                onEnd={() => setAddress('')}
                                currentTime={0}
                                bufferConfig={{
                                  minBufferMs: 15000,
                                  maxBufferMs: 50000,
                                  bufferForPlaybackMs: 2500,
                                  bufferForPlaybackAfterRebufferMs: 5000,
                                }}
                                resizeMode="cover"
                                posterResizeMode="cover"
                                playInBackground={false}
                                rate={1}
                                volume={1}
                                fullscreenOrientation="all"
                                source={{
                                  uri: address,
                                }}
                                style={[styles.videoStyle]}
                                preventsDisplaySleepDuringVideoPlayback={true}
                              />
                            ) : (
                              <View
                                style={[
                                  styles.videoStyle,
                                  { backgroundColor: '#2C2540', borderRadius: 10 },
                                ]}
                              />
                            )}
                            {(item.uri && address != item?.uri) ||
                            (item.video && address != item.video) ? (
                              <Image
                                source={Images.play}
                                style={{
                                  width: 40,
                                  height: 40,
                                  position: 'absolute',
                                  alignSelf: 'center',
                                  top: 50,
                                }}
                              />
                            ) : null}
                          </TouchableOpacity>
                        );
                      })}
                </View>
              }
              {data.event_name == 'Video' || data.img == '' ? null : data.img ? (
                <View style={styles.imageWrapper}>
                  {data['img'] &&
                    data['img'] != '' &&
                    (data.img[0]?.image || data.img[0]?.uri != null) &&
                    data?.img.map((item, index) => {
                      return (
                        <Image
                          source={{ uri: item?.uri ? item.uri : item.image }}
                          style={styles.imageStyle}
                        />
                      );
                    })}
                </View>
              ) : (
                <View style={styles.imageWrapper}>
                  {data['event_images'] &&
                    data['event_images'][0].image != null &&
                    data?.event_images.map((item, index) => {
                      return (
                        <Image
                          source={{ uri: item?.uri ? item.uri : item.image }}
                          style={styles.imageStyle}
                        />
                      );
                    })}
                </View>
              )}

              <View style={styles.multiTextView}>
                {data?.text
                  ? data?.text.map((item, index) => {
                      return <Text>{item?.value ? item.value : item?.text ? item.text : ''}</Text>;
                    })
                  : data?.event_text
                  ? data.event_text.map((item, index) => {
                      return <Text>{item?.value ? item.value : item?.text ? item.text : ''}</Text>;
                    })
                  : null}
              </View>
              <View style={styles.borderLineStyle}></View>

              {data?.collaborator_email ? (
                <>
                  <View style={styles.initeCollabView}>
                    <Image
                      source={Images.invitedColaburater}
                      style={styles.invitedCollabImageStyle}
                    />
                    <Text style={styles.inviteCollabText}>Invited Collaborators</Text>
                  </View>
                  <View style={styles.cardViewStyle}>
                    <View style={styles.cardViewMain}>
                      <View style={styles.cardViewInner}>
                        <Image source={Images.inviteImage1} style={styles.cardViewImage} />
                      </View>
                      <View style={{}}>
                        <Text style={styles.cardDedicateName}>
                          {data?.dedicate_to_name != '' ? data.dedicate_to_name : 'jon Doe'}
                        </Text>
                        <Text style={styles.cardCollabEmail}>
                          {data?.collaborator_email != ''
                            ? data.collaborator_email
                            : 'jondoe1@gmaail.com'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              ) : null}
              <Button
                onPress={() => {
                  goBack();
                }}
                text={'Ok'}
                color={'primary'}
                full
                style={styles.backButtonStyle}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Preview;
