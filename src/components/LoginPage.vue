<template>
  <div class="login-page">
    <links></links>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from 'firebase';
import firebaseui from '../firebase/ui';
import 'firebaseui/dist/firebaseui.css';
import Links from './Links';

export default {
  name: 'login',
  components: {
    Links,
  },
  methods: {
    onSignIn() {
      this.$router.replace({ name: 'user' });
      return false;
    },
  },
  mounted() {
    const uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      signInFlow: 'popup',
      callbacks: { signInSuccess: this.onSignIn },
    }; /**/
    firebaseui.reset();
    firebaseui.start('#firebaseui-auth-container', uiConfig);
  },
};
</script>
