//* useHooks.tsx
import { useSelector } from 'react-redux';

export const useDeviceInfo = () => {
  return useSelector(state => state.deviceInfo?.deviceInfo);
};

export const useAuth = () => {
  return useSelector(state => state.user?.isAuthenticated);
};

export const useUser = () => {
  return useSelector(state => state.user?.data);
};

export const useLoginError = () => {
  return useSelector(state => state.user?.error);
};

export const useProfile = () => {
  return useSelector(state => state.profile?.profile);
};

export const useProfileError = () => {
  return useSelector(state => state.profile?.error);
};

export const useFamily = () => {
  return useSelector(state => state.family?.family);
};

export const useFamilyError = () => {
  return useSelector(state => state.family?.error);
};

export const useAllowedProfiles = () => {
  return useSelector(state => state.family?.allowedProfiles);
};

export const useTasks = () => {
  return useSelector(state => state.task?.tasks);
};

export const useTasksError = () => {
  return useSelector(state => state.task?.error);
};
