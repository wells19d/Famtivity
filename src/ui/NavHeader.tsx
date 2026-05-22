//* NavHeader.tsx

import React from 'react';
import { useState, useCallback } from 'react';
import { View, Text, Icons } from '.';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { NavParams } from '../navigation/types';
import { Pressable, StyleSheet } from 'react-native';

const NavHeader = () => {
  const navigation = useNavigation<NavigationProp<NavParams>>();

  const handleBack = () => {
    navigation.navigate('Landing');
  };

  return (
    <View style={styles.container}>
      <View row>
        <View flex ph15>
          <Pressable onPress={handleBack}>
            <View row centerH>
              <View>
                <Icons.Back />
              </View>
              <View>
                <Text size="medium">Back</Text>
              </View>
            </View>
          </Pressable>
        </View>
        <View flex></View>
      </View>
    </View>
  );
};

export default NavHeader;

const styles = StyleSheet.create({
  container: {},
});
