import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
// components
import { Text } from 'src/components';
import LottieView from 'lottie-react-native';
const DataAvailability = ({
  requesting,
  hasData,
  children,
  style,
  textColor,
  message,
  customMessage,
}) => {
  if (requesting) {
    return (
      <View style={[styles.container, style, !style && styles.center]}>
        <LottieView
          source={require('./loader.json')}
          autoPlay
          loop
          speed={1.5}
          style={style ? style : { width: 150, height: 150 }}
        />
      </View>
    );
  }
  if (!hasData) {
    return (
      <View style={[styles.container, style, !style && styles.center]}>
        {customMessage ? (
          customMessage
        ) : (
          <Text text={`No Record Found.`} bold style={{ color: textColor ? textColor : '#fff' }} />
          // <Text text={message ? `${message}` : `${t(ticketsNotRefundable)}`} bold />
        )}
      </View>
    );
  }
  return children;
};
DataAvailability.propTypes = {
  requesting: PropTypes.bool,
  hasData: PropTypes.bool,
  children: PropTypes.node,
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  emptyFile: {
    width: 150,
    height: 150,
  },
});
export default DataAvailability;
