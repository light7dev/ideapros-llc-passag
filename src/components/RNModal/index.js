import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  SafeAreaView,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';
import {styles,forgotModalStyles, Color} from './styles'
import { Layout, Images, Global } from 'src/theme';

const RNModal = ({onBackButtonPress,onPressYes, onPressNo, visible, onPressButton}) =>{
  const { fill, row, center, selfCenter, alignItemsCenter, justifyContentCenter, justifyContentBetween } =
    Layout;
  return(
    <Modal
        visible={visible}
        onBackButtonPress={onBackButtonPress}
        style={styles.ModalMainView}
      >
        <ScrollView horizontal={false} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={fill} />
          <View
            style={[
              fill,{...styles.SignOutModalInnerStyle},
            ]}
          >
            <>
              <View style={forgotModalStyles.renderStyle}>
                <View style={[forgotModalStyles.labelParent, { flex: 1 }]}>
                  <Image
                    resizeMode="cover"
                    style={[forgotModalStyles.imageStyle, fill, { marginTop: 20 }]}
                    source={Images.SignOut}
                  />

                  <Text
                    style={[
                      forgotModalStyles.label,
                      fill,
                      { ...styles.SignOutModalTextStyle},
                    ]}
                  >
                    {'Are you sure you want to perform the chosen action?'}
                  </Text>
                </View>

                <View
                  style={styles.SignOutModalButtonView}
                >
                  <TouchableOpacity
                    onPress={onPressNo}
                    style={[
                      fill,
                      justifyContentCenter,
                      alignItemsCenter,
                      selfCenter,
                      {...styles.SignOutModalButtonStyle},
                      {
                        backgroundColor: onPressButton === 0 ? 'white' : '#9C2B2E',
                        borderColor: onPressButton === 0 ? '#9C2B2E' : 'white',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.textButton,
                        { color: onPressButton === 0 ? '#9C2B2E' : 'white' },
                      ]}
                    >
                      No
                    </Text>
                  </TouchableOpacity>
                  <View style={{ width: 20 }} />
                  <TouchableOpacity
                    onPress={onPressYes}
                    style={[
                      fill,
                      justifyContentCenter,
                      alignItemsCenter,
                      selfCenter,
                      {...styles.SignOutModalButtonStyle},
                      {
                        backgroundColor: onPressButton === 1 ? 'white' : '#9C2B2E',
                        borderColor: onPressButton === 1 ? '#9C2B2E' : 'white',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.textButton,
                        { color: onPressButton === 1 ? '#9C2B2E' : 'white' },
                      ]}
                    >
                      Yes
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          </View>
          <View style={fill} />
        </ScrollView>
        </Modal>

    )
}

export default RNModal;