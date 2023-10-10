import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Fonts} from '../../../constant';

const EmptyFlatlist = () => {
  return (
    <View style={{marginVertical: 10}}>
      <Text style={styles.text}>Không có kết quả</Text>
    </View>
  );
};

export default EmptyFlatlist;

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: Fonts.POPPINS_REGULAR,
    color: 'black',
  },
});
