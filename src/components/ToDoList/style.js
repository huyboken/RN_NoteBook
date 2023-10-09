import {StyleSheet} from 'react-native';
import {Fonts} from '../../constant';

export default StyleSheet.create({
  cotainer: {
    // flex: 1,
    width: 155,
    height: 200,
    marginVertical: 10,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 20,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    shadowColor: 'lightgrey',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.POPPINS_BOLD,
    color: 'black',
  },
  content: {
    flexDirection: 'row',
    marginTop: 5,
  },
  time: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textTime: {
    textAlign: 'right',
    color: '#00D3ED',
    marginLeft: 4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
});
