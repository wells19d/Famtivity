// taskFormatter.js

import { findName } from '../helpers';
import { dateTimeDisplay, dateDisplay } from '../dateTime';

export const formatTask = (task, profiles) => ({
  ...task,

  assignedTo: (task.assignedTo || []).map(assigned => ({
    ...assigned,
    profileName: findName(assigned.profileID, profiles),
  })),

  createdByName: findName(task?.createdBy, profiles),
  dateCreated: dateTimeDisplay(task?.dateCreated),
  dueDateDisplay: dateDisplay(task?.dueDate),
  lastUpdated: dateTimeDisplay(task?.lastUpdated),
  lastUpdatedByName: findName(task?.lastUpdatedBy, profiles),
});
