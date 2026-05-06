// coreInfo.js
import {
  useAllowedProfiles,
  useFamily,
  useProfile,
  useUser,
} from '../hooks/useHooks';
import { findName } from './helpers';

export const useCoreInfo = () => {
  const user = useUser();
  const profile = useProfile();
  const family = useFamily();
  const profiles = useAllowedProfiles();

  return {
    // user
    user: { id: user?.uid, email: user?.email },

    // profile
    profile: { ...profile },

    // family
    family: {
      ...family,
      createdByName: findName(family?.createdBy, profiles),
      lastUpdatedByName: findName(family?.lastUpdatedBy, profiles),
    },
  };
};
