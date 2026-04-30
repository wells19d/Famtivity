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
import {
  canArchiveTask,
  canDeleteTask,
  canOverrideTask,
  canUpdateTask,
} from '../../utilities/helpers';

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
    const taskID = uuid.v4();
    const taskRef = doc(db, 'tasks', taskID);

    const newTaskData = {
      ...newTask,
      id: taskID,
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

      if (taskData.archived) {
        yield put({
          type: 'UPDATE_TASK_FAILED',
          payload:
            'Archived tasks cannot be updated. Please unarchive the task first.',
        });
        // Failed Toast Message Here
        return;
      }

      const canUpdate = canUpdateTask(taskData, profile, familyID);

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

function* parentalOverrideTask(action) {
  const { taskID, updatedTask, profile, familyID } = action.payload;

  try {
    const taskRef = doc(db, 'tasks', taskID);
    const taskDoc = yield call(getDoc, taskRef);

    if (taskDoc.exists()) {
      const taskData = taskDoc.data();
      const canOverride = canOverrideTask(taskData, profile, familyID);

      if (taskData.archived) {
        yield put({
          type: 'PARENTAL_OVERRIDE_TASK_FAILED',
          payload:
            'Archived tasks cannot be updated. Please unarchive the task first.',
        });
        // Failed Toast Message Here
        return;
      }

      if (canOverride) {
        const updatedTaskData = {
          ...updatedTask,
          lastUpdatedBy: profile.id,
          lastUpdated: serverTimestamp(),
        };

        yield call(updateDoc, taskRef, updatedTaskData);

        yield put({ type: 'PARENTAL_OVERRIDE_TASK_SUCCESS' });
        // Success Toast Message Here
      } else {
        yield put({
          type: 'PARENTAL_OVERRIDE_TASK_FAILED',
          payload: 'You do not have permission to override this task.',
        });
        // Failed Toast Message Here
      }
    } else {
      yield put({
        type: 'PARENTAL_OVERRIDE_TASK_FAILED',
        payload: 'Task not found.',
      });
      // TNF Toast Message Here
    }
  } catch (error) {
    yield put({
      type: 'PARENTAL_OVERRIDE_TASK_FAILED',
      payload: error.message,
    });
    // Error Toast Message Here
  }
}

function* archiveTask(action) {
  const { taskID, profile, familyID } = action.payload;

  try {
    const taskRef = doc(db, 'tasks', taskID);
    const taskDoc = yield call(getDoc, taskRef);

    if (taskDoc.exists()) {
      const taskData = taskDoc.data();
      const canArchive = canArchiveTask(taskData, profile, familyID);

      if (taskData.archived) {
        yield put({
          type: 'ARCHIVE_TASK_FAILED',
          payload: 'Task is already archived.',
        });
        return;
      }

      const historyData = [
        ...(taskData.history || []),
        {
          action: 'archived',
          performedBy: profile.id,
          performedAt: new Date().toISOString(),
        },
      ];

      if (canArchive) {
        const updatedTaskData = {
          status: 'archived',
          history: historyData,
          archived: true,
          archivedDate: serverTimestamp(),
        };

        yield call(updateDoc, taskRef, updatedTaskData);

        yield put({ type: 'ARCHIVE_TASK_SUCCESS' });
        // Success Toast Message Here
      } else {
        yield put({
          type: 'ARCHIVE_TASK_FAILED',
          payload: 'You do not have permission to archive this task.',
        });
        // Failed Toast Message Here
      }
    } else {
      yield put({
        type: 'ARCHIVE_TASK_FAILED',
        payload: 'Task not found.',
      });
      // TNF Toast Message Here
    }
  } catch (error) {
    yield put({ type: 'ARCHIVE_TASK_FAILED', payload: error.message });
    // Error Toast Message Here
  }
}

function* deleteTask(action) {
  // THIS IS A TRUE DELETE, THIS SHOULD ONLY BE USED BY ADMINS
  const { taskID, profile, familyID } = action.payload;

  try {
    const taskRef = doc(db, 'tasks', taskID);
    const taskDoc = yield call(getDoc, taskRef);

    if (taskDoc.exists()) {
      const taskData = taskDoc.data();

      const canDelete = canDeleteTask(taskData, profile, familyID);

      if (canDelete) {
        yield call(deleteDoc, taskRef);
        yield put({ type: 'DELETE_TASK_SUCCESS' });
        // Success Toast Message Here
      } else {
        yield put({
          type: 'DELETE_TASK_FAILED',
          payload: 'You do not have permission to delete this task.',
        });
        // Failed Toast Message Here
      }
    } else {
      yield put({
        type: 'DELETE_TASK_FAILED',
        payload: 'Task not found.',
      });
      // TNF Toast Message Here
    }
  } catch (error) {
    yield put({ type: 'DELETE_TASK_FAILED', payload: error.message });
    // Error Toast Message Here
  }
}

function* resetTasks(action) {
  // this will delete all tasks from the current family
  // this will be a true delete that removes all tasks for the family
}

export default function* taskSaga() {
  yield takeLatest('FETCH_TASKS', fetchTasks);
  yield takeLatest('ADD_TASK', addTask);
  yield takeLatest('UPDATE_TASK', updateTask);
  yield takeLatest('PARENTAL_OVERRIDE_TASK', parentalOverrideTask);
  yield takeLatest('ARCHIVE_TASK', archiveTask);
  yield takeLatest('DELETE_TASK', deleteTask);
  yield takeLatest('RESET_TASKS', resetTasks);
}
