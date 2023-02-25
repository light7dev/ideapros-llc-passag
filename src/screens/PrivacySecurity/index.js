import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Layout, Images } from 'src/theme';
import { styles } from './styles';
export const PrivacyCard = ({ name }) => {
  return (
    <View style={styles.cardMainView}>
      <View style={styles.cardInnerView}>
        <Text style={styles.nameTextStyle}>{name}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Image
          source={Images.leftAeroLight}
          style={{ resizeMode: 'contain', width: 25, height: 14 }}
        />
      </View>
    </View>
  );
};
const PrivacySecurity = (props) => {
  const {
    navigation: { navigate },
  } = props;
  const { fill } = Layout;
  return (
    <View style={[fill, styles.container]}>
      <SafeAreaView style={styles.innerContainer}>
        <TouchableOpacity style={{}} onPress={() => props.navigation.goBack()}>
          <Image source={Images.BackAeroLight} style={styles.backArrowStyle} />
        </TouchableOpacity>
        <View style={{ flex: 4, marginTop: 10 }}>
          <Text style={styles.screenTitle}>Privacy And Security</Text>
        </View>
      </SafeAreaView>
      <ScrollView contentContainerStyle={styles.mainView} horizontal={false}>
        <TouchableOpacity
          onPress={() => {
            navigate('PrivacyPolicy');
          }}
          activeOpacity={1}
        >
          <PrivacyCard name="Privacy Policy" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate('TermsAndCondition');
          }}
          activeOpacity={1}
        >
          <PrivacyCard name="Terms and Conditions" />
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <PrivacyCard name="What is a Two-Factor Authentication and how can I turn this On and Off?" />
        </TouchableOpacity>
        <TouchableOpacity>
          <PrivacyCard name="Is my profile secure and private? Can I trust Passages with my data?" />
        </TouchableOpacity>
        <TouchableOpacity>
          <PrivacyCard name="Is your site moderate?" />
        </TouchableOpacity>
        <TouchableOpacity>
          <PrivacyCard name="Data management and content storage." />
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

export default PrivacySecurity;
