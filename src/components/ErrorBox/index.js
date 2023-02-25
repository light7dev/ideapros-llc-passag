import React from 'react';
import { View } from 'react-native';

import styles from './styles';
import Text from '../Text';

export default function ErrorBox({ errorText }) {
  return (
    <View style={styles.container}>
      <Text text={errorText} color="dummy" />
    </View>
  );
}
