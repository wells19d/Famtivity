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
