import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {AuthStack} from './navigator';
import store from './redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <SafeAreaProvider>
          <AuthStack />
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
