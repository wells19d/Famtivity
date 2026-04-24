// firebase.config.js
import { getApp } from '@react-native-firebase/app';
import {
  getRemoteConfig,
  getValue,
  setDefaults,
} from '@react-native-firebase/remote-config';

export const fetchRemoteKeys = async () => {
  const app = getApp();
  const config = getRemoteConfig(app);

  await setDefaults(config, {
    app_version: '1.0.0',
  });

  await config.fetch(0);
  await config.activate();

  return {
    appVersion: getValue(config, 'app_version').asString(),
  };
};
