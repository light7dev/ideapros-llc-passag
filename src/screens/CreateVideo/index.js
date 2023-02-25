import React, { useState } from 'react';
import {
  Alert,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import { lifeStoryRequest } from '../CreateLifeStory/redux/actions';
import Share from 'react-native-share';
import { connect } from 'react-redux';
import { titleInputStyles, styles, Color } from './styles';
import { Layout, Images } from 'src/theme';
import { Button, InputField } from '../../components';
import { launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import validator from 'src/utils/validation';

const CreateVideo = (props) => {
  const {
    navigation: { navigate },
  } = props;
  const { navigation } = props;
  const { fill, center, fillGrow } = Layout;

  const options = {
    titles: 'Share via',
    message: 'some message',
    url: 'www.example.com',
    subject: 'Subject',
  };
  const share = async (customOptions = options) => {
    try {
      setLoading(true);
      await Share.open(customOptions);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [shareEmail, setShareEmail] = useState('');

  const [uploadVideo, setUploadVideo] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const [birthday, setBirthday] = useState(new Date());
  const [formatBirthday, setFormatBirthday] = useState('');
  const [isPicker, setIsPicker] = useState(false);

  const [valueTime, setValueTime] = useState(new Date());
  const [eatTimeTwo, setEatTimeTwo] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState({
    title: '',
    name: '',
    email: '',
    birthday: '',
    formatBirthday: '',
    shareEmail: '',
  });

  const handleEmail = (val) => {
    const error = {};
    if (!validator.email.regEx.test(val)) {
      error.email = 'Invalid email address';
    }
    setValidationError({
      title: '',
      name: '',
      email: error.email,
      birthday: '',
      formatBirthday: '',
      shareEmail: '',
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

  const createVideoFnc = () => {
    if (!title) {
      return setValidationError({
        title: 'Please enter your title.',
        name: '',
        email: '',
        birthday: '',
        formatBirthday: '',
        shareEmail: '',
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
      });
    }

    if (!birthday) {
      return setValidationError({
        title: '',
        name: '',
        email: '',
        birthday: 'Please enter your date.',
        formatBirthday: '',
        shareEmail: '',
      });
    }

    if (!formatBirthday) {
      return setValidationError({
        title: '',
        name: '',
        email: '',
        birthday: '',
        formatBirthday: 'Please enter your time.',
        shareEmail: '',
      });
    }

    let formData = new FormData();
    formData.append('event_type', props?.route?.params?.item?.id);
    formData.append('dedicate_to_name', name);
    formData.append('dedicate_to_email', email);
    formData.append('collaborator_email', '');
    formData.append('title', title);
    formData.append('date', formatBirthday);
    formData.append('time', eatTimeTwo);
    formData.append('user', props?.profile?.id);
    formData.append('text', '');
    formData.append('images', '');

    if (uploadVideo.length >= 1) {
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

    props.lifeStoryRequest(formData);
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
          Alert.alert('video has been uploaded');
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
    if (!uploadVideo) {
      Alert.alert('Please upload a video first.');
    } else if (!(name && title && email && eatTimeTwo && uploadVideo && formatBirthday)) {
      Alert.alert('All fields are required.');
    } else {
      navigate('Preview', {
        data: {
          vid: uploadVideo.length >= 1 ? uploadVideo : '',
          img: '',
          collaborator_email: '',
          dedicate_to_email: email,
          dedicate_to_name: name,
          date: formatBirthday,
          time: eatTimeTwo,
          title: title,
          text: '',
          event_name: 'Create Video',
        },
      });
    }
  };

  return (
    <KeyboardAvoidingView style={fill}>
      <ScrollView contentContainerStyle={fillGrow}>
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
              <Text style={{ ...styles.eventType, lineHeight: 24 }}>Create / Edit Video</Text>
            </View>

            <View style={styles.PH_MT_25}>
              <Text style={styles.mainTitle}>Enter title</Text>
              <InputField
                value={title}
                onChangeText={(value) => setTitle(value)}
                showFirstImage={true}
                sourceFirst={Images.enterTitle}
                inputContainerStyle={styles.PH15}
                maxLength={50}
                placeholderTextColor={Color.steel}
                placeholder="Enter title"
                mainContainerStyle={styles.PH15}
                validationText={validationError.title}
                keyboardType={'email-address'}
              />
            </View>
            <View style={styles.PH_MT_25}>
              <Text style={styles.mainTitle}>To whom you dedicate the Video</Text>

              <InputField
                value={name}
                onChangeText={(value) => setName(value)}
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
              <Text style={styles.mainTitle}>When you want to send</Text>
              <TouchableOpacity onPress={() => setIsPicker(true)} style={styles.timePresStyle}>
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
                  validationText={validationError.date}
                  keyboardType={'email-address'}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.timePressStyle}>
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
                  validationText={validationError.time}
                  keyboardType={'email-address'}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.PH28_MT10}>
              <Text style={styles.mainTitle}>Add Videos</Text>
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
                    <Image source={Images.myVault} style={styles.addImagesStyle} />
                    <Text>Vault</Text>
                  </TouchableOpacity>
                </View>
              </View>

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
                  onPress={() => navigation.goBack()}
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
                <Text style={styles.mainTitle}>Share</Text>
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
                loading={loading}
                onPress={() => share()}
                text={'Share'}
                color={'primary'}
                full
                style={styles.ShareButtonStyle}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={isVisible}
        style={styles.ModalAlign}
        onBackButtonPress={() => setIsVisible(!isVisible)}
      >
        <TouchableOpacity onPress={() => setIsVisible(!isVisible)} style={fill}>
          <View style={[fill, center, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
            <DatePicker
              mode="time"
              date={valueTime}
              onDateChange={setTimeDateBirth}
              // minimumDate={new Date()}
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

      <Modal
        visible={isPicker}
        style={{ flex: 1, margin: 0, padding: 0 }}
        onBackButtonPress={() => setIsPicker(!isPicker)}
      >
        <TouchableOpacity style={fill} onPress={() => setIsPicker(!isPicker)}>
          <View style={[fill, center, { backgroundColor: 'rgba(0, 0, 0, 0.7)' }]}>
            <DatePicker
              mode="date"
              date={birthday}
              onDateChange={setBirthdayData}
              // minimumDate={new Date()}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateVideo);
