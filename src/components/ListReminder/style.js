import {StyleSheet} from 'react-native';
import {Fonts} from '../../constant';

export default StyleSheet.create({
  cotainer: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    borderRadius: 500,
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: 'lightgrey',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
  },
  textContent: {
    fontSize: 14,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
});
