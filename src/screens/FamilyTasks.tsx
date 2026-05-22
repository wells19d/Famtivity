//* FamilyTasks.tsx

import React from 'react';
import { useTaskManager } from '../utilities/tasks/taskManager';

import TaskSystem from '../components/TaskSystem';

const FamilyTasks = () => {
  const { familyTasks } = useTaskManager();

  return <TaskSystem taskType={familyTasks} />;
};

export default FamilyTasks;
