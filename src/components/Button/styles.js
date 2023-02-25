import { StyleSheet } from 'react-native';

// styles
import { Colors } from 'src/theme';

export default StyleSheet.create({
  primary: {
    color: Colors.white,
  },
  primaryBg: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    color: Colors.primary,
  },
  secondaryBg: {
    backgroundColor: Colors.white,
  },
  tertiary: {
    color: Colors.bonJour,
  },
  tertiaryBg: {
    backgroundColor: Colors.white,
  },
  quaternary: {
    color: Colors.cinnamon,
  },
  button: {
    height: 50,
    borderRadius: 10,
  },
  disabledStyle: {
    opacity: 0.7,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  borderStyle: {
    borderColor: Colors.deepsapphire,
    borderWidth: 1,
    shadowColor: 'transparent',
  },
});
