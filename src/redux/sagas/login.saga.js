//* login.saga.js

import { put, takeLatest, select, call } from 'redux-saga/effects';

function* handleLogin(action) {
  try {
    const uid = action.payload;
    // ✅ Step 1: Fetch Profile
    yield put({ type: 'FETCH_PROFILE', payload: { uid } });

    // Wait until profile is set in Redux
    const profile = yield call(waitForProfile);

    // ✅ Step 2: Fetch family using profile.family & profile.id
    const { familyId, id } = profile;
    yield put({ type: 'FETCH_FAMILY', payload: { family: familyId, id } });

    // Wait until family is set in Redux
    const familyData = yield call(waitForFamily);

    // ✅ Step 3: Fetch tasks - paused for now.
    yield put({ type: 'FETCH_TASKS', payload: { familyID: familyData.id } });
  } catch (error) {
    yield put({ type: 'LOGIN_SEQUENCE_FAILED', payload: error.message });
  }
}

function* waitForProfile() {
  while (true) {
    const profile = yield select(state => state.profile.profile);
    if (profile) return profile;
    yield new Promise(resolve => setTimeout(resolve, 50));
  }
}

function* waitForFamily() {
  while (true) {
    const family = yield select(state => state.family.family);
    if (family) return family;
    yield new Promise(resolve => setTimeout(resolve, 50));
  }
}

export default function* loginSaga() {
  yield takeLatest('START_LOGIN', handleLogin);
}
