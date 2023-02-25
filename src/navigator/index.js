import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { navigationRef } from './NavigationService';
import { connect } from 'react-redux';

import AuthStackScreen from './AuthScreens';
import MainStackScreen from './MainScreens';

const authStack = createStackNavigator();
const mainStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const RootNavigationStack = (props) => {
  return (
    <NavigationContainer ref={navigationRef}>
      {props.isAuth ? (
        <mainStack.Navigator screenOptions={{ headerShown: false }}>
          <mainStack.Screen name="AuthHome" component={MainStackScreen} />
        </mainStack.Navigator>
      ) : (
        <authStack.Navigator screenOptions={{ headerShown: false }}>
          <authStack.Screen name="AuthStack" component={AuthStackScreen} />
        </authStack.Navigator>
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.login.isAuth,
});

export default connect(mapStateToProps, null)(RootNavigationStack);
