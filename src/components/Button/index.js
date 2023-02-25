import React from 'react';
import { Button as NBButton } from 'native-base';
import { Text, ActivityIndicator } from 'react-native';

// styles
import styles from './styles';

const Button = ({
  color,
  text,
  onPress,
  style,
  textStyle,
  icon,
  full,
  rounded,
  block,
  border,
  bordered,
  disabled,
  loading,
}) => {
  const { buttonText, button, disabledStyle, borderStyle } = styles;

  return (
    <NBButton
      style={[
        button,
        border && borderStyle,
        styles[`${color}Bg`],
        (loading || disabled) && disabledStyle,
        style,
      ]}
      full={full}
      rounded={rounded}
      block={block}
      bordered={bordered}
      disabled={disabled || loading}
      onPress={onPress}
      icon={icon}
      transparent={true}
    >
      <>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={[buttonText, styles[color], textStyle && textStyle]}>{text}</Text>
        )}
      </>
    </NBButton>
  );
};

export default Button;
