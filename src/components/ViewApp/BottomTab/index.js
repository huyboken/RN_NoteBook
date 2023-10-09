import {View} from 'react-native';
import React from 'react';
import {Display} from '../../../utils';

const BottomTab = ({children, styles}) => {
  return (
    <View
      style={[
        styles,
        {
          width: Display.setWidth(100) / 4,
          justifyContent: 'center',
          flexDirection: 'row',
          marginHorizontal: 4,
          borderRadius: 100,
          paddingVertical: 6,
        },
      ]}>
      {children}
    </View>
  );
};

export default BottomTab;
