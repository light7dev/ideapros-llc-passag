import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Image, Linking } from 'react-native';
import { Images } from 'src/theme';

const SubscriptionModal = (props) => {
  const { visible } = props;

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {}]}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                padding: 20,
                width: '100%',
              }}
            >
              <Image
                resizeMode="cover"
                style={{ height: 70, width: 57 }}
                source={Images.splish1}
                tintColor={'#9C2B2E'}
              />
            </View>
            <View>
              <Text style={{ fontSize: 25, color: '#C4C4C4' }}>You subscription has expired </Text>
            </View>
            <View
              style={{
                marginVertical: 20,
                alignItems: 'center'
              }}
            >
              <Text>To get a new subscription visit </Text>
              <Text>https://ideapros-llc-passag-30831.botics.co </Text>
              <Text>or press "Subscribe again" button. </Text>
            </View>
            <View
              style={{
                marginTop: 20,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { backgroundColor: '#9C2B2E', width: '50%' },
                ]}
                onPress={() => {
                  Linking.openURL('https://ideapros-llc-passag-30831.botics.co');
                }}
              >
                <Text style={styles.textStyle}>Subscribe again</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000cc'
  },
  modalView: {
    margin: 20,
    paddingTop: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    width: '90%',
    height: 350,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 7,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SubscriptionModal;