import React, { useState, useEffect } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  SafeAreaView,
  ToastAndroid,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import Share from 'react-native-share';
import { connect } from 'react-redux';
import { Layout, Images } from 'src/theme';
import { Color, styles, titleInputStyles } from './styles';
import { Button, InputField, DropDown } from '../../components';
import RNModal from '../../components/RNModal';
import { launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import validator from 'src/utils/validation';
import { editLifeStory, resetErrors } from '../CreateStory/redux/actions';

const EditStory = (props) => {
  const {
    category,
    navigation: { navigate },
  } = props;

  const { fill, center, fillGrow } = Layout;

  const value = props.route.params;

  // const uri = 'www.example.com';
  // const options = {
  //   titles: 'Share via',
  //   message: 'some message',
  //   url: uri,
  //   subject: 'Subject',
  // };
  const [dropItem, setDropItem] = useState(props.route.params);
  const [title, setTitle] = useState(props.route.params.title);
  const [name, setName] = useState(props.route.params.dedicate_to_name);
  const [email, setEmail] = useState(props.route.params.dedicate_to_email);
  const [inviteEmail, setInviteEmail] = useState(props.route.params.collaborator_email);
  const [addText, setAddText] = useState([
    { key: '', value: props.route.params.event_text[0].text },
  ]);
  // const [loading, setLoading] = useState(false);
  // const [shareEmail, setShareEmail] = useState('');
  const [onPressButton, setOnPressButton] = useState(0);

  // const share = async (customOptions = options) => {
  //   try {
  //     setLoading(true);
  //     await Share.open(customOptions);
  //     setLoading(false);
  //   } catch (err) {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      props.resetErrors();
    });
    return unsubscribe;
  }, [props.navigation]);

  const addHandler = () => {
    const _addText = [...addText];
    _addText.push({ key: '', value: '' });
    setAddText(_addText);
  };
  const addTextHandler = (value, key) => {
    const _addText = [...addText];
    _addText[key].value = value;
    _addText[key].key = key;
    setAddText(_addText);
  };
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [uploadImage, setUploadImage] = useState([]);
  const [uploadVideo, setUploadVideo] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [journal, setJournal] = useState(props.route.params.journal_part);
  const [isVisibles, setIsVisibles] = useState(false);
  const [birthday, setBirthday] = useState(new Date());
  const [formatBirthday, setFormatBirthday] = useState(props.route.params.date);
  const [isPicker, setIsPicker] = useState(false);
  const [valueTime, setValueTime] = useState(new Date());
  const [eatTimeTwo, setEatTimeTwo] = useState(props.route.params.time);
  const [selectedCategoryId, setSelectedCategoryId] = useState(props.route.params.event_type);
  const [validationError, setValidationError] = useState({
    title: '',
    name: '',
    email: '',
    journal: '',
    birthday: '',
    formatBirthday: '',
    shareEmail: '',
    inviteEmail: '',
    addText: '',
  });

  const handleEmail = (val) => {
    const error = {};
    if (!validator.email.regEx.test(val)) {
      error.email = 'Invalid email address';
    }
    setValidationError({
      ...validationError,
      email: error.email,
    });
    setEmail(val);
  };

  const handleShareEmail = (val) => {
    const error = {};
    if (!validator.email.regEx.test(val)) {
      error.email = 'Invalid email address';
    }
    setValidationError({
      ...validationError,
      shareEmail: error.email,
    });
    setShareEmail(val);
  };

  const handleInviteEmail = (val) => {
    const error = {};
    if (!validator.email.regEx.test(val)) {
      error.email = 'Invalid email address';
    }
    setValidationError({
      ...validationError,
      inviteEmail: error.email,
    });
    setInviteEmail(val);
  };

  const getAllCategories = () => {
    return (
      category &&
      category.map((item) => {
        return {
          id: item.id,
          name: item.name,
          screenName: item.screen_name,
        };
      })
    );
  };

  const createVideoFnc = () => {
    // if (props.route.params.event_name == 'Video' && !uploadVideo.length) {
    //   return Alert.alert('Please upload atleast one video first.');
    // }
    // if (props.route.params.event_name != 'Video' && !(uploadVideo.length && uploadImage.length)) {
    //   return Alert.alert('Please upload atleast one image and one video first.');
    // }
    // if (props.route.params.event_name != 'Messages' && !title) {
    //   return setValidationError({
    //     title: 'Please enter your title',
    //     name: '',
    //     email: '',
    //     birthday: '',
    //     formatBirthday: '',
    //     shareEmail: '',
    //     addText: '',
    //     inviteEmail: '',
    //   });
    // }

    // if (props.route.params.event_name != 'Messages' && !name) {
    //   return setValidationError({
    //     title: '',
    //     name: 'Please enter your name.',
    //     email: '',
    //     birthday: '',
    //     formatBirthday: '',
    //     shareEmail: '',
    //     addText: '',
    //     inviteEmail: '',
    //   });
    // }

    // if (!formatBirthday) {
    //   return setValidationError({
    //     title: '',
    //     name: '',
    //     email: '',
    //     addText: '',
    //     eatTimeTwo: '',
    //     inviteEmail: '',
    //     shareEmail: '',
    //     formatBirthday: 'Please enter your date.',
    //   });
    // }

    // if (!eatTimeTwo) {
    //   return setValidationError({
    //     title: '',
    //     name: '',
    //     email: '',
    //     eatTimeTwo: 'Please enter your time.',
    //     formatBirthday: '',
    //     shareEmail: '',
    //     addText: '',
    //     inviteEmail: '',
    //   });
    // }

    // if (!email) {
    //   return setValidationError({
    //     title: '',
    //     name: '',
    //     email: 'Please enter your email.',
    //     birthday: '',
    //     formatBirthday: '',
    //     shareEmail: '',
    //     addText: '',
    //     inviteEmail: '',
    //   });
    // }

    // if (props.route.params.event_name == 'Legacy Plan' && !journal) {
    //   return setValidationError({
    //     title: '',
    //     name: '',
    //     email: '',
    //     eatTimeTwo: '',
    //     formatBirthday: '',
    //     shareEmail: '',
    //     inviteEmail: '',
    //     addText: '',
    //     journal: 'please add your journal here',
    //   });
    // }

    let formData = new FormData();

    if (name.length) {
      formData.append('dedicate_to_name', name);
    }
    if (email.length) {
      formData.append('dedicate_to_email', email);
    }
    if (inviteEmail.length) {
      formData.append('collaborator_email', inviteEmail);
    }
    if (title.length) {
      formData.append('title', title);
    }
    if (formatBirthday.length) {
      formData.append('date', formatBirthday);
    }
    if (eatTimeTwo.length) {
      formData.append('time', eatTimeTwo);
    }
    if (props.route.params.event_name != 'Video' && addText.length) {
      addText.map((item, key) => formData.append('text', item.value));
    }

    if (uploadImage.length) {
      uploadImage.forEach((item, index) =>
        formData.append('images', {
          uri: item.uri,
          type: item.type,
          name: ' name ' + new Date() + '.jpg',
        }),
      );
    }
    if (uploadVideo.length) {
      const ext = Platform.OS === 'ios' ? uploadVideo.uri.split('.').pop() : 'mp4';
      uploadVideo.forEach((item, index) =>
        formData.append('videos', {
          uri: item.uri,
          type: `video/${ext}`,
          name: 'video',
        }),
      );
    }

    props.editLifeStory(formData, props.route.params.id);
  };

  const onChangePostImage = () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 4,
    };
    launchImageLibrary(options, (response) => {
      if (response?.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        if (response.assets.length <= 4) {
          setUploadImage(response?.assets);
          Alert.alert('Image has been uploaded');
        } else {
          setUploadImage(uploadImage);
          ToastAndroid.show('Maximum of 4 images allowed', ToastAndroid.SHORT);
        }
      }
    });
  };

  const suggestionSelected = (index, value) => {
    setDropItem(value);
    setSelectedCategoryId(value.id);
    setDropDownOpen(!dropDownOpen);
  };

  const handleChooseVideo = async () => {
    const options = {
      mediaType: 'video',
      durationLimit: 30,
      selectionLimit: 4,
    };
    await launchImageLibrary(options, (response) => {
      if (response?.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        if (response.assets.length <= 4) {
          setUploadVideo(response?.assets);
          Alert.alert('Video has been uploaded');
        } else {
          setUploadVideo(uploadVideo);
          ToastAndroid.show('Maximum of 4 videos allowed', ToastAndroid.SHORT);
        }
      }
    });
  };

  const setTimeDateBirth = (val) => {
    const options = { timeZone: 'UTC', timeZoneName: 'short' };
    const valTime = val.toLocaleTimeString(options, {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    setValueTime(val);
    setEatTimeTwo(valTime);
  };

  const setBirthdayData = (date) => {
    setBirthday(date);
    const dateValue = moment(date).format('YYYY-MM-DD');
    setFormatBirthday(dateValue);
  };

  const onPressPreview = () => {
    // if (props.route.params.event_name != 'Video' && !(uploadVideo.length || uploadImage.length)) {
    //   Alert.alert('Please upload atleast one image and one video first.');
    // } else if (props.route.params.event_name == 'Video' && !uploadVideo.length) {
    //   Alert.alert('Please upload atleast one video first.');
    // } else if (
    //   props.route.params.event_name == 'Messages' &&
    //   !(email && eatTimeTwo && formatBirthday)
    // ) {
    //   Alert.alert('All fields are required.');
    // } else if (
    //   props.route.params.event_name == 'Video' &&
    //   !(name && title && email && eatTimeTwo && uploadVideo && formatBirthday)
    // ) {
    //   Alert.alert('All fields are required.');
    // } else if (
    //   props.route.params.event_name == 'Life Story Timeline' &&
    //   !(name && title && email && eatTimeTwo && formatBirthday)
    // ) {
    //   Alert.alert('All fields are required.');
    // } else if (
    //   props.route.params.event_name == 'Legacy Plan' &&
    //   !(name && eatTimeTwo && formatBirthday && email && title && journal)
    // ) {
    //   Alert.alert('All fields are required.');
    // } else {
    navigate('Preview', {
      data: {
        vid: uploadVideo.length >= 1 ? uploadVideo : value.event_video ? value.event_video : '',
        img: uploadImage.length >= 1 ? uploadImage : value.event_images ? value.event_images : '',
        collaborator_email: inviteEmail
          ? inviteEmail
          : value.collaborator_email
          ? value.collaborator_email
          : '',
        dedicate_to_email: email ? email : value.dedicate_to_email ? value.dedicate_to_email : '',
        dedicate_to_name: name ? name : value.dedicate_to_name ? value.dedicate_to_name : '',
        date: formatBirthday ? formatBirthday : value.date ? value.date : '',
        time: eatTimeTwo ? eatTimeTwo : value.time ? value.time : '',
        title: title ? title : value.title ? value.title : '',
        text: addText ? addText : value.text ? value.text : '',
        journal: journal ? journal : value.journal ? value.journal : '',
        event_name: props.route.params.event_name,
      },
    });
  };
  // };

  return (
    <KeyboardAvoidingView
      style={fill}
      enabled
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS == 'android' ? 20 : 0}
    >
      <ScrollView
        contentContainerStyle={fillGrow}
        keyboardShouldPersistTaps={'always'}
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                <Text style={styles.staticTitle}>Get creative, start your legacy:</Text>
                {props.route.params.event_name == 'Video' && (
                  <Text style={styles.mainTitle}>Create / Edit Video</Text>
                )}
                {props.route.params.event_name == 'Messages' && (
                  <Text style={styles.mainTitle}>Create / Edit Message</Text>
                )}
                {props.route.params.event_name == 'Life Story Timeline' && (
                  <>
                    <Text style={styles.mainTitle}>Create / Edit Video Celebration of Life,or</Text>
                    <Text style={styles.mainTitle}>Life Story</Text>
                  </>
                )}

                {props.route.params.event_name == 'Legacy Plan' && (
                  <Text style={styles.eventType}>Legacy Journal and Life Book</Text>
                )}
              </View>

              <View style={styles.PH_MT_25}>
                <Text style={styles.eventType}>Type</Text>
                <TouchableOpacity disabled={true} onPress={() => setDropDownOpen(!dropDownOpen)}>
                  <InputField
                    editable={false}
                    value={dropItem.name ? dropItem.name : props.route.params.event_name}
                    onChangeText={(value) => setDropItem(value)}
                    showFirstImage={true}
                    sourceFirst={Images.star}
                    inputContainerStyle={styles.PH15}
                    maxLength={50}
                    placeholder="Type"
                    mainContainerStyle={styles.PH15}
                    keyboardType={'email-address'}
                    showSecondImage={true}
                    // sourceSecond={dropDownOpen ? Images.Vector : Images.downAero}
                    // onPressSecond={() => setDropDownOpen(!dropDownOpen)}
                  />
                </TouchableOpacity>
                {dropDownOpen ? (
                  <View>
                    <DropDown
                      data={getAllCategories() ? getAllCategories() : []}
                      function1={suggestionSelected}
                      selectedCategoryId={selectedCategoryId}
                    />
                  </View>
                ) : null}
              </View>

              <View style={styles.PH_MT_25}>
                <Text style={styles.eventType}>Enter title</Text>
                <InputField
                  value={title}
                  onChangeText={(value) => {
                    setTitle(value), setValidationError({ title: '' });
                  }}
                  showFirstImage={true}
                  sourceFirst={Images.enterTitle}
                  inputContainerStyle={styles.PH15}
                  maxLength={50}
                  editable={!props.requesting}
                  placeholder="Enter title"
                  placeholderTextColor={Color.steel}
                  mainContainerStyle={styles.PH15}
                  validationText={validationError.title}
                  keyboardType={'email-address'}
                />
              </View>

              {props.route.params.event_name == 'Messages' ? null : (
                <View style={styles.PH_MT_25}>
                  {props.route.params.event_name == 'Video' && (
                    <Text style={styles.eventType}>To whom you dedicate the video</Text>
                  )}
                  {props.route.params.event_name == 'Life Story Timeline' && (
                    <Text style={styles.eventType}>To whom you dedicate the story</Text>
                  )}
                  {props.route.params.event_name == 'Messages' ? null : (
                    <>
                      <InputField
                        value={name}
                        onChangeText={(value) => {
                          setName(value), setValidationError({ name: '' });
                        }}
                        showFirstImage={true}
                        sourceFirst={Images.userImage}
                        inputContainerStyle={styles.PH15}
                        maxLenth={50}
                        placeholderTextColor={Color.steel}
                        placeholder="Name"
                        editable={!props.requesting}
                        mainContainerStyle={styles.PH15}
                        validationText={validationError.name}
                        keyboardType={'email-address'}
                      />

                      <InputField
                        value={email}
                        onChangeText={(value) => handleEmail(value)}
                        showFirstImage={true}
                        sourceFirst={Images.email}
                        inputContainerStyle={styles.PH15}
                        maxLength={50}
                        editable={!props.requesting}
                        placeholderTextColor={Color.steel}
                        placeholder="Email"
                        mainContainerStyle={styles.PH15}
                        validationText={validationError.email}
                      />
                    </>
                  )}
                </View>
              )}
              <View style={styles.dateTimeBoxStyle}>
                <Text style={styles.eventType}>When you want to send</Text>
                <TouchableOpacity
                  onPress={() => {
                    setIsPicker(true), setValidationError({ formatBirthday: '' });
                  }}
                  style={fill}
                  disabled={props.requesting}
                >
                  <InputField
                    value={formatBirthday && moment(formatBirthday).format('MM-DD-YYYY')}
                    onChangeText={(value) => setFormatBirthday(value)}
                    showFirstImage={true}
                    sourceFirst={Images.date}
                    inputContainerStyle={styles.PH15}
                    maxLength={50}
                    editable={false}
                    placeholderTextColor={Color.steel}
                    placeholder={formatBirthday ? formatBirthday : 'Date'}
                    mainContainerStyle={styles.PH15}
                    validationText={validationError.formatBirthday}
                    keyboardType={'numeric'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={props.requesting}
                  onPress={() => {
                    setIsVisible(true), setValidationError({ eatTimeTwo: '' });
                  }}
                  style={styles.timePressStyle}
                >
                  <InputField
                    value={eatTimeTwo}
                    onChangeText={(value) => setEatTimeTwo(value)}
                    showFirstImage={true}
                    sourceFirst={Images.time}
                    inputContainerStyle={styles.PH15}
                    maxLength={50}
                    editable={false}
                    placeholderTextColor={Color.steel}
                    placeholder={eatTimeTwo ? eatTimeTwo : 'Time'}
                    mainContainerStyle={styles.PH15}
                    validationText={validationError.eatTimeTwo}
                    keyboardType={'numeric'}
                  />
                </TouchableOpacity>
                {props.route.params.event_name == 'Messages' ? (
                  <View style={{ paddingBottom: 10 }}>
                    <InputField
                      value={email}
                      onChangeText={(value) => handleEmail(value)}
                      showFirstImage={true}
                      sourceFirst={Images.email}
                      inputContainerStyle={styles.PH15}
                      maxLength={50}
                      editable={!props.requesting}
                      placeholderTextColor={Color.steel}
                      placeholder="Email"
                      mainContainerStyle={styles.PH15}
                      validationText={validationError.email}
                    />
                  </View>
                ) : null}
              </View>
              {props.route.params.event_name == 'Legacy Plan' && (
                <View style={styles.PH_MT_25}>
                  <Text style={styles.mainTitle}>Journal Part</Text>
                  <InputField
                    value={journal}
                    onChangeText={(value) => {
                      setJournal(value), setValidationError({ journal: '' });
                    }}
                    editable={!props.requesting}
                    showFirstImage={true}
                    sourceFirst={Images.enterTitle}
                    inputContainerStyle={styles.PH15}
                    maxLength={50}
                    placeholderTextColor={Color.steel}
                    placeholder="ex. Part 1"
                    mainContainerStyle={styles.PH15}
                    validationText={validationError.journal}
                    keyboardType={'email-address'}
                  />
                </View>
              )}
              {/* {props.route.params.event_name == 'Video' ||
            ('Messages' && !'Life Story Timeline') ? null : (
              <>
                <View style={styles.P25}>
                  <Text style={styles.eventType}>Invite a Collaborator</Text>
                  <InputField
                    value={inviteEmail}
                    onChangeText={(value) => handleInviteEmail(value)}
                    showFirstImage={true}
                    sourceFirst={Images.email}
                    inputContainerStyle={styles.PH15}
                    maxLength={50}
                    placeholderTextColor={Color.steel}
                    placeholder="Email"
                    mainContainerStyle={styles.PH15}
                    validationText={validationError.inviteEmail}
                    keyboardType={'email-address'}
                  />
                </View>

                <Button
                  loading={loading}
                  onPress={() => share()}
                  text={'invite'}
                  color={'primary'}
                  full
                  disabled={!inviteEmail.length}
                  style={styles.ShareButtonStyle}
                />
              </>
            )} */}
              <View style={styles.PH28_MT10}>
                {props.route.params.event_name == 'Video' ? null : (
                  <>
                    <Text style={styles.addImagesStyle}>Add Images</Text>
                    <View style={styles.rowSB}>
                      <View style={styles.uploadStyle}>
                        <TouchableOpacity onPress={onChangePostImage} disabled={props.requesting}>
                          <Image source={Images.add} style={styles.uploadImageStyle} />
                          <Text>Upload</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ width: 20 }} />
                      {/* <View style={{ ...styles.uploadStyle, borderStyle: 'solid' }}>
                      <TouchableOpacity disabled={true} onPress={handleChooseVideo}>
                        <Image source={Images.myVault} style={styles.uploadImageStyle} />
                        <Text>Vault</Text>
                      </TouchableOpacity>
                    </View> */}
                    </View>
                    {props.route.params.event_name == 'Messages' ? null : (
                      <TouchableOpacity
                        onPress={onChangePostImage}
                        style={styles.rowPV20}
                        disabled={props.requesting}
                      >
                        <Text>Add multiple Images</Text>
                        <Text style={styles.plusColor}> + </Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
                <Text
                  style={[
                    styles.addVideoText,
                    props.route.params.event_name == 'Messages' && { marginTop: 20 },
                  ]}
                >
                  Add Videos
                </Text>
                <View style={styles.rowSB}>
                  <View style={styles.uploadStyle}>
                    <TouchableOpacity onPress={handleChooseVideo} disabled={props.requesting}>
                      <Image source={Images.add} style={styles.uploadImageStyle} />
                      <Text>Upload</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: 20 }} />
                  {/* <View style={{ ...styles.uploadStyle, borderStyle: 'solid' }}>
                  <TouchableOpacity disabled={true} onPress={handleChooseVideo}>
                    <Image source={Images.myVault} style={styles.uploadImageStyle} />
                    <Text>Vault</Text>
                  </TouchableOpacity>
                </View> */}
                </View>
                {props.route.params.event_name == 'Video' ? null : (
                  <>
                    {props.route.params.event_name == 'Messages' ? null : (
                      <TouchableOpacity
                        onPress={handleChooseVideo}
                        style={styles.addMultiVideoView}
                        disabled={props.requesting}
                      >
                        <Text>Add multiple Videos</Text>
                        <Text style={styles.plusColor}> + </Text>
                      </TouchableOpacity>
                    )}

                    {addText.map((addText, key) => (
                      <View style={{ marginTop: 20 }}>
                        <Text style={styles.eventType}>Add Text</Text>
                        <InputField
                          value={addText.value}
                          onChangeText={(value) => addTextHandler(value, key)}
                          showFirstImage={true}
                          sourceFirst={Images.enterTitle}
                          inputContainerStyle={styles.PH15}
                          maxLength={500}
                          placeholderTextColor={Color.steel}
                          placeholder="Write"
                          numberOfLines={6}
                          editable={!props.requesting}
                          inputStyleProp={Platform.OS == 'ios' ? 0 : { height: 150 }}
                          mainContainerStyle={[styles.PH15]}
                          validationText={validationError.addText}
                          keyboardType={'default'}
                          multiline={true}
                        />
                      </View>
                    ))}
                    {props.route.params.event_name == 'Messages' ? null : (
                      <TouchableOpacity
                        onPress={addHandler}
                        style={styles.addTextView}
                        disabled={props.requesting}
                      >
                        <Text>Add more text</Text>
                        <Text style={styles.plusColor}> + </Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
                <Button
                  onPress={() => onPressPreview()}
                  text={'Preview'}
                  color={'primary'}
                  full
                  disabled={props.requesting}
                  style={styles.previewButtonStyle}
                />
                <View style={styles.backAndSaveView}>
                  <Button
                    text={'Back'}
                    color={'primary'}
                    full
                    style={styles.primaryButtonStyle}
                    disabled={props.requesting}
                    onPress={() => setIsVisibles(!isVisibles)}
                  />
                  <View style={{ width: 20 }} />
                  <Button
                    onPress={createVideoFnc}
                    loading={props.requesting}
                    text={'Save'}
                    color={'primary'}
                    full
                    style={styles.primaryButtonStyle}
                  />
                </View>
                {/* {props.route.params.event_name == 'Messages' ? null : (
                <>
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.eventType}>Share</Text>
                    <InputField
                      value={shareEmail}
                      onChangeText={(value) => handleShareEmail(value)}
                      showFirstImage={true}
                      sourceFirst={Images.email}
                      inputContainerStyle={styles.PH15}
                      maxLength={50}
                      placeholderTextColor={Color.steel}
                      placeholder="Email"
                      mainContainerStyle={styles.PH15}
                      validationText={validationError.shareEmail}
                    />
                  </View>
                  <Button
                    onPress={async () => {
                      await share();
                    }}
                    text={'Share'}
                    color={'primary'}
                    full
                    disabled={!shareEmail.length}
                    style={styles.ShareButtonStyle}
                  />
                </>
              )} */}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <RNModal
        visible={isVisibles}
        onBackButtonPress={() => {
          setIsVisibles(!isVisibles);
        }}
        onPressNo={() => {
          setOnPressButton(0);
          setIsVisibles(!isVisibles);
        }}
        onPressYes={() => {
          setOnPressButton(1);
          props.navigation.goBack();
        }}
        onPressButton={onPressButton}
      />
      <Modal
        visible={isVisible}
        style={styles.modalView}
        onBackButtonPress={() => setIsVisible(!isVisible)}
      >
        <TouchableOpacity onPress={() => setIsVisible(!isVisible)} style={fill}>
          <View style={[fill, center, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
            <DatePicker
              mode="time"
              date={valueTime}
              onDateChange={setTimeDateBirth}
              style={{ backgroundColor: 'white' }}
            />
            <Button
              onPress={() => {
                setIsVisible(false), setTimeDateBirth(valueTime);
              }}
              text={'Add Time'}
              color={'primary'}
              style={styles.AddTimeBtnStyle}
              full={true}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal visible={isPicker} style={styles.modalView}>
        <TouchableOpacity onPress={() => setIsPicker(!isPicker)} style={fill}>
          <View style={[fill, center, { backgroundColor: 'rgba(0, 0, 0, 0.7)' }]}>
            <DatePicker
              mode="date"
              date={birthday}
              onDateChange={setBirthdayData}
              style={{ backgroundColor: 'white' }}
            />
            <Button
              onPress={() => {
                setIsPicker(false), setBirthdayData(birthday);
              }}
              text={'Add Date'}
              color={'primary'}
              style={styles.AddTimeBtnStyle}
              full={true}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = (state) => ({
  profile: state.login.data,
  category: state.category.category,
  requesting: state.createLifeStory.requesting,
});

const mapDispatchToProps = (dispatch) => ({
  resetErrors: () => dispatch(resetErrors()),
  editLifeStory: (data, id) => dispatch(editLifeStory(data, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditStory);
