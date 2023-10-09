import React, {useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../../constant';

const Toolbar = ({
  iconLeft,
  centerComponent,
  title,
  titleStyle,
  showTitle = true,
  showBackIcon = true,
  iconRight,
  style,
  controller,
  onIconLeftPressed,
  border,
}) => {
  const navigation = useNavigation();
  const toolbarRef = useRef();
  const toolbarController = useRef({
    setNativeProps: newStyle => {
      toolbarRef.current?.setNativeProps({
        style: [styles.toolbar, {...style, ...newStyle}],
      });
    },
  });

  useEffect(() => {
    if (typeof controller === 'function') {
      controller(toolbarController.current);
    }
  }, [controller]);

  return (
    <View
      ref={toolbarRef}
      style={[
        styles.toolbar,
        {...style},
        border && {borderBottomColor: Colors.LIGHT_GREY3, borderBottomWidth: 1},
      ]}>
      {showBackIcon &&
        (typeof iconLeft === 'function' ? (
          iconLeft()
        ) : (
          <TouchableOpacity
            style={styles.iconLeft}
            onPress={onIconLeftPressed || navigation.goBack}>
            <Ionicons style={styles.arrow} name="arrow-back" />
          </TouchableOpacity>
        ))}
      {typeof centerComponent === 'function' ? (
        centerComponent()
      ) : (
        <Text
          style={[
            styles.title,
            titleStyle,
            {display: showTitle ? 'flex' : 'none'},
          ]}
          numberOfLines={1}>
          {title}
        </Text>
      )}
      {typeof iconRight === 'function' ? iconRight() : <></>}
    </View>
  );
};

export default Toolbar;
