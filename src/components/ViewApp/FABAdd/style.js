import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../constant';

export default StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.LIGHT_BLACK,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
    backgroundColor: '#FFBF00',
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  icon: {
    fontSize: 28,
    color: 'white',
  },
});
