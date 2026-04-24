//* _root.reducer.tsx
import { combineReducers } from 'redux';
import deviceReducer from './device.reducer';
import userReducer from './user.reducer';
import profileReducer from './profile.reducer';
import familyReducer from './family.reducer';

const rootReducer = combineReducers({
  deviceInfo: deviceReducer,
  user: userReducer,
  profile: profileReducer,
  family: familyReducer,
});

export default rootReducer;
