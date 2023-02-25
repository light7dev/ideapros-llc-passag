import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Content, Icon, Input } from 'native-base';
import { View, ImageBackground, Image } from 'react-native';

// components
import { Text, Button } from 'src/components';
import { Global, Layout, Images, Gutters, Colors } from 'src/theme';

// hooks
import useForm from 'src/hooks/useForm';

// utils
import validator from 'src/utils/validation';

// styles
import styles from './styles';

const ResetPassword = (props) => {
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

  const submitForm = () => {
    const data = {
      password: state.password.value,
      username: state.email.value,
    };
  };

  const { state, handleOnChange, disable } = useForm(stateSchema, validationStateSchema);

  const { row, fill, center } = Layout;
  const { primaryBg } = Global;
  const { regularHMargin, largeHMargin, regularBPadding, regularVPadding, regularHPadding } =
    Gutters;
  const { icon, title, heading, inputField, logoWrapper, emailWrapper, buttonWrapper } = styles;
  return (
    <>
      <ImageBackground source={Images.loginbg} style={fill}>
        <Content showsVerticalScrollIndicator={false}>
          <View
            style={[
              center,
              {
                width: 44,
                height: 44,
                left: 39,
                top: 56,
                borderRadius: 4,
                borderWidth: 2,
                borderColor: Colors.secondary,
              },
            ]}
          >
            <Icon type="MaterialIcons" name="arrow-back" style={{ color: Colors.secondary }} />
          </View>
          <View style={center}>
            <View style={[fill, center, logoWrapper]}>
              <Text text="Help!" color="secondary" style={heading} />
              <Text text="Forgot your password?" color="secondary" style={title} />
            </View>
            <View style={[emailWrapper, row, center, regularHPadding]}>
              <Image source={Images.email} style={icon} />
              <Input
                placeholder="EMAIL"
                style={inputField}
                onChangeText={(value) => handleOnChange('email', value)}
              />
            </View>

            <View style={row}>
              <Button
                text="Reset my password"
                color="quaternary"
                onPress={() => submitForm()}
                style={[fill, center, primaryBg, largeHMargin, buttonWrapper]}
              />
            </View>
            <View style={[row, center, regularVPadding]}>
              <Text text="or login using" color="secondary" category="s1" bold />
            </View>
            <View style={[row, center, regularBPadding]}>
              <Image source={Images.google} style={regularHMargin} />
              <Image source={Images.facebook} style={regularHMargin} />
              <Image source={Images.instagram} style={regularHMargin} />
            </View>
          </View>
        </Content>
        <View style={[center, regularVPadding]}>
          <Text color="secondary" style={{ fontSize: 20 }}>
            Don’t have an account? {''}
            <Text text="Sign up now" color="primary" style={{ fontSize: 20 }} />
          </Text>
        </View>
      </ImageBackground>
    </>
  );
};

const mapStateToProps = (state) => ({
  requesting: state.login.requesting,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (data) => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
