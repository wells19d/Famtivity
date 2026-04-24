// src/redux/firebaseDB.js
import { getApp } from '@react-native-firebase/app';
import { getFirestore } from '@react-native-firebase/firestore';

const app = getApp();
export const firebaseDB = getFirestore(app, 'default');
