// taskRules.js

export const isMyTask = (task, profile) =>
  task.assignedTo?.some(t => t.profileID === profile.id && t.confirmed);

export const isFamilyTask = (task, profile) =>
  !task.assignedTo?.some(t => t.profileID === profile.id) &&
  task.assignedTo?.some(t => t.confirmed);

export const isPendingTask = (task, profile) =>
  task.assignedTo?.some(t => t.profileID === profile.id && !t.confirmed);

export const isUnclaimedTask = task => task.assignedTo?.length === 0;

export const isChildTask = (task, profiles) =>
  task.assignedTo?.some(
    assigned =>
      profiles?.find(p => p.id === assigned.profileID)?.familyRole ===
        'child' && assigned.confirmed,
  );

export const isArchivedTask = task => task.archived;

export const isCompletedTask = task => task.status === 'completed';
