//* Account.tsx

import React from 'react';
import { Text, View, Icons, ScrollView } from '../ui';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Button } from 'react-native';
import { NavParams } from '../navigation/types';
import {
  useAllowedProfiles,
  useFamily,
  useProfile,
  useTasks,
  useUser,
} from '../hooks/useHooks';
import { useDispatch } from 'react-redux';
import { canViewTask } from '../utilities/helpers';

const Account = () => {
  const navigation = useNavigation<NavigationProp<NavParams>>();
  const user = useUser();
  const profile = useProfile();
  const family = useFamily();
  const allowedProfiles = useAllowedProfiles();
  const tasks = useTasks();
  const dispatch = useDispatch();
  // console.log('user in Account', user);
  // console.log('profile in Account', profile);
  // console.log('family in Account', family);
  // console.log('tasks in Account', tasks);

  // console.log('allowedProfiles in Account', allowedProfiles);

  const handlePress = () => {
    console.log('Navigating to Landing');
    navigation.navigate('Landing');
  };

  const keyChecker = (key: string) => {
    const num = Number(key);
    return isNaN(num) ? key : num + 1;
  };

  const visibleTasks = tasks.filter((task: any) =>
    canViewTask(task, profile, family.id),
  );

  console.log('visibleTasks in Account', tasks);
  console.log('visibleTasks in Account', visibleTasks);

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
              <Text numberOfLines={1}>{keyChecker(key)}:</Text>
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
    <ScrollView hideBar>
      <View flex>
        <Text size="medium" color="blue">
          Account: {tasks?.length ? `${tasks.length} tasks` : 'No tasks'}
        </Text>
        <Button title="Back to Landing" onPress={handlePress} />
        <View>
          {renderObject('User', user)}
          {renderObject('Profile', profile)}
          {renderObject('Family', family)}
          {renderObject('Allowed Profiles', allowedProfiles)}
          {renderObject('Tasks', visibleTasks)}
        </View>
      </View>
    </ScrollView>
  );
};

export default Account;
