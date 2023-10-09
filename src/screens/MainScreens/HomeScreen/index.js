import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {ListReminder, ToDoList, ViewApp} from '../../../components';
import moment from 'moment/min/moment-with-locales';
import i18next, {t} from 'i18next';
import {Display} from '../../../utils';
import {Images} from '../../../constant';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import styles from './style';

const HomeScreen = () => {
  const language = i18next.language;
  const tabBarHeight = useBottomTabBarHeight();

  const renderTime = type => {
    const currentDate = moment();
    const action =
      type == 'dayOfWeek' ? 'dddd' : type == 'dayOfMonth' ? 'D' : 'MMMM';
    if (language == 'vi') {
      return currentDate.locale(language).format(action);
    } else {
      if (['dayOfWeek', 'dayOfMonth'].includes(type)) {
        return currentDate.locale(language).format(action);
      } else if (type == 'month') {
        return currentDate.locale(language).format('MMMM').slice(0, 4);
      }
    }
  };

  const contentDate = () =>
    language == 'vi'
      ? `Ngày ${renderTime('dayOfMonth')}, ${renderTime('month')}`
      : `${renderTime('month')},  ${renderTime('dayOfMonth')}`;

  const LIST_REMINDER = [
    {
      id: 1,
      time: '9:00',
      title: 'Feed the cat',
    },
    {
      id: 2,
      time: '9:00',
      title: 'Feed the cat',
    },
    {
      id: 3,
      time: '9:00',
      title: 'Feed the cat',
    },
    {
      id: 4,
      time: '9:00',
      title: 'Feed the cat',
    },
  ];

  const TODO_LIST = [
    {
      id: 1,
      time: 'Today',
      title: 'Shooping',
      type: ['location', 'image'],
      image: [Images.FOOD1, Images.FOOD2],
    },
    {
      id: 2,
      time: '01.10',
      title: 'Study',
      type: ['audio'],
    },
    {
      id: 3,
      time: '02:10',
      title: 'Work tasks',
      type: ['task'],
      image: [Images.TASK1],
    },
  ];

  const renderListReminder = ({item, index}) => (
    <ListReminder item={item} index={index} />
  );

  const renderToDoList = ({item, index}) => (
    <ToDoList item={item} index={index} />
  );

  return (
    <ViewApp.Container background>
      <View
        style={[
          styles.header,
          {width: Display.setWidth(language == 'vi' ? 80 : 60)},
        ]}>
        <Text style={styles.headerDayOfWeek}>{renderTime('dayOfWeek')}</Text>
        <Text style={styles.headerTime} numberOfLines={1}>
          {contentDate()}
        </Text>
      </View>
      <View style={styles.content}>
        <View
          style={[
            styles.reminder,
            {height: Display.setHeight(100) - 500 - tabBarHeight},
          ]}>
          <Text style={styles.reminderText}>{t('reminder')}</Text>
          <FlatList
            keyExtractor={(item, index) => item.id || index}
            data={LIST_REMINDER}
            renderItem={renderListReminder}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.reminder}>
          <Text style={styles.reminderText}>{t('todoList')}</Text>
          <FlatList
            keyExtractor={(item, index) => item.id || index}
            data={TODO_LIST}
            renderItem={renderToDoList}
            horizontal
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
      <ViewApp.FABAdd onPress={() => {}} />
    </ViewApp.Container>
  );
};

export default HomeScreen;
