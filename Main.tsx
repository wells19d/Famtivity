//* Main.tsx

import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useAuth, useFamily, useProfile, useUser } from './src/hooks/useHooks';
import { getAuth } from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';
import { enableScreens } from 'react-native-screens';
// import { RTFamilies, RTUsers, RTProfiles } from './src/utilities/realtime';
import { devLogin } from './z-sandbox/devLogin';

interface MainProps {
  appReady: boolean;
  isSplashVisible: boolean;
}

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

const Main: React.FC<MainProps> = props => {
  const { appReady, isSplashVisible } = props;
  const dispatch = useDispatch();
  const user = useUser();
  const profile = useProfile();
  const family = useFamily();

  const isAuthenticated = useAuth();

  enableScreens(true);

  const [renderDisplay, setRenderDisplay] = useState('main');
  const [currentRoute, setCurrentRoute] = useState('Landing');

  const yourImage = require('./src/images/bg0002.jpg');

  // Step 1: Handle base state – app readiness and auth
  // this will first display the logo, giving the app extra time to load.
  // Once the app is ready, it will flip to the auth screen if the user is not authenticated
  // useEffect(() => {
  //   // if (!appReady) {
  //   //   setRenderDisplay('logo');
  //   //   return;
  //   // }
  //   // if (!isAuthenticated) {
  //   //   setRenderDisplay('auth');
  //   //   return;
  //   // }
  // }, [appReady, isAuthenticated]);

  // Step 2: Wait until profile.familyId is fully resolved
  // This will ensure that we don't try to render the main app until we know they are part of a family.
  // If they are not, they will be asked to create or join a family before they can access the main app.
  // useEffect(() => {
  //   // if (!appReady || !isAuthenticated) return;
  //   // if (profile && 'family' in profile) {
  //   //   if (profile.familyId === null) {
  //   //     setRenderDisplay('familySetup');
  //   //   } else {
  //   //     setRenderDisplay('main');
  //   //   }
  //   // }
  // }, [appReady, isAuthenticated, profile]);

  // Step 3: Set up real-time listeners only when we have the necessary context
  // This will prevent us from setting up listeners that will fail or cause errors because we don't have the necessary information.
  // const RTEnabled = isAuthenticated && family !== null;
  // RTFamilies(RTEnabled);
  // RTUsers(RTEnabled);
  // RTProfiles(RTEnabled);
  // RTTasks(RTEnabled);

  // this will be used later to display TOS and PP modals if the user hasn't accepted the latest versions
  // AppInfo.tosVersion and AppInfo.ppVersion will be defined in a separate file that we can update with each release
  // profile.tosVersion and profile.ppVersion will be added / updated in the database later, for when the user accepts the TOS and PP, and we'll compare those to the latest versions to determine if we need to show the modals
  //  useEffect(() => {
  //    if (isAuthenticated && profile && family !== null) {
  //      if (!profile?.tosVersion || profile?.tosVersion !== AppInfo.tosVersion) {
  //        setCurrentModal('TOS');
  //        setShowTOSModal(true);
  //      } else if (
  //        !profile?.ppVersion ||
  //        profile?.ppVersion !== AppInfo.ppVersion
  //      ) {
  //        setCurrentModal('PP');
  //        setShowPPModal(true);
  //      }
  //    }
  //  }, [isAuthenticated, profile, family]);

  // Step 5: Fetch device info on app launch and when dimensions change
  useEffect(() => {
    dispatch({ type: 'FETCH_DEVICE_INFO' });

    const subscription = Dimensions.addEventListener('change', () => {
      dispatch({ type: 'FETCH_DEVICE_INFO' });
    });

    return () => subscription?.remove();
  }, [dispatch]);

  // useEffect(() => {
  //   console.log('isAuthenticated', isAuthenticated);
  //   if (!isAuthenticated) {
  //     // run a fake login to bypass a login screen for now.
  //     // // This will be replaced with a real login screen later
  //     // allows us to test the main app without having to go through the login process every time.
  //   }
  // }, [isAuthenticated]);

  const didAutoLogin = useRef(false);

  useEffect(() => {
    if (didAutoLogin.current) return;
    didAutoLogin.current = true;

    dispatch({
      type: 'LOGIN_REQUEST',
      payload: {
        email: devLogin.email,
        password: devLogin.password,
      },
    });
  }, [dispatch]);

  // useEffect(() => {
  //   if (user?._user) {
  //     // console.log('User is authenticated, setting up real-time listeners');
  //     // RTFamilies(true);
  //     // RTUsers(true);
  //     // RTProfiles(true);
  //   }
  // }, [user?._user]);

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
          <SafeAreaView style={{ flex: 1 }}>
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
