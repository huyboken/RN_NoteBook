import {Platform, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../constant';

export default StyleSheet.create({
  toolbar: {
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: Platform.OS === 'ios' ? 10 : 9,
    height: 50,
    zIndex: -1,
  },
  iconLeft: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  arrow: {
    fontSize: 25,
    color: Colors.DEFAULT_BLACK,
  },
  title: {
    // position: 'absolute',
    // bottom: 11,
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_BLACK,
    textAlign: 'center',
    maxWidth: '70%',
  },
});
