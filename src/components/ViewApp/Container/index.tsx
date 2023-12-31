import React from 'react';
import { StatusBar, View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import { XML } from '../../../constant';
import { Display } from '../../../utils';
import styles from './style';

interface ICustomViewProps extends ViewProps {
  ref: React.Ref<View | null>;
  background: Boolean;
}

const Container: React.FC<ICustomViewProps> = (
  { background, children, ...rest },
  ref,
) => {
  const insets = useSafeAreaInsets();
  const defaultStyle = {
    paddingTop: insets.top,
    paddingLeft: insets.left,
    paddingRight: insets.right,
    flex: 1,
    backgroundColor: '#F6FEFF',
  };
  return (
    <View {...rest} style={[defaultStyle, rest.style]} ref={ref}>
      <StatusBar barStyle="dark-content" />
      {background && (
        <SvgXml
          preserveAspectRatio="xMinYMin slice"
          xml={XML.bg}
          style={styles.bg}
          width={Display.setWidth(100)}
          height={Display.setHeight(100)}
        />
      )}
      {children}
    </View>
  );
};

export default React.forwardRef(Container);
