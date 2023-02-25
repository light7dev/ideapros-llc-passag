import React, { useState } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  SafeAreaView,
  ToastAndroid,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { lifeStoryRequest } from './redux/actions';
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

const CreateLifeStory = (props) => {
  const {
    navigation: { navigate },
  } = props;

  const { fill, center, fillGrow } = Layout;

  const uri = 'www.example.com';
  const options = {
    titles: 'Share via',
    message: 'some message',
    url: uri,
    subject: 'Subject',
  };

  const dropDownData = ['Celebration of Life', 'My Tribute', 'Life Story', 'Legacy Journal'];
  const [title, setTitle] = useState('');
  const [onPressButton, setOnPressButton] = useState(0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [shareEmail, setShareEmail] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [addText, setAddText] = useState([{ key: '', value: '' }]);
  const [loading, setLoading] = useState(false);

  const share = async (customOptions = options) => {
    try {
      setLoading(true);
      await Share.open(customOptions);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

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

  const [dropItem, setDropItem] = useState('Life Story');
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [uploadImage, setUploadImage] = useState([]);
  const [uploadVideo, setUploadVideo] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibles, setIsVisibles] = useState(false);
  const [birthday, setBirthday] = useState(new Date());
  const [formatBirthday, setFormatBirthday] = useState('');
  const [isPicker, setIsPicker] = useState(false);
  const [valueTime, setValueTime] = useState(new Date());
  const [eatTimeTwo, setEatTimeTwo] = useState('');
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [validationError, setValidationError] = useState({
    title: '',
    name: '',
    email: '',
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

  const createVideoFnc = () => {
    if (!title) {
      return setValidationError({
        title: 'Please enter your title',
        name: '',
        email: '',
        birthday: '',
        formatBirthday: '',
        shareEmail: '',
        addText: '',
        inviteEmail: '',
      });
    }

    if (!name) {
      return setValidationError({
        title: '',
        name: 'Please enter your name.',
        email: '',
        birthday: '',
        formatBirthday: '',
        shareEmail: '',
        addText: '',
        inviteEmail: '',
      });
    }

    if (!email) {
      return setValidationError({
        title: '',
        name: '',
        email: 'Please enter your email.',
        birthday: '',
        formatBirthday: '',
        shareEmail: '',
        addText: '',
        inviteEmail: '',
      });
    }

    if (!eatTimeTwo) {
      return setValidationError({
        title: '',
        name: '',
        email: '',
        eatTimeTwo: 'Please enter your time.',
        formatBirthday: '',
        shareEmail: '',
        addText: '',
        inviteEmail: '',
      });
    }

    if (!formatBirthday) {
      return setValidationError({
        title: '',
        name: '',
        email: '',
        addText: '',
        eatTimeTwo: '',
        inviteEmail: '',
        shareEmail: '',
        formatBirthday: 'Please enter your date.',
      });
    }

    if (!inviteEmail) {
      return setValidationError({
        title: '',
        name: '',
        email: '',
        addText: '',
        eatTimeTwo: '',
        shareEmail: '',
        formatBirthday: '',
        inviteEmail: 'please enter your invite Email',
      });
    }
    if (!addText) {
      return setValidationError({
        name: '',
        email: '',
        title: '',
        eatTimeTwo: '',
        shareEmail: '',
        inviteEmail: '',
        formatBirthday: '',
        addText: 'please add your text here',
      });
    }

    let formData = new FormData();
    formData.append('event_type', props?.route?.params?.item?.id);
    formData.append('dedicate_to_name', name);
    formData.append('dedicate_to_email', email);
    formData.append('collaborator_email', inviteEmail);
    formData.append('title', title);
    formData.append('date', formatBirthday);
    formData.append('time', eatTimeTwo);
    formData.append('user', props?.profile?.id);

    addText.map((item, key) => formData.append('text', item.value));

    // const getUploadImages = () => {
    //   let size = 0;

    //   const images =
    //     uploadImage &&
    //     uploadImage.length &&
    //     uploadImage.map((item, i) => {
    //       size += item.fileSize;
    //       return {
    //         uri: item.uri,
    //         type: item.type,
    //         name: ' name ' + new Date() + '.jpg',
    //       };
    //     });

    //   return [images, size];
    // };

    // console.log('getUploadImages', getUploadImages());

    // const getUploadVideos = () => {
    //   const ext = Platform.OS === 'ios' ? uploadVideo.uri.split('.').pop() : 'mp4';
    //   return (
    //     uploadVideo &&
    //     uploadVideo.length &&
    //     uploadVideo.map((item, i) => {
    //       return {
    //         uri: item.uri,
    //         type: `video/${ext}`,
    //         name: 'video',
    //       };
    //     })
    //   );
    // };

    // console.log('getUploadVideos', getUploadVideos());

    // formData.append('images', JSON.stringify(getUploadImages()[0]));
    // formData.append('videos', JSON.stringify(getUploadVideos()));
    // formData.append('media_size', getUploadImages()[1]);

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
    if (uploadVideo.length == 0) {
      formData.append('videos', '');
    }
    if (uploadImage.length == 0) {
      formData.append('images', '');
    }

    props.lifeStoryRequest(formData);
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
    setSelectedCategoryIndex(index);
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
    const valTime = val.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setValueTime(val);
    setEatTimeTwo(valTime);
  };

  const setBirthdayData = (date) => {
    setBirthday(date);
    const dateValue = moment(date).format('YYYY-MM-DD');
    setFormatBirthday(dateValue);
  };

  const onPressPreview = () => {
    if (!uploadVideo && !uploadImage) {
      Alert.alert('Please upload atleast one image and one video first.');
    } else if (
      !(name && title && email && addText && eatTimeTwo && inviteEmail && formatBirthday)
    ) {
      Alert.alert('All fields are required.');
    } else {
      navigate('Preview', {
        data: {
          vid: uploadVideo.length >= 1 ? uploadVideo : '',
          img: uploadImage.length >= 1 ? uploadImage : '',
          collaborator_email: inviteEmail,
          dedicate_to_email: email,
          dedicate_to_name: name,
          date: formatBirthday,
          time: eatTimeTwo,
          title: title,
          text: addText,
          event_name: 'Celebration of Life',
        },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={fill}
      enabled
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS == 'android' ? 60 : 0}
    >
      <ScrollView contentContainerStyle={fillGrow} showsVerticalScrollIndicator={false}>
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
              <Text style={styles.mainTitle}>Create / Edit VideoCelebration of Life,or</Text>
              <Text style={styles.mainTitle}>Life Story</Text>
            </View>
            <View style={styles.PH_MT_25}>
              <Text style={styles.eventType}>Type</Text>
              <TouchableOpacity onPress={() => setDropDownOpen(!dropDownOpen)}>
                <InputField
                  editable={false}
                  value={dropItem}
                  onChangeText={(value) => setDropItem(value)}
                  showFirstImage={true}
                  sourceFirst={Images.star}
                  inputContainerStyle={styles.PH15}
                  maxLength={50}
                  placeholder="Type"
                  mainContainerStyle={styles.PH15}
                  keyboardType={'email-address'}
                  showSecondImage={true}
                  sourceSecond={dropDownOpen ? Images.Vector : Images.downAero}
                  // onPressSecond={() => setDropDownOpen(!dropDownOpen)}
                />
              </TouchableOpacity>
              {dropDownOpen ? (
                <View>
                  <DropDown
                    data={dropDownData}
                    function1={suggestionSelected}
                    selectedCategoryIndex={selectedCategoryIndex}
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
                placeholder="Enter title"
                placeholderTextColor={Color.steel}
                mainContainerStyle={styles.PH15}
                validationText={validationError.title}
                keyboardType={'email-address'}
              />
            </View>
            <View style={styles.PH_MT_25}>
              <Text style={styles.eventType}>To whom you dedicate the story</Text>
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
                placeholderTextColor={Color.steel}
                placeholder="Email"
                mainContainerStyle={styles.PH15}
                validationText={validationError.email}
              />
            </View>
            <View style={styles.dateTimeBoxStyle}>
              <Text style={styles.eventType}>When you want to send</Text>
              <TouchableOpacity
                onPress={() => {
                  setIsPicker(true), setValidationError({ formatBirthday: '' });
                }}
                style={fill}
              >
                <InputField
                  value={formatBirthday}
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
            </View>
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
              style={styles.ShareButtonStyle}
            />
            <View style={styles.PH28_MT10}>
              <Text style={styles.addImagesStyle}>Add Images</Text>
              <View style={styles.rowSB}>
                <View style={styles.uploadStyle}>
                  <TouchableOpacity onPress={onChangePostImage}>
                    <Image source={Images.add} style={styles.uploadImageStyle} />
                    <Text>Upload</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: 20 }} />
                <View style={{ ...styles.uploadStyle, borderStyle: 'solid' }}>
                  <TouchableOpacity onPress={handleChooseVideo}>
                    <Image source={Images.myVault} style={styles.uploadImageStyle} />
                    <Text>Vault</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={onChangePostImage} style={styles.rowPV20}>
                <Text>Add multiple Images</Text>
                <Text style={styles.plusColor}> + </Text>
              </TouchableOpacity>
              <Text style={styles.addVideoText}>Add Videos</Text>
              <View style={styles.rowSB}>
                <View style={styles.uploadStyle}>
                  <TouchableOpacity onPress={handleChooseVideo}>
                    <Image source={Images.add} style={styles.uploadImageStyle} />
                    <Text>Upload</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: 20 }} />
                <View style={{ ...styles.uploadStyle, borderStyle: 'solid' }}>
                  <TouchableOpacity onPress={handleChooseVideo}>
                    <Image source={Images.myVault} style={styles.uploadImageStyle} />
                    <Text>Vault</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={handleChooseVideo} style={styles.addMultiVideoView}>
                <Text>Add multiple Videos</Text>
                <Text style={styles.plusColor}> + </Text>
              </TouchableOpacity>
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
                    mainContainerStyle={styles.PH15}
                    validationText={validationError.addText}
                    keyboardType={'default'}
                    multiline={true}
                  />
                </View>
              ))}
              <TouchableOpacity onPress={addHandler} style={styles.addTextView}>
                <Text>Add more text</Text>
                <Text style={styles.plusColor}> + </Text>
              </TouchableOpacity>
              <Button
                onPress={() => onPressPreview()}
                text={'Preview'}
                color={'primary'}
                full
                style={styles.previewButtonStyle}
              />
              <View style={styles.backAndSaveView}>
                <Button
                  text={'Back'}
                  color={'primary'}
                  full
                  style={styles.primaryButtonStyle}
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
                style={styles.ShareButtonStyle}
              />
            </View>
          </View>
        </View>
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
  requesting: state.createLifeStory.requesting,
});

const mapDispatchToProps = (dispatch) => ({
  lifeStoryRequest: (data) => dispatch(lifeStoryRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateLifeStory);
