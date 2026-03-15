//* _root.reducer.tsx
import { combineReducers } from 'redux';
import deviceReducer from './device.reducer';

const rootReducer = combineReducers({
  deviceInfo: deviceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
