import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {CalendarScreen, HomeScreen, NoteScreen} from '../screens';
import {StyleSheet, Text, View} from 'react-native';
import {ViewApp} from '../components';
import {Fonts} from '../constant';
import {t} from 'i18next';
import PasswordStack from './PasswordStack';
import {useDispatch} from 'react-redux';
import {actions} from '../redux/constants';

const Tab = createBottomTabNavigator();

export default function MainStack() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: actions.GET_ALL_PASSWORD, shouldOverwriteExist: true});
    dispatch({type: actions.GET_USER_INFO});
  }, []);

  return (
    <View style={styles.tabContainer}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'HomeStack') {
              return (
                <ViewApp.BottomTab styles={{backgroundColor: focused ? '#00D3ED' : '#fff'}}>
                  {!focused && <Feather name="home" size={size} color={color} />}
                  {focused && <Text style={styles.tabLabel}>{t('home')}</Text>}
                </ViewApp.BottomTab>
              );
            } else if (route.name === 'NoteStack') {
              return (
                <ViewApp.BottomTab styles={{backgroundColor: focused ? '#00D3ED' : '#fff'}}>
                  {!focused && <Entypo name="pencil" size={size} color={color} />}
                  {focused && <Text style={styles.tabLabel}>{t('notes')}</Text>}
                </ViewApp.BottomTab>
              );
            } else if (route.name === 'CalendarStack') {
              return (
                <ViewApp.BottomTab styles={{backgroundColor: focused ? '#00D3ED' : '#fff'}}>
                  {!focused && <Feather name="calendar" size={size} color={color} />}
                  {focused && <Text style={styles.tabLabel}>{t('calendar')}</Text>}
                </ViewApp.BottomTab>
              );
            } else if (route.name === 'PasswordStack') {
              return (
                <ViewApp.BottomTab styles={{backgroundColor: focused ? '#00D3ED' : '#fff'}}>
                  {!focused && <Octicons name="key-asterisk" size={size} color={color} />}
                  {focused && <Text style={styles.tabLabel}>{t('password')}</Text>}
                </ViewApp.BottomTab>
              );
            }
          },
        })}>
        <Tab.Screen name="HomeStack" component={HomeScreen} />
        <Tab.Screen name="NoteStack" component={NoteScreen} />
        <Tab.Screen name="CalendarStack" component={CalendarScreen} />
        <Tab.Screen name="PasswordStack" component={PasswordStack} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    color: 'white',
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: 14,
    width: '100%',
    textAlign: 'center',
    fontWeight: '500',
  },
  tabContainer: {
    backgroundColor: '#F6FEFF',
    flex: 1,
  },
  tabBarStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});
