import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {XML} from '../../../constant';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import styles from './style';
import {t} from 'i18next';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../../../redux/constants';
import {ViewApp} from '../../../components';

const SplashScreen = () => {
  const firstTimeUse = useSelector(state => state.getFirstTimeUse.data);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch({type: actions.GET_FIRST_TIME_USE});
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace(firstTimeUse ? 'MainStack' : 'OnBoardingScreen');
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [firstTimeUse]);

  return (
    <ViewApp.Container style={styles.container} background>
      <View style={styles.logo}>
        <SvgXml xml={XML.logoXml} />
      </View>
      <Text style={styles.title}>Notebook</Text>
      <Text style={styles.subTitle}>{t('subTitleSplash')}</Text>
    </ViewApp.Container>
  );
};

export default SplashScreen;
