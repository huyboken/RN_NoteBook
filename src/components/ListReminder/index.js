import {View, Text} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {XML} from '../../constant';
import styles from './style';

const ListReminder = ({item, index}) => {
  const color = index % 2 === 0 ? 'white' : '#00D3ED';
  const colorBell = index % 2 === 0 ? '#96B0BB' : 'white';
  const textColor = index % 2 === 0 ? 'black' : 'white';
  return (
    <View style={[styles.cotainer, {backgroundColor: color}]}>
      <View style={styles.content}>
        <Text style={[styles.textContent, {color: textColor, marginRight: 20}]}>
          {item?.time}
        </Text>
        <Text style={[styles.textContent, {color: textColor}]}>
          {item?.title}
        </Text>
      </View>
      <SvgXml xml={XML.iconBellXml(colorBell)} />
    </View>
  );
};

export default ListReminder;
