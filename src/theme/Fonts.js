/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native';
import { FontSize } from './Variables';

export default StyleSheet.create({
  textSmall: {
    fontSize: FontSize.small, // 12
  },
  textCustomSmall: {
    fontSize: FontSize.small + 4, // 16
  },
  textRegular: {
    fontSize: FontSize.regular, // 14
  },
  textCustomRegular: {
    fontSize: FontSize.regular + 7, // 21
  },
  textCustomLarge: {
    fontSize: FontSize.large - 1, // 17
  },
  textLarge: {
    fontSize: FontSize.large, // 18
  },
  titleSmall: {
    fontSize: FontSize.small * 2, // 24
  },
  titleRegular: {
    fontSize: FontSize.regular * 2, // 28
  },
  titleCustomRegular: {
    fontSize: FontSize.medium * 2, // 32
  },
  titleLarge: {
    fontSize: FontSize.large * 2, // 36
  },
  titleXLarge: {
    fontSize: FontSize.small * 4, // 48
  },
  textCenter: {
    textAlign: 'center',
  },
  textJustify: {
    textAlign: 'justify',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
});
