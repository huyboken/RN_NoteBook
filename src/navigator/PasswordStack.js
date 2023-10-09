import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AddPasswordScreen, PasswordScreen} from '../screens';

const Stack = createStackNavigator();

const PasswordStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'slide_from_right',
        animationTypeForReplace: 'push',
      }}
      initialRouteName="PasswordScreen">
      <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
      <Stack.Screen name="AddPasswordScreen" component={AddPasswordScreen} />
    </Stack.Navigator>
  );
};

export default PasswordStack;
