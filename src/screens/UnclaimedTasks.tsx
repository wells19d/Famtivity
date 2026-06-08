//* UnclaimedTasks.tsx

import React from 'react';
import { useTaskManager } from '../utilities/tasks/taskManager';

import TaskSystem from '../components/TaskSystem';

const UnclaimedTasks = () => {
  const { unclaimedTasks } = useTaskManager();

  return (
    <TaskSystem
      taskType={unclaimedTasks}
      createMode="unclaimed"
      screen="UnclaimedTasks"
      title="Unclaimed"
    />
  );
};

export default UnclaimedTasks;
