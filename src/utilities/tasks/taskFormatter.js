// taskFormatter.js

import { findName } from '../helpers';
import { dateTimeDisplay, dateDisplay } from '../dateTime';

export const formatTask = (task, profiles, currentProfile) => {
  const sortedAssignedTo = [...(task.assignedTo || [])].sort((a, b) => {
    if (a.profileID === currentProfile?.id) return -1;
    if (b.profileID === currentProfile?.id) return 1;
    return 0;
  });

  return {
    ...task,

    assignedTo: sortedAssignedTo.map(assigned => {
      const profile = profiles.find(p => p.id === assigned.profileID);

      return {
        ...assigned,
        profileName: findName(assigned.profileID, profiles),
        userColor: profile?.userSettings?.userColor,
      };
    }),

    createdByName: findName(task?.createdBy, profiles),
    dateCreated: dateTimeDisplay(task?.dateCreated),
    dueDateDisplay: dateDisplay(task?.dueDate),
    lastUpdated: dateTimeDisplay(task?.lastUpdated),
    lastUpdatedByName: findName(task?.lastUpdatedBy, profiles),
  };
};
