import {StyleSheet} from 'react-native';
import {Fonts} from '../../../constant';
import {Display} from '../../../utils';

export default StyleSheet.create({
  header: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 10,
    marginTop: 30,
    width: Display.setWidth(80),
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 500,
    borderTopLeftRadius: 500,
  },
  headerDayOfWeek: {
    textTransform: 'uppercase',
    fontSize: 14,
    textAlign: 'right',
    color: 'black',
    fontFamily: Fonts.POPPINS_BOLD,
  },
  headerTime: {
    fontSize: 30,
    textAlign: 'right',
    color: 'black',
    fontFamily: Fonts.POPPINS_BOLD,
  },
  content: {
    flex: 1,
  },
  reminder: {
    paddingVertical: 20,
    paddingLeft: 20,
  },
  reminderText: {
    fontSize: 16,
    color: 'grey',
    fontFamily: Fonts.POPPINS_BOLD,
  },
});
