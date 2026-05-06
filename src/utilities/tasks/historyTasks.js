// historyTasks.js

import {
  useAllowedProfiles,
  useFamily,
  useProfile,
  useTasks,
} from '../../hooks/useHooks';
import { getVisibleTasks, findName } from '../helpers';

export const useHistoryTasks = () => {
  const profile = useProfile();
  const family = useFamily();
  const profiles = useAllowedProfiles();
  const tasks = useTasks();
  const visibleTasks = getVisibleTasks(tasks, profile, family?.id);

  const archivedTasks = (visibleTasks || []).filter(task => task.archived);
  const completedTasks = (visibleTasks || []).filter(
    task => task.status === 'completed',
  );

  return {
    archived: (archivedTasks || []).map(task => ({
      ...task,
      createdByName: findName(task?.createdBy, profiles),
      // dateCreated: formatted time, // TODO: use moment to change time stamp
      // lastUpdated: formatted time, // TODO: use moment to change time stamp
      lastUpdatedByName: findName(task?.lastUpdatedBy, profiles),
      assignedTo: (task.assignedTo || []).map(assigned => ({
        ...assigned,
        profileName: findName(assigned.profileID, profiles),
      })),
    })),

    completed: (completedTasks || []).map(task => ({
      ...task,
      createdByName: findName(task?.createdBy, profiles),
      // dateCreated: formatted time, // TODO: use moment to change time stamp
      // lastUpdated: formatted time, // TODO: use moment to change time stamp
      lastUpdatedByName: findName(task?.lastUpdatedBy, profiles),
      assignedTo: (task.assignedTo || []).map(assigned => ({
        ...assigned,
        profileName: findName(assigned.profileID, profiles),
      })),
    })),
  };
};
