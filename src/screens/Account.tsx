//* Account.tsx

import React from 'react';
import { Text, View, Icons } from '../ui';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTestData } from '../../z-sandbox/useTestData';
import { Button } from 'react-native';
import { NavParams } from '../navigation/types';
import { useFamily, useProfile, useUser } from '../hooks/useHooks';

const Account = () => {
  const navigation = useNavigation<NavigationProp<NavParams>>();
  const user = useUser();
  const profile = useProfile();
  const family = useFamily();
  console.log('user in Account', user);
  // console.log('profile in Account', profile);
  // console.log('family in Account', family);
  // const familyMembers = useAllowedProfiles();
  // console.log('familyMembers in Account', familyMembers);

  const handlePress = () => {
    console.log('Navigating to Landing');
    navigation.navigate('Landing');
  };

  const renderObject = (title: any, obj: any) => {
    if (!obj) return null;

    return (
      <View mh5 pb15>
        <Text size="small" color="blue" numberOfLines={1}>
          {title}
        </Text>

        {Object.entries(obj).map(([key, value]) => (
          <View key={key} row>
            <View>
              <Text numberOfLines={1}>{key}:</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={{ textAlign: 'right' }}>
                {String(value)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{ borderWidth: 1, borderColor: 'red' }} flex p5>
      <Text size="medium" color="blue">
        Account
      </Text>
      <Button title="Back to Landing" onPress={handlePress} />
      <View>
        {renderObject('User', user)}
        {renderObject('Profile', profile)}
        {renderObject('Family', family)}
      </View>
    </View>
  );
};

export default Account;
