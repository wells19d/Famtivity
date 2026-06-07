//* Settings.tsx

import React from 'react';
import { Text, View, Icons, Button } from '../ui';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { NavParams } from '../navigation/types';
import {
  ajLogin,
  amyLogin,
  tylerLogin,
  paisleyLogin,
  micahLogin,
  johnLogin,
  janeLogin,
  newUserLogin,
} from '../../z-sandbox/devLogin';
import { useDispatch } from 'react-redux';
import { useProfile } from '../hooks/useHooks';
import { useCoreInfo } from '../utilities/coreInfo';

const Settings = () => {
  const navigation = useNavigation<NavigationProp<NavParams>>();
  const dispatch = useDispatch();
  const core = useCoreInfo();

  const handleBack = () => {
    // console.log('Navigating to Landing');
    navigation.navigate('Landing');
  };

  const handleLogin = (user: string) => {
    console.log(`Logging in as ${user}`);
    switch (user) {
      case 'aj':
        dispatch({
          type: 'LOGIN_REQUEST',
          payload: {
            email: ajLogin.email,
            password: ajLogin.password,
          },
        });
        break;
      case 'amy':
        dispatch({
          type: 'LOGIN_REQUEST',
          payload: {
            email: amyLogin.email,
            password: amyLogin.password,
          },
        });
        break;
      case 'tyler':
        dispatch({
          type: 'LOGIN_REQUEST',
          payload: {
            email: tylerLogin.email,
            password: tylerLogin.password,
          },
        });
        break;
      case 'paisley':
        dispatch({
          type: 'LOGIN_REQUEST',
          payload: {
            email: paisleyLogin.email,
            password: paisleyLogin.password,
          },
        });
        break;
      case 'micah':
        dispatch({
          type: 'LOGIN_REQUEST',
          payload: {
            email: micahLogin.email,
            password: micahLogin.password,
          },
        });
        break;
      case 'john':
        dispatch({
          type: 'LOGIN_REQUEST',
          payload: {
            email: johnLogin.email,
            password: johnLogin.password,
          },
        });
        break;
      case 'jane':
        dispatch({
          type: 'LOGIN_REQUEST',
          payload: {
            email: janeLogin.email,
            password: janeLogin.password,
          },
        });
        break;
      case 'newUser':
        dispatch({
          type: 'LOGIN_REQUEST',
          payload: {
            email: newUserLogin.email,
            password: newUserLogin.password,
          },
        });
        break;
      case 'logout':
        dispatch({
          type: 'LOGOUT_AND_CLEAR',
        });
        break;
      default:
        console.warn('Unknown user for login');
    }
    navigation.navigate('Landing');
  };

  return (
    <View flex centerVH>
      <View>
        <Button onPress={() => handleLogin('aj')}>Login as AJ</Button>
        <Button onPress={() => handleLogin('amy')}>Login as Amy</Button>
        <Button onPress={() => handleLogin('tyler')}>Login as Tyler</Button>
        <Button onPress={() => handleLogin('paisley')}>Login as Paisley</Button>
        <Button onPress={() => handleLogin('micah')}>Login as Micah</Button>
        <Button onPress={() => handleLogin('john')}>Login as John</Button>
        <Button onPress={() => handleLogin('jane')}>Login as Jane</Button>
        <Button onPress={() => handleLogin('newUser')}>
          Login as New User
        </Button>
        <Button onPress={() => handleLogin('logout')}>Logout</Button>
        <Button onPress={handleBack}>Back</Button>
      </View>
    </View>
  );
};

export default Settings;
