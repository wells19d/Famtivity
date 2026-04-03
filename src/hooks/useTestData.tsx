//* useTestData.tsx
import { useMemo } from 'react';
import {
  testUsers,
  testProfiles,
  testFamilies,
  testTasks,
} from './testUserData';

export const useTestData = (userId: string, password: string) => {
  return useMemo(() => {
    let users = testUsers;
    let profiles = testProfiles;
    let families = testFamilies;
    let tasks = testTasks;

    // console.log('All Users', users);

    // 1. Find user
    let user = users?.find(foundUser => foundUser?.id === userId);
    if (!user) {
      console.warn('No user found');
      return {
        user: null,
        profile: null,
        family: null,
        familyTasks: [],
        myTasks: [],
        adultTasks: [],
        openTasks: [],
      };
    }

    // 2. Check password
    if (user.passwordHash !== password) {
      console.warn('Incorrect password');
      return {
        user: null,
        profile: null,
        family: null,
        familyTasks: [],
        myTasks: [],
        adultTasks: [],
        openTasks: [],
      };
    }

    let profile = profiles?.find(foundProfile => foundProfile?.id === user.id);
    if (!profile) {
      console.warn('No profile found for user');
      return {
        user,
        profile: null,
        family: null,
        familyTasks: [],
        myTasks: [],
        adultTasks: [],
        openTasks: [],
      };
    }

    if (!profile.familyId) {
      console.warn('User is not yet assigned to a family');
      return {
        user,
        profile,
        family: null,
        familyTasks: [],
        myTasks: [],
        adultTasks: [],
        openTasks: [],
      };
    }

    let foundFamily = families?.find(found => found?.id === profile.familyId);

    if (!foundFamily) {
      console.warn('No family account found');
      return {
        user,
        profile,
        family: null,
        familyTasks: [],
        myTasks: [],
        adultTasks: [],
        openTasks: [],
      };
    }

    if (!(foundFamily.allowedUsers || []).includes(user.id)) {
      console.warn('User is not authorized for this family');
      return {
        user,
        profile,
        family: null,
        familyTasks: [],
        myTasks: [],
        adultTasks: [],
        openTasks: [],
      };
    }

    let family = foundFamily;

    // console.log('Current User', user);
    // console.log('Current Profile', profile);
    // console.log('Current Family', family);

    let allFamilyTasks = (tasks || []).filter(
      task => task?.familyId === family.id,
    );

    // console.log('All Family Tasks', allFamilyTasks);

    let familyTasks = allFamilyTasks.filter(task => {
      const isPrivate = !!task?.private;
      const isAdultTask = task?.adultOnly === true;
      const isAssignedToUser = (task?.assignedTo || []).includes(user.id);
      const isViewerAdult =
        profile.familyRole === 'admin' || profile.familyRole === 'adult';
      const isViewerChild = profile.familyRole === 'child';

      if (!isPrivate) {
        return true;
      }

      if (isAdultTask) {
        return isViewerAdult && isAssignedToUser;
      }

      if (!isAdultTask) {
        return isViewerAdult || (isViewerChild && isAssignedToUser);
      }

      return false;
    });

    // console.log('Family Tasks', familyTasks);

    let myTasks = allFamilyTasks.filter(task => {
      const isAssignedToUser = (task?.assignedTo || []).includes(user.id);
      const isPrivate = !!task?.private;
      const isAdultTask = task?.adultOnly === true;
      const isViewerAdult =
        profile.familyRole === 'admin' || profile.familyRole === 'adult';

      if (!isAssignedToUser) {
        return false;
      }

      if (!isPrivate) {
        return true;
      }

      if (isAdultTask) {
        return isViewerAdult;
      }

      return true;
    });

    // console.log('My Tasks', myTasks);

    let adultTasks = allFamilyTasks.filter(task => {
      const isAdultTask = task?.adultOnly === true;
      const isPrivate = !!task?.private;
      const isAssignedToUser = (task?.assignedTo || []).includes(user.id);
      const isViewerAdult =
        profile.familyRole === 'admin' || profile.familyRole === 'adult';

      if (!isAdultTask) {
        return false;
      }

      if (isPrivate) {
        return isViewerAdult && isAssignedToUser;
      }

      return true;
    });

    // console.log('Adult Tasks', adultTasks);

    let openTasks = allFamilyTasks.filter(task => {
      const isAdultTask = task?.adultOnly === true;
      const isPrivate = !!task?.private;
      const isAssignedToUser = (task?.assignedTo || []).includes(user.id);
      const isViewerAdult =
        profile.familyRole === 'admin' || profile.familyRole === 'adult';
      const isViewerChild = profile.familyRole === 'child';

      if (isAdultTask) {
        return false;
      }

      if (isPrivate) {
        return isViewerAdult || (isViewerChild && isAssignedToUser);
      }

      return true;
    });

    // console.log('Open Tasks', openTasks);

    return {
      user,
      profile,
      family,
      familyTasks,
      myTasks,
      adultTasks,
      openTasks,
    };
  }, [userId, password]);
};
