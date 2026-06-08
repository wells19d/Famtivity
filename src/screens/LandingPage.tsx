//* LandingPage.tsx

import React from 'react';
import { Icons, Text, View } from '../ui';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { NavParams } from '../navigation/types';
import { useColors } from '../ui/UIUtilities';
import { useProfile } from '../hooks/useHooks';
import moment from 'moment';
import { useTaskManager } from '../utilities/tasks/taskManager';

const LandingPage = () => {
  const navigation = useNavigation<NavigationProp<NavParams>>();
  const profile = useProfile();
  const { myTasks, pendingTasks } = useTaskManager();

  const handlePress = (navigate: keyof NavParams) => () => {
    // console.log(`Navigating to ${navigate}`);
    navigation.navigate(navigate);
  };

  const renderDueToday = (tasks: any[]) => {
    const dueToday = tasks.filter((task: any) => {
      const today = moment().startOf('day');
      const taskDueDate = moment(task.dueDate).startOf('day');
      return taskDueDate.isSame(today);
    });

    if (dueToday.length === 0) return 'no tasks';
    if (dueToday.length === 1) return '1 task';
    if (dueToday.length > 1) return `${dueToday.length} tasks`;
  };

  type TaskCardProps = {
    title: string;
    children?: React.ReactNode;
    small?: boolean;
    medium?: boolean;
    large?: boolean;
    white?: boolean;
    blue?: boolean;
    left?: boolean;
    bottom?: boolean;
    top?: number;
    height?: number;
    bgColor?: string;
    wrapper?: 'left' | 'bottom';
  };

  const TaskCard: React.FC<TaskCardProps> = ({
    title,
    children,
    small,
    medium,
    large,
    white,
    blue,
    bottom,
    top = 5,
    height,
    bgColor,
    wrapper,
  }) => {
    const resHeight =
      height ?? (large ? 150 : medium ? 112.5 : small ? 75 : 75);

    const resBgColor =
      bgColor ?? (blue ? 'primary10' : white ? 'light05' : 'light05');

    const resWrapper = wrapper ?? (bottom ? 'bottom' : 'left');

    return (
      <View style={styles.taskContainer(top)}>
        <View style={styles.taskHeader}>
          <Text>{title}</Text>
        </View>
        <View style={styles.wrapper(resWrapper)}>
          <View style={styles.card(resHeight, resBgColor)}>{children}</View>
        </View>
      </View>
    );
  };

  return (
    <View flex ph10>
      <View row>
        <View p5>
          <View style={styles.avatar} centerVH>
            <Icons.Account size={35} color="#000" />
          </View>
        </View>
        <View flex centerV ph5>
          <Text size="medium" font="open-8">
            Hello, {profile?.firstName}
          </Text>
          <Text size="small" font="open-5">
            You have {renderDueToday(myTasks)} due today
          </Text>
        </View>
        <View p5 centerV>
          <View style={styles.alert} centerVH>
            <Icons.Bell size={22.5} color="#000" />
          </View>
        </View>
      </View>
      <TaskCard title="My Tasks" large blue bottom top={20}>
        <Text>Test</Text>
      </TaskCard>
      <TaskCard title="Family Tasks"></TaskCard>
      <TaskCard title="Child Tasks"></TaskCard>
      <TaskCard title="Pending Tasks"></TaskCard>
      <TaskCard title="Unclaimed Tasks"></TaskCard>
    </View>
  );
};

const styles = {
  avatar: {
    backgroundColor: '#f3f3f3',
    borderWidth: 1,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: useColors('dark30'),
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  alert: {
    backgroundColor: '#f3f3f3',
    borderWidth: 1,
    width: 45,
    height: 45,
    borderRadius: 30,
    borderColor: useColors('gray40'),
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  wrapper: (side: 'left' | 'bottom') => ({
    paddingBottom: side === 'bottom' ? 5 : 0,
    paddingLeft: side === 'left' ? 5 : 0,
    borderWidth: 0.25,
    borderRadius: 6,
    borderColor: useColors('gray20'),
    backgroundColor: useColors('info'),
  }),
  taskContainer: (marginTop?: number) => ({
    marginTop: marginTop || 0,
    padding: 5,
  }),
  taskHeader: {
    marginHorizontal: 10,
    marginBottom: 5,
  },
  card: (height: number, bgColor: string) => ({
    padding: 5,
    borderColor: useColors('gray20'),
    borderRadius: 5,
    height: height,
    backgroundColor: useColors(bgColor || 'info20'),
    shadowColor: useColors('dark30'),
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  }),
};

export default LandingPage;
