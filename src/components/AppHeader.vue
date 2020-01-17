<template>
  <div class="app-header">
    <div class="nav">
      <router-link :to="{ name: 'profile' }">Profile</router-link>
      <router-link :to="{ name: 'todos' }">Todos</router-link>
      <router-link :to="{ name: 'benchmark' }">Benchmark</router-link>
      <router-link :to="{ name: 'users' }">Users</router-link>
    </div>

    <h2>Firebase Demo</h2>

    <div v-if="user" class="user">
      {{ user.displayName }}
      <img
        :src="user.photoURL"
        class="avatar"
      />
    </div>
    <div v-else>There is no logged in user</div>
  </div>
</template>

<script>
import firebase, { auth } from '@/firebase';

export default {
  name: 'app-header',
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      // eslint-disable-next-line no-console
      console.log('authChanged', user);
      this.user = user;
    });
  },
  methods: {
    google() {
      // eslint-disable-next-line
      const provider = new firebase.auth.GoogleAuthProvider();
      auth
        .signInWithPopup(provider)
        // eslint-disable-next-line no-console
        .then(() => console.log('success'))
        // eslint-disable-next-line no-console
        .catch(() => console.log('login error'));
    },
  },
};
</script>

<style scoped lang="scss">
.app-header {
  height: 40px;
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
  width: 32px;
  height: 32px;
  margin: 10px;
  border-radius: 50%;
}
</style>
