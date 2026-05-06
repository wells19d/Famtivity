// childTasks.js

import {
  useAllowedProfiles,
  useFamily,
  useProfile,
  useTasks,
} from '../../hooks/useHooks';
import { getVisibleTasks, findName } from '../helpers';

export const useChildTasks = () => {
  const profile = useProfile();
  const family = useFamily();
  const profiles = useAllowedProfiles();
  const tasks = useTasks();
  const visibleTasks = getVisibleTasks(tasks, profile, family?.id);

  const childTasks = (visibleTasks || []).filter(task =>
    task.assignedTo?.some(
      assigned =>
        profiles?.find(p => p.id === assigned.profileID)?.familyRole ===
          'child' && assigned.confirmed,
    ),
  );

  return (childTasks || []).map(task => ({
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
