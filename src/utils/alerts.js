import { Alert } from 'react-native';

export const errorAlert = (err) => {
  Alert.alert('Error', err, [{ text: 'OK' }], {
    cancelable: false,
  });
};

export const successAlert = (msg) => {
  Alert.alert('Congratulations!', msg, [{ text: 'OK' }], {
    cancelable: false,
  });
};
