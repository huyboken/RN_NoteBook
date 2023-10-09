import React from 'react';
import styles from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Pressable, Text} from 'react-native';

const FABAdd = ({style, onPress = () => {}, title}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {...style},
        styles.button,
        !title
          ? {width: 50, height: 50}
          : {paddingHorizontal: 30, paddingVertical: 8},
      ]}>
      {title ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        <MaterialIcons name="add" style={styles.icon} />
      )}
    </Pressable>
  );
};

export default FABAdd;
