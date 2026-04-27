//* tasks.saga.js
import { put, takeLatest, call } from 'redux-saga/effects';
import {
  updateDoc,
  doc,
  serverTimestamp,
  getDocs,
  query,
  collection,
  where,
} from '@react-native-firebase/firestore';
import { firebaseDB } from '../firebaseDB';

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
  // this will add a task to the current family
}
function* updateTask(action) {
  // this will update a task in the current family
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
