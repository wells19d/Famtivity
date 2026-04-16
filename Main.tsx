//* Main.tsx

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from './src/ui';
import LandingPage from './src/screens/LandingPage';
import MyTasks from './src/screens/MyTasks';
import FamilyTasks from './src/screens/FamilyTasks';
import ChildTasks from './src/screens/ChildTasks';
import PendingTasks from './src/screens/PendingTasks';
import UnclaimedTasks from './src/screens/UnclaimedTasks';
import Medications from './src/screens/Medications';
import Billing from './src/screens/Billing';
import History from './src/screens/History';
import Account from './src/screens/Account';
import Settings from './src/screens/Settings';
import { ImageBackground, StyleSheet } from 'react-native';

interface MainProps {}

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'none',
        gestureEnabled: false,
        headerBackVisible: false,
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
      }}
      initialRouteName="Landing"
    >
      <Stack.Screen
        name="Landing"
        component={LandingPage}
        options={{ freezeOnBlur: true }}
      />
      <Stack.Screen
        name="MyTasks"
        component={MyTasks}
        options={{ freezeOnBlur: true }}
      />
      <Stack.Screen
        name="FamilyTasks"
        component={FamilyTasks}
        options={{ freezeOnBlur: true }}
      />
      <Stack.Screen
        name="ChildTasks"
        component={ChildTasks}
        options={{ freezeOnBlur: true }}
      />
      <Stack.Screen
        name="PendingTasks"
        component={PendingTasks}
        options={{ freezeOnBlur: true }}
      />
      <Stack.Screen
        name="UnclaimedTasks"
        component={UnclaimedTasks}
        options={{ freezeOnBlur: true }}
      />
      <Stack.Screen
        name="Medications"
        component={Medications}
        options={{ freezeOnBlur: true }}
      />
      <Stack.Screen
        name="Billing"
        component={Billing}
        options={{ freezeOnBlur: true }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{ freezeOnBlur: true }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{ freezeOnBlur: true }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ freezeOnBlur: true }}
      />
    </Stack.Navigator>
  );
};

const Main: React.FC<MainProps> = () => {
  const [renderDisplay, setRenderDisplay] = useState('main');
  const [currentRoute, setCurrentRoute] = useState('Landing');

  const yourImage = require('./src/images/bg0002.jpg');

  if (renderDisplay === 'main') {
    return (
      <NavigationContainer
        onStateChange={state => {
          const route = state?.routes?.[state.index ?? 0]?.name;
          if (route) setCurrentRoute(route);
        }}
      >
        <ImageBackground
          source={yourImage}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.overlay(currentRoute)} />
          <SafeAreaView
            style={{ flex: 1 }}
            edges={['top', 'bottom', 'left', 'right']}
          >
            <Navigation />
          </SafeAreaView>
        </ImageBackground>
      </NavigationContainer>
    );
  }
};

const styles = {
  image: {
    flex: 1,
  },
  overlay: (currentRoute: string) => ({
    ...StyleSheet.absoluteFill,
    backgroundColor: currentRoute === 'Landing' ? '#f3f3f360' : '#f3f3f3',
  }),
};

export default Main;
