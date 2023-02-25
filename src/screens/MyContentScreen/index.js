import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  // Alert,
  AppState,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import { styles } from './styles';
import { Images } from '../../theme';
import { contentEventRequest, contentEvenDeletetRequest } from './redux/actions';
import { connect } from 'react-redux';
// import Share from 'react-native-share';
import { DataAvailability } from 'src/components';
import Video from 'react-native-video';
// import validator from 'src/utils/validation';
import moment from 'moment';
const MyContentScreen = (props) => {
  const {
    navigation: { navigate },
  } = props;

  const appState = useRef(AppState.currentState);

  const content = props.contentEvent;
  const [address, setAddress] = useState(false);
  // const [email, setEmail] = useState('');
  // const [loading, setLoading] = useState(false);
  // const [validationError, setValidationError] = useState({
  //   email: true,
  // });

  useEffect(() => {
    props.contentEventRequest();
  }, [props.contentEventDelete, props.lifeStory]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      // console.log('AppState', appState.current);
      setAddress('');
    });

    return () => {
      // subscription.remove();
    };
  }, []);

  // const options = {
  //   titles: 'Share via',
  //   message: 'some message',
  //   url: 'www.example.com',
  //   subject: 'Subject',
  // };

  // const handleEmail = (val) => {
  //   const error = { email: false };
  //   if (!validator.email.regEx.test(val)) {
  //     error.email = true;
  //   }
  //   setValidationError(error);
  //   setEmail(val);
  // };
  // const share = async (customOptions = options) => {
  //   if (validationError.email) {
  //     Alert.alert('Invalid Email Address.');
  //   } else {
  //     setLoading(true);
  //     try {
  //       await Share.open(customOptions);
  //       setLoading(false);
  //     } catch (err) {
  //       setLoading(false);
  //       console.log('Sharing Error', err);
  //     }
  //   }
  // };

  const onPlay = (item) => {
    if (address == item.event_video[0].video) {
      setAddress('');
    } else {
      setAddress(item.event_video[0].video);
    }
  };

  const onEdit = (element) => {
    setAddress('');
    navigate('EditStory', element);
  };
  // const getData = (content) => {
  //   let Content = [];
  //   content.length &&
  //     content.forEach((data, index) => {
  //       if (!Content[data.event_name]) {
  //         Content[data.event_name] = [];
  //       }
  //       Content[data.event_name].push(data);
  //     });
  //   // console.log('Content >>', Content);
  //   return Content;
  // };

  const getContent = () => {
    let arr = [];
    content &&
      content.map((item) => {
        arr[item.event_name] = arr[item.event_name] ? [...arr[item.event_name], item] : [item];
      });

    return arr;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerTitleStyle}>
        <Text style={styles.headerTitleText}>My Content</Text>
      </View>
      <View style={styles.container}>
        <DataAvailability
          requesting={props.requesting}
          hasData={content.length >= 1}
          containerStyle={{ marginTop: 100, justifyContent: 'center', alignItems: 'center' }}
          textContainerStyle={{ marginTop: 200, justifyContent: 'center', alignItems: 'center' }}
          textStyle={{ color: 'white' }}
        >
          <KeyboardAvoidingView
            enabled
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS == 'android' ? 60 : 0}
          >
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
              {getContent() &&
                Object.entries(getContent()).map((item, index) => {
                  return (
                    <View key={index} style={[styles.cardViewContainer, { paddingBottom: 20 }]}>
                      <View
                        style={{
                          flex: 0.1,
                        }}
                      >
                        <Text style={styles.cardViewTitle}>{item[0]}</Text>
                      </View>
                      {item &&
                        item[1].map((element, i) => {
                          return (
                            <TouchableOpacity
                              activeOpacity={1}
                              onPress={() => navigate('Preview', { data: element })}
                              style={{
                                ...styles.cardMainStyle,
                                height:
                                  element.event_name == 'Video' || element.event_name == 'Messages'
                                    ? 152
                                    : 152, //234,
                              }}
                            >
                              <View style={styles.cardInnerStyle}>
                                {element?.event_video[0].video !== null ? (
                                  <TouchableOpacity onPress={() => onPlay(element)}>
                                    {address != '' && address == element.event_video[0].video ? (
                                      <Video
                                        muted={false}
                                        playWhenInactive={false}
                                        paused={address != element.event_video[0].video}
                                        currentTime={0}
                                        bufferConfig={{
                                          minBufferMs: 15000,
                                          maxBufferMs: 50000,
                                          bufferForPlaybackMs: 2500,
                                          bufferForPlaybackAfterRebufferMs: 5000,
                                        }}
                                        repeat={false}
                                        onEnd={() => setAddress('')}
                                        resizeMode="cover"
                                        posterResizeMode="cover"
                                        playInBackground={false}
                                        rate={1}
                                        volume={1}
                                        fullscreenOrientation="all"
                                        source={{
                                          uri: address,
                                        }}
                                        style={styles.card_left_image}
                                        preventsDisplaySleepDuringVideoPlayback={true}
                                      />
                                    ) : (
                                      <View
                                        style={[
                                          {
                                            width: 60,
                                            height: 60,
                                            borderRadius: 15,
                                            backgroundColor: '#2C2540',
                                            borderRadius: 10,
                                          },
                                        ]}
                                      />
                                    )}
                                    {address != element.event_video[0].video ? (
                                      <Image
                                        source={Images.play}
                                        style={{
                                          width: 20,
                                          height: 20,
                                          position: 'absolute',
                                          alignSelf: 'center',
                                          top: 20,
                                        }}
                                      />
                                    ) : null}
                                  </TouchableOpacity>
                                ) : (
                                  <Image
                                    source={{ uri: element.event_images[0].image }}
                                    style={styles.card_left_image}
                                  />
                                )}
                                <View style={styles.card_center_view}>
                                  <Text>{element.title}</Text>
                                  {/* {element.event_name == 'Video' ||
                                  element.event_name == 'Messages' ? null : (
                                    <>
                                      <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.inviteCollab]}>
                                          Invite a Collaborator
                                        </Text>
                                      </View>
                                      <View style={styles.card_center_email}>
                                        <InputField
                                          value={id == element.id ? email : ''}
                                          onChangeText={(value) => handleEmail(value)}
                                          showFirstImage={true}
                                          sourceFirst={Images.email}
                                          inputContainerStyle={{
                                            paddingHorizontal: 1,
                                            height: 40,
                                          }}
                                          maxLenth={16}
                                          placeholderTextColor={Color.steel}
                                          placeholder="Email"
                                          mainContainerStyle={{
                                            paddingHorizontal: 1,
                                          }}
                                          keyboardType={'email-address'}
                                          topMainContainer={{ flex: 1 }}
                                          // editable={id == element.id}
                                          onFocus={() => setId(element.id)}
                                        />
                                      </View>
                                    </>
                                  )} */}
                                </View>

                                <TouchableOpacity
                                  style={styles.card_right_view}
                                  onPress={() => onEdit(element)}
                                  activeOpacity={1}
                                >
                                  <Image
                                    source={Images.editProfile}
                                    style={{
                                      height: 20,
                                      width: 20,
                                      marginTop: 10,
                                      marginRight: 10,
                                    }}
                                  />
                                </TouchableOpacity>
                              </View>

                              {/* {element.event_name == 'Video' ||
                              element.event_name == 'Messages' ? null : (
                                <View style={styles.inviteButtonView}>
                                  <Button
                                    loading={id == element.id && loading}
                                    onPress={() => share()}
                                    text={'invite'}
                                    color={'primary'}
                                    full
                                    disabled={id !== element.id || validationError.email}
                                    style={styles.inviteButtonTextView}
                                  />
                                </View>
                              )} */}

                              <View style={styles.cardLinestyle}></View>
                              <View style={styles.card_bottom_view}>
                                <TouchableOpacity>
                                  <Text style={{ color: '#9C2B2E' }}>
                                    {moment(element.date).format('MM-DD-YYYY')}
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => {
                                    props.contentEvenDeletetRequest(element.id);
                                  }}
                                >
                                  <Image
                                    source={Images.Delete}
                                    style={styles.cardDeleteStyle}
                                    tintColor="#9C2B2E"
                                  />
                                </TouchableOpacity>
                              </View>
                            </TouchableOpacity>
                          );
                        })}
                    </View>
                  );
                })}
            </ScrollView>
          </KeyboardAvoidingView>
        </DataAvailability>
      </View>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  contentEvent: state.myContentScreen.contentEvent,
  contentEventDelete: state.myContentScreen.contentDeleteEvent,
  requesting: state.myContentScreen.requesting,
  lifeStory: state.createLifeStory.lifeStory,
  contentEventSuccess: state.myContentScreen.contentEventSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  contentEventRequest: () => dispatch(contentEventRequest()),
  contentEvenDeletetRequest: (id) => dispatch(contentEvenDeletetRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyContentScreen);
