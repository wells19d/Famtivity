//* PendingTasks.tsx

import React from 'react';
import { useTaskManager } from '../utilities/tasks/taskManager';

import TaskSystem from '../components/TaskSystem';

const PendingTasks = () => {
  const { pendingTasks } = useTaskManager();

  return (
    <TaskSystem
      taskType={pendingTasks}
      createMode="pending"
      screen="PendingTasks"
    />
  );
};

export default PendingTasks;
