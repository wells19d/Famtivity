//* ChildTasks.tsx

import React from 'react';
import { useTaskManager } from '../utilities/tasks/taskManager';

import TaskSystem from '../components/TaskSystem';

const ChildTasks = () => {
  const { childTasks } = useTaskManager();

  return <TaskSystem taskType={childTasks} createMode="child" />;
};

export default ChildTasks;
