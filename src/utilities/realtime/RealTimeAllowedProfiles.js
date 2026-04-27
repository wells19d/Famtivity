//* RealTimeAllowedProfiles.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  collection,
  query,
  where,
  onSnapshot,
  documentId,
} from '@react-native-firebase/firestore';
import { useFamily } from '../../hooks/useHooks';
import { firebaseDB } from '../../redux/firebaseDB';
import { sortProfiles } from '../helpers';

const useRealTimeAllowedProfiles = enabled => {
  const dispatch = useDispatch();
  const family = useFamily();
  const db = firebaseDB;

  useEffect(() => {
    if (!enabled || !family?.allowedProfiles?.length) {
      return;
    }

    const profilesQuery = query(
      collection(db, 'profiles'),
      where(documentId(), 'in', family.allowedProfiles),
    );

    const unsubscribe = onSnapshot(
      profilesQuery,
      querySnapshot => {
        const profiles = querySnapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        // Sort tool to sort by admin, adult (by dateCreated), then child (by dob)
        profiles.sort(sortProfiles);

        dispatch({ type: 'SET_ALLOWED_PROFILES', payload: profiles });
      },
      error => {
        dispatch({
          type: 'ALLOWED_PROFILES_FETCH_FAILED',
          payload: error.message,
        });
      },
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch, family?.allowedProfiles, db, enabled]);
};

export default useRealTimeAllowedProfiles;
