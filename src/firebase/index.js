import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from './settings.json';

firebase.initializeApp(firebaseConfig);

export default firebase;
export { firebaseui };
