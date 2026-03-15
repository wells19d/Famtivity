//* useHooks.tsx
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/reducers/_root.reducer';

export const useDeviceInfo = () => {
  return useSelector((state: RootState) => state.deviceInfo?.deviceInfo);
};
