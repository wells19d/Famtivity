//* Home.tsx

import React from 'react';
import { Text } from 'react-native';
import { View } from '../ui';
import AntDesign from '@react-native-vector-icons/ant-design';

const Home = () => {
  return (
    <View flex border centerVH>
      <Text style={{ fontFamily: 'CherryBlossom', fontSize: 24 }}>
        Custom Font Test
      </Text>
      <View>
        <AntDesign name="home" size={40} />
      </View>
    </View>
  );
};

export default Home;
