import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OnBoardingScreen, SplashScreen} from '../screens';
import MainStack from './MainStack';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux/constants';
const Stack = createNativeStackNavigator();
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const AuthStack = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Khởi tạo Firebase
    auth().onAuthStateChanged(user => {
      if (user) {
        AsyncStorage.setItem('UserId', user.uid);
        firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then(res => !res.exists && firestore().collection('users').doc(user.uid).set({userId: user.uid}));
      } else {
        console.log('Người dùng chưa được xác thực');
      }
    });

    // Đăng nhập ẩn danh
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('Đăng nhập ẩn danh thành công');
      })
      .catch(error => {
        console.log('Lỗi đăng nhập ẩn danh:', error);
      });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SpashScreen" component={SplashScreen} />
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
        <Stack.Screen name="MainStack" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
