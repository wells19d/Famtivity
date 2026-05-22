// helpers.js

import moment from 'moment';
import { Text, View } from '../ui';

// This is used in RTAllowedProfiles to sort profiles by role and then by date (for adults) or dob (for children)
export const sortProfiles = (a, b) => {
  const roleOrder = { admin: 0, adult: 1, child: 2 };

  const aRole = roleOrder[a.familyRole] ?? 99;
  const bRole = roleOrder[b.familyRole] ?? 99;

  if (aRole !== bRole) return aRole - bRole;

  if (a.familyRole === 'adult') {
    return new Date(a.dateCreated) - new Date(b.dateCreated);
  }

  if (a.familyRole === 'child') {
    return new Date(a.dob) - new Date(b.dob);
  }

  return 0;
};

// Task Permissions
export const canUpdateTask = (task, profile, familyID) => {
  if (!task || !profile) return false;

  // Hard stop
  if (task.archived) return false;

  const isOwner = task.createdBy === profile.id;

  const assignedUser = task.assignedTo?.find(
    user => user.profileID === profile.id,
  );

  const isAssigned = !!assignedUser;
  const isConfirmed = assignedUser?.confirmed === true;

  const isChild = profile.familyRole === 'child';
  const isAdult =
    profile.familyRole === 'adult' || profile.familyRole === 'admin';

  return (
    task.familyId === familyID &&
    (!task.adultOnly || isAdult) &&
    (!task.private || isOwner || isAssigned) &&
    (!task.taskLocked || isOwner) &&
    (!isChild || (isAssigned && isConfirmed))
  );
};

export const canArchiveTask = (task, profile, familyID) => {
  if (!task || !profile) return false;

  const isOwner = task.createdBy === profile.id;

  const assignedUser = task.assignedTo?.find(
    user => user.profileID === profile.id,
  );

  const isAssigned = !!assignedUser;
  const isConfirmed = assignedUser?.confirmed === true;

  const isChild = profile.familyRole === 'child';
  const isAdult =
    profile.familyRole === 'adult' || profile.familyRole === 'admin';

  return (
    task.familyId === familyID &&
    (!task.adultOnly || isAdult) &&
    (!task.private || isOwner || isAssigned) &&
    (!task.taskLocked || isOwner) &&
    (!isChild || (isAssigned && isConfirmed))
  );
};

export const canDeleteTask = (task, profile, familyID) => {
  if (!task || !profile) return false;

  const isAdmin = profile.familyRole === 'admin';

  return task.familyId === familyID && isAdmin;
};

export const canOverrideTask = (task, profile, familyID) => {
  if (!task || !profile) return false;

  // Hard stop
  if (task.archived) return false;

  const isAdult =
    profile.familyRole === 'adult' || profile.familyRole === 'admin';

  return task.familyId === familyID && isAdult;
};

// checks a singular task against the task visibility rules
export const canViewTask = (task, profile, familyID) => {
  if (!task || !profile) return false;

  const isOwner = task.createdBy === profile.id;

  const assignedUser = task.assignedTo?.find(
    user => user.profileID === profile.id,
  );

  const isAssigned = !!assignedUser;

  const isBlocked = task.blockedView?.includes(profile.id);

  const isAdult =
    profile.familyRole === 'adult' || profile.familyRole === 'admin';

  if (task.archived) {
    return task.familyId === familyID && (isOwner || isAssigned);
  }

  return (
    task.familyId === familyID &&
    !isBlocked &&
    (!task.adultOnly || isAdult) &&
    (!task.private || isOwner || isAssigned)
  );
};

export const findName = (id, profiles) => {
  if (!id || !profiles?.length) return 'Unknown';

  const foundProfile = profiles.find(p => p.id === id);

  return foundProfile
    ? `${foundProfile.firstName} ${foundProfile.lastName}`
    : 'Unknown';
};

// builds a list of tasks based on visibility rules
export const getVisibleTasks = (tasks, profile, familyID) => {
  return (tasks || []).filter(task => canViewTask(task, profile, familyID));
};

// Formats hourly tasks for the calendar timeline view.
// Only tasks with start and end times and allDay === false are included.
// Multi-day tasks are automatically split into separate timeline segments per day.
// All-day tasks are ignored here and should be handled separately in an All Day Events section.
export const hourlyEventTaskFormat = tasks => {
  return (tasks || []).reduce((acc, task) => {
    if (!task.startTime || !task.endTime) return acc;

    const start = moment(task.startTime, 'YYYY-MM-DD HH:mm:ss');
    const end = moment(task.endTime, 'YYYY-MM-DD HH:mm:ss');

    if (!start.isValid() || !end.isValid()) return acc;

    let currentDay = start.clone().startOf('day');
    const endDay = end.clone().startOf('day');

    while (currentDay.isSameOrBefore(endDay, 'day')) {
      const dateKey = currentDay.format('YYYY-MM-DD');

      const segmentStart = currentDay.isSame(start, 'day')
        ? start
        : currentDay.clone().startOf('day');

      const segmentEnd = currentDay.isSame(end, 'day')
        ? end
        : currentDay.clone().endOf('day');

      if (!acc[dateKey]) acc[dateKey] = [];

      acc[dateKey].push({
        id: `${task.id}-${dateKey}`,
        originalTaskId: task.id,
        title: task.title,
        summary: task.description,
        start: segmentStart.format('YYYY-MM-DD HH:mm:ss'),
        end: segmentEnd.format('YYYY-MM-DD HH:mm:ss'),
        color: task.taskColor || 'lightblue',
      });

      currentDay.add(1, 'day');
    }

    return acc;
  }, {});
};

export const todayEventTaskFormat = (tasks, selectedDate) => {
  const list = [];

  (tasks || []).forEach(task => {
    const hasStartEnd = task.startTime && task.endTime;

    const start = hasStartEnd
      ? moment(task.startTime, 'YYYY-MM-DD HH:mm:ss')
      : moment(task.dueDate);

    const end = hasStartEnd
      ? moment(task.endTime, 'YYYY-MM-DD HH:mm:ss')
      : start.clone();

    if (!start.isValid() || !end.isValid()) return;

    let currentDay = start.clone().startOf('day');
    const endDay = end.clone().startOf('day');

    while (
      currentDay.isSame(endDay, 'day') ||
      currentDay.isBefore(endDay, 'day')
    ) {
      const dateKey = currentDay.format('YYYY-MM-DD');

      const segmentStart = currentDay.isSame(start, 'day')
        ? start
        : currentDay.clone().startOf('day');

      const segmentEnd = currentDay.isSame(end, 'day')
        ? end
        : currentDay.clone().add(1, 'day').startOf('day');

      const durationMinutes = hasStartEnd
        ? segmentEnd.diff(segmentStart, 'minutes')
        : null;

      const durationHours = durationMinutes
        ? Math.floor(durationMinutes / 60)
        : null;

      const remainingMinutes = durationMinutes ? durationMinutes % 60 : null;

      list.push({
        ...task,

        id: `${task.id}-${dateKey}`,
        originalTaskId: task.id,
        displayDate: dateKey,

        segmentStart: hasStartEnd
          ? segmentStart.format('YYYY-MM-DD HH:mm:ss')
          : null,

        segmentEnd: hasStartEnd
          ? segmentEnd.format('YYYY-MM-DD HH:mm:ss')
          : null,

        taskHours: durationHours,
        taskMinutes: remainingMinutes,
      });

      currentDay.add(1, 'day');
    }
  });

  return list
    .filter(item => item.displayDate === selectedDate)
    .sort((a, b) => {
      const aDate = moment(a.segmentStart || a.endTime || a.dueDate);
      const bDate = moment(b.segmentStart || b.endTime || b.dueDate);

      return aDate.valueOf() - bDate.valueOf();
    });
};

export const allEventsTaskFormat = tasks => {
  const list = [];

  (tasks || []).forEach(task => {
    const due = moment(task.endTime || task.dueDate);

    if (!due.isValid()) return;

    const dateKey = due.format('YYYY-MM-DD');

    const hasStartEnd = task.startTime && task.endTime;

    let taskHours = 0;
    let taskMinutes = 0;

    if (hasStartEnd) {
      const start = moment(task.startTime, 'YYYY-MM-DD HH:mm:ss');
      const end = moment(task.endTime, 'YYYY-MM-DD HH:mm:ss');

      if (start.isValid() && end.isValid()) {
        const totalMinutes = end.diff(start, 'minutes');
        taskHours = Math.floor(totalMinutes / 60);
        taskMinutes = totalMinutes % 60;
      }
    }

    list.push({
      ...task,
      id: task.id,
      originalTaskId: task.id,
      displayDate: dateKey,
      taskHours,
      taskMinutes,
    });
  });

  const sortedList = list.sort((a, b) => {
    const aDate = moment(a.endTime || a.dueDate);
    const bDate = moment(b.endTime || b.dueDate);

    return aDate.valueOf() - bDate.valueOf();
  });

  const rows = [];
  let currentDate = null;

  sortedList.forEach(task => {
    if (task.displayDate !== currentDate) {
      currentDate = task.displayDate;

      rows.push({
        type: 'header',
        id: `header-${currentDate}`,
        displayDate: currentDate,
        title: moment(currentDate).format('dddd'),
        subtitle: moment(currentDate).format('MMMM D, YYYY'),
      });
    }

    rows.push({
      type: 'task',
      id: task.id,
      task,
    });
  });

  return rows;
};

export const taskTime = (hours, minutes) => {
  if (hours === 0 && minutes === 0) return null;
  return `Duration: ${hours > 0 ? (hours === 1 ? '1hr ' : `${hours}hrs `) : ''}${minutes > 0 ? (minutes === 1 ? '1 min' : `${minutes} mins`) : ''}`;
};

export const dueTime = (endTime, selectedDate) => {
  const end = moment(endTime);
  const selected = moment(selectedDate, 'YYYY-MM-DD');

  return end.isSame(selected, 'day')
    ? `Due: ${end.format('h:mm a')}`
    : `Due: ${end.format('dddd, MMMM Do YYYY @ h:mm a')}`;
};

export const listAssigned = task => {
  if (!task.assignedTo?.length) return null;

  const names = task.assignedTo
    .map(person => person.profileName)
    .filter(Boolean);

  if (!names.length) return null;

  return names.join(', ');
};
