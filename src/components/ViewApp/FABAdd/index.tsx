import React from 'react';
import styles from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from 'react-native';

interface FABAddProps {
  styleTitle: StyleProp<TextStyle>,
  title: String,
  style: StyleProp<ViewStyle>;
  onPress: () => {}
}

const FABAdd: React.FC<FABAddProps> = ({ style, onPress = () => { }, title, styleTitle }) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, !title ? { width: 50, height: 50 } : { paddingHorizontal: 30, paddingVertical: 8 }, style]}>
      {title ? <Text style={[styles.title, styleTitle]}>{title}</Text> : <MaterialIcons name="add" style={styles.icon} />}
    </Pressable>
  );
};

export default FABAdd;
