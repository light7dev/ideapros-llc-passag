import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { Images } from 'src/theme';
import { registerRequest, createStripeCustomerRequest, resetSignup } from './redux/actions';
import appleAuth from '@invertase/react-native-apple-authentication';
import { useFocusEffect } from '@react-navigation/native';
// hooks
import useForm from 'src/hooks/useForm';

// utils
import validator from 'src/utils/validation';
import { buttonStyles, textInputStyles, titleInputStyles, Color } from './styles';

import { Input } from 'native-base';
import {
  loginViaFacebookRequest,
  loginViaGmailRequest,
  loginViaAppleRequest,
} from '../Login/redux/actions';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// Grouped Social Buttons View
const SocialButtonsView = ({ onGoogleConnect, onFacebookConnect, onAppleConnect }) => (
  <View>
    <Text
      style={{
        textAlign: 'center',
        width: '100%',
        fontSize: 14,
        marginTop: 28,
        marginBottom: 10,
        fontWeight: 'bold',
      }}
    >
      Sign In With
    </Text>

    <View style={textInputStyles.socialImagesParent}>
      <TouchableOpacity onPress={onGoogleConnect}>
        <Image resizeMode="cover" style={textInputStyles.socialImages} source={Images.google} />
      </TouchableOpacity>
      {Platform.OS === 'ios' ? (
        <TouchableOpacity onPress={onAppleConnect}>
          <Image
            resizeMode="cover"
            style={[textInputStyles.socialImages, { marginHorizontal: 20 }]}
            source={Images.apple}
          />
        </TouchableOpacity>
      ) : (
        <View style={{ marginHorizontal: 15 }} />
      )}
      <TouchableOpacity onPress={onFacebookConnect}>
        <Image resizeMode="cover" style={[textInputStyles.socialImages]} source={Images.facebook} />
      </TouchableOpacity>
    </View>
  </View>
);

const Button = ({
  onPress,
  loading,
  viewStyle,
  loadingColor,
  loadingStyle,
  textStyle,
  title,
  disable,
  check,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[{ marginTop: 31 }]}
    disabled={loading || disable || !check}
  >
    <View style={[buttonStyles.viewStyle, viewStyle]}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            color={loadingColor ? loadingColor : Color.white}
            style={loadingStyle}
          />
        </View>
      ) : (
        <View style={buttonStyles.textStyleParent}>
          <Text style={[buttonStyles.textStyle, textStyle]}>{title}</Text>
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

const Register = (props) => {
  const {
    navigation: { navigate, goBack },
  } = props;

  const [check, setCheck] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const stateSchema = {
    name: {
      value: '',
      error: '',
    },
    email: {
      value: '',
      error: '',
    },
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
    name: {
      required: false,
      validator: validator.name,
    },
    email: {
      required: false,
      validator: validator.email,
    },
    password: {
      required: false,
      validator: validator.password,
    },
    confirmPassword: {
      required: false,
      validator: {
        compare: (value) => value !== state.password.value,
        error: "Your passwords didn't match.",
      },
    },
  };

  const [validationError, setValidationError] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { state, handleOnChange, disable } = useForm(stateSchema, validationStateSchema);

  const onSignupPress = () => {
    if (name.length < 3) {
      return setValidationError({
        name: 'Please enter name of Minimum 3 characters.',
      });
    }
    if (password.length < 8) {
      return setValidationError({
        password: 'Your password must be 8 characters long',
      });
    }
    if (password.localeCompare(confirmPassword)) {
      return setValidationError({
        confirmPassword: "Your passwords didn't match.",
      });
    }
    const data = {
      name: state.name.value,
      password: state.password.value,
      email: state.email.value,
    };
    props.registerRequest(data);
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      props.resetSignup();
    });
    return unsubscribe;
  }, [props.navigation]);

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
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      // use credentialState response to ensure the user is authenticated
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
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
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

      const mytoken = await GoogleSignin.getTokens()
        .then((res) => {
          return res.accessToken;
        })
        .catch((err) => console.log('err', err));
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
    <ScrollView keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false}>
      <View style={[titleInputStyles.labelParent]}>
        <Text style={titleInputStyles.label}>{'Create your account'}</Text>
      </View>
      <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
        <>
          <View style={textInputStyles.textInputParent}>
            <Image
              resizeMode="cover"
              style={textInputStyles.imageStyle}
              source={Images.userImage}
            />
            <View style={textInputStyles.textInputParentInner}>
              <Input
                placeholder="Name"
                maxLength={25}
                style={textInputStyles.textInput}
                onChangeText={(value) => {
                  handleOnChange('name', value);
                  setName(value);
                  setValidationError({ ...validationError, name: '' });
                }}
              />
            </View>
          </View>
          {state.name.error ? (
            <View>
              <Text style={textInputStyles.error}>{state.name.error}</Text>
            </View>
          ) : null}
          {validationError.name ? (
            <View>
              <Text style={textInputStyles.error}>{validationError.name}</Text>
            </View>
          ) : null}
        </>

        <>
          <View style={textInputStyles.textInputParent}>
            <Image resizeMode="cover" style={textInputStyles.imageStyle} source={Images.email} />
            <View style={textInputStyles.textInputParentInner}>
              <Input
                placeholder="Email"
                // maxLength={30}
                style={textInputStyles.textInput}
                onChangeText={(value) => {
                  handleOnChange('email', value);
                  setEmail(value);
                  setValidationError({ ...validationError, email: '' });
                }}
              />
            </View>
          </View>
          {state.email.error ? (
            <View>
              <Text style={textInputStyles.error}>{state.email.error}</Text>
            </View>
          ) : null}
          {validationError.email ? (
            <View>
              <Text style={textInputStyles.error}>{validationError.email}</Text>
            </View>
          ) : null}
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
                style={textInputStyles.textInput}
                secureTextEntry={hidePassword}
                maxLength={16}
                onChangeText={(value) => {
                  state.password.value = value;
                  handleOnChange('password', value);
                  setPassword(value);
                  setValidationError({ ...validationError, password: '' });
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
          {state.password.error ? (
            <View>
              <Text style={textInputStyles.error}>{state.password.error || ''}</Text>
            </View>
          ) : null}
          {validationError.password ? (
            <View>
              <Text>{validationError.password}</Text>
            </View>
          ) : null}
        </>

        <>
          <View style={textInputStyles.textInputParent}>
            <Image
              resizeMode="cover"
              style={textInputStyles.imageStyle}
              source={Images.confirmImage}
            />
            <View style={textInputStyles.textInputParentInner}>
              <Input
                placeholder="Confirm Password"
                style={textInputStyles.textInput}
                secureTextEntry={hideConfirmPassword}
                maxLength={16}
                onChangeText={(value) => {
                  handleOnChange('confirmPassword', value);
                  setConfirmPassword(value);
                  setValidationError({ ...validationError, confirmPassword: '' });
                }}
              />
              <>
                {
                  <TouchableOpacity onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
                    {hideConfirmPassword ? (
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
          {state.confirmPassword.error ? (
            <View>
              <Text style={textInputStyles.error}>{state.confirmPassword.error || ''}</Text>
            </View>
          ) : validationError.confirmPassword ? (
            <View>
              <Text style={textInputStyles.error}>{validationError.confirmPassword || ''}</Text>
            </View>
          ) : null}
        </>
        <View style={textInputStyles.checkBoxParent}>
          <TouchableOpacity
            style={[textInputStyles.checkBox]}
            activeOpacity={1}
            onPress={() => setCheck(!check)}
          />
          {check && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                marginHorizontal: 15,
                bottom: 1,
              }}
              onPress={() => setCheck(!check)}
            >
              <Image source={Images.tickImage} style={titleInputStyles.tickImageStyle} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => props.navigation.navigate('TermsAndCondition')}>
            <Text style={[textInputStyles.checkBoxText]}>
              {'Agree to '}

              <Text style={[textInputStyles.termsText]}>Terms and conditions</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Button
        title="Sign Up"
        loading={props.requesting}
        onPress={onSignupPress}
        disable={disable}
        check={check}
        viewStyle={props.requesting || disable || !check ? { opacity: 0.5 } : null}
      />

      <SocialButtonsView
        onFacebookConnect={onFacebookConnect}
        onGoogleConnect={onGoogleConnect}
        onAppleConnect={onAppleConnect}
      />

      <View style={[textInputStyles.checkBoxParent, { justifyContent: 'center' }]}>
        <Text style={[textInputStyles.checkBoxText]}>
          {'Already have an account? '}
          <Text
            style={[textInputStyles.termsText]}
            onPress={() => props.navigation.navigate('Login')}
          >
            Sign In here!
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  requesting: state.register.requesting,
  data: state.register.data,
  dataSuccess: state.register.dataSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  resetSignup: () => dispatch(resetSignup()),
  registerRequest: (data) => dispatch(registerRequest(data)),
  loginViaFacebookRequest: (token) => dispatch(loginViaFacebookRequest(token)),
  loginViaGmailRequest: (token) => dispatch(loginViaGmailRequest(token)),
  loginViaAppleRequest: (token) => dispatch(loginViaAppleRequest(token)),
  createStripeCustomerRequest: (email) => dispatch(createStripeCustomerRequest(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
