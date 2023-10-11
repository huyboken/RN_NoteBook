import React, {useRef} from 'react';
import {View} from 'react-native';
import {Pressable} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style';

const SwipeableRow = ({children, prevOpenedRowRef, onDelete = () => {}, onUpdate = () => {}}) => {
  const rowRef = useRef(null);

  const closeRow = () => {
    if (prevOpenedRowRef.current && prevOpenedRowRef.current !== rowRef.current) {
      prevOpenedRowRef.current.close();
    }
    prevOpenedRowRef.current = rowRef.current;
  };

  const renderRightActions = () => {
    return (
      <View style={styles.rightContainer}>
        <Pressable onPress={onUpdate} style={styles.btnUpdate}>
          <Feather name={'edit'} size={24} color="#FFFDFF" />
        </Pressable>
        <Pressable onPress={onDelete} style={styles.btnDelete}>
          <Feather name={'delete'} size={24} color="#FFFDFF" />
        </Pressable>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions} onSwipeableWillOpen={closeRow} ref={rowRef} rightOpenValue={-100}>
      {children}
    </Swipeable>
  );
};

export default SwipeableRow;
