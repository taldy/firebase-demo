<template>
  <div class="app-header">
    <div class="nav">
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link :to="{ name: 'firestore' }">Firestore</router-link>
    </div>
    <router-link class="user-info" :to="{ name: 'profile' }">
      <div v-if="user" class="user">
        {{ user.displayName }}
        <img
          :src="user.photoURL"
          class="avatar"
        />
      </div>
      <div v-else>There is no logged in user</div>
    </router-link>
    <!-- <button type="button" name="button" @click="google">Login with google</button> -->
  </div>
</template>

<script>
import firebase from '@/firebase';

export default {
  name: 'app-header',
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('authChanged', user);
      this.user = user;
    });
  },
  methods: {
    google() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => console.log('success'))
        .catch(() => console.log('login error'));
    },
  },
};
</script>

<style scoped lang="scss">
.app-header {
  height: 60px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #f2f2f2;
}

.nav a {
  margin-right: 10px;
}

.user {
  display: flex;
  align-items: center;
}

.avatar {
  width: 48px;
  height: 48px;
  margin: 10px;
  border-radius: 50%;
}
</style>
