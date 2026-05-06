// pendingTasks.js

import {
  useAllowedProfiles,
  useFamily,
  useProfile,
  useTasks,
} from '../../hooks/useHooks';
import { getVisibleTasks, findName } from '../helpers';

export const usePendingTasks = () => {
  const profile = useProfile();
  const family = useFamily();
  const profiles = useAllowedProfiles();
  const tasks = useTasks();
  const visibleTasks = getVisibleTasks(tasks, profile, family?.id);

  const pendingTasks = (visibleTasks || []).filter(task =>
    task.assignedTo?.some(t => t.profileID === profile.id && !t.confirmed),
  );

  return (pendingTasks || []).map(task => ({
    ...task,
    createdByName: findName(task?.createdBy, profiles),
    // dateCreated: formatted time, // TODO: use moment to change time stamp
    // lastUpdated: formatted time, // TODO: use moment to change time stamp
    lastUpdatedByName: findName(task?.lastUpdatedBy, profiles),
    assignedTo: (task.assignedTo || []).map(assigned => ({
      ...assigned,
      profileName: findName(assigned.profileID, profiles),
    })),
  }));
};
