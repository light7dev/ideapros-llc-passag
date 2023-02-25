import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import {
  Login,
  Register,
  Category,
  Tutorial,
  MainScreen,
  ResetPassword,
  TermsAndCondition,
} from 'src/screens';

const authStack = createStackNavigator();

const AuthStackScreen = () => (
  <authStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MainScreen">
    <authStack.Screen name="Login" component={Login} />
    <authStack.Screen name="Category" component={Category} />
    <authStack.Screen name="Register" component={Register} />
    <authStack.Screen name="ResetPassword" component={ResetPassword} />
    <authStack.Screen name="MainScreen" component={MainScreen} />
    <authStack.Screen name="Tutorial" component={Tutorial} />
    <authStack.Screen name="TermsAndCondition" component={TermsAndCondition} />
  </authStack.Navigator>
);

export default AuthStackScreen;
