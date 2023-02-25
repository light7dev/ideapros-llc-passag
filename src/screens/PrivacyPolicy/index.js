import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';

import { Layout, Images } from 'src/theme';
import { connect } from 'react-redux';
import { getPrivacyPolicy } from './redux/actions';
import { styles } from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import RenderHtml from 'react-native-render-html';
import { DataAvailability } from 'src/components';

const PrivacyPolicy = (props) => {
  const { PrivacyPolicy, requesting } = props;
  const source = {
    html: PrivacyPolicy[0]?.description,
  };

  const { fill } = Layout;
  useEffect(() => {
    props.getPrivacyPolicy();
  }, []);

  return (
    <View style={[fill, styles.container]}>
      <SafeAreaView style={styles.innerContainer}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={fill}>
          <Image source={Images.BackAeroLight} style={styles.backArrowStyle} />
        </TouchableOpacity>
        <View style={{ flex: 4 }}>
          <Text style={styles.screenTitle}>Privacy Policy</Text>
        </View>
        <View style={fill} />
      </SafeAreaView>
      <DataAvailability requesting={requesting} hasData={PrivacyPolicy}>
        {PrivacyPolicy &&
          PrivacyPolicy.length > 0 &&
          PrivacyPolicy.map((item, index) => {
            return (
              <View key={index} style={[fill]}>
                <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }}>
                  <RenderHtml source={source}>
                    <Text style={styles.firstText}>{item.description}</Text>
                  </RenderHtml>
                </ScrollView>
              </View>
            );
          })}
      </DataAvailability>
    </View>
  );
};

const mapStateToProps = (state) => ({
  requesting: state.PrivacyPolicy.requesting,
  PrivacyPolicy: state.PrivacyPolicy.PrivacyPolicy,
});

const mapDispatchToProps = (dispatch) => ({
  getPrivacyPolicy: (data) => dispatch(getPrivacyPolicy(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
