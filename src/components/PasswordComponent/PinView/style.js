import {StyleSheet} from 'react-native';
import {Fonts} from '../../../constant';

export default StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 24,
    fontFamily: Fonts.POPPINS_BOLD,
  },
  subTitle: {
    color: 'grey',
    fontSize: 14,
    fontFamily: Fonts.POPPINS_MEDIUM,
    paddingTop: 10,
    paddingBottom: 20,
    textAlign: 'center',
  },
});
