/** @format */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';

// Registra o componente App que vai conter os outros componentes
AppRegistry.registerComponent(appName, () => App);
