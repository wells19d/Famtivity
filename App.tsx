// App.tsx
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  StatusBar,
  TextInput,
  PixelRatio,
  AccessibilityInfo,
  StyleSheet,
} from 'react-native';
import { Text, View } from './src/ui';
// import SplashScreen from './src/components/SplashScreen';
// import Toast from 'react-native-toast-message';
// import toastConfig from './src/KQ-UI/KQToast';
import Main from './Main';
// import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
// import { initializeApp, getApps } from '@react-native-firebase/app';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    (Text as any).defaultProps = (Text as any).defaultProps || {};
    (TextInput as any).defaultProps = (TextInput as any).defaultProps || {};

    (Text as any).defaultProps.allowFontScaling = false;
    (TextInput as any).defaultProps.allowFontScaling = false;

    PixelRatio.get = () => 1;
    PixelRatio.getFontScale = () => 1;

    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      () => {
        PixelRatio.get = () => 1;
        PixelRatio.getFontScale = () => 1;
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GestureHandlerRootView style={styles.ghrv}>
          <SafeAreaProvider>
            <View flex style={styles.outerContainer}>
              <StatusBar barStyle="dark-content" backgroundColor={'blue'} />
              <Main />
            </View>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  ghrv: { flex: 1 },
  outerContainer: { backgroundColor: '#f3f3f3' },
});

export default App;
