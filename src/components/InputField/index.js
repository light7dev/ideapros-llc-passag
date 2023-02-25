import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
// import { Input } from 'native-base';
import { Gutters, Colors, Global, Layout } from 'src/theme';

const InputField = ({
  showFirstImage,
  showSecondImage,
  value,
  editable,
  onChangeText,
  secureTextEntry,
  onPressSecond,
  validationText,
  maxLength,
  onFocus,
  sourceFirst,
  sourceSecond,
  imageStyleProp,
  imageStylePropSecond,
  inputStyleProp,
  placeholder,
  placeholderTextColor,
  errorStyleProp,
  inputContainerStyle,
  mainContainerStyle,
  keyboardType,
  topMainContainer,
  multiline,
  onBlur,
  numberOfLines,
}) => {
  const { fill, row, alignItemsCenter, justifyContentBetween } = Layout;
  const { height60, borderBSteelColor } = Global;
  const { smallVMargin } = Gutters;
  return (
    <View style={[topMainContainer, { flexDirection: 'column' }]}>
      <View style={[mainContainerStyle, borderBSteelColor]}>
        <View style={[row, alignItemsCenter]}>
          {showFirstImage ? (
            <Image
              resizeMode="contain"
              style={[styles.imageStyle, imageStyleProp]}
              source={sourceFirst}
            />
          ) : null}

          <View
            style={[
              fill,
              row,
              alignItemsCenter,
              justifyContentBetween,
              height60,
              inputContainerStyle,
            ]}
          >
            <TextInput
              autoCapitalize={'none'}
              placeholder={placeholder}
              style={[styles.textInput, inputStyleProp]}
              placeholderTextColor={placeholderTextColor}
              secureTextEntry={secureTextEntry}
              maxLength={maxLength}
              value={value}
              onFocus={onFocus}
              onBlur={onBlur}
              editable={editable}
              onChangeText={onChangeText}
              keyboardType={keyboardType}
              multiline={multiline}
              numberOfLines={numberOfLines}
            />
          </View>
          {showSecondImage ? (
            <TouchableOpacity onPress={onPressSecond}>
              <Image
                resizeMode="cover"
                style={[styles.imageStyle, imageStylePropSecond]}
                source={sourceSecond}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {validationText ? (
        <View style={smallVMargin}>
          <Text style={[styles.error, errorStyleProp]}>{validationText}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 28,
    height: 20,
    resizeMode: 'contain',
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.black,
    borderColor: Colors.steel,
  },
  error: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 18,
  },
});

export default InputField;
