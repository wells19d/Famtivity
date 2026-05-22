//* ChildTasks.tsx

import React from 'react';
import { useTaskManager } from '../utilities/tasks/taskManager';

import TaskSystem from './TaskSystem';

const ChildTasks = () => {
  const { childTasks } = useTaskManager();

  return <TaskSystem taskType={childTasks} />;
};

export default ChildTasks;
