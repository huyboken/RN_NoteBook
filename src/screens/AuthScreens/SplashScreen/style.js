import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    position: 'absolute',
  },
  logo: {
    backgroundColor: '#fff',
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
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
  },
  subTitle: {
    color: 'grey',
    fontSize: 12,
  },
});
