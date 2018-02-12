import firebase from 'firebase';
import firebaseui from 'firebaseui';

import './index';

const ui = new firebaseui.auth.AuthUI(firebase.auth());

export default ui;
