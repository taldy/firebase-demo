<template>
  <section>
    <links></links>
    <input v-model="value" />
    <button :disabled="!value" @click="save">Save</button>
  </section>
</template>

<script>

import '../firebase';
import firebase from 'firebase';
const db = firebase.firestore();
import Links from './Links';

export default {
  components: {
    Links,
  },
  data() {
    return {
      value: null,
    };
  },
  methods: {
    save() {
      db.collection('userstories').add({
        name: this.value
      });

      this.value = '';
    }
  },
};

</script>

<style scoped>

input, button {
  font-size: 20px;
}

</style>
