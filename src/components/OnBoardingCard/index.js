import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {Fonts} from '../../constant';
import {Display} from '../../utils';

const OnBoardingCard = ({title, image, content}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}} />
      <SvgXml xml={image} style={styles.image} />
      <View style={{flex: 1}} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.contentText}>{content}</Text>
      </View>
    </View>
  );
};

export default OnBoardingCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(100),
  },
  image: {
    height: Display.setHeight(30),
    width: Display.setWidth(100),
  },
  textContainer: {
    alignItems: 'flex-start',
  },
  titleText: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_BOLD,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  contentText: {
    fontSize: 14,
    fontFamily: Fonts.POPPINS_REGULAR,
    textAlign: 'left',
    marginHorizontal: 20,
  },
});
