//* CreateTask.tsx

import React from 'react';
import { View, Text } from '../ui';
import { useRoute } from '@react-navigation/native';
import NavHeader from '../ui/NavHeader';

const CreateTask = () => {
  const route = useRoute();
  const { createMode } = route.params as { createMode: string };

  console.log('Create Mode:', createMode);
  return (
    <View flex backgroundColor="#ffffff" pb10>
      <NavHeader leftButton="Cancel" />
      <View>
        <Text>Create Task</Text>
      </View>
    </View>
  );
};

export default CreateTask;
