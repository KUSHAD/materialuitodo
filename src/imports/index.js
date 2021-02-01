import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import { environment } from '../environment/environment';
firebase.initializeApp(environment.firbase);
export const firebaseAuth = firebase.auth();
export const firebaseFirestore = firebase.firestore();
export const firebaseStorage = firebase.storage();
export const firebaseFirestoreTimestamp = firebase.firestore.FieldValue.serverTimestamp();
export const firebaseRealTimeDatabase = firebase.database();
export const firebaseRealTimeDatabaseTimestamp =
	firebase.database.ServerValue.TIMESTAMP;
export const firebaseAnalytics = firebase.analytics();
