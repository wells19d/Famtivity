/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import { name as appName } from './app.json';

const originalConsoleError = console.error;

console.error = (...args) => {
  const message = args.map(arg => String(arg)).join(' ');

  if (
    message.includes(
      'A props object containing a "key" prop is being spread into JSX',
    ) ||
    message.includes(
      'Sending `onAnimatedValueUpdate` with no listeners registered.',
    )
  ) {
    return;
  }

  originalConsoleError(...args);
};

LogBox.ignoreLogs([
  'A props object containing a "key" prop is being spread into JSX',
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);

const App = require('./App').default;

AppRegistry.registerComponent(appName, () => App);
