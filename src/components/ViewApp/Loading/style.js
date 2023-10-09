import {StyleSheet} from 'react-native';
import {Display} from '../../../utils';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(30),
    height: Display.setWidth(30),
  },
});
