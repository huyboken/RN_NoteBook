import {StyleSheet} from 'react-native';
import {Fonts} from '../../../constant';

export default StyleSheet.create({
  container: {
    backgroundColor: '#F6FEFF',
  },
  toolbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  toolbarActionRight: {
    position: 'absolute',
    right: 15,
    bottom: 10,
    flexDirection: 'row',
  },
  toolbarActionRightIcon: {
    fontSize: 28,
    color: 'black',
  },
  rootView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
