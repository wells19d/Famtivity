//* _root.reducer.tsx
import { combineReducers } from 'redux';
import deviceReducer from './device.reducer';
import userReducer from './user.reducer';
import profileReducer from './profile.reducer';
import familyReducer from './family.reducer';
import taskReducer from './task.reducer';

const rootReducer = combineReducers({
  deviceInfo: deviceReducer,
  user: userReducer,
  profile: profileReducer,
  family: familyReducer,
  task: taskReducer,
});

export default rootReducer;
