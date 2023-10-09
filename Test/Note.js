import {StyleSheet, Text, View} from 'react-native';

export function Note({title, subtitle}) {
  return (
    <View style={styles.note}>
      <Text numberOfLines={1} style={styles.noteTitle}>
        {title}
      </Text>

      <Text numberOfLines={1} style={styles.noteText}>
        {subtitle}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  note: {
    backgroundColor: '#fff',
    width: '100%',
    height: 60,
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  noteTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#030303',
    lineHeight: 18,
    marginBottom: 4,
  },
  noteText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#7E7E80',
    lineHeight: 15,
  },
});
