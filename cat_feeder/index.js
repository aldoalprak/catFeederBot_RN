/** @format */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'core-js/es6/map'
import 'core-js/es6/symbol'
import 'core-js/fn/symbol/iterator'
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
