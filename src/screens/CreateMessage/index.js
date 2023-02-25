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

import { connect } from 'react-redux';
import { titleInputStyles, Color, styles } from './styles';
import { Layout, Images } from 'src/theme';
import { Button, InputField, DropDown } from '../../components';
import { launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import validator from 'src/utils/validation';

const CreateMessage = (props) => {
  const {
    navigation: { navigate },
  } = props;
  const { navigation } = props;
  const { fill, center, fillGrow } = Layout;

  const dropDownData = [
    'Date Message',
    'Event Message',
    'Location Message',
    'Social Media Message',
  ];
  const [email, setEmail] = useState('');

  const [dropItem, setDropItem] = useState('Date Message');
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const [uploadImage, setUploadImage] = useState([]);
  const [uploadVideo, setUploadVideo] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const [birthday, setBirthday] = useState(new Date());
  const [formatBirthday, setFormatBirthday] = useState('');
  const [isPicker, setIsPicker] = useState(false);
  const [addText, setAddText] = useState([{ key: '', value: '' }]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [valueTime, setValueTime] = useState(new Date());
  const [eatTimeTwo, setEatTimeTwo] = useState('');

  const [validationError, setValidationError] = useState({
    name: '',
    email: '',
    formatBirthday: '',
    eatTimeTwo: '',
    addText: '',
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

  const createVideoFnc = () => {
    if (!email) {
      return setValidationError({
        title: '',
        name: '',
        email: 'Please enter your email.',
        formatBirthday: '',
        eatTimeTwo: '',
        addText: '',
      });
    }

    if (!birthday) {
      return setValidationError({
        title: '',
        name: '',
        email: '',
        formatBirthday: 'Please enter your date.',
        eatTimeTwo: '',
        addText: '',
      });
    }

    if (!eatTimeTwo) {
      return setValidationError({
        title: '',
        name: '',
        email: '',
        formatBirthday: '',
        eatTimeTwo: 'Please enter your time.',
        shareEmail: '',
        addText: '',
        inviteEmail: '',
      });
    }

    if (!addText) {
      return setValidationError({
        title: '',
        name: '',
        email: '',
        formatBirthday: '',
        eatTimeTwo: '',
        addText: 'please add your text here',
      });
    }
    let formData = new FormData();
    formData.append('event_type', props?.route?.params?.item?.id);
    formData.append('dedicate_to_name', '');
    formData.append('dedicate_to_email', email);
    formData.append('collaborator_email', '');
    formData.append('title', '');
    formData.append('date', formatBirthday);
    formData.append('time', eatTimeTwo);
    formData.append('user', props?.profile?.id);
    addText.map((item, key) => formData.append('text', item.value));

    if (uploadImage.length >= 1) {
      uploadImage.forEach((item, index) =>
        formData.append('images', {
          uri: item.uri,
          type: item.type,
          name: ' name ' + new Date() + '.jpg',
        }),
      );
    }
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
    if (uploadImage.length == 0) {
      formData.append('images', '');
    }

    props.lifeStoryRequest(formData);
  };

  const onChangePostImage = () => {
    const options = {
      quality: 0,
      mediaType: 'photo',
      selectionLimit: 4,
    };
    launchImageLibrary(options, (response) => {
      if (response?.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        Alert.alert('Image has been selected');
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
    } else if (!(email && addText && eatTimeTwo && formatBirthday)) {
      Alert.alert('All fields are required.');
    } else {
      navigate('Preview', {
        data: {
          vid: uploadVideo ? uploadVideo : '',
          img: uploadImage ? uploadImage : '',
          dedicate_to_email: email,
          date: formatBirthday,
          time: eatTimeTwo,
          text: addText,
          event_name: 'Create Message',
        },
      });
    }
  };

  return (
    <KeyboardAvoidingView style={fill}>
      <ScrollView contentContainerStyle={fillGrow} showsVerticalScrollIndicator={false}>
        <View style={titleInputStyles.container}>
          <View style={titleInputStyles.logoSecond}>
            <SafeAreaView>
              <View style={titleInputStyles.labelParent}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                  <Image source={Images.BackAeroLight} style={styles.backArrowStyle} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image source={Images.splish1} style={[center, { height: 92, width: 78 }]} />
              </View>
            </SafeAreaView>
            <View style={styles.P28}>
              <Text style={styles.staticTitle}>Get creative, start your legacy:</Text>
              <Text style={{ ...styles.eventType, lineHeight: 24 }}>Create / Edit Message</Text>
            </View>
            <View style={styles.PH25}>
              <Text style={styles.mainTitle}>Message Type</Text>
              <TouchableOpacity onPress={() => setDropDownOpen(!dropDownOpen)}>
                <InputField
                  value={dropItem}
                  onChangeText={(value) => setDropItem(value)}
                  showFirstImage={true}
                  sourceFirst={Images.star}
                  inputContainerStyle={styles.PH15}
                  maxLength={50}
                  editable={false}
                  placeholderTextColor={Color.steel}
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
            <View style={styles.dateTimeBoxStyle}>
              <Text style={styles.mainTitle}>When you want to send</Text>
              <TouchableOpacity
                onPress={() => {
                  setIsPicker(true), setValidationError({ formatBirthday: '' });
                }}
                style={styles.timePressStyle}
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

            <View style={styles.PH28_MT10}>
              <Text style={styles.mainTitle}>Add Images</Text>
              <View style={styles.rowSB}>
                <View style={styles.uploadStyle}>
                  <TouchableOpacity onPress={onChangePostImage}>
                    <Image source={Images.add} style={styles.uploadImageStyle} />
                    <Text>Upload</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: 20 }} />
                <View style={{ ...styles.uploadStyle, borderStyle: 'solid' }}>
                  <TouchableOpacity onPress={onChangePostImage}>
                    <Image source={Images.myVault} style={styles.uploadImageStyle} />
                    <Text>Vault</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.rowPV20} />
              <Text style={styles.mainTitle}>Add Videos</Text>
              <View style={styles.rowSB}>
                <View style={styles.uploadStyle}>
                  <TouchableOpacity onPress={handleChooseVideo}>
                    <Image
                      source={Images.add}
                      style={{ height: 25, width: 40, resizeMode: 'contain' }}
                    />
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
              {addText.map((addText, key) => (
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.mainTitle}>Add Text</Text>
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
              <TouchableOpacity onPress={addHandler} style={styles.rowPV20}>
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
              <View style={{ height: 20 }} />
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={isVisible}
        style={styles.ModalAlign}
        onBackButtonPress={() => setIsVisible(!isVisible)}
      >
        <TouchableOpacity style={fill} onPress={() => setIsVisible(!isVisible)}>
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

      <Modal
        visible={isPicker}
        style={styles.ModalAlign}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessage);
