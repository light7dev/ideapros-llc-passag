import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Text,
  Keyboard,
} from 'react-native';

import { Input } from 'native-base';

// components
import { Layout, Images, Global } from 'src/theme';
import RNModal from '../../components/RNModal';

import { Color, textInputStyles, forgotModalStyles, styles } from './styles';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import useForm from 'src/hooks/useForm';

// utils
import validator from 'src/utils/validation';

import { deleteAccountRequest, requestChangePassword } from './redux/actions';
import { signOut } from '../Login/redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const RightIconCards = ({ source, name, onPress }) => {
  const { justifyContentBetween, alignItemsCenter, row } = Layout;

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

export const LeftIconCards = ({ source, name, onPress, BgColor }) => {
  const { row, justifyContentStart, alignItemsCenter } = Layout;
  const { primaryBg, secondaryBg, height60 } = Global;

  return (
    <TouchableOpacity
      style={[
        row,
        justifyContentStart,
        alignItemsCenter,
        BgColor ? primaryBg : secondaryBg,
        height60,
        {
          ...styles.leftIconCardsViewStyle,
        },
      ]}
      onPress={onPress}
    >
      {source && <Image source={source} resizeMode="cover" style={textInputStyles.imageStyle} />}
      {name && (
        <Text
          style={{
            color: BgColor ? 'white' : '#9C2B2E',
            ...styles.leftIconCardsText,
          }}
        >
          {name}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const Setting = (props) => {
  const {
    navigation: { navigate, goBack },
  } = props;

  const [oldPass, setOldPass] = useState(true);
  const [newConfirmPass, setNewConfirmPass] = useState(true);
  const [newPass, setNewPass] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibles, setIsVisibles] = useState(false);
  const [sign, setSign] = useState(false);

  const [onPressButton, setOnPressButton] = useState(0);

  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    confirmPassword: {
      value: '',
      error: '',
    },
  };
  const validationStateSchema = {
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

  const onSubmitPasswordReset = async () => {
    if (currentPassword == '') {
      return setValidationError({
        currentPassword: 'Please enter Current Password.',
      });
    }
    if (currentPassword.length < 8) {
      return setValidationError({
        currentPassword: 'Too short !',
      });
    }
    if (!state.password.value) {
      return setValidationError({
        password: 'Please enter New Password',
      });
    }

    if (password !== confirmPassword) {
      return handleOnChange('confirmPassword', confirmPassword);
    }

    const data = {
      old_password: currentPassword,
      new_password1: password,
      new_password2: confirmPassword,
    };
    Keyboard.dismiss();
    await props.requestChangePassword(data);
    setTimeout(() => {
      setState(stateSchema);
      setIsVisibles(!isVisibles);
      setConfirmPassword('');
      setCurrentPassword('');
      setPassword('');
    }, 100);
  };

  const signOutFunc = async () => {
    if (props.data) {
      try {
        await AsyncStorage.clear();
        props.signOut();
        if (props.loginViaGoogle) {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
        }
      } catch (error) {
      }
    }
  };

  const Carddata = [
    { name: 'Privacy And Security', image: 'leftAeroLight', screen: 'PrivacySecurity' },
  ];

  const { fill, row, center, alignItemsCenter, justifyContentBetween } = Layout;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[]}>
        <View
          style={[
            row,
            justifyContentBetween,
            alignItemsCenter,
            {
              marginHorizontal: 20,
              marginVertical: 20,
            },
          ]}
        >
          <TouchableOpacity onPress={() => goBack()} style={fill}>
            <Image source={Images.BackAeroLight} style={styles.backArrowStyle} />
          </TouchableOpacity>
          <View style={fill}>
            <Text style={styles.headerTitle}>Settings</Text>
          </View>
          <View style={fill} />
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps={'always'}>
          <View style={styles.cardMainView}>
            {Carddata.map((item, i) => (
              <RightIconCards
                key={i}
                name={item.name}
                source={Images[item.image]}
                secondaryB={true}
                onPress={() => navigate(item.screen)}
              />
            ))}
          </View>
          <View style={[fill, justifyContentBetween, { ...styles.cardMainView }]}>
            <LeftIconCards
              name="Change Password"
              source={Images.paswordImage}
              onPress={() => setIsVisibles(!isVisibles)}
              secondaryB={false}
            />
          </View>
          <View style={[fill, justifyContentBetween, { ...styles.cardMainView }]}>
            <LeftIconCards
              name={'Sign Out'}
              source={Images.SignOut}
              onPress={() => setSign(!sign)}
              BgColor={true}
            />

            <LeftIconCards
              name={'Delete Account'}
              source={Images.Deletew}
              onPress={() => setIsVisible(!isVisible)}
              BgColor={true}
            />
          </View>
        </ScrollView>
      </View>

      <RNModal
        visible={sign}
        onBackButtonPress={() => {
          setSign(!sign);
        }}
        onPressNo={() => {
          setOnPressButton(0);
          setSign(!sign);
        }}
        onPressYes={() => {
          setOnPressButton(1);
          setSign(!sign);
          signOutFunc();
        }}
        onPressButton={onPressButton}
      />

      <RNModal
        visible={isVisible}
        onBackButtonPress={() => {
          setIsVisible(!isVisible);
        }}
        onPressNo={() => {
          setOnPressButton(0);
          setIsVisible(!isVisible);
        }}
        onPressYes={async () => {
          setOnPressButton(1);
          await props.deleteAccountRequest(props?.data?.id);
          if (props.loginViaGoogle) {
            await GoogleSignin.signOut();
          }
          await AsyncStorage.clear();
          await props.signOut();
          setIsVisible(!isVisible);
        }}
        onPressButton={onPressButton}
      />

      <Modal
        visible={isVisibles}
        onBackButtonPress={() => {
          setIsVisibles(!isVisibles);
        }}
        style={styles.ModalMainView}
      >
        <ScrollView
          horizontal={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps={'always'}
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
                        placeholder="Current Password"
                        style={textInputStyles.textInput}
                        placeholderTextColor={Color.steel}
                        secureTextEntry={oldPass}
                        onChangeText={(value) => {
                          // handleOnChange('password', value);
                          setCurrentPassword(value);
                          setValidationError({ ...validationError, currentPassword: '' });
                        }}
                      />
                    </View>
                    <TouchableOpacity onPress={() => setOldPass(!oldPass)}>
                      {oldPass ? (
                        <Image
                          resizeMode="cover"
                          style={textInputStyles.imageStyle}
                          source={Images.feye}
                        />
                      ) : (
                        <Image
                          resizeMode="cover"
                          style={textInputStyles.imageStyle}
                          source={Images.eyew}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  {validationError.currentPassword ? (
                    <View>
                      <Text style={textInputStyles.error}>{validationError.currentPassword}</Text>
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
                      {newPass ? (
                        <Image
                          resizeMode="cover"
                          style={textInputStyles.imageStyle}
                          source={Images.feye}
                        />
                      ) : (
                        <Image
                          resizeMode="cover"
                          style={textInputStyles.imageStyle}
                          source={Images.eyew}
                        />
                      )}
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
                      {newConfirmPass ? (
                        <Image
                          resizeMode="cover"
                          style={textInputStyles.imageStyle}
                          source={Images.feye}
                        />
                      ) : (
                        <Image
                          resizeMode="cover"
                          style={textInputStyles.imageStyle}
                          source={Images.eyew}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  {state.confirmPassword.error ? (
                    <View>
                      <Text style={textInputStyles.error}>{state.confirmPassword.error || ''}</Text>
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
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  deleteAccount: state.setting.deleteAccount,
  loginViaGoogle: state.login.loginViaGoogle,
  data: state.login.data,
});

const mapDispatchToProps = (dispatch) => ({
  deleteAccountRequest: (data) => dispatch(deleteAccountRequest(data)),
  requestChangePassword: (data) => dispatch(requestChangePassword(data)),
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
