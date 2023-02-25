import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Text } from 'src/components';
import { Layout } from 'src/Theme';
import styles from './styles';
const IconCard = ({ source, name, onPress }) => {
  const { center } = Layout;

  return (
    <TouchableOpacity
      style={[center, { backgroundColor: '#FFFFFF', width: 100, height: 104, borderRadius: 10 }]}
      onPress={onPress}
    >
      {source && (
        <Image
          source={source}
          style={{ height: 20, width: 20, resizeMode: 'contain', bottom: 10 }}
        />
      )}
      {name && (
        <Text
          text={name}
          style={{
            width: 105,
            textAlign: 'center',
            // flexWrap: "wrap",
            color: '#455062',
            fontSize: 12,
            paddingHorizontal: 16,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default IconCard;
