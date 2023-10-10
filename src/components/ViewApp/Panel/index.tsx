import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Text, View, Animated, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';

interface PanelProps {
  title: string;
  children: React.ReactNode;
  type: 'separate' | 'transparent';
}

const Panel: React.FC<PanelProps> = ({ title, children, type = 'separate' }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [maxValueSet, setMaxValueSet] = useState(false);
  const [minValueSet, setMinValueSet] = useState(false);
  const [cardHeight, setCardHeight] = useState<any>('auto');

  const toggle = useCallback(() => {
    let initialValue = expanded ? maxHeight + minHeight : minHeight;
    let finalValue = expanded ? minHeight : maxHeight + minHeight;

    setExpanded((prevExpanded) => !prevExpanded);

    Animated.spring(animation, {
      toValue: finalValue,
      useNativeDriver: true,
    }).start();
  }, [animation, expanded, maxHeight, minHeight]);

  const setMaxHeight1 = useCallback((event: any) => {
    if (!maxValueSet) {
      setMaxHeight(event.nativeEvent.layout.height + 20);
      setMaxValueSet(true);
    }
  }, [maxValueSet]);

  const setMinHeight1 = useCallback((event: any) => {
    if (!minValueSet) {
      animation.setValue(event.nativeEvent.layout.height + 16);

      setMinHeight(event.nativeEvent.layout.height + 16);
      setMinValueSet(true);
    }
  }, [animation, minValueSet]);

  useEffect(() => {
    const animationId = animation.addListener(({ value }: any) => {
      setCardHeight(value);
    });

    return () => {
      animation.removeListener(animationId);
    };
  }, [animation]);

  const memoizedContainerStyle = useMemo(
    () => [styles.container, { height: cardHeight }],
    [cardHeight]
  );

  return (
    <Animated.View style={memoizedContainerStyle}>
      <View style={{ padding: 10 }}>
        <Pressable
          onPress={toggle}
          style={[
            styles.titleContainer,
            {
              backgroundColor: expanded
                ? type === 'transparent'
                  ? '#E5FBFE'
                  : 'white'
                : 'white',
              borderBottomLeftRadius: expanded
                ? type === 'transparent'
                  ? 0
                  : 10
                : 10,
              borderBottomRightRadius: expanded
                ? type === 'transparent'
                  ? 0
                  : 10
                : 10,
              shadowOpacity: expanded ? (type === 'transparent' ? 0 : 0.8) : 0.8,
            },
          ]}
          onLayout={setMinHeight1}
        >
          <Text style={styles.title}>{title}</Text>
          <View style={styles.button}>
            <Ionicons
              onPress={toggle}
              name={
                expanded
                  ? type === 'transparent'
                    ? 'caret-forward'
                    : 'caret-down'
                  : 'caret-up'
              }
              style={styles.icon}
            />
          </View>
        </Pressable>

        <View
          style={{
            padding: type === 'transparent' ? 3 : 10,
            backgroundColor: expanded
              ? type === 'transparent'
                ? '#E5FBFE'
                : 'transparent'
              : 'transparent',
          }}
        />

        <View
          style={[
            styles.body,
            {
              backgroundColor: '#E5FBFE',
              borderTopLeftRadius: type === 'transparent' ? 0 : 10,
              borderTopRightRadius: type === 'transparent' ? 0 : 10,
            },
          ]}
          onLayout={setMaxHeight1}
        >
          {children}
        </View>
      </View>
    </Animated.View>
  );
};

export default Panel;