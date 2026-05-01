//* RealTimeTasks.js

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  query,
  collection,
  where,
  onSnapshot,
} from '@react-native-firebase/firestore';
import { useFamily } from '../../hooks/useHooks';
import { firebaseDB } from '../../redux/firebaseDB';

const useRealTimeTasks = enabled => {
  const dispatch = useDispatch();
  const family = useFamily();
  const db = firebaseDB;

  useEffect(() => {
    if (!enabled || !family?.id) {
      return;
    }

    const tasksQuery = query(
      collection(db, 'tasks'),
      where('familyId', '==', family.id),
    );

    const unsubscribe = onSnapshot(
      tasksQuery,
      querySnapshot => {
        const tasks = querySnapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        dispatch({ type: 'SET_TASKS', payload: tasks });
      },
      error => {
        dispatch({
          type: 'TASKS_SET_FAILED',
          payload: error.message,
        });
      },
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch, family?.id, db, enabled]);
};

export default useRealTimeTasks;
