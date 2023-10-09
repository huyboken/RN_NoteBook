import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {AuthStack} from './navigator';
import store from './redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <AuthStack />
      </Provider>
    </GestureHandlerRootView>
  );
}
