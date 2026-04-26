//* RealTimeUsers.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { buildUser } from '../../redux/buildUser';
import { getApp } from '@react-native-firebase/app';

const app = getApp();
const auth = getAuth(app);

const useRealTimeUsers = enabled => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!enabled) return;

    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        dispatch({ type: 'SET_USER', payload: buildUser(currentUser) });
      } else {
        dispatch({ type: 'UNSET_USER' });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, enabled]);
};

export default useRealTimeUsers;
