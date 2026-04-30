// helpers.js

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

export const canViewTask = (task, profile, familyID) => {
  if (!task || !profile) return false;

  const isOwner = task.createdBy === profile.id;

  const assignedUser = task.assignedTo?.find(
    user => user.profileID === profile.id,
  );

  const isAssigned = !!assignedUser;

  const isAdult =
    profile.familyRole === 'adult' || profile.familyRole === 'admin';

  if (task.archived) {
    return task.familyId === familyID && (isOwner || isAssigned);
  }

  return (
    task.familyId === familyID &&
    (!task.adultOnly || isAdult) &&
    (!task.private || isOwner || isAssigned)
  );
};
