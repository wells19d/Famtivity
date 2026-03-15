//* _root.saga.tsx
import { all, fork } from 'redux-saga/effects';
import deviceSaga from './device.saga';

export default function* rootSaga() {
  yield all([fork(deviceSaga)]);
}
