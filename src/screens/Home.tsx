//* Home.tsx

import React from 'react';
import { Text, View, Icons } from '../ui';

const Home = () => {
  return (
    <View flex centerVH>
      <Text size="medium" color="blue">
        Welcome to Famtivity!
      </Text>

      <View>
        <Icons.Check size={30} color="green" />
      </View>
    </View>
  );
};

export default Home;
