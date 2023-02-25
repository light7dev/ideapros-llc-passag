import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// screens
import {
  Category,
  Setting,
  PrivacySecurity,
  TermsAndCondition,
  PrivacyPolicy,
  CreateVideo,
  CreateLifeStory,
  MyProfile,
  CreateLegacyJournal,
  MyContentScreen,
  ManagePayments,
  Gift,
  Preview,
  CreateMessage,
  Discount,
  Photo,
  Eternal,
  EditStory,
  CreateStory,
} from '../screens';
import { Image } from 'react-native';
import { Images } from 'src/theme';
const Tab = createBottomTabNavigator();

const mainStack = createStackNavigator();
const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Category"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#58ceb2',
        tabBarInactiveTintColor: 'gray',
        tabBarHideOnKeyboard: true,
        //Tab bar styles can be added here
        tabBarStyle: {
          paddingVertical: 5,
          backgroundColor: 'white',
          // position: 'absolute',
          height: 80,
        },
        tabBarLabelStyle: { paddingBottom: 3 },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarButton: ['Category', 'MyContentScreen', 'Gift', 'MyProfile', 'Setting'].includes(
          route.name,
        )
          ? undefined
          : () => {
              return null;
            },
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Category') {
            iconName = focused ? Images.home1 : Images.home;
          } else if (route.name === 'MyContentScreen') {
            iconName = focused ? Images.content1 : Images.content;
          } else if (route.name === 'Gift') {
            iconName = focused ? Images.gift1 : Images.gift;
          } else if (route.name === 'MyProfile') {
            iconName = focused ? Images.userImg : Images.userImage;
          } else if (route.name === 'Setting') {
            iconName = focused ? Images.setting1 : Images.setting;
          }
          // You can return any component that you like here!
          return (
            <Image source={iconName} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
          );
        },
      })}
    >
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="MyContentScreen" component={MyContentScreen} />
      {/* <Tab.Screen name="Gift" component={Gift} /> */}
      <Tab.Screen name="Security" component={PrivacySecurity} />
      <Tab.Screen name="MyProfile" component={MyProfile} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};

const MainStackScreen = () => (
  <mainStack.Navigator
    screenOptions={{ headerShown: false, animationEnabled: false }}
    initialRouteName="Category"
  >
    <mainStack.Screen name="Category" component={BottomNavigator} />
    <mainStack.Screen name="Setting" component={Setting} />
    <mainStack.Screen name="PrivacySecurity" component={PrivacySecurity} />
    <mainStack.Screen name="TermsAndCondition" component={TermsAndCondition} />
    <mainStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <mainStack.Screen name="MyProfile" component={MyProfile} />
    <mainStack.Screen name="CreateVideo" component={CreateVideo} />
    <mainStack.Screen name="CreateLifeStory" component={CreateLifeStory} />
    <mainStack.Screen name="CreateLegacyJournal" component={CreateLegacyJournal} />
    <mainStack.Screen name="ManagePayments" component={ManagePayments} />
    <mainStack.Screen name="CreateStory" component={CreateStory} />
    <mainStack.Screen name="EditStory" component={EditStory} />
    <mainStack.Screen name="Preview" component={Preview} />
    <mainStack.Screen name="CreateMessage" component={CreateMessage} />
    <mainStack.Screen name="Discount" component={Discount} />
    <mainStack.Screen name="Photo" component={Photo} />
    <mainStack.Screen name="Eternal" component={Eternal} />
  </mainStack.Navigator>
);

export default MainStackScreen;
