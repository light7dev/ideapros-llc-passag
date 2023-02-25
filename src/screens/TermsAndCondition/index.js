import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

import { getPrivacyPolicy } from '../PrivacyPolicy/redux/actions';
import { connect } from 'react-redux';
import { DataAvailability } from 'src/components';
import { Layout, Images } from 'src/theme';
import { styles } from './styles';
import RenderHtml from 'react-native-render-html';
const TermsAndConditions = (props) => {
  const { PrivacyPolicy, requesting } = props;

  const source = {
    html: PrivacyPolicy[0]?.description,
  };
  useEffect(() => {
    props.getPrivacyPolicy();
  }, []);
  const { fill } = Layout;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[fill, styles.container]}>
        <SafeAreaView style={styles.innerContainer}>
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={fill}>
            <Image source={Images.BackAeroLight} style={styles.backArrowStyle} />
          </TouchableOpacity>
          <View style={{ flex: 4 }}>
            <Text style={styles.screenTitle}>Terms and Conditions</Text>
          </View>
          <View style={fill} />
        </SafeAreaView>
        <DataAvailability requesting={requesting} hasData={PrivacyPolicy.length >= 1}>
          {PrivacyPolicy &&
            PrivacyPolicy.length > 0 &&
            PrivacyPolicy.map((item, index) => {
              return (
                <View key={index} style={[fill]}>
                  <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
                    <RenderHtml source={source}>
                      <Text style={styles.firstText}>{item.description}</Text>
                    </RenderHtml>
                  </ScrollView>
                </View>
              );
            })}
        </DataAvailability>
      </View>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  PrivacyPolicy: state.PrivacyPolicy.PrivacyPolicy,
  requesting: state.PrivacyPolicy.requesting,
});

const mapDispatchToProps = (dispatch) => ({
  getPrivacyPolicy: (data) => dispatch(getPrivacyPolicy(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TermsAndConditions);
