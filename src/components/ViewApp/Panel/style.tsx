import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../../constant';

export default StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    marginVertical: 5,
    overflow: 'hidden',
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,

    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    flex: 1,
    color: '#2a2f43',
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  button: {
    paddingVertical: 10,
  },
  icon: {
    fontSize: 20,
    color: 'grey',
  },
  body: {
    padding: 10,
    borderRadius: 10,
  },
});
