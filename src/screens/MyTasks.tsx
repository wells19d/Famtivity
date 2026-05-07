//* MyTasks.tsx

import React, { useCallback } from 'react';
import { Icons, ScrollView, Text, View } from '../ui';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Button } from 'react-native';
import { NavParams } from '../navigation/types';
import { useTaskManager } from '../utilities/tasks/taskManager';
import { FlashList } from '@shopify/flash-list';
import { useColors } from '../ui/UIUtilities';
import { taskSections } from '../utilities/taskSections';

const MyTasks = () => {
  const navigation = useNavigation<NavigationProp<NavParams>>();
  const { myTasks, familyTasks } = useTaskManager();
  console.log('myTasks in MyTasks', myTasks);
  console.log('familyTasks in MyTasks', familyTasks);

  const handlePress = () => {
    console.log('Navigating to Landing');
    navigation.navigate('Landing');
  };

  const renderItem = useCallback(({ item }: { item: any }) => {
    if (item.type === 'header') {
      return (
        <View pt15 pb5 row>
          <View flex centerV mh10>
            <View border borderColor="#ccc" borderWidth={0.75}></View>
          </View>
          <View centerVH row>
            <View>
              <Text size="xSmall">{item.title}</Text>
            </View>
            <View centerVH m5>
              <Text>-</Text>
            </View>
            <View>
              <Text size="xSmall">{item.subtitle}</Text>
            </View>
          </View>
          <View flex centerV mh10>
            <View border borderColor="#ccc" borderWidth={0.75}></View>
          </View>
        </View>
      );
    }

    const task = item.task;

    const renderIcons = () => {
      const icons = [];
      if (task?.priority === 'high') {
        icons.push(
          <View key="high" zIndex={1} style={styles.taskIcon(task)} centerVH>
            <Icons.Status size={20} color={useColors('danger70')} />
          </View>,
        );
      } else if (task?.priority === 'medium') {
        icons.push(
          <View key="medium" zIndex={1} style={styles.taskIcon(task)} centerVH>
            <Icons.Status size={20} color={useColors('warning')} />
          </View>,
        );
      } else {
        icons.push(
          <View key="low" zIndex={1} style={styles.taskIcon(task)} centerVH>
            <Icons.Status size={20} color={useColors('success90')} />
          </View>,
        );
      }
      if (task?.taskLocked) {
        icons.push(
          <View key="locked" zIndex={1} style={styles.taskLock} centerVH>
            <Icons.AdminEdit size={25} />
          </View>,
        );
      }
      if (task?.private) {
        icons.push(
          <View key="private" zIndex={1} style={styles.taskPrivate} centerVH>
            <Icons.UserLock size={25} />
          </View>,
        );
      }
      return icons;
    };

    return (
      <View row pt10>
        <View flex style={styles.taskCell}>
          <Text>{task.title}</Text>
          <Text numberOfLines={1}>{task.description}</Text>
          <Text>{task.dueDateDisplay}</Text>
        </View>
        {renderIcons()}
      </View>
    );
  }, []);

  return (
    <View flex backgroundColor="#f3f3f3" ph10 pt15>
      <FlashList
        data={taskSections(familyTasks)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        // estimatedItemSize={70}
      />
    </View>
  );
};

export default MyTasks;

const styles = {
  taskIcon: (item: any) => ({
    position: 'absolute' as const,
    top: 1,
    left: 2,
    width: 25,
    height: 25,
    borderWidth: 1.5,
    borderColor: '#f3f3f3' as const,
    backgroundColor: '#f3f3f3' as const,
    color:
      item?.priority === 'high'
        ? useColors('danger70')
        : item?.priority === 'medium'
          ? useColors('warning')
          : useColors('success90'),
  }),
  taskCell: {
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#ccc' as const,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  taskLock: {
    position: 'absolute' as const,
    top: 1,
    right: -2,
    width: 30,
    height: 30,
    backgroundColor: '#f3f3f3' as const,
    borderWidth: 2.5,
    borderColor: '#f3f3f3' as const,
  },
  taskPrivate: {
    position: 'absolute' as const,
    top: -4,
    right: 4,
    width: 30,
    height: 30,
    backgroundColor: '#f3f3f3' as const,
    borderWidth: 2.5,
    borderColor: '#f3f3f3' as const,
  },
};

// <View flex centerVH>
//   <Text size="medium" color="blue">
//     My Tasks
//   </Text>
//   <Button title="Back to Landing" onPress={handlePress} />
// </View>
