import {View, Text, Image} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style';
import {XML} from '../../constant';
import {SvgXml} from 'react-native-svg';

const ToDoList = ({item, index}) => {
  const renderType = () => {
    return (
      <>
        {(item.type.includes('location') || item.type.includes('audio')) && (
          <SvgXml
            xml={
              item.type.includes('location') ? XML.locationPrev : XML.audioPrev
            }
            width={40}
            height={40}
            style={{marginRight: 5}}
          />
        )}
      </>
    );
  };

  const renderImage = () => {
    return (
      <>
        {item.image &&
          item.image.map((url, index) => (
            <Image
              key={index}
              style={{width: 40, height: 40, marginRight: 5}}
              source={url}
              resizeMode="cover"
            />
          ))}
      </>
    );
  };

  return (
    <View style={styles.cotainer}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.content}>
        {renderType()}
        {renderImage()}
      </View>
      <View style={{flex: 1}} />
      <View style={styles.time}>
        <Feather name="clock" fontSize="20" color="#00D3ED" />
        <Text style={styles.textTime}>{item.time}</Text>
      </View>
    </View>
  );
};

export default ToDoList;
