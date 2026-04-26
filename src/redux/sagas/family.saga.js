//*family.saga.jsx
import { put, takeLatest, call, all } from 'redux-saga/effects';
import {
  getDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import { firebaseDB } from '../firebaseDB';

const db = firebaseDB;

// New Process
function* fetchFamily(action) {
  const { family, id } = action.payload;

  try {
    const familyRef = doc(db, 'families', family);
    const familyDoc = yield call(getDoc, familyRef);

    if (familyDoc.exists()) {
      const familyData = familyDoc.data();

      const isAllowed = familyData?.allowedUsers?.includes(id);

      if (isAllowed) {
        yield put({
          type: 'SET_FAMILY',
          payload: {
            ...familyData,
            lastUpdated:
              familyData?.lastUpdated?.toDate?.().toISOString() ?? null,
            dateCreated:
              familyData?.dateCreated?.toDate?.().toISOString() ?? null,
          },
        });
      } else {
        yield put({ type: 'SET_FAMILY', payload: null });
      }
    } else {
      yield put({ type: 'SET_FAMILY', payload: null });
    }
  } catch (error) {
    yield put({ type: 'FAMILY_FETCH_FAILED', payload: error.message });
  }
}

// Needs update
function* fetchAllowedProfiles(action) {
  const { allowedUsers } = action.payload;
  try {
    const profilesPromises = allowedUsers.map(userId =>
      call(getDoc, doc(db, 'profiles', userId)),
    );

    const profilesSnapshots = yield all(profilesPromises);

    const allowedProfiles = profilesSnapshots
      .map(snapshot => {
        if (!snapshot.exists) return null;

        const profileData = snapshot.data();
        return {
          id: snapshot.id,
          familyId: profileData?.familyId || '',
          firstName: profileData?.firstName || '',
          lastName: profileData?.lastName || '',
          familyRole: profileData?.familyRole || '',
          dob: profileData?.dob || '',
          lastUpdated:
            profileData?.lastUpdated?.toDate?.().toISOString() ?? null,
          dateCreated:
            profileData?.dateCreated?.toDate?.().toISOString() ?? null,
        };
      })
      .filter(Boolean);

    yield put({ type: 'SET_ALLOWED_PROFILES', payload: allowedProfiles });
  } catch (error) {
    // console.error('[Saga] ❌ Fetch Allowed Profiles Error:', error);
    yield put({
      type: 'FETCH_ALLOWED_PROFILES_FAILED',
      payload: error.message,
    });
  }
}

function* updateFamily(action) {
  const { profileID, familyID, updatedData } = action.payload;
  try {
    const familyRef = doc(db, 'families', familyID);
    const updatedFamily = {
      ...updatedData,
      lastUpdated: serverTimestamp(),
      lastUpdatedBy: profileID,
    };

    yield call(updateDoc, familyRef, updatedFamily);
    yield put({ type: 'UPDATE_FAMILY_SUCCESS', payload: updatedFamily });
  } catch (error) {
    // console.error('[Saga] ❌ Update Profile Error:', error);
    yield put({ type: 'UPDATE_FAMILY_FAILED', payload: error.message });
  }
}

function* countUpDaily(action) {
  const { profileID, familyID, updatedData } = action.payload;

  try {
    const familyRef = doc(db, 'families', familyID);
    const updatedFamily = {
      ...updatedData,
      lastUpdated: serverTimestamp(),
      lastUpdatedBy: profileID,
    };

    yield call(updateDoc, familyRef, updatedFamily);
    yield put({ type: 'DAILY_COUNTUP_SUCCESS', payload: updatedFamily });
  } catch (error) {
    // console.error('[Saga] ❌ Update Profile Error:', error);
    yield put({ type: 'DAILY_COUNTUP_FAILED', payload: error.message });
  }
}

export default function* familySaga() {
  yield takeLatest('FETCH_FAMILY', fetchFamily);
  yield takeLatest('FETCH_ALLOWED_PROFILES', fetchAllowedProfiles);
  yield takeLatest('UPDATE_FAMILY', updateFamily);
  yield takeLatest('COUNT_UP_DAILY', countUpDaily);
}
