import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { environment } from '../environment/environment';
firebase.initializeApp(environment.firbase);
export const firebaseAuth = firebase.auth();
export const firebaseFirestore = firebase.firestore();
export const firebaseStorage = firebase.storage();
