//* UpdateTask.tsx

import React from 'react';
import { View, Text } from '../ui';
import { useRoute } from '@react-navigation/native';

const UpdateTask = () => {
  const route = useRoute();
  const { task } = route.params as { task: object };
  console.log('Task to Update:', task);
  return (
    <View>
      <View>
        <Text>Update Task</Text>
      </View>
    </View>
  );
};

export default UpdateTask;
