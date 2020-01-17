<template>
  <div class="users">
    <h1>Users</h1>

    <div v-if="!loggedInUserId">
      Please SignIn first...
    </div>
    <template v-else>
      <ul class="todo-list">
        <li
          class="item"
          v-for="user in users"
          :key="user.uid"
        >
          {{ user.email }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { auth, firestore } from '@/firebase';

const collection = firestore.collection('users');

export default {
  name: 'users',
  data() {
    return {
      users: [],
      unsubscriber: null,
      authUnsubscriber: null,
      loggedInUserId: null,
    };
  },
  mounted() {
    this.authUnsubscriber = auth.onAuthStateChanged((user) => {
      this.loggedInUserId = user && user.uid;
    });
  },
  destroyed() {
    this.authUnsubscriber();
    this.unwatchUsers();
  },
  watch: {
    loggedInUserId(uid) {
      if (uid) {
        this.watchUsers();
      } else {
        this.unwatchUsers();
      }
    },
  },
  methods: {
    watchUsers() {
      this.unsubscriber = collection.onSnapshot((querySnapshot) => {
        this.users = [];
        querySnapshot.forEach((doc) => {
          this.users.push({ uid: doc.id, ...doc.data() });
        });
      });
    },
    unwatchUsers() {
      if (this.unsubscriber) {
        this.unsubscriber();
      }
    },
  },
};
</script>

<style scoped lang="scss">

</style>
