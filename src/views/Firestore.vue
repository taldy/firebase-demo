<template>
  <div class="firestore">
    <h1>Firestore</h1>

    <h3>Items</h3>
    <div class="item" v-for="todo in todos" :key="todo.id">{{ todo.title }}</div>

    <section>
      <h3>Create new</h3>
      <input type="text" v-model="newTodoName" @keypress.enter="createNewTodo" />
      <button type="button" name="button" @click="createNewTodo">Create</button>
    </section>
  </div>
</template>

<script>
import { firestore } from '@/firebase';

const TODO = 'todo';
const todosCollection = firestore.collection(TODO);

export default {
  name: 'firestore',
  data() {
    return {
      todos: [],
      unsubscriber: null,
      newTodoName: '',
    };
  },
  mounted() {
    this.unsubscriber = todosCollection.orderBy('created', 'desc').onSnapshot((querySnapshot) => {
      this.todos = [];
      querySnapshot.forEach((doc) => {
        this.todos.push({ id: doc.id, ...doc.data() });
      });
    });
  },
  destroyed() {
    this.unsubscriber();
  },
  methods: {
    createNewTodo() {
      todosCollection.add({
        title: this.newTodoName,
        created: new Date().getTime(),
      });

      this.newTodoName = '';
    },
  },
};
</script>

<style scoped>
li {
  line-height: 25px;
}

.item {
  padding: 5px;
  background: #eee;
  margin: 10px;
  width: 250px;
}

h3 {
  margin-top: 30px;
}
</style>
