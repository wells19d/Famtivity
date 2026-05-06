// familyTasks.js

import {
  useAllowedProfiles,
  useFamily,
  useProfile,
  useTasks,
} from '../../hooks/useHooks';
import { getVisibleTasks, findName } from '../helpers';

export const useFamilyTasks = () => {
  const profile = useProfile();
  const family = useFamily();
  const profiles = useAllowedProfiles();
  const tasks = useTasks();
  const visibleTasks = getVisibleTasks(tasks, profile, family?.id);

  const familyTasks = (visibleTasks || []).filter(
    task =>
      !task.assignedTo?.some(t => t.profileID === profile.id) &&
      task.assignedTo?.some(t => t.confirmed),
  );

  return (familyTasks || []).map(task => ({
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
