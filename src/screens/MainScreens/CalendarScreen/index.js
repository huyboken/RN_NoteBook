import React from 'react';
import {ViewApp} from '../../../components';
import i18next, {t} from 'i18next';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import {StyleSheet, Text, View} from 'react-native';
import {Display} from '../../../utils';
import moment from 'moment/min/moment-with-locales';
import {CalenderLocales, Fonts} from '../../../constant';

const CalendarScreen = () => {
  const language = i18next.language;
  const currentTime = moment().format('YYYY-MM-DD');

  LocaleConfig.locales['en'] = CalenderLocales['en'];
  LocaleConfig.locales['vi'] = CalenderLocales['vi'];

  LocaleConfig.defaultLocale = language;

  const renderHeader = date => {
    const dateStr = date.toISOString();
    const endIndex = dateStr.indexOf('T');
    const title = moment(dateStr.slice(0, endIndex))
      .locale(language)
      .format('MMMM');
    return (
      <View style={[styles.dayContainer]}>
        <Text style={styles.dayText}>{title}</Text>
      </View>
    );
  };

  return (
    <ViewApp.Container background={false} style={{alignItems: 'center'}}>
      <ViewApp.Toolbar title={t('calendar')} showBackIcon={false} />
      <CalendarList
        style={{backgroundColor: '#F6FEFF'}}
        current={currentTime}
        pagingEnabled
        scrollEventThrottle={16}
        pastScrollRange={24}
        futureScrollRange={24}
        calendarWidth={Display.setWidth(100) - 40}
        renderHeader={renderHeader}
        theme={{
          selectedDayBackgroundColor: '#FF0000',
          selectedDayTextColor: '#FFFFFF',
          todayBackgroundColor: '#00D3ED',
          todayTextColor: '#FFFFFF',
          dayBackgroundColor: '#FFFFFF',
          dayTextColor: '#000000',
        }}
        calendarStyle={{
          borderRadius: 20,
          marginVertical: 10,
          marginHorizontal: 10,
          backgroundColor: '#fff',
          shadowColor: 'grey',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.8,
          shadowRadius: 4,
          elevation: 5,
        }}
      />
    </ViewApp.Container>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    margin: 5,
  },
  dayText: {
    fontSize: 30,
    color: '#96B0BB',
    textTransform: 'capitalize',
  },
});
