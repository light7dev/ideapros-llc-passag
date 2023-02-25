import { Input } from 'native-base';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import useForm from 'src/hooks/useForm';
import moment from 'moment';
import validator from 'src/utils/validation';
import { DataAvailability, Button, ProfileDropDown } from 'src/components';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { Layout, Images, Global } from 'src/theme';
import ImagePicker from 'react-native-image-crop-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { requestChangePassword } from '../Setting/redux/actions';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Appearance,
  TouchableOpacity,
} from 'react-native';
import { textInputStyles, titleInputStyles, Color, forgotModalStyles, styles } from './styles';
import { updateProfileRequest, profileEventRequest, getProfileRequest } from './redux/actions';
// import { launchImageLibrary } from 'react-native-image-picker';

export const RightIconCards = ({ source, name, onPress }) => {
  const { row, justifyContentBetween, alignItemsCenter } = Layout;
  const { secondaryBg, height60 } = Global;

  return (
    <TouchableOpacity
      style={[
        row,
        justifyContentBetween,
        alignItemsCenter,
        secondaryBg,
        height60,
        {
          ...styles.righIconCardsViewStyle,
        },
      ]}
      onPress={onPress}
    >
      {name && <Text style={styles.rightIconCardsText}>{name}</Text>}
      {source && <Image source={source} style={styles.rightIconCardsImage} />}
    </TouchableOpacity>
  );
};

const MyProfile = (props) => {
  const content = props.profileEvent;

  const {
    navigation: { navigate },
    profile,
    myProfile,
    requesting,
  } = props;

  const [coverImage, setCoverImage] = useState(null);
  const [uploadedImage, setUploadedCoverImage] = useState(null);
  const [emptyImg, setEmptyImg] = React.useState(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==',
  );

  const dropDownData = ['Male', 'Female', 'Other'];
  const colorScheme = Appearance.getColorScheme();
  const [isVisibles, setIsVisibles] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [isPicker, setIsPicker] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPass, setOldPass] = useState(true);
  const [newConfirmPass, setNewConfirmPass] = useState(true);
  const [newPass, setNewPass] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(false);
  const [bio, setBio] = useState(myProfile?.bio ? myProfile?.bio : profile?.bio);
  const [gender, setGender] = useState(myProfile?.gender ? myProfile?.gender : profile?.gender);
  const [birthday, setBirthday] = useState(new Date());
  const [formatBirthday, setFormatBirthday] = useState(
    myProfile?.birth_date ? myProfile?.birth_date : profile?.birth_date,
  );
  const [name, setName] = useState(myProfile.name ? myProfile.name : profile.name);

  useEffect(() => {
    props.getProfileRequest(profile.id);
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setIsEdit(false);
      props.getProfileRequest(profile.id);
    });
    return unsubscribe;
  }, [props.navigation]);

  let formData = new FormData();
  const user_id = profile.id;

  // const handleChoosePhoto = async () => {
  //   const options = {
  //     quality: 0,
  //     mediaType: 'photo',
  //   };
  //   await launchImageLibrary(options, (response) => {
  //     if (response?.didCancel) {
  //     } else if ((response.uri && response.type === 'image/jpg') || 'image/jpeg') {
  //       formData.append('profile_picture', {
  //         name: response.assets[0].fileName,
  //         type: response.assets[0].type,
  //         uri: response.assets[0].uri,
  //       });
  //       setUploadedCoverImage(response.assets[0].uri);
  //       props.updateProfileRequest(formData, user_id);
  //     } else if (response.error) {
  //     } else if (response.customButton) {
  //     }
  //   });
  // };

  // const handleChooseCoverPhoto = async () => {
  //   const options = {
  //     quality: 0,
  //     mediaType: 'photo',
  //   };
  //   await launchImageLibrary(options, (response) => {
  //     if (response?.didCancel) {
  //     } else if ((response.uri && response.type === 'image/jpg') || 'image/jpeg') {
  //       formData.append('cover_picture', {
  //         uri: response.assets[0].uri,
  //         type: response.assets[0].type,
  //         name: response.assets[0].fileName,
  //       });
  //       props.updateProfileRequest(formData, user_id);
  //       console.log('FormData', formData);
  //       setCoverImage(response.assets[0].uri);
  //     } else if (response.error) {
  //     } else if (response.customButton) {
  //     }
  //   });
  // };

  const setBirthdayData = (date) => {
    setBirthday(date);
    const dateValue = moment(date).format('YYYY-MM-DD');
    setFormatBirthday(dateValue);
  };

  const handleCoverPhoto = async () => {
    const options = {
      cropping: false,
    };
    await ImagePicker.openPicker(options).then((image) => {
      formData.append('cover_picture', {
        uri: image.path,
        type: image.mime,
        name: image.path,
      });
      setCoverImage(image.path);
    });

    props.updateProfileRequest(formData, user_id);
  };

  const handleProfilePhoto = async () => {
    const options = {
      cropping: false,
    };
    await ImagePicker.openPicker(options).then((image) => {
      formData.append('profile_picture', {
        uri: image.path,
        type: image.mime,
        name: image.path,
      });
      setUploadedCoverImage(image.path);
    });

    props.updateProfileRequest(formData, user_id);
  };

  const onUpdateProfile = async () => {
    formData.append('birth_date', formatBirthday);
    formData.append('gender', gender);
    formData.append('name', name);
    formData.append('bio', bio);
    await props.updateProfileRequest(formData, user_id);
    setTimeout(() => {
      setIsEdit(!isEdit);
    }, 400);
  };

  const [validationError, setValidationError] = useState({
    currentPassword: '',
    password: '',
    confirmPassword: '',
  });

  const stateSchema = {
    password: {
      value: '',
      error: '',
    },
    currentPassword: {
      value: '',
      error: '',
    },
    confirmPassword: {
      value: '',
      error: '',
    },
  };
  const validationStateSchema = {
    currentPassword: {
      required: false,
      // validator: validator.password,
    },
    password: {
      required: true,
      validator: validator.password,
    },
    confirmPassword: {
      required: true,
      validator: {
        compare: (value) => value !== state.password.value,
        error: "Your passwords didn't match.",
      },
    },
  };

  const { state, setState, handleOnChange, disable } = useForm(stateSchema, validationStateSchema);

  const onSubmitPasswordReset = () => {
    if (currentPassword == '') {
      return setValidationError({
        currentPassword: 'Please enter Current Password.',
      });
    }
    if (!state.password.value) {
      return setValidationError({
        password: 'Please enter New Password',
      });
    }
    if (!confirmPassword) {
      return setValidationError({
        confirmPassword: '',
      });
    }
    if (password.localeCompare(state.confirmPassword.value)) {
      return setValidationError({
        confirmPassword: "Your passwords didn't match.",
      });
    }
    const data = {
      old_password: currentPassword,
      new_password1: password,
      new_password2: confirmPassword,
    };

    props.requestChangePassword(data);
    setConfirmPassword('');
    setCurrentPassword('');
    setPassword('');
    setIsVisibles(!isVisibles);
  };

  const { fill, row, center, fillGrow } = Layout;

  const onSelect = (index, value) => {
    setGender(value);
    setSelectedIndex(index);
    setDropDownOpen(!dropDownOpen);
  };
  return (
    <DataAvailability requesting={requesting} hasData={profile}>
      <SafeAreaView style={fill}>
        <ScrollView contentContainerStyle={fillGrow} showsVerticalScrollIndicator={false}>
          <View style={titleInputStyles.container}>
            <View style={{ backgroundColor: '#8D8D8D' }}>
              <TouchableOpacity
                onPress={() => {
                  // handleChooseCoverPhoto();
                  handleCoverPhoto();
                }}
                style={styles.CoverPhotoView}
              >
                <Image
                  source={
                    coverImage
                      ? { uri: coverImage }
                      : myProfile?.cover_picture
                      ? { uri: myProfile?.cover_picture }
                      : ''
                  }
                  style={styles.CoverPhotoImage}
                />
              </TouchableOpacity>
            </View>

            <View style={titleInputStyles.logoSecond}>
              <View style={[titleInputStyles.labelParent]}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                  <Image source={Images.BackAeroLight} style={styles.backArrowStyle} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    handleProfilePhoto();
                  }}
                >
                  <Image
                    source={{
                      uri: uploadedImage
                        ? uploadedImage
                        : myProfile?.profile_picture
                        ? myProfile.profile_picture
                        : emptyImg,
                    }}
                    style={styles.profilePhotoImage}
                  />
                </TouchableOpacity>
                {isEdit ? (
                  <TouchableOpacity onPress={() => onUpdateProfile()}>
                    <Text style={styles.profileName}>Save</Text>
                    {/* <Image source={Images.editProfile} style={styles.editPhotoImage} /> */}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => setIsEdit(true)} disabled={true}>
                    <Image source={Images.editProfile} style={styles.editPhotoImage} />
                  </TouchableOpacity>
                )}
              </View>
              <View style={[styles.prfileDetailView]}>
                {/* <Text style={styles.profileName}>{profile?.name}</Text> */}
                {isEdit || myProfile?.name || profile?.name ? (
                  <TextInput
                    value={isEdit ? name : myProfile.name ? myProfile.name : profile.name}
                    editable={isEdit}
                    // placeholder="Enter Name"
                    placeholderTextColor={'black'}
                    onChangeText={(val) => setName(val)}
                    style={styles.profileBio}
                  />
                ) : null}
                {/* <Text style={{ marginVertical: 5, fontSize: 14 }}>
                  {myProfile?.email ? myProfile?.email : profile?.email}
                </Text> */}
                <TextInput
                  value={myProfile?.email ? myProfile?.email : profile?.email}
                  editable={false}
                  // placeholderTextColor={'black'}
                  onChangeText={(val) => setBio(val)}
                  style={styles.profileBio}
                />
              </View>
              <View
                style={{
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  alignSelf: 'center',
                  paddingHorizontal: 20,
                  flex: 1,
                  // backgroundColor: 'green',
                }}
              >
                {isEdit || myProfile?.bio ? (
                  <TextInput
                    value={isEdit ? bio : myProfile?.bio}
                    editable={isEdit}
                    multiline={true}
                    numberOfLines={3}
                    placeholder="Enter Bio"
                    placeholderTextColor={'black'}
                    onChangeText={(val) => setBio(val)}
                    style={[styles.profileBio]}
                  />
                ) : null}
                <TouchableOpacity onPress={() => setDropDownOpen(!dropDownOpen)} disabled={!isEdit}>
                  {isEdit ? (
                    <TextInput
                      value={isEdit ? gender : myProfile?.gender}
                      editable={false}
                      placeholder="Select Gender"
                      placeholderTextColor={'black'}
                      onChangeText={(val) => setGender(val)}
                      style={styles.profileBio}
                    />
                  ) : null}
                </TouchableOpacity>
                {dropDownOpen ? (
                  <View>
                    <ProfileDropDown
                      data={dropDownData}
                      function1={onSelect}
                      selectedCategoryId={selectedIndex}
                    />
                  </View>
                ) : null}
                <TouchableOpacity onPress={() => setIsPicker(true)} disabled={!isEdit}>
                  {isEdit ? (
                    <TextInput
                      value={isEdit ? formatBirthday : myProfile?.birth_date}
                      editable={false}
                      placeholder="Enter Date of Birth"
                      placeholderTextColor={'black'}
                      onChangeText={(val) => setBirthday(val)}
                      style={styles.profileBio}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
              {/* <View style={styles.inviteCollabView}> */}
              {/* <Text style={styles.inviteCollabText}>Invited Collaborators</Text> */}
              {/* <ScrollView horizontal={true}>
                  <View style={styles.rowSB}>
                    <View style={styles.cardMainView}>
                      <View style={styles.cardWrapper}>
                        <View style={styles.cardInnerView} />
                        <View>
                          <Text style={styles.inviteCollabName}>Jone Doe</Text>
                          <Text style={styles.borderLineStyle} />
                          <View style={{ marginLeft: 30 }}>
                            <TouchableOpacity style={{ marginLeft: 30 }}>
                              <Image
                                source={Images.Delete}
                                style={styles.deleteImage}
                                tintColor="#9C2B2E"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.card2MainView}>
                      <View style={styles.cardWrapper}>
                        <View style={styles.cardInnerView} />
                        <View style={{}}>
                          <Text style={styles.inviteCollabName}>Jone Doe</Text>
                          <Text style={styles.borderLineStyle} />
                          <View style={{ marginLeft: 30 }}>
                            <TouchableOpacity
                              // onPress={() => props.navigation.goBack()}
                              style={{ marginLeft: 30 }}
                            >
                              <Image
                                source={Images.Delete}
                                style={styles.deleteImage}
                                tintColor="#9C2B2E"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView> */}
              {/* </View> */}
              <View style={[styles.myCollabView, { paddingVertical: 20 }]}>
                {/* <Text style={styles.inviteCollabText}>My Collaborators</Text> */}
                {/* <ScrollView horizontal={true}>
                  <View style={styles.rowSB}>
                    <View style={styles.cardMainView}>
                      <View style={styles.cardWrapper}>
                        <View style={styles.cardInnerView} />
                        <View style={{}}>
                          <Text style={styles.inviteCollabName}>Summer Vecations</Text>
                          <Text style={{ marginLeft: 10, color: Color.stiletto }}>
                            Go to project
                          </Text>
                          <View style={{ marginTop: -14, marginLeft: 100 }}>
                            <TouchableOpacity style={{}}>
                              <Image source={Images.leftAeroLight} style={styles.leftAeroStyle} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.card2MainView}>
                      <View style={styles.cardWrapper}>
                        <View style={styles.cardInnerView} />
                        <View style={{}}>
                          <Text style={styles.inviteCollabName}>Summer Vecations</Text>
                          <Text style={{ marginLeft: 10, color: Color.stiletto }}>
                            Go to project
                          </Text>
                          <View style={{ marginTop: -14, marginLeft: 100 }}>
                            <TouchableOpacity style={{}}>
                              <Image source={Images.leftAeroLight} style={styles.leftAeroStyle} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView> */}
                <TouchableOpacity
                  style={styles.myContentCardView}
                  onPress={() => {
                    navigate('MyContentScreen');
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Image source={Images.myContent} style={styles.myContentCardImage} />
                  </View>
                  <View style={{ flex: 2, alignItems: 'flex-start' }}>
                    <Text style={styles.myContentCardText}>My Content</Text>
                  </View>

                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Image source={Images.leftAeroLight} style={styles.myContentleftAero} />
                  </View>
                </TouchableOpacity>

                {/* <View style={styles.myVaultCardView}>
                  <View>
                    <Image source={Images.myVault} style={styles.myContentCardImage} />
                  </View>
                  <View style={{ marginLeft: -40 }}>
                    <TouchableOpacity onPress={() => {}}>
                      <Text style={styles.myContentCardText1}>My Vault</Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <Image source={Images.leftAeroLight} style={styles.myContentleftAero1} />
                  </View>
                </View> */}

                <TouchableOpacity
                  onPress={() => setIsVisibles(!isVisibles)}
                  style={[styles.changePasswordCardVie]}
                >
                  <View style={{ flex: 1 }}>
                    <Image source={Images.darkPass} style={styles.dardPassImage} />
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text style={{ ...styles.myContentCardText, color: 'white' }}>
                      Change Password
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Image source={Images.darkBackArrow} style={styles.darkBackImage} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <Modal
          visible={isVisibles}
          onBackButtonPress={() => {
            setIsVisibles(!isVisibles);
          }}
          style={styles.ModalMainView}
        >
          <ScrollView
            horizontal={false}
            contentContainerStyle={fillGrow}
            keyboardShouldPersistTaps="always"
          >
            <View style={fill} />
            <View style={forgotModalStyles.innerMainView}>
              <View style={forgotModalStyles.renderStyle}>
                <View style={[forgotModalStyles.labelParent, { flex: 1 }]}>
                  <Image
                    resizeMode="cover"
                    style={[forgotModalStyles.imageStyle]}
                    source={Images.fpassword}
                  />
                  <Text style={[forgotModalStyles.label]}>{'Change Password'}</Text>
                </View>
                <Text style={[forgotModalStyles.labelH2]}>
                  {'Set the new password for your\n Passages account'}
                </Text>
                <View style={[forgotModalStyles.inPutStyle]}>
                  <>
                    <View style={textInputStyles.textInputParent}>
                      <Image
                        resizeMode="cover"
                        style={textInputStyles.imageStyle}
                        source={Images.fpassword}
                      />
                      <View style={textInputStyles.textInputParentInner}>
                        <Input
                          value={currentPassword}
                          onChangeText={(value) => {
                            handleOnChange('currentPassword', value);
                            setCurrentPassword(value);
                            setValidationError({ currentPassword: '' });
                          }}
                          placeholder="Current Password"
                          style={textInputStyles.textInput}
                          placeholderTextColor={Color.steel}
                          secureTextEntry={oldPass}
                        />
                      </View>
                      <TouchableOpacity onPress={() => setOldPass(!oldPass)}>
                        <Image
                          resizeMode="cover"
                          style={textInputStyles.imageStyle}
                          source={oldPass ? Images.feye : Images.eyew}
                        />
                      </TouchableOpacity>
                    </View>
                    {validationError.currentPassword ? (
                      <View>
                        <Text style={textInputStyles.error}>
                          {validationError.currentPassword || ''}
                        </Text>
                      </View>
                    ) : null}
                  </>
                  <>
                    <View style={textInputStyles.textInputParent}>
                      <Image
                        resizeMode="cover"
                        style={textInputStyles.imageStyle}
                        source={Images.fpassword}
                      />
                      <View style={textInputStyles.textInputParentInner}>
                        <Input
                          value={password}
                          placeholder="New password"
                          style={textInputStyles.textInput}
                          placeholderTextColor={Color.steel}
                          secureTextEntry={newPass}
                          onChangeText={(value) => {
                            handleOnChange('password', value);
                            setPassword(value);
                            setValidationError({ password: '' });
                          }}
                        />
                      </View>

                      <TouchableOpacity onPress={() => setNewPass(!newPass)}>
                        <Image
                          resizeMode="cover"
                          style={textInputStyles.imageStyle}
                          source={newPass ? Images.feye : Images.eyew}
                        />
                      </TouchableOpacity>
                    </View>
                    {state.password.error ? (
                      <View>
                        <Text style={textInputStyles.error}>{state.password.error || ''}</Text>
                      </View>
                    ) : null}
                    {validationError.password ? (
                      <View>
                        <Text style={textInputStyles.error}>{validationError.password || ''}</Text>
                      </View>
                    ) : null}
                  </>
                  <>
                    <View style={textInputStyles.textInputParent}>
                      <Image
                        resizeMode="cover"
                        style={textInputStyles.imageStyle}
                        source={Images.fconfirm}
                      />
                      <View style={textInputStyles.textInputParentInner}>
                        <Input
                          value={confirmPassword}
                          placeholder="Confirm new password"
                          style={textInputStyles.textInput}
                          placeholderTextColor={Color.steel}
                          secureTextEntry={newConfirmPass}
                          onChangeText={(value) => {
                            handleOnChange('confirmPassword', value);
                            setConfirmPassword(value);
                          }}
                        />
                      </View>
                      <TouchableOpacity onPress={() => setNewConfirmPass(!newConfirmPass)}>
                        <Image
                          resizeMode="cover"
                          style={textInputStyles.imageStyle}
                          source={newConfirmPass ? Images.feye : Images.eyew}
                        />
                      </TouchableOpacity>
                    </View>
                    {state.confirmPassword.error ? (
                      <View>
                        <Text style={textInputStyles.error}>
                          {state.confirmPassword.error || ''}
                        </Text>
                      </View>
                    ) : validationError.confirmPassword ? (
                      <View>
                        <Text style={textInputStyles.error}>{''}</Text>
                      </View>
                    ) : null}
                  </>
                </View>
                <View style={[forgotModalStyles.buttonContainer, { marginVertical: 20 }]}>
                  <TouchableOpacity
                    onPress={() => onSubmitPasswordReset()}
                    style={[
                      forgotModalStyles.buttonText,
                      {
                        backgroundColor: true ? 'white' : '#9C2B2E',
                        borderColor: false ? '#9C2B2E' : 'white',
                      },
                    ]}
                  >
                    <Text
                      style={[forgotModalStyles.textButton, { color: true ? '#9C2B2E' : 'white' }]}
                    >
                      Submit
                    </Text>
                  </TouchableOpacity>
                  <View style={{ width: 10 }} />
                  <TouchableOpacity
                    onPress={() => {
                      setIsVisibles(!isVisibles);
                      setConfirmPassword('');
                      setCurrentPassword('');
                      setPassword('');
                      setState(stateSchema);
                      setValidationError({
                        currentPassword: '',
                        password: '',
                        confirmPassword: '',
                      });
                    }}
                    style={[
                      forgotModalStyles.buttonText,
                      {
                        backgroundColor: false ? 'white' : '#9C2B2E',
                        borderColor: false ? '#9C2B2E' : 'white',
                      },
                    ]}
                  >
                    <Text
                      style={[forgotModalStyles.textButton, { color: false ? '#9C2B2E' : 'white' }]}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={fill} />
          </ScrollView>
        </Modal>
        <Modal visible={isPicker} style={styles.modalView}>
          <TouchableOpacity onPress={() => setIsPicker(!isPicker)} style={fill}>
            <View style={[fill, center, { backgroundColor: 'rgba(0, 0, 0, 0.7)' }]}>
              <DatePicker
                mode="date"
                date={birthday}
                onDateChange={setBirthdayData}
                style={{ backgroundColor: colorScheme === 'light' ? 'white' : 'grey' }}
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
      </SafeAreaView>
    </DataAvailability>
  );
};
const mapStateToProps = (state) => ({
  requesting: state.profile.requesting,
  profile: state.login.data,
  myProfile: state.profile.profile,
  profileData: state.setting.profile,
  data: state.login.data,
});

const mapDispatchToProps = (dispatch) => ({
  updateProfileRequest: (data, user_id) => dispatch(updateProfileRequest(data, user_id)),
  requestChangePassword: (data) => dispatch(requestChangePassword(data)),
  getProfileRequest: (data) => dispatch(getProfileRequest(data)),
  profileEventRequest: (data) => dispatch(profileEventRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

// import { Input } from 'native-base';
// import { connect } from 'react-redux';
// import Modal from 'react-native-modal';
// import useForm from 'src/hooks/useForm';
// import moment from 'moment';
// import validator from 'src/utils/validation';
// import { DataAvailability, Button, ProfileDropDown } from 'src/components';
// import React, { useEffect, useState } from 'react';
// import DatePicker from 'react-native-date-picker';
// import { Layout, Images, Global } from 'src/theme';
// import ImagePicker from 'react-native-image-crop-picker';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { requestChangePassword } from '../Setting/redux/actions';
// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   ScrollView,
//   Appearance,
//   TouchableOpacity,
// } from 'react-native';
// import { textInputStyles, titleInputStyles, Color, forgotModalStyles, styles } from './styles';
// import { updateProfileRequest, profileEventRequest, getProfileRequest } from './redux/actions';
// // import { launchImageLibrary } from 'react-native-image-picker';

// export const RightIconCards = ({ source, name, onPress }) => {
//   const { row, justifyContentBetween, alignItemsCenter } = Layout;
//   const { secondaryBg, height60 } = Global;

//   return (
//     <TouchableOpacity
//       style={[
//         row,
//         justifyContentBetween,
//         alignItemsCenter,
//         secondaryBg,
//         height60,
//         {
//           ...styles.righIconCardsViewStyle,
//         },
//       ]}
//       onPress={onPress}
//     >
//       {name && <Text style={styles.rightIconCardsText}>{name}</Text>}
//       {source && <Image source={source} style={styles.rightIconCardsImage} />}
//     </TouchableOpacity>
//   );
// };

// const MyProfile = (props) => {
//   const content = props.profileEvent;

//   const {
//     navigation: { navigate },
//     profile,
//     myProfile,
//     requesting,
//   } = props;

//   const [coverImage, setCoverImage] = useState(null);
//   const [uploadedImage, setUploadedCoverImage] = useState(null);
//   const [emptyImg, setEmptyImg] = React.useState(
//     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==',
//   );

//   const dropDownData = ['Male', 'Female', 'Other'];
//   const colorScheme = Appearance.getColorScheme();
//   const [isVisibles, setIsVisibles] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [dropDownOpen, setDropDownOpen] = useState(false);
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [password, setPassword] = useState('');
//   const [isPicker, setIsPicker] = useState(false);
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [oldPass, setOldPass] = useState(true);
//   const [newConfirmPass, setNewConfirmPass] = useState(true);
//   const [newPass, setNewPass] = useState(true);
//   const [selectedIndex, setSelectedIndex] = useState(false);
//   const [bio, setBio] = useState('');
//   const [gender, setGender] = useState('');
//   const [birthday, setBirthday] = useState(new Date());
//   const [formatBirthday, setFormatBirthday] = useState(null);
//   const [name, setName] = useState('');

//   useEffect(() => {
//     props.getProfileRequest(profile.id);
//   }, []);

//   useEffect(() => {
//     const unsubscribe = props.navigation.addListener('focus', () => {
//       props.getProfileRequest(profile.id);
//     });
//     return unsubscribe;
//   }, [props.navigation]);

//   let formData = new FormData();
//   const user_id = profile.id;

//   // const handleChoosePhoto = async () => {
//   //   const options = {
//   //     quality: 0,
//   //     mediaType: 'photo',
//   //   };
//   //   await launchImageLibrary(options, (response) => {
//   //     if (response?.didCancel) {
//   //     } else if ((response.uri && response.type === 'image/jpg') || 'image/jpeg') {
//   //       formData.append('profile_picture', {
//   //         name: response.assets[0].fileName,
//   //         type: response.assets[0].type,
//   //         uri: response.assets[0].uri,
//   //       });
//   //       setUploadedCoverImage(response.assets[0].uri);
//   //       props.updateProfileRequest(formData, user_id);
//   //     } else if (response.error) {
//   //     } else if (response.customButton) {
//   //     }
//   //   });
//   // };

//   // const handleChooseCoverPhoto = async () => {
//   //   const options = {
//   //     quality: 0,
//   //     mediaType: 'photo',
//   //   };
//   //   await launchImageLibrary(options, (response) => {
//   //     if (response?.didCancel) {
//   //     } else if ((response.uri && response.type === 'image/jpg') || 'image/jpeg') {
//   //       formData.append('cover_picture', {
//   //         uri: response.assets[0].uri,
//   //         type: response.assets[0].type,
//   //         name: response.assets[0].fileName,
//   //       });
//   //       props.updateProfileRequest(formData, user_id);
//   //       console.log('FormData', formData);
//   //       setCoverImage(response.assets[0].uri);
//   //     } else if (response.error) {
//   //     } else if (response.customButton) {
//   //     }
//   //   });
//   // };

//   const setBirthdayData = (date) => {
//     setBirthday(date);
//     const dateValue = moment(date).format('YYYY-MM-DD');
//     setFormatBirthday(dateValue);
//   };

//   const handleCoverPhoto = async () => {
//     const options = {
//       cropping: false,
//     };
//     await ImagePicker.openPicker(options).then((image) => {
//       formData.append('cover_picture', {
//         uri: image.path,
//         type: image.mime,
//         name: image.path,
//       });
//       setCoverImage(image.path);
//     });

//     props.updateProfileRequest(formData, user_id);
//   };

//   const handleProfilePhoto = async () => {
//     const options = {
//       cropping: false,
//     };
//     await ImagePicker.openPicker(options).then((image) => {
//       formData.append('profile_picture', {
//         uri: image.path,
//         type: image.mime,
//         name: image.path,
//       });
//       setUploadedCoverImage(image.path);
//     });

//     props.updateProfileRequest(formData, user_id);
//   };

//   const onUpdateProfile = async () => {
//     formData.append('birth_date', formatBirthday);
//     formData.append('gender', gender);
//     formData.append('name', name);
//     formData.append('bio', bio);
//     console.log('formData', formData);
//     await props.updateProfileRequest(formData, user_id);
//     setTimeout(() => {
//       setIsEdit(!isEdit);
//     }, 800);
//   };

//   const [validationError, setValidationError] = useState({
//     currentPassword: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const stateSchema = {
//     password: {
//       value: '',
//       error: '',
//     },
//     confirmPassword: {
//       value: '',
//       error: '',
//     },
//   };
//   const validationStateSchema = {
//     password: {
//       required: true,
//       validator: validator.password,
//     },
//     confirmPassword: {
//       required: true,
//       validator: {
//         compare: (value) => value !== state.password.value,
//         error: "Your passwords didn't match.",
//       },
//     },
//   };

//   const assignValues = (fieldName, backendName, value) => {
//     handleOnChange(fieldName, value);
//   };

//   const { state, setState, handleOnChange, disable } = useForm(stateSchema, validationStateSchema);

//   const onSubmitPasswordReset = () => {
//     if (currentPassword == '') {
//       return setValidationError({
//         currentPassword: 'Please enter Current Password.',
//       });
//     }
//     if (!state.password.value) {
//       return setValidationError({
//         password: 'Please enter New Password',
//       });
//     }
//     if (!confirmPassword) {
//       return setValidationError({
//         confirmPassword: '',
//       });
//     }
//     if (password.localeCompare(state.confirmPassword.value)) {
//       return setValidationError({
//         confirmPassword: "Your passwords didn't match.",
//       });
//     }
//     const data = {
//       old_password: currentPassword,
//       new_password1: password,
//       new_password2: confirmPassword,
//     };

//     props.requestChangePassword(data);
//     setConfirmPassword('');
//     setCurrentPassword('');
//     setPassword('');
//     setIsVisibles(!isVisibles);
//   };

//   const { fill, row, center, fillGrow } = Layout;

//   const onSelect = (index, value) => {
//     setGender(value);
//     setSelectedIndex(index);
//     setDropDownOpen(!dropDownOpen);
//   };
//   console.log('profile', profile);
//   console.log('myProfile', myProfile);
//   return (
//     <DataAvailability requesting={requesting} hasData={profile}>
//       <SafeAreaView style={fill}>
//         <ScrollView contentContainerStyle={fillGrow} showsVerticalScrollIndicator={false}>
//           <View style={titleInputStyles.container}>
//             <TouchableOpacity
//               onPress={() => {
//                 // handleChooseCoverPhoto();
//                 handleCoverPhoto();
//               }}
//               style={styles.CoverPhotoView}
//             >
//               <Image
//                 source={
//                   coverImage
//                     ? { uri: coverImage }
//                     : myProfile?.cover_picture
//                     ? { uri: myProfile?.cover_picture }
//                     : Images.userImage
//                 }
//                 style={styles.CoverPhotoImage}
//               />
//             </TouchableOpacity>

//             <View style={titleInputStyles.logoSecond}>
//               <View style={[titleInputStyles.labelParent]}>
//                 <TouchableOpacity onPress={() => props.navigation.goBack()}>
//                   <Image source={Images.BackAeroLight} style={styles.backArrowStyle} />
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   onPress={() => {
//                     handleProfilePhoto();
//                   }}
//                 >
//                   <Image
//                     source={{
//                       uri: uploadedImage
//                         ? uploadedImage
//                         : myProfile?.profile_picture
//                         ? myProfile.profile_picture
//                         : emptyImg,
//                     }}
//                     style={styles.profilePhotoImage}
//                   />
//                 </TouchableOpacity>
//                 {isEdit ? (
//                   <TouchableOpacity onPress={() => onUpdateProfile()}>
//                     <Text style={styles.profileName}>Save</Text>
//                     {/* <Image source={Images.editProfile} style={styles.editPhotoImage} /> */}
//                   </TouchableOpacity>
//                 ) : (
//                   <TouchableOpacity onPress={() => setIsEdit(true)}>
//                     <Image source={Images.editProfile} style={styles.editPhotoImage} />
//                   </TouchableOpacity>
//                 )}
//               </View>
//               <View style={styles.prfileDetailView}>
//                 {/* <Text style={styles.profileName}>{profile?.name}</Text> */}
//                 {isEdit ? (
//                   <TextInput
//                     value={name}
//                     editable={isEdit}
//                     placeholder="Enter Name"
//                     placeholderTextColor={'black'}
//                     onChangeText={(val) => setName(val)}
//                     style={styles.profileBio}
//                   />
//                 ) : (
//                   <TextInput
//                     value={myProfile?.name}
//                     editable={false}
//                     placeholder="Enter Name"
//                     placeholderTextColor={'black'}
//                     onChangeText={(val) => setName(val)}
//                     style={styles.profileBio}
//                   />
//                 )}

//                 <Text style={{ marginVertical: 7 }}>{profile?.email}</Text>
//               </View>
//               <View
//                 style={{
//                   flexWrap: 'wrap',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   alignSelf: 'center',
//                   paddingHorizontal: 20,
//                   flex: 1,
//                 }}
//               >
//                 {/* <Text style={styles.profileBio}>Personal Profile bio Section</Text>
//                 <Text style={styles.profileBio}>Gender</Text>
//                 <Text style={styles.profileBio}>Date of Birth</Text> */}
//                 {isEdit ? (
//                   <TextInput
//                     value={bio}
//                     editable={isEdit}
//                     multiline={true}
//                     numberOfLines={3}
//                     placeholder="Enter Bio"
//                     placeholderTextColor={'black'}
//                     onChangeText={(val) => setBio(val)}
//                     style={styles.profileBio}
//                   />
//                 ) : (
//                   <TextInput
//                     value={myProfile?.bio}
//                     editable={false}
//                     multiline={true}
//                     numberOfLines={3}
//                     placeholder="Enter Bio"
//                     placeholderTextColor={'black'}
//                     onChangeText={(val) => setBio(val)}
//                     style={styles.profileBio}
//                   />
//                 )}
//                 <TouchableOpacity onPress={() => setDropDownOpen(!dropDownOpen)} disabled={!isEdit}>
//                   {isEdit ? (
//                     <TextInput
//                       value={gender}
//                       editable={false}
//                       placeholder="Gender"
//                       placeholderTextColor={'black'}
//                       onChangeText={(val) => setGender(val)}
//                       style={styles.profileBio}
//                     />
//                   ) : (
//                     <TextInput
//                       value={myProfile?.gender}
//                       editable={false}
//                       placeholder="Gender"
//                       placeholderTextColor={'black'}
//                       onChangeText={(val) => setGender(val)}
//                       style={styles.profileBio}
//                     />
//                   )}
//                 </TouchableOpacity>
//                 {dropDownOpen ? (
//                   <View>
//                     <ProfileDropDown
//                       data={dropDownData}
//                       function1={onSelect}
//                       selectedCategoryId={selectedIndex}
//                     />
//                   </View>
//                 ) : null}
//                 <TouchableOpacity onPress={() => setIsPicker(true)} disabled={!isEdit}>
//                   <TextInput
//                     value={isEdit ? formatBirthday : myProfile?.birth_date}
//                     editable={false}
//                     placeholder="Date of Birth"
//                     placeholderTextColor={'black'}
//                     onChangeText={(val) => setBirthday(val)}
//                     style={styles.profileBio}
//                   />
//                 </TouchableOpacity>
//               </View>
//               {/* <View style={styles.inviteCollabView}> */}
//               {/* <Text style={styles.inviteCollabText}>Invited Collaborators</Text> */}
//               {/* <ScrollView horizontal={true}>
//                   <View style={styles.rowSB}>
//                     <View style={styles.cardMainView}>
//                       <View style={styles.cardWrapper}>
//                         <View style={styles.cardInnerView} />
//                         <View>
//                           <Text style={styles.inviteCollabName}>Jone Doe</Text>
//                           <Text style={styles.borderLineStyle} />
//                           <View style={{ marginLeft: 30 }}>
//                             <TouchableOpacity style={{ marginLeft: 30 }}>
//                               <Image
//                                 source={Images.Delete}
//                                 style={styles.deleteImage}
//                                 tintColor="#9C2B2E"
//                               />
//                             </TouchableOpacity>
//                           </View>
//                         </View>
//                       </View>
//                     </View>
//                     <View style={styles.card2MainView}>
//                       <View style={styles.cardWrapper}>
//                         <View style={styles.cardInnerView} />
//                         <View style={{}}>
//                           <Text style={styles.inviteCollabName}>Jone Doe</Text>
//                           <Text style={styles.borderLineStyle} />
//                           <View style={{ marginLeft: 30 }}>
//                             <TouchableOpacity
//                               // onPress={() => props.navigation.goBack()}
//                               style={{ marginLeft: 30 }}
//                             >
//                               <Image
//                                 source={Images.Delete}
//                                 style={styles.deleteImage}
//                                 tintColor="#9C2B2E"
//                               />
//                             </TouchableOpacity>
//                           </View>
//                         </View>
//                       </View>
//                     </View>
//                   </View>
//                 </ScrollView> */}
//               {/* </View> */}
//               <View style={[styles.myCollabView, { paddingVertical: 20 }]}>
//                 {/* <Text style={styles.inviteCollabText}>My Collaborators</Text> */}
//                 {/* <ScrollView horizontal={true}>
//                   <View style={styles.rowSB}>
//                     <View style={styles.cardMainView}>
//                       <View style={styles.cardWrapper}>
//                         <View style={styles.cardInnerView} />
//                         <View style={{}}>
//                           <Text style={styles.inviteCollabName}>Summer Vecations</Text>
//                           <Text style={{ marginLeft: 10, color: Color.stiletto }}>
//                             Go to project
//                           </Text>
//                           <View style={{ marginTop: -14, marginLeft: 100 }}>
//                             <TouchableOpacity style={{}}>
//                               <Image source={Images.leftAeroLight} style={styles.leftAeroStyle} />
//                             </TouchableOpacity>
//                           </View>
//                         </View>
//                       </View>
//                     </View>
//                     <View style={styles.card2MainView}>
//                       <View style={styles.cardWrapper}>
//                         <View style={styles.cardInnerView} />
//                         <View style={{}}>
//                           <Text style={styles.inviteCollabName}>Summer Vecations</Text>
//                           <Text style={{ marginLeft: 10, color: Color.stiletto }}>
//                             Go to project
//                           </Text>
//                           <View style={{ marginTop: -14, marginLeft: 100 }}>
//                             <TouchableOpacity style={{}}>
//                               <Image source={Images.leftAeroLight} style={styles.leftAeroStyle} />
//                             </TouchableOpacity>
//                           </View>
//                         </View>
//                       </View>
//                     </View>
//                   </View>
//                 </ScrollView> */}
//                 <TouchableOpacity
//                   style={styles.myContentCardView}
//                   onPress={() => {
//                     navigate('MyContentScreen');
//                   }}
//                 >
//                   <View>
//                     <Image source={Images.myContent} style={styles.myContentCardImage} />
//                   </View>
//                   <View style={{ marginLeft: -40 }}>
//                     <Text style={styles.myContentCardText}>My Content</Text>
//                   </View>
//                   <View>
//                     <Image source={Images.leftAeroLight} style={styles.myContentleftAero} />
//                   </View>
//                 </TouchableOpacity>

//                 {/* <View style={styles.myVaultCardView}>
//                   <View>
//                     <Image source={Images.myVault} style={styles.myContentCardImage} />
//                   </View>
//                   <View style={{ marginLeft: -40 }}>
//                     <TouchableOpacity onPress={() => {}}>
//                       <Text style={styles.myContentCardText1}>My Vault</Text>
//                     </TouchableOpacity>
//                   </View>

//                   <View>
//                     <Image source={Images.leftAeroLight} style={styles.myContentleftAero1} />
//                   </View>
//                 </View> */}

//                 <TouchableOpacity
//                   onPress={() => setIsVisibles(!isVisibles)}
//                   style={styles.changePasswordCardVie}
//                 >
//                   <View style={[row, center]}>
//                     <Image source={Images.darkPass} style={styles.dardPassImage} />
//                     <Text style={{ ...styles.myContentCardText, color: 'white' }}>
//                       Change Password
//                     </Text>
//                   </View>
//                   <Image source={Images.darkBackArrow} style={styles.darkBackImage} />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//         <Modal
//           visible={isVisibles}
//           onBackButtonPress={() => {
//             setIsVisibles(!isVisibles);
//           }}
//           style={styles.ModalMainView}
//         >
//           <ScrollView
//             horizontal={false}
//             contentContainerStyle={fillGrow}
//             keyboardShouldPersistTaps="always"
//           >
//             <View style={fill} />
//             <View style={forgotModalStyles.innerMainView}>
//               <View style={forgotModalStyles.renderStyle}>
//                 <View style={[forgotModalStyles.labelParent, { flex: 1 }]}>
//                   <Image
//                     resizeMode="cover"
//                     style={[forgotModalStyles.imageStyle]}
//                     source={Images.fpassword}
//                   />
//                   <Text style={[forgotModalStyles.label]}>{'Change Password'}</Text>
//                 </View>
//                 <Text style={[forgotModalStyles.labelH2]}>
//                   {'Set the new password for your\n Passages account'}
//                 </Text>
//                 <View style={[forgotModalStyles.inPutStyle]}>
//                   <>
//                     <View style={textInputStyles.textInputParent}>
//                       <Image
//                         resizeMode="cover"
//                         style={textInputStyles.imageStyle}
//                         source={Images.fpassword}
//                       />
//                       <View style={textInputStyles.textInputParentInner}>
//                         <Input
//                           value={currentPassword}
//                           onChangeText={(value) => {
//                             setCurrentPassword(value), setValidationError({ currentPassword: '' });
//                           }}
//                           placeholder="Current Password"
//                           style={textInputStyles.textInput}
//                           placeholderTextColor={Color.steel}
//                           secureTextEntry={oldPass}
//                           // onChangeText={(value) => assignValues('password', 'password', value)}
//                         />
//                       </View>
//                       <TouchableOpacity onPress={() => setOldPass(!oldPass)}>
//                         <Image
//                           resizeMode="cover"
//                           style={textInputStyles.imageStyle}
//                           source={Images.feye}
//                         />
//                       </TouchableOpacity>
//                     </View>
//                     {validationError.currentPassword ? (
//                       <View>
//                         <Text style={textInputStyles.error}>
//                           {validationError.currentPassword || ''}
//                         </Text>
//                       </View>
//                     ) : null}
//                   </>
//                   <>
//                     <View style={textInputStyles.textInputParent}>
//                       <Image
//                         resizeMode="cover"
//                         style={textInputStyles.imageStyle}
//                         source={Images.fpassword}
//                       />
//                       <View style={textInputStyles.textInputParentInner}>
//                         <Input
//                           value={password}
//                           placeholder="New password"
//                           style={textInputStyles.textInput}
//                           placeholderTextColor={Color.steel}
//                           secureTextEntry={newPass}
//                           onChangeText={(value) => {
//                             assignValues('password', 'password', value),
//                               setPassword(value),
//                               setValidationError({ password: '' });
//                           }}
//                         />
//                       </View>

//                       <TouchableOpacity onPress={() => setNewPass(!newPass)}>
//                         <Image
//                           resizeMode="cover"
//                           style={textInputStyles.imageStyle}
//                           source={Images.feye}
//                         />
//                       </TouchableOpacity>
//                     </View>
//                     {state.password.error ? (
//                       <View>
//                         <Text style={textInputStyles.error}>{state.password.error || ''}</Text>
//                       </View>
//                     ) : null}
//                     {validationError.password ? (
//                       <View>
//                         <Text style={textInputStyles.error}>{validationError.password || ''}</Text>
//                       </View>
//                     ) : null}
//                   </>
//                   <>
//                     <View style={textInputStyles.textInputParent}>
//                       <Image
//                         resizeMode="cover"
//                         style={textInputStyles.imageStyle}
//                         source={Images.fconfirm}
//                       />
//                       <View style={textInputStyles.textInputParentInner}>
//                         <Input
//                           value={confirmPassword}
//                           placeholder="Confirm new password"
//                           style={textInputStyles.textInput}
//                           placeholderTextColor={Color.steel}
//                           secureTextEntry={newConfirmPass}
//                           onChangeText={(value) => {
//                             assignValues('confirmPassword', 'confirmPassword', value),
//                               setConfirmPassword(value);
//                           }}
//                         />
//                       </View>
//                       <TouchableOpacity onPress={() => setNewConfirmPass(!newConfirmPass)}>
//                         <Image
//                           resizeMode="cover"
//                           style={textInputStyles.imageStyle}
//                           source={Images.feye}
//                         />
//                       </TouchableOpacity>
//                     </View>
//                     {state.confirmPassword.error ? (
//                       <View>
//                         <Text style={textInputStyles.error}>
//                           {state.confirmPassword.error || ''}
//                         </Text>
//                       </View>
//                     ) : validationError.confirmPassword ? (
//                       <View>
//                         <Text style={textInputStyles.error}>{''}</Text>
//                       </View>
//                     ) : null}
//                   </>
//                 </View>
//                 <View style={[forgotModalStyles.buttonContainer, { marginVertical: 20 }]}>
//                   <TouchableOpacity
//                     onPress={() => onSubmitPasswordReset()}
//                     style={[
//                       forgotModalStyles.buttonText,
//                       {
//                         backgroundColor: true ? 'white' : '#9C2B2E',
//                         borderColor: false ? '#9C2B2E' : 'white',
//                       },
//                     ]}
//                   >
//                     <Text
//                       style={[forgotModalStyles.textButton, { color: true ? '#9C2B2E' : 'white' }]}
//                     >
//                       Submit
//                     </Text>
//                   </TouchableOpacity>
//                   <View style={{ width: 10 }} />
//                   <TouchableOpacity
//                     onPress={() => {
//                       setIsVisibles(!isVisibles);
//                       setConfirmPassword('');
//                       setCurrentPassword('');
//                       setPassword('');
//                       setState(stateSchema);
//                       setValidationError({
//                         currentPassword: '',
//                         password: '',
//                         confirmPassword: '',
//                       });
//                     }}
//                     style={[
//                       forgotModalStyles.buttonText,
//                       {
//                         backgroundColor: false ? 'white' : '#9C2B2E',
//                         borderColor: false ? '#9C2B2E' : 'white',
//                       },
//                     ]}
//                   >
//                     <Text
//                       style={[forgotModalStyles.textButton, { color: false ? '#9C2B2E' : 'white' }]}
//                     >
//                       Cancel
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//             <View style={fill} />
//           </ScrollView>
//         </Modal>
//         <Modal visible={isPicker} style={styles.modalView}>
//           <TouchableOpacity onPress={() => setIsPicker(!isPicker)} style={fill}>
//             <View style={[fill, center, { backgroundColor: 'rgba(0, 0, 0, 0.7)' }]}>
//               <DatePicker
//                 mode="date"
//                 date={birthday}
//                 onDateChange={setBirthdayData}
//                 style={{ backgroundColor: colorScheme === 'light' ? 'white' : 'grey' }}
//               />
//               <Button
//                 onPress={() => {
//                   setIsPicker(false), setBirthdayData(birthday);
//                 }}
//                 text={'Add Date'}
//                 color={'primary'}
//                 style={styles.AddTimeBtnStyle}
//                 full={true}
//               />
//             </View>
//           </TouchableOpacity>
//         </Modal>
//       </SafeAreaView>
//     </DataAvailability>
//   );
// };
// const mapStateToProps = (state) => ({
//   requesting: state.profile.requesting,
//   profile: state.login.data,
//   myProfile: state.profile.myProfile,
//   profileData: state.setting.profile,
//   data: state.login.data,
// });

// const mapDispatchToProps = (dispatch) => ({
//   updateProfileRequest: (data, user_id) => dispatch(updateProfileRequest(data, user_id)),
//   requestChangePassword: (data) => dispatch(requestChangePassword(data)),
//   getProfileRequest: (data) => dispatch(getProfileRequest(data)),
//   profileEventRequest: (data) => dispatch(profileEventRequest(data)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
