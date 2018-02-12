<template>
  <section>
    <links></links>
    <ul>
      <li v-for="item in items" :key="item.id" class="userstory">{{ item.name }}</li>
    </ul>

  </section>
</template>

<script>

import '../firebase';
import firebase from 'firebase';
const db = firebase.firestore();
import Links from './Links';

export default {
  name: 'data',
  components: {
    Links,
  },
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    db.collection('userstories')
      .onSnapshot((querySnapshot) => {
        console.log('userstories.onSnapshot', querySnapshot.docChanges);
        this.items = [];

        querySnapshot.forEach(doc => {
          this.items.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        // console.log(doc.id, " => ", doc.data()
      });

      // return db.collection('userstories').orderBy('order', 'desc').limit(1).get()
      //   .then(querySnapshot => {
      //     console.log('querySnapshot', querySnapshot);
      //     const docRef = querySnapshot.docs[0].ref;
      //
      //     db.runTransaction((transaction) => {
      //       return transaction.get(docRef).then((doc) => {
      //         transaction.update(docRef, { updatedByTransaction: true });
      //       });
      //     })
      //     .then(function() {
      //       console.log("Transaction completed");
      //     }).catch(function(err) {
      //       console.log("Transaction failed", err);
      //     });
      //   });

  },
}

</script>

<style>

.userstory {
  font-size: 20px;
  margin: 5px 0;
}

</style>
