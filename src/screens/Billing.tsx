//* Billing.tsx

import React from 'react';
import { Text, View, Icons } from '../ui';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTestData } from '../../z-sandbox/useTestData';
import { Button } from 'react-native';
import { NavParams } from '../navigation/types';

const Billing = () => {
  const navigation = useNavigation<NavigationProp<NavParams>>();

  const handlePress = () => {
    console.log('Navigating to Landing');
    navigation.navigate('Landing');
  };
  return (
    <View flex centerVH>
      <Text size="medium" color="blue">
        Billing
      </Text>
      <Button title="Back to Landing" onPress={handlePress} />
    </View>
  );
};

export default Billing;
