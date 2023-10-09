import React, { useRef } from 'react';
import { Pressable } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Feather from 'react-native-vector-icons/Feather';

const SwipeableRow = ({ children, prevOpenedRowRef, onDelete = () => { } }: any) => {
  const rowRef = useRef<Swipeable>(null);

  const closeRow = () => {
    if (prevOpenedRowRef.current && prevOpenedRowRef.current !== rowRef.current) {
      prevOpenedRowRef.current.close();
    }
    prevOpenedRowRef.current = rowRef.current;
  };

  const renderRightActions = () => {
    return (
      <Pressable
        onPress={onDelete}
        style={[
          { height: 50, width: 50, alignItems: 'center', justifyContent: 'center', marginRight: 20, marginVertical: 10 },
          { backgroundColor: 'red' },
        ]}>
        <Feather name={'delete'} size={24} color="#FFFDFF" />
      </Pressable>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={closeRow}
      ref={rowRef}
      rightOpenValue={-100}
    >
      {children}
    </Swipeable>
  );
};

export default SwipeableRow;