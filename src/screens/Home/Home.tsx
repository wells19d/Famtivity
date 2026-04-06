//* Home.tsx

import React from 'react';
import { Text, View, Icons } from '../../ui';
import { useTestData } from '../../../z-sandbox/useTestData';

const Home = () => {
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
