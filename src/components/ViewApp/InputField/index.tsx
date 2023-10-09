import {
  StyleSheet,
  Keyboard,
  Text,
  TextInput,
  View,
  KeyboardType,
  StyleProp,
  TextStyle,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ICustomInputProps {
  placeholder: any,
  onChangeText: Function,
  multiline: any,
  value: any,
  styleInput: StyleProp<TextStyle>,
  keyboardType: KeyboardType;
}

const InputField: React.FC<ICustomInputProps> = ({
  placeholder,
  onChangeText = () => { },
  multiline = false,
  value,
  styleInput,
  keyboardType,
}) => {
  const [text, setText] = useState<any>('');
  const [focus, setFocus] = useState<any>(false);

  const handleValue = (value: String) => {
    onChangeText(value);
    setText(value);
  };

  return (
    <View style={styles.container}>
      {(text.trim().length > 0 || value?.trim()?.length > 0) && (
        <Text style={styles.title}>{placeholder}</Text>
      )}
      <TextInput
        style={[
          styles.textInput,
          { height: 'auto', marginRight: multiline ? 15 : 0 },
          styleInput,
        ]}
        onChangeText={handleValue}
        placeholder={placeholder}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        keyboardType={keyboardType || 'email-address'}
        multiline={multiline}
        value={value || text}
      />
      <View
        style={[styles.line, { borderTopColor: focus ? '#00A1BB' : '#E2EBED' }]}
      />
      {focus && multiline && (
        <Ionicons
          name={'checkmark-circle'}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 5,
            fontSize: 20,
            color: 'green',
          }}
          onPress={() => Keyboard.dismiss()}
        />
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
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
