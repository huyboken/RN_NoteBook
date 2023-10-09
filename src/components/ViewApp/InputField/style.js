const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  container: {
    minHeight: 54,
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: 'white',
    padding: 5,
    fontSize: 18,
    color: 'black',
  },
  title: {
    padding: 5,
    paddingBottom: 1,
    fontSize: 12,
    color: 'grey',
  },
  line: {
    borderTopWidth: 2,
    borderRadius: 10,
  },
});
