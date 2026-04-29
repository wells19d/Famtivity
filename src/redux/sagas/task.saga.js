//* tasks.saga.js
// copilot: disable
import { put, takeLatest, call } from 'redux-saga/effects';
import {
  updateDoc,
  getDoc,
  doc,
  serverTimestamp,
  getDocs,
  query,
  collection,
  where,
  setDoc,
  deleteDoc,
} from '@react-native-firebase/firestore';
import { firebaseDB } from '../firebaseDB';
import uuid from 'react-native-uuid';

const db = firebaseDB;

function* fetchTasks(action) {
  const { familyID } = action.payload;
  try {
    const tasksQuery = query(
      collection(db, 'tasks'),
      where('familyId', '==', familyID),
    );

    const tasksSnapshot = yield call(getDocs, tasksQuery);
    const tasks = tasksSnapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    yield put({ type: 'SET_TASKS', payload: tasks });
  } catch (error) {
    yield put({ type: 'TASKS_SET_FAILED', payload: error.message });
  }
}

function* addTask(action) {
  const { newTask, profileID, familyID } = action.payload;

  try {
    const taskRef = doc(collection(db, 'tasks'));

    const newTaskData = {
      ...newTask,
      id: uuid.v4(),
      familyId: familyID,
      createdBy: profileID,
      lastUpdatedBy: profileID,
      status: 'pending',
      dateCreated: serverTimestamp(),
      lastUpdated: serverTimestamp(),
      archived: false,
      archivedDate: null,
      history: [],
    };

    yield call(setDoc, taskRef, newTaskData);
    yield put({ type: 'ADD_TASK_SUCCESS' });
    // Success Toast Message Here
  } catch (error) {
    yield put({ type: 'ADD_TASK_FAILED', payload: error.message });
    // Error Toast Message Here
  }
}

function* updateTask(action) {
  const { taskID, updatedTask, profile, familyID } = action.payload;

  try {
    const taskRef = doc(db, 'tasks', taskID);
    const taskDoc = yield call(getDoc, taskRef);

    if (taskDoc.exists()) {
      const taskData = taskDoc.data();

      const isOwner = taskData.createdBy === profile.id;
      const isAssigned = taskData.assignedTo?.includes(profile.id);

      // Update rules:
      // 1. Task must belong to the same family
      // 2. If task is adultOnly → user must NOT be a child
      // 3. If task is private → only owner or assigned users can access
      // 4. If task is locked → only owner can edit

      const canUpdate =
        taskData.familyId === familyID &&
        (!taskData.adultOnly || profile.familyRole !== 'child') &&
        (!taskData.private || isOwner || isAssigned) &&
        (!taskData.taskLocked || isOwner);

      if (canUpdate) {
        const updatedTaskData = {
          ...updatedTask,
          lastUpdatedBy: profile.id,
          lastUpdated: serverTimestamp(),
        };

        yield call(updateDoc, taskRef, updatedTaskData);

        yield put({ type: 'UPDATE_TASK_SUCCESS' });
        // Success Toast Message Here
      } else {
        yield put({
          type: 'UPDATE_TASK_FAILED',
          payload: 'You do not have permission to update this task.',
        });
        // Failed Toast Message Here
      }
    } else {
      yield put({
        type: 'UPDATE_TASK_FAILED',
        payload: 'Task not found.',
      });
      // TNF Toast Message Here
    }
  } catch (error) {
    yield put({ type: 'UPDATE_TASK_FAILED', payload: error.message });
    // Error Toast Message Here
  }
}

function* deleteTask(action) {
  // this will delete a task from the current family
  // this will not be a true delete
  // 1. set archived set to true
  // 2. set archivedDate to serverTimestamp
  // 3. set status to archived
  // 4. lastUpdated to serverTimestamp
  // 5. add a history log entry
}

function* resetTasks(action) {
  // this will delete all tasks from the current family
  // this will be a true delete that removes all tasks for the family
}

export default function* taskSaga() {
  yield takeLatest('FETCH_TASKS', fetchTasks);
  yield takeLatest('ADD_TASK', addTask);
  yield takeLatest('UPDATE_TASK', updateTask);
  yield takeLatest('DELETE_TASK', deleteTask);
  yield takeLatest('RESET_TASKS', resetTasks);
}
