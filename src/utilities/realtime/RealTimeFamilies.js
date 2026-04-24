//* RealTimeFamilies.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  getFirestore,
  doc,
  onSnapshot,
} from '@react-native-firebase/firestore';
import { useProfile } from '../../hooks/useHooks';

const useRealTimeFamilies = enabled => {
  const dispatch = useDispatch();
  const profile = useProfile();
  const db = getFirestore();

  useEffect(() => {
    if (!enabled || !profile?.familyId) {
      return;
    }

    const familyRef = doc(db, 'families', profile?.familyId);

    const unsubscribe = onSnapshot(
      familyRef,
      snapshot => {
        if (snapshot.exists) {
          const familyData = snapshot.data();
          const family = {
            ...familyData,
            lastUpdated:
              familyData?.lastUpdated?.toDate?.().toISOString() ?? null,
            dateCreated:
              familyData?.dateCreated?.toDate?.().toISOString() ?? null,
          };
          dispatch({ type: 'SET_FAMILY', payload: family });
        } else {
          dispatch({ type: 'SET_FAMILY', payload: null });
        }
      },
      error => {
        dispatch({ type: 'FAMILY_FETCH_FAILED', payload: error.message });
      },
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch, profile?.familyId, db, enabled]); // ✅ Removed `storedFamily`
};

export default useRealTimeFamilies;
