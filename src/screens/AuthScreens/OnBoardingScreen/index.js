import React, {useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import {useDispatch} from 'react-redux';
// import GeneralAction from '../actions/GeneralAction';
import {OnBoardingCard, Separator} from '../../../components';
import {Colors, Fonts, General} from '../../../constant';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Display} from '../../../utils';
// import {StorageService} from '../services';
import {t} from 'i18next';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../../../redux/constants';
const pageStyle = isActive =>
  isActive
    ? styles.page
    : {...styles.page, backgroundColor: Colors.DEFAULT_GREY};

const Pagination = ({index}) => {
  return (
    <View style={styles.pageContainer}>
      {[...Array(General.WELCOME_CONTENTS.length).keys()].map((_, i) =>
        i === index ? (
          <View style={pageStyle(true)} key={i} />
        ) : (
          <View style={pageStyle(false)} key={i} />
        ),
      )}
    </View>
  );
};

const OnBoardingScreen = () => {
  const [welcomeListIndex, setWelcomeListIndex] = useState(0);

  const welcomeList = useRef();
  const navigation = useNavigation();
  const onViewRef = useRef(({changed}) => {
    setWelcomeListIndex(changed[0].index);
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  const pageScroll = () => {
    welcomeList.current.scrollToIndex({
      index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
    });
  };
  const dispatch = useDispatch();
  const navigateSignin = () => {
    navigation.navigate('MainStack', {screen: 'HomeScreen'});
    dispatch({type: actions.SET_FIRST_TIME_USE});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.buttonSkip}
        onPress={() => welcomeList.current.scrollToEnd()}>
        <Text style={styles.txtSkip}>{t('skip')}</Text>
      </TouchableOpacity>
      <Separator height={StatusBar.currentHeight} />
      <Separator height={Display.setHeight(8)} />
      <View style={styles.welcomeListContainer}>
        <FlatList
          ref={welcomeList}
          data={General.WELCOME_CONTENTS}
          keyExtractor={item => item.title}
          horizontal
          pagingEnabled
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
          overScrollMode="never"
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <OnBoardingCard {...item} />}
        />
      </View>
      <Separator height={Display.setHeight(8)} />
      {welcomeListIndex === 2 ? (
        <TouchableOpacity
          style={styles.gettingStartedButton}
          activeOpacity={0.8}
          onPress={navigateSignin}>
          <Text style={styles.gettingStartedButtonText}>{t('start')}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <Pagination index={welcomeListIndex} />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => pageScroll()}>
            <Ionicons name="arrow-forward-outline" size={30} color={'white'} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OnBoardingScreen;
