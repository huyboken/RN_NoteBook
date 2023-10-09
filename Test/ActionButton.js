import {Pressable} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export function ActionButton({backgroundColor, icon}) {
  return (
    <Pressable
      style={[
        {height: 60, width: 60, alignItems: 'center', justifyContent: 'center'},
        {backgroundColor},
      ]}>
      <Feather name={icon} size={24} color="#FFFDFF" />
    </Pressable>
  );
}
