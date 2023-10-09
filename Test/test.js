import {useRef} from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

import {Note} from './Note';
import {ActionButton} from './ActionButton';

export default function test() {
  const swipeableRef = useRef();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Pressable
        style={styles.container}
        onPress={() => {
          swipeableRef.current?.close();
        }}>
        <Swipeable
          ref={swipeableRef}
          containerStyle={styles.swipeableContainer}
          overshootLeft={false}
          renderLeftActions={() => (
            <ActionButton backgroundColor="#FE9400" icon="pocket" />
          )}
          overshootRight={false}
          renderRightActions={() => (
            <View style={styles.swipeableActions}>
              <ActionButton backgroundColor="#3293FC" icon="share" />

              <ActionButton backgroundColor="#787AFF" icon="folder" />

              <ActionButton backgroundColor="#FD3B31" icon="trash" />
            </View>
          )}>
          <Note
            title="Componente de nota do iOS"
            subtitle="09:17 Criado com React Native Gesture Handler!"
          />
        </Swipeable>
      </Pressable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F2F1F6',
  },
  swipeableContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  swipeableActions: {
    flexDirection: 'row',
  },
});
