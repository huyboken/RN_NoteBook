import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../constant';

export default StyleSheet.create({
  toolbarActionRight: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
  toolbarActionRightIcon: {
    fontSize: 22,
    color: Colors.DEFAULT_BLACK,
  },
  sectionHeader: {
    backgroundColor: '#00D3ED',
    paddingVertical: 10,
    alignSelf: 'flex-start',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 30,
    paddingRight: 12,
    marginBottom: 5,
  },
  sectionHeaderText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.POPPINS_MEDIUM,
    textTransform: 'capitalize',
  },
  iconSearchBack: {
    paddingRight: 10,
  },
  arrowIcon: {
    fontSize: 30,
    color: 'black',
  },
  iconSearchClear: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  closeIcon: {
    fontSize: 30,
    color: 'red',
  },
  search: {
    flex: 1,
    marginRight: 30,
    fontSize: 16,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: 'black',
  },
});
