//* MyTasks.tsx

import React from 'react';
import { useTaskManager } from '../utilities/tasks/taskManager';

import TaskSystem from '../components/TaskSystem';

const MyTasks = () => {
  const { myTasks } = useTaskManager();

  return <TaskSystem taskType={myTasks} createMode="mine" />;
};

export default MyTasks;
