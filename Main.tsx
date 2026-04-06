//* Main.tsx

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from './src/ui';
import Home from './src/screens/Home/Home';
import Landing from './src/screens/Landing/Landing';

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const [renderDisplay, setRenderDisplay] = useState('main');
  const Stack = createNativeStackNavigator();

  const Navigation = () => {
    return (
      <>
        <Stack.Navigator
          screenOptions={{
            animation: 'none',
            gestureEnabled: false,
            headerBackVisible: false,
            headerShown: false,
            // navigationBarColor: '#ffffff',
          }}
          initialRouteName="Landing"
        >
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ freezeOnBlur: true }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ freezeOnBlur: true }}
          />
        </Stack.Navigator>
      </>
    );
  };

  if (renderDisplay === 'main') {
    return (
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          <View flex>
            <Navigation />
          </View>
        </SafeAreaView>
      </NavigationContainer>
    );
  }
};

export default Main;
