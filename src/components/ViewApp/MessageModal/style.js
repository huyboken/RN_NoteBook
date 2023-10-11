import {StyleSheet} from 'react-native';
import {Display} from '../../../utils';
import {Fonts} from '../../../constant';

export default StyleSheet.create({
  container: {
    width: Display.setWidth(85),
    minHeight: 170,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 0,
    paddingVertical: 15,
    borderRadius: 10,
    maxWidth: 500,
  },
  top: {
    width: '100%',
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  messageIcon: {
    fontSize: 48,
    color: 'black',
  },
  messageText: {
    fontSize: 16,
    color: 'black',
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginTop: 10,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  messageTextUrl: {
    fontSize: 16,
    color: 'black',
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginTop: 10,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
  },
  actionButton: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 12,
    maxWidth: 275,
    marginHorizontal: 20,
  },
  actionText: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 18,
    color: 'white',
  },
  autoClose: {
    marginTop: 10,
    flexDirection: 'row',
  },
  autoCloseText: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    color: 'black',
  },
  box: {
    marginVertical: 8,
  },
  boxLabel: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: 'black',
    fontSize: 16,
    left: -8,
    textDecorationLine: 'none',
  },
});
