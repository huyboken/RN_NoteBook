import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../constant';
import {Display} from '../../../utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  welcomeListContainer: {
    height: Display.setHeight(68),
  },
  pageContainer: {
    flexDirection: 'row',
  },
  page: {
    height: 8,
    width: 15,
    backgroundColor: '#FFBF00',
    borderRadius: 32,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Display.setWidth(90),
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.POPPINS_BOLD,
    lineHeight: 16 * 1.4,
  },
  button: {
    backgroundColor: '#FFBF00',
    padding: 15,
    borderRadius: 40,
    shadowColor: Colors.DEFAULT_GREY,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  gettingStartedButton: {
    backgroundColor: '#FFBF00',
    paddingVertical: 5,
    paddingHorizontal: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.DEFAULT_GREY,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  gettingStartedButtonText: {
    fontSize: 20,
    color: Colors.DEFAULT_WHITE,
    lineHeight: 20 * 1.4,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
  buttonSkip: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#FFBF00',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
    shadowColor: Colors.DEFAULT_GREY,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  txtSkip: {
    color: 'white',
    fontSize: 14,
    fontFamily: Fonts.POPPINS_REGULAR,
    lineHeight: 14 * 1.4,
  },
});
