//* _root.saga.tsx
import { all, fork } from 'redux-saga/effects';
import deviceSaga from './device.saga';
import loginSaga from './login.saga';
import userSaga from './user.saga';
import profileSaga from './profile.saga';
import familySaga from './family.saga';
import taskSaga from './task.saga';

export default function* rootSaga() {
  yield all([
    fork(deviceSaga),
    fork(loginSaga),
    fork(userSaga),
    fork(profileSaga),
    fork(familySaga),
    fork(taskSaga),
  ]);
}
