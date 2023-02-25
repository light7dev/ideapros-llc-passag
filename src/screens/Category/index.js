import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { categoryRequest } from './redux/actions';
import { getProfileRequest } from '../MyProfile/redux/actions';
import { connect } from 'react-redux';
import { titleInputStyles, styles } from './styles';
import { Gutters, Images, Layout, Global } from 'src/theme';
import { DataAvailability } from 'src/components';

import { SubscriptionModal } from 'src/components';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSubscriptionAPI } from './redux/sagas'
import { showMessage } from 'react-native-flash-message';

const Category = (props) => {
  const {
    navigation: { navigate },
    category,
    profile,
    myProfile,
    requesting,
  } = props;
  const [isSubscriptionModal, setIsSubscriptionModal] = React.useState(false);

  useEffect(() => {
    AsyncStorage.getItem('authToken').then((token) => {
      if (token) {
        getSubscriptionAPI(token).then((res) => {
          setIsSubscriptionModal(!res.data.has_subscription)
        }).catch((err) => {
          console.log("err", err.response.data)
          showMessage({
            message: 'Something Went Wrong.',
            type: 'danger',
          });
        })
      }
    });
  }, [])

  useEffect(() => {
    props.categoryRequest();
    props.getProfileRequest(profile.id);
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      props.getProfileRequest(profile.id);
    });
    return unsubscribe;
  }, [props.navigation]);

  const [emptyImg, setEmptyImg] = React.useState(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==',
  );

  const { fill, fillGrow, row, justifyContentBetween, rowHCenter } = Layout;
  const { mediumHPadding } = Gutters;
  const { height40 } = Global;

  return (
    <SafeAreaView style={fill}>
      <ScrollView contentContainerStyle={fillGrow} showsVerticalScrollIndicator={false}>
        <View style={[fill, justifyContentBetween, titleInputStyles.container]}>
          <View style={mediumHPadding}>
            <TouchableOpacity
              onPress={() => {
                navigate('MyProfile');
              }}
              style={titleInputStyles.profileCard}
            >
              <Image
                style={
                  myProfile?.profile_picture ? styles.profileImageStyle : styles.emptyImageStyle
                }
                source={{ uri: myProfile?.profile_picture ? myProfile.profile_picture : emptyImg }}
              />
            </TouchableOpacity>

            <View style={row}>
              <Text style={titleInputStyles.nameText}>Hi, </Text>
              <Text style={titleInputStyles.nameText}>{profile?.name ? profile?.name : 'Jon'}</Text>
            </View>
          </View>
          <View style={[titleInputStyles.logo]}>
            <View style={{ flex: 1, flexWrap: 'wrap' }}>
              <TouchableOpacity>
                <Text style={titleInputStyles.text}>Never Miss a Memory</Text>
              </TouchableOpacity>
            </View>
            <Image
              resizeMode="cover"
              style={titleInputStyles.image}
              source={Images.splash}
              tintColor={'gray'}
            />
          </View>
          <View style={titleInputStyles.logoSecond}>
            <DataAvailability requesting={requesting} hasData={category.length >= 1}>
              <View style={titleInputStyles.labelParent}>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={titleInputStyles.label}>Categories</Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.rowMT44}>
                  {category &&
                    category.length > 0 &&
                    category.map((item, index) => {
                      return (
                        <View key={index} style={titleInputStyles.cardStyle}>
                          <View style={[styles.video]}>
                            <View style={[styles.videoArea]}>
                              <Image
                                resizeMode="cover"
                                style={styles.imagePlay}
                                source={{ uri: item.image }}
                              />
                            </View>
                            <View style={[styles.stepText]}>
                              <Text style={styles.textStep}>{item.name}</Text>
                              <Text style={styles.textSubHeading}>{item.description}</Text>
                              <TouchableOpacity
                                onPress={() =>
                                  navigate('CreateStory', {
                                    item: {
                                      name: item.name,
                                      id: item.id,
                                      screenName: item.screen_name,
                                    },
                                  })
                                }
                                // onPress={() => navigate(item.screen_name, { item })}
                                style={[rowHCenter, height40]}
                              >
                                <Text> Tap to Create </Text>
                                <Text style={styles.tabAdd}>+</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                </View>
                {isSubscriptionModal && (
                  <SubscriptionModal
                    visible={true}
                  />
                )}
              </ScrollView>
            </DataAvailability>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  category: state.category.category,
  requesting: state.category.requesting,
  profile: state.login.data,
  myProfile: state.profile.profile,
});

const mapDispatchToProps = (dispatch) => ({
  categoryRequest: () => dispatch(categoryRequest()),
  getProfileRequest: (data) => dispatch(getProfileRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
