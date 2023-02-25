import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Color,
  buttonStyles,
  textInputStyles,
  titleInputStyles,
  forgotModalStyles,
} from './styles';

import {
  dotsSecondReset,
  resetErrors,
  loginRequest,
  loginViaFacebookRequest,
  loginViaGmailRequest,
  loginViaAppleRequest,
  forgotPasswordRequest,
  getTokenRequest,
  resetPassRequest,
  reSendForgotPasswordRequest,
} from './redux/actions';
import { useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';
import { styles } from './styles';
import { InputField } from 'src/components';
import { Images, Gutters } from 'src/theme';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import OTPTextView from 'react-native-otp-textinput';
import { Input } from 'native-base';
// hooks
import useForm from 'src/hooks/useForm';
import appleAuth from '@invertase/react-native-apple-authentication';

// utils
import validator from 'src/utils/validation';
import axios from 'axios';

// Custom Button
const Button = (props) => (
  <TouchableOpacity onPress={props?.onPress} disabled={props.loading || props.disabled}>
    <View style={[buttonStyles.viewStyle, props.viewStyle]}>
      {props.loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={props?.loadingColor ? props?.loadingColor : Color.white} />
        </View>
      ) : (
        <View style={buttonStyles.textStyleParent}>
          <Text style={[buttonStyles.textStyle, props.textStyle]}>{props.title}</Text>
          <Image
            resizeMode="cover"
            style={textInputStyles.imageStyle}
            source={Images.backArrowImage}
          />
        </View>
      )}
    </View>
  </TouchableOpacity>
);

// Grouped Social Buttons View
const SocialButtonsView = (props) => (
  <>
    <Text style={textInputStyles.signInText}>Sign In With</Text>

    <View style={textInputStyles.socialImagesParent}>
      <TouchableOpacity onPress={props.onGoogleConnect}>
        <Image resizeMode="cover" style={textInputStyles.socialImages} source={Images.google} />
      </TouchableOpacity>
      {Platform.OS === 'ios' ? (
        <TouchableOpacity onPress={props.onAppleConnect}>
          <Image
            resizeMode="cover"
            style={[textInputStyles.socialImages, { marginHorizontal: 20 }]}
            source={Images.apple}
          />
        </TouchableOpacity>
      ) : (
        <View style={{ marginHorizontal: 15 }} />
      )}
      <TouchableOpacity onPress={props.onFacebookConnect}>
        <Image resizeMode="cover" style={[textInputStyles.socialImages]} source={Images.facebook} />
      </TouchableOpacity>
    </View>
  </>
);

const Login = (props) => {
  const {
    navigation: { navigate },
    dotsSecond,
  } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [onPressButton, setOnPressButton] = useState(true);
  const [newPass, setNewPass] = useState(true);
  const [newConfirmPass, setNewConfirmPass] = useState(true);
  const [token, setToken] = useState('');
  const [active, setActive] = useState(false);
  const [loadings, setLoadings] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    setActive(false);
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setActive(false);
      props.resetErrors();
    });
    return unsubscribe;
  }, [props.navigation]);

  const stateSchema = {
    email: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    },
  };
  const validationStateSchema = {
    email: {
      required: true,
      validator: validator.email,
    },
    password: {
      required: true,
      validator: validator.password,
    },
  };

  const { state, setState, handleOnChange, disable } = useForm(stateSchema, validationStateSchema);

  const forgotEmailValidation = () => {
    props.forgotPasswordRequest(state.email.value);
    // setDotsSecond(1);
  };

  const renderItem = ({ index }) => {
    return (
      <>
        {dotsSecond === 0 && (
          <>
            <View style={[forgotModalStyles.renderStyle, { padding: 10 }]} key={index}>
              <View style={[forgotModalStyles.labelParent, { flex: 1 }]}>
                <Image
                  resizeMode="cover"
                  style={[forgotModalStyles.imageStyle]}
                  source={Images.fpassword}
                />
                <Text style={[forgotModalStyles.label]}>{'Forgot Password?'}</Text>
              </View>
              <Text style={[forgotModalStyles.labelH2]}>
                {'Enter your email address\n' + 'below to reset password'}
              </Text>
              <>
                <View style={textInputStyles.textInputParent}>
                  <Image
                    resizeMode="cover"
                    style={textInputStyles.imageStyle}
                    source={Images.femail}
                  />
                  <View style={textInputStyles.textInputParentInner}>
                    <Input
                      placeholder="example@email.com"
                      style={[textInputStyles.textInput, { color: '#fff' }]}
                      placeholderTextColor={Color.steel}
                      onChangeText={(val) => {
                        handleOnChange('email', val);
                      }}
                    />
                  </View>
                </View>
                {state.email.error ? (
                  <View style={forgotModalStyles.errorMessageStyle}>
                    <Text style={forgotModalStyles.errorMessageTextStyle}>
                      {state.email.error || ''}
                    </Text>
                  </View>
                ) : null}
              </>
              {props.forgotError && <Text style={{ color: 'red' }}>{props.forgotError}</Text>}
              <View style={[forgotModalStyles.buttonContainer, { marginVertical: 20 }]}>
                <TouchableOpacity
                  disabled={state.email.value === '' || state.email.error}
                  onPress={() => forgotEmailValidation()}
                  style={[
                    forgotModalStyles.buttonText,
                    {
                      backgroundColor: 'white',
                      borderColor: 'white',
                    },
                  ]}
                >
                  {props.requesting ? (
                    <ActivityIndicator color="#9C2B2E" />
                  ) : (
                    <Text style={[forgotModalStyles.textButton, { color: '#9C2B2E' }]}>Submit</Text>
                  )}
                </TouchableOpacity>

                <View style={{ width: 10 }} />
                <TouchableOpacity
                  onPress={async () => {
                    await props.resetErrors();
                    await props.dotsSecondReset();
                    setIsVisible(!isVisible);
                    setState(stateSchema);
                  }}
                  style={[
                    forgotModalStyles.buttonText,
                    {
                      backgroundColor: '#9C2B2E',
                      borderColor: 'white',
                    },
                  ]}
                >
                  <Text style={[forgotModalStyles.textButton, { color: 'white' }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        {dotsSecond === 1 && (
          <>
            <View style={[forgotModalStyles.renderStyle, { padding: 10 }]} key={index}>
              <View style={forgotModalStyles.labelParent}>
                <Image
                  resizeMode="cover"
                  style={forgotModalStyles.tockeImg}
                  source={Images.fcode}
                />
                <Text style={[forgotModalStyles.label, { flex: 1 }]}>{'Token Code'}</Text>
              </View>
              <View style={{ height: 42, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 14 }}>Enter token sent via email</Text>
              </View>
              <View style={forgotModalStyles.otpBox}>
                <Image
                  resizeMode="cover"
                  style={forgotModalStyles.otpImage2}
                  source={Images.fcode}
                />

                <OTPTextView
                  defaultValue={token}
                  containerStyle={textInputStyles.otpContainer}
                  textInputStyle={[
                    textInputStyles.otpInputText,
                    {
                      borderColor: 'white',
                      color: 'white',
                    },
                  ]}
                  tintColor={'white'}
                  handleTextChange={(e) => {
                    setToken(e);
                    e.length === 0 && props.resetErrors();
                  }}
                />
              </View>
              {props.error && <Text style={{ color: 'red' }}>{props.error}</Text>}
              <View
                style={{
                  marginTop: 30,
                  height: 42,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <Text style={{ color: '#fff', fontSize: 14 }}>Haven’t received it? </Text>
                {loadings ? (
                  <ActivityIndicator style={{ marginLeft: 10 }} color="#fff" />
                ) : (
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#fff',
                      fontSize: 14,
                      textDecorationLine: 'underline',
                    }}
                    onPress={() => {
                      setLoadings(true);
                      props.resetErrors();
                      props.reSendForgotPasswordRequest(state.email.value);
                      setTimeout(() => {
                        setLoadings(false);
                      }, 400);
                    }}
                  >
                    Resend token!
                  </Text>
                )}
              </View>
              <View style={[forgotModalStyles.buttonContainer, { marginVertical: 20 }]}>
                <TouchableOpacity
                  disabled={!token}
                  onPress={async () => {
                    await props.getTokenRequest(token);
                    // setDotsSecond(2);
                    setOnPressButton(!onPressButton);
                  }}
                  style={[
                    forgotModalStyles.buttonText,
                    {
                      backgroundColor: onPressButton ? 'white' : '#9C2B2E',
                      borderColor: onPressButton ? '#9C2B2E' : 'white',
                    },
                  ]}
                >
                  {props.requesting ? (
                    <ActivityIndicator color={onPressButton ? '#9C2B2E' : 'white'} />
                  ) : (
                    <Text
                      style={[
                        forgotModalStyles.textButton,
                        { color: onPressButton ? '#9C2B2E' : 'white' },
                      ]}
                    >
                      Submit
                    </Text>
                  )}
                </TouchableOpacity>

                <View style={{ width: 10 }} />
                <TouchableOpacity
                  onPress={async () => {
                    await props.resetErrors();

                    await props.dotsSecondReset();
                    setIsVisible(!isVisible);
                    setState(stateSchema);
                  }}
                  style={[
                    forgotModalStyles.buttonText,
                    {
                      backgroundColor: '#9C2B2E',
                      borderColor: 'white',
                    },
                  ]}
                >
                  <Text style={[forgotModalStyles.textButton, { color: 'white' }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        {dotsSecond === 2 && (
          <>
            <View style={[forgotModalStyles.renderStyle, { padding: 10 }]} key={index}>
              <View style={[forgotModalStyles.labelParent, { flex: 1 }]}>
                <Image
                  resizeMode="cover"
                  style={[forgotModalStyles.imageStyle]}
                  source={Images.fpassword}
                />
                <Text style={[forgotModalStyles.label]}>{'Reset Password'}</Text>
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
                        placeholder="New password"
                        style={[textInputStyles.textInput, { color: '#fff' }]}
                        placeholderTextColor={Color.steel}
                        secureTextEntry={newPass}
                        onChangeText={(value) => handleOnChange('password', value)}
                      />
                    </View>
                    <TouchableOpacity onPress={() => setNewPass(!newPass)}>
                      <Image
                        resizeMode="cover"
                        style={textInputStyles.imageStyle}
                        source={Images.feye}
                      />
                    </TouchableOpacity>
                  </View>
                  {state.password.error ? (
                    <View style={forgotModalStyles.errorMessageStyle}>
                      <Text style={forgotModalStyles.errorMessageTextStyle}>
                        {state.password.error}
                      </Text>
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
                        placeholder="Confirm password"
                        style={[textInputStyles.textInput, { color: '#fff' }]}
                        placeholderTextColor={Color.steel}
                        secureTextEntry={newConfirmPass}
                        onChangeText={(value) => handleOnChange('confirmPassword', value)}
                      />
                    </View>
                    <TouchableOpacity onPress={() => setNewConfirmPass(!newConfirmPass)}>
                      <Image
                        resizeMode="cover"
                        style={textInputStyles.imageStyle}
                        source={Images.feye}
                      />
                    </TouchableOpacity>
                  </View>
                  {state.confirmPassword.error ? (
                    <View style={forgotModalStyles.errorMessageStyle}>
                      <Text style={forgotModalStyles.errorMessageTextStyle}>
                        {state.confirmPassword.error || ''}
                      </Text>
                    </View>
                  ) : null}
                </>
              </View>
              <View style={[forgotModalStyles.buttonContainer, { marginVertical: 20 }]}>
                <TouchableOpacity
                  disabled={
                    !!(
                      state.password.value === '' ||
                      state.password.error ||
                      state.confirmPassword.value === '' ||
                      state.confirmPassword.error
                    )
                  }
                  onPress={async () => {
                    const data = {
                      token: token,
                      password: state.password.value,
                    };
                    // setDotsSecond(0);
                    await props.resetPassRequest(data);
                    setOnPressButton(!onPressButton);
                    setTimeout(() => {
                      setIsVisible(!isVisible);
                    }, 500);
                  }}
                  style={[
                    forgotModalStyles.buttonText,
                    {
                      backgroundColor: 'white',
                      borderColor: 'white',
                    },
                  ]}
                >
                  {props.requesting ? (
                    <ActivityIndicator color="#9C2B2E" />
                  ) : (
                    <Text style={[forgotModalStyles.textButton, { color: '#9C2B2E' }]}>Submit</Text>
                  )}
                </TouchableOpacity>
                <View style={{ width: 10 }} />
                <TouchableOpacity
                  onPress={() => {
                    if (props.error) {
                      props.resetErrors();
                    }
                    props.dotsSecondReset();
                    setIsVisible(!isVisible);
                    setState(state);
                  }}
                  style={[
                    forgotModalStyles.buttonText,
                    {
                      backgroundColor: '#9C2B2E',
                      borderColor: 'white',
                    },
                  ]}
                >
                  <Text style={[forgotModalStyles.textButton, { color: 'white' }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </>
    );
  };

  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = Dimensions.get('window').width;

  const changeDots = (index) => {
    setDotsSecond(index);
  };

  const onSigningPress = () => {
    if (!email) {
      return setValidationError({
        email: 'Please enter a valid email address.',
        password: '',
      });
    }

    if (!password) {
      return setValidationError({
        email: '',
        password: 'Please enter a valid password',
      });
    }

    props.loginRequest({ username: state.email.value, password: state.password.value });
  };

  const onFacebookConnect = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['email', 'public_profile']);
      if (result.isCancelled) {
      } else {
        await AccessToken.getCurrentAccessToken()
          .then(async (res) => {
            const token = res.accessToken.toString();
            await props.loginViaFacebookRequest(token);
          })
          .catch((err) => {
            err;
          });
      }
    } catch (err) {
      err;
    }
  };

  const onAppleConnect = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
      }
      const data = {
        access_token: appleAuthRequestResponse.identityToken,
        code: appleAuthRequestResponse.authorizationCode,
        id_token: appleAuthRequestResponse.identityToken,
      };

      await props.loginViaAppleRequest(data);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      }
      throw error;
    }
  };

  const onGoogleConnect = async () => {
    GoogleSignin.configure({
      androidClientId: '260182076355-f8v0impamlcvav127880irlnkk8mg753.apps.googleusercontent.com',
      iosClientId: '260182076355-tarkcu74gp2ljv3l2qjskkiq6vvsd51h.apps.googleusercontent.com',
    });
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();

      const mytoken = await GoogleSignin.getTokens().then((res) => {
        return res.accessToken;
      });
      await props.loginViaGmailRequest(mytoken);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      }
      throw error;
    }
  };

  return (
    <>
      <ScrollView keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false}>
        <View style={titleInputStyles.container}>
          <View style={titleInputStyles.logo}>
            <Image resizeMode="cover" style={titleInputStyles.image} source={Images.splash} />
            <Text style={titleInputStyles.text}>Passages</Text>
          </View>
          <View style={titleInputStyles.logoSecond}>
            <View style={titleInputStyles.labelParent}>
              <Text style={titleInputStyles.label}>{'Welcome Back'}</Text>
            </View>
            <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
              <>
                <View style={textInputStyles.textInputParent}>
                  <Image
                    resizeMode="cover"
                    style={textInputStyles.imageStyle}
                    source={Images.email}
                  />
                  <View style={textInputStyles.textInputParentInner}>
                    <Input
                      placeholder="Email"
                      value={state.email.value}
                      style={textInputStyles.textInput}
                      onChangeText={(value) => {
                        handleOnChange('email', value);
                        setEmail(value);
                      }}
                    />
                  </View>
                </View>
                {/* {!active && state.email.error ? (
                  <View>
                    <Text style={textInputStyles.error}>{state.email.error}</Text>
                  </View>
                ) : null} */}
              </>
              <>
                <View style={textInputStyles.textInputParent}>
                  <Image
                    resizeMode="cover"
                    style={textInputStyles.imageStyle}
                    source={Images.paswordImage}
                  />
                  <View style={textInputStyles.textInputParentInner}>
                    <Input
                      placeholder="Password"
                      value={state.password.value}
                      style={textInputStyles.textInput}
                      secureTextEntry={hidePassword}
                      maxLength={16}
                      onChangeText={(value) => {
                        handleOnChange('password', value);
                        setPassword(value);
                      }}
                    />
                    <>
                      {
                        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                          {hidePassword ? (
                            <Image
                              resizeMode="cover"
                              source={Images.eyehide}
                              style={textInputStyles.imageStyle}
                            />
                          ) : (
                            <Image
                              resizeMode="cover"
                              source={Images.eye}
                              style={textInputStyles.imageStyle}
                            />
                          )}
                        </TouchableOpacity>
                      }
                    </>
                  </View>
                </View>
                {/* {!active && validationError.password ? (
                  <View>
                    <Text style={textInputStyles.error}>{validationError.password}</Text>
                  </View>
                ) : null} */}
              </>
            </View>
            <Button
              title="Sign In"
              viewStyle={
                props.requesting || state.password.value == '' || state.email.value == ''
                  ? { opacity: 0.5 }
                  : null
              }
              loading={props?.requesting ? props?.requesting : false}
              disabled={state.password.value == '' || state.email.value == ''}
              onPress={onSigningPress}
            />
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: 16,
                lineHeight: 22,
                textAlign: 'center',
                textDecorationLine: 'underline',
                color: '#2C2540',
                marginVertical: 36,
              }}
              onPress={() => {
                setIsVisible(!isVisible);
                // props.navigation.navigate('PasswordReset')
              }}
            >
              Forgot Password?
            </Text>
            <SocialButtonsView
              onFacebookConnect={() => onFacebookConnect()}
              onGoogleConnect={() => onGoogleConnect()}
              onAppleConnect={() => onAppleConnect()}
            />

            <View style={[textInputStyles.checkBoxParent, { justifyContent: 'center' }]}>
              <Text style={[textInputStyles.checkBoxText]}>
                {'Don’t have an account? '}
                <Text
                  style={[textInputStyles.termsText]}
                  onPress={() => {
                    setActive(true);
                    Keyboard.dismiss();
                    setTimeout(() => {
                      setEmail('');
                      setState(stateSchema);
                      props.navigation.navigate('Register');
                    }, 150);
                  }}
                >
                  Sign Up here!
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={isVisible}
        onBackButtonPress={() => {
          setIsVisible(!isVisible);
        }}
        style={{
          backgroundColor: 'rgba(0,0, 0,0.7)',
          margin: 0,
          paddingTop: '10%',
        }}
      >
        <ScrollView
          horizontal={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps={'always'}
        >
          <View style={styles.video}>
            <View style={{ flex: 1 }}>
              <Carousel
                data={Array(3).fill(0)}
                renderItem={renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                scrollEnabled={false}
                // onSnapToItem={(index) => {
                //   setDotsSecond(index);
                // }}
              />
            </View>
            <View style={styles.dotStyle}>
              {Array(3)
                .fill(0)
                .map((item, index) => {
                  return (
                    <View key={index}>
                      {dotsSecond === index ? (
                        <TouchableOpacity
                          disabled={true}
                          onPress={() => changeDots(dotsSecond)}
                          style={[styles.dotImage, { backgroundColor: '#fff' }]}
                        >
                          {/* <Image
                              resizeMode="cover"
                              style={[styles.dotImageStyle, styles.dotImage]}
                              source={Images.dotWhite}
                            /> */}
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          disabled={true}
                          onPress={() => changeDots(dotsSecond)}
                          style={styles.dotImage}
                        >
                          {/* <Image
                              resizeMode="cover"
                              style={[styles.dotImageStyle, styles.dotImage]}
                              source={Images.dot}
                            /> */}
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
            </View>
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.login.data,
  error: state.auth.error,
  forgotError: state.auth.forgotError,
  forgotPassSuccess: state.login.forgotPass,
  getTokenPass: state.login.getTokenPass,
  accessToken: state.login.accessToken,
  requesting: state.login.requesting,
  dotsSecond: state.dotsSecond.dotsSecond,
});

const mapDispatchToProps = (dispatch) => ({
  loginRequest: (data) => dispatch(loginRequest(data)),
  resetErrors: () => dispatch(resetErrors()),
  dotsSecondReset: () => dispatch(dotsSecondReset()),
  loginViaFacebookRequest: (token) => dispatch(loginViaFacebookRequest(token)),
  loginViaGmailRequest: (token) => dispatch(loginViaGmailRequest(token)),
  loginViaAppleRequest: (token) => dispatch(loginViaAppleRequest(token)),
  forgotPasswordRequest: (email) => dispatch(forgotPasswordRequest(email)),
  reSendForgotPasswordRequest: (email) => dispatch(reSendForgotPasswordRequest(email)),
  getTokenRequest: (token) => dispatch(getTokenRequest(token)),
  resetPassRequest: (data) => dispatch(resetPassRequest(data)),
  getSubscriptions: (data) => dispatch(getSubscriptions(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
