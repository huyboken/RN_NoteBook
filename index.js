/**
 * @format
 */
import './i18n';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import test from './Test/test';

AppRegistry.registerComponent(appName, () => App);
