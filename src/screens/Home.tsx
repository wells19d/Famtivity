//* Home.tsx

import React from 'react';
import { Text, View, Icons } from '../ui';
import { useTestData } from '../hooks/useTestData';

const Home = () => {
  const {
    user,
    profile,
    family,
    familyTasks,
    myTasks,
    adultTasks,
    childTasks,
  } = useTestData('', ''); // pass in test userId and password

  console.log('Home screen data:', {
    user,
    profile,
    family,
    familyTasks,
    myTasks,
    adultTasks,
    childTasks,
  });

  return (
    <View flex centerVH>
      <Text size="medium" color="blue">
        Welcome to Famtivity!
      </Text>

      <View>
        <Icons.BookmarkPlus size={30} color="green" />
      </View>
    </View>
  );
};

export default Home;
