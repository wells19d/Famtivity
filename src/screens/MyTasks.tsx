//* MyTasks.tsx

import React from 'react';
import { useTaskManager } from '../utilities/tasks/taskManager';

import TaskSystem from './TaskSystem';

const MyTasks = () => {
  const { myTasks } = useTaskManager();

  return <TaskSystem taskType={myTasks} />;
};

export default MyTasks;
