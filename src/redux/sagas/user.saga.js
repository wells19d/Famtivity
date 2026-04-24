//* user.saga.js
import { put, takeLatest, call } from 'redux-saga/effects';
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';
import { persistor } from '../../../store';

const app = getApp();
const auth = getAuth(app);

const getErrorMessage = error => {
  switch (error?.code) {
    // 🔐 Signup + Account Creation
    case 'auth/email-already-in-use':
      return 'This email is already linked to another account. Try logging in or use a different one.';
    case 'auth/invalid-email':
      return 'That doesn’t look like a valid email address. Please double-check it.';
    case 'auth/operation-not-allowed':
      return 'Email sign-up is currently disabled. Please contact support for help.';
    case 'auth/weak-password':
      return 'That password is too weak. Try something longer with numbers and symbols.';

    // 🔓 Login / Credential
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Incorrect email or password. Please double-check your login details.';
    case 'auth/user-not-found':
    case 'auth/no-current-user':
      return 'We couldn’t find an account with that email. Did you sign up?';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please reach out to support if this seems wrong.';

    // 🚫 Throttling / Abuse
    case 'auth/too-many-requests':
      return 'Too many attempts. Take a short break and try again in a few minutes.';
    case 'auth/blocked-by-response':
      return 'Login is temporarily blocked. Please wait a few minutes before trying again.';

    // 📧 Email Verification
    case 'auth/invalid-action-code':
      return 'That link is invalid or has expired. Request a new one to continue.';
    case 'auth/user-token-expired':
      return 'Your session expired. Please log in again to continue.';
    case 'auth/email-not-verified':
      return 'Your email hasn’t been verified yet. Check your inbox for a verification link.';

    // 🧠 Edge Cases (Network, App, Internal)
    case 'auth/network-request-failed':
      return 'Can’t connect. Please check your internet and try again.';
    case 'auth/app-not-authorized':
      return 'This app isn’t authorized for Firebase. Please contact support.';
    case 'auth/internal-error':
      return 'Something went wrong on our side. Try again in a moment.';

    // 🚨 Fallback
    default:
      return 'An unknown error occurred. Please try again later.';
  }
};

// LOGIN
function* loginUser(action) {
  try {
    const { email, password } = action.payload;
    const userCredential = yield call(
      signInWithEmailAndPassword,
      auth,
      email,
      password,
    );

    const user = userCredential?.user._user;
    const requireVerification = true;

    if (!requireVerification || user?.emailVerified) {
      yield put({ type: 'SET_USER', payload: user });
      yield put({ type: 'START_LOGIN', payload: user.uid });
    } else {
      console.log('email not verified');
      // ❌ Block unverified users
      yield call(signOut, auth);
      yield put({ type: 'UNSET_USER' });
      yield put({ type: 'RESET_ALL_STATE' });
      yield call([persistor, persistor.purge]);
      yield call([persistor, persistor.flush]);

      yield put({
        type: 'LOGIN_FAILED',
        payload: getErrorMessage({ code: 'auth/email-not-verified' }),
      });

      return; // 🔒 Stop flow
    }
  } catch (error) {
    const friendlyMessage = getErrorMessage(error);
    yield put({ type: 'LOGIN_FAILED', payload: friendlyMessage });
  }
}

// LOGOUT
function* logoutUser() {
  try {
    yield call(signOut, auth);
    yield put({ type: 'UNSET_USER' });
  } catch (error) {
    const friendlyMessage = getErrorMessage(error);
    yield put({ type: 'LOGOUT_FAILED', payload: friendlyMessage });
  }
}

// LOGOUT AND CLEAR
function* logOutAndClear() {
  try {
    yield call(signOut, auth);
    yield put({ type: 'UNSET_USER' });
    yield put({ type: 'RESET_ALL_STATE' });
    yield call([persistor, persistor.purge]);
    yield call([persistor, persistor.flush]);
  } catch (error) {
    const friendlyMessage = getErrorMessage(error);
    yield put({ type: 'LOGOUT_FAILED', payload: friendlyMessage });
  }
}

export default function* userSaga() {
  yield takeLatest('LOGIN_REQUEST', loginUser);
  yield takeLatest('LOGOUT', logoutUser);
  yield takeLatest('LOGOUT_AND_CLEAR', logOutAndClear);
}
