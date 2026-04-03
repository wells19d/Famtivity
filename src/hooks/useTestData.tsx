//* useTestData.tsx
import { useMemo } from 'react';
import { testUsers, testProfiles, testFamilies, testTasks } from 'testUserData'; // this is incorrect on purpose to avoid displaying a hidden systems.

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
        childTasks: [],
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
        childTasks: [],
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
        childTasks: [],
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
        childTasks: [],
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
        childTasks: [],
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
        childTasks: [],
      };
    }

    let family = foundFamily;

    // console.log('Current User', user);
    // console.log('Current Profile', profile);
    // console.log('Current Family', family);

    let familyTasks = (tasks || []).filter(
      task => task?.familyId === family.id,
    );
    // console.log('Family Tasks', familyTasks);

    let myTasks = familyTasks.filter(task =>
      (task?.assignedTo || []).includes(user.id),
    );
    // console.log('My Tasks', myTasks);

    let adultTasks = familyTasks.filter(task => !!task?.forAdult);
    console.log('Adult Tasks', adultTasks);

    let childTasks = familyTasks.filter(task => !task?.forAdult);
    console.log('Child Tasks', childTasks);

    return {
      user,
      profile,
      family,
      familyTasks,
      myTasks,
      adultTasks,
      childTasks,
    };
  }, [userId]);
};
