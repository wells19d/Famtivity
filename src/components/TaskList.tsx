//* TaskList.tsx

import React, { useCallback } from 'react';
import { View, Text, Icons } from '../ui';
import { dueTime, taskTime, listAssigned } from '../utilities/helpers';
import { FlashList } from '@shopify/flash-list';

type Props = {
  data: any[];
  renderType: 'today' | 'all';
  selectedDate: any;
};

const TaskList = (props: Props) => {
  const { data, renderType, selectedDate } = props;

  const showTitle = (task: any) => {
    return (
      <View row pb5>
        <View
          style={{ borderWidth: 2, borderColor: task.taskColor || '#000' }}
        ></View>
        <View flex pl5>
          <Text font="open-7">{task.title}</Text>
        </View>
      </View>
    );
  };

  const showDesc = (task: any) => {
    return (
      <View ml9>
        <Text font="open-5">{task.description}</Text>
      </View>
    );
  };

  const showDuration = (taskHours: number, taskMinutes: number) => {
    if (!taskHours && !taskMinutes) return <View mb10 />;
    return (
      <View row centerH ml10 mt10>
        <View>
          <Icons.Clock size={15} />
        </View>
        <View flex ml5>
          <Text font="open-5">{taskTime(taskHours, taskMinutes)}</Text>
        </View>
      </View>
    );
  };

  const showAssigned = (task: any) => {
    return (
      <View row centerH ml10 mt10>
        <View style={{ transform: [{ scaleX: -1 }] }}>
          <Icons.Tag
            size={15}
            color={task.assignedTo?.[0]?.familyColor || '#000'}
          />
        </View>
        <View flex ml5>
          <Text>{listAssigned(task)}</Text>
        </View>
      </View>
    );
  };

  const renderToday = useCallback(
    ({ item }: { item: any }) => {
      const task = item;
      return (
        <View
          border
          borderRadius={8}
          borderColor="#c4c4c4"
          ml15
          mr15
          mb10
          bg="#f3f3f3"
          p10
        >
          {showTitle(task)}
          {showDesc(task)}
          {showDuration(task.taskHours, task.taskMinutes)}
          {showAssigned(task)}
        </View>
      );
    },
    [selectedDate],
  );

  const renderAll = useCallback(({ item }: { item: any }) => {
    if (item.type === 'header') {
      const header = item;
      return (
        <View pb5 pl10 mt5>
          <Text>
            {header.title} - {header.subtitle}
          </Text>
        </View>
      );
    }

    const task = item.task;

    console.log('task', task);

    return (
      <View
        border
        borderRadius={8}
        borderColor="#c4c4c4"
        ml15
        mr15
        mb10
        bg="#f3f3f3"
        p10
      >
        {showTitle(task)}
        {showDesc(task)}
        {showDuration(task.taskHours, task.taskMinutes)}
        {showAssigned(task)}
      </View>
    );
  }, []);

  return (
    <FlashList
      data={data}
      renderItem={renderType === 'today' ? renderToday : renderAll}
      keyExtractor={(item, index) => `${item.id}-${index}`}
    />
  );
};

export default TaskList;
