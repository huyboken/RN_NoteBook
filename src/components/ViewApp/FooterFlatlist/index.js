import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Fonts, Images} from '../../../constant';

const FooterFlatlist = ({passwordVisible, data}) => {
  return (
    <>
      {data?.length > 0 && (
        <View style={{marginVertical: 10}}>
          {passwordVisible ? (
            <Image style={styles.image} source={Images.LOADING_BG} />
          ) : (
            <Text style={styles.text}>Hết rồi</Text>
          )}
        </View>
      )}
    </>
  );
};

export default FooterFlatlist;

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    width: 45,
    height: 20,
  },
  text: {
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: Fonts.POPPINS_REGULAR,
    color: 'black',
  },
});
