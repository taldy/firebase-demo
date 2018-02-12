<template>
  <div class="user-page">
    <links></links>
    User:
    <pre>{{ user }}</pre>
  </div>
</template>

<script>

import firebase from 'firebase';
import Links from './Links';

export default {
  name: 'user',
  components: {
    Links,
  },
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    this.user = firebase.auth().currentUser;

    const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
      this.user = user;
      unsubscribe();
    });
  }
}

</script>
