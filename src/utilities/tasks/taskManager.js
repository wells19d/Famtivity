// taskManager.js

import moment from 'moment';
import {
  useAllowedProfiles,
  useFamily,
  useProfile,
  useTasks,
} from '../../hooks/useHooks';

import { getVisibleTasks } from '../helpers';

import { formatTask } from './taskFormatter';

import {
  isMyTask,
  isFamilyTask,
  isPendingTask,
  isUnclaimedTask,
  isChildTask,
  isArchivedTask,
  isCompletedTask,
} from './taskRules';

export const useTaskManager = () => {
  const profile = useProfile();
  const family = useFamily();
  const profiles = useAllowedProfiles();
  const tasks = useTasks();

  const priorityRank = {
    high: 1,
    medium: 2,
    low: 3,
  };

  const sortBy = (a, b) => {
    const aDate = moment(a.dueDate, ['MM-DD-YYYY', moment.ISO_8601]).startOf(
      'day',
    );
    const bDate = moment(b.dueDate, ['MM-DD-YYYY', moment.ISO_8601]).startOf(
      'day',
    );

    if (aDate.valueOf() !== bDate.valueOf()) {
      return aDate.valueOf() - bDate.valueOf();
    }

    return (priorityRank[a.priority] || 99) - (priorityRank[b.priority] || 99);
  };

  const visibleTasks = getVisibleTasks(tasks, profile, family?.id);

  const myTasks = (visibleTasks || [])
    .filter(task => isMyTask(task, profile))
    .sort(sortBy)
    .map(task => formatTask(task, profiles, profile));

  const familyTasks = (visibleTasks || [])
    .filter(task => isFamilyTask(task, profile))
    .sort(sortBy)
    .map(task => formatTask(task, profiles, profile));

  const pendingTasks = (visibleTasks || [])
    .filter(task => isPendingTask(task, profile))
    .sort(sortBy)
    .map(task => formatTask(task, profiles, profile));

  const unclaimedTasks = (visibleTasks || [])
    .filter(isUnclaimedTask)
    .sort(sortBy)
    .map(task => formatTask(task, profiles, profile));

  const childTasks = (visibleTasks || [])
    .filter(task => isChildTask(task, profiles))
    .sort(sortBy)
    .map(task => formatTask(task, profiles, profile));

  const archivedTasks = (visibleTasks || [])
    .filter(isArchivedTask)
    .sort(sortBy)
    .map(task => formatTask(task, profiles, profile));

  const completedTasks = (visibleTasks || [])
    .filter(isCompletedTask)
    .sort(sortBy)
    .map(task => formatTask(task, profiles, profile));

  return {
    myTasks,
    familyTasks,
    pendingTasks,
    unclaimedTasks,
    childTasks,

    historyTasks: {
      archived: archivedTasks,
      completed: completedTasks,
    },
  };
};
