/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { Platform } from 'react-native';
import { Colors } from './Variables';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  primary: {
    color: Colors.white,
  },
  primaryBg: {
    backgroundColor: Colors.primary,
  },
  secondaryBg: {
    backgroundColor: Colors.white,
  },
  wildSandBg: {
    backgroundColor: Colors.wildsand,
  },
  galleryBg: {
    backgroundColor: Colors.gallery,
  },
  altoBg: {
    backgroundColor: Colors.alto,
  },
  // border style
  border: {
    borderWidth: 1,
  },
  borderColor: {
    borderColor: Colors.white,
  },
  borderB: {
    borderBottomWidth: 1,
  },
  borderT: {
    borderTopWidth: 1,
  },
  transparentBg: {
    backgroundColor: 'transparent',
  },
  borderR4: {
    borderRadius: 4,
  },
  borderBSteelColor: {
    borderBottomWidth: 1,
    borderColor: Colors.steel,
  },
  // height style
  height10: {
    height: 10,
  },
  height20: {
    height: 20,
  },
  height30: {
    height: 30,
  },
  height40: {
    height: 40,
  },
  height50: {
    height: 50,
  },
  height60: {
    height: 60,
  },
  height70: {
    height: 70,
  },
  height80: {
    height: 80,
  },
  height90: {
    height: 90,
  },
  height100: {
    height: 100,
  },

  bottomShadow: {
    ...Platform.select({
      ios: {
        borderBottomWidth: 2,
        borderColor: Colors.steel,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 8,
        shadowOpacity: 0.5,
      },
      android: {
        borderBottomWidth: 1,
        borderColor: Colors.steel,
        shadowOffset: {
          width: 0,
          height: 30,
        },
        shadowRadius: 1,
        shadowOpacity: 0.3,
        elevation: 50,
      },
    }),
  },
  boxShadowStyle: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
      },
      android: {
        shadowRadius: 1,
        shadowOpacity: 1,
        elevation: 3,
      },
    }),
  },
  buttonWrapper: {
    width: 68,
    height: 33,
  },
});
