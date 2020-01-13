<template>
  <div class="profile">
    <h1>Profile</h1>

    <template v-if="!user">
      <button @click="signInWithGoogle" type="button" name="button">
        Sign In with Google
      </button>
    </template>
    <template v-else>
      <button v-if="user" @click="logout" type="button" name="button">Logout</button>
      <pre v-if="user">{{ user }}</pre>
    </template>

    <div id="firebase-ui-container"></div>
  </div>
</template>

<script>
import firebase, { firebaseui } from '@/firebase';

console.log('firebase', firebase);
console.log('firebaseui', firebaseui);

const ui = new firebaseui.auth.AuthUI(firebase.auth());

export default {
  name: 'profile',
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('authChanged', user);
      this.user = user;

      if (!user) {
        this.initFirebaseUI();
      } else {
        this.destroyFirebaseUI();
      }
    });
  },
  methods: {
    initFirebaseUI() {
      ui.start('#firebase-ui-container', {
        signInFlow: 'popup',
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      });
    },
    destroyFirebaseUI() {
      ui.reset();
    },
    logout() {
      firebase.auth().signOut();
    },
    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
  },
};
</script>
