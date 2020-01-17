<template>
  <div class="todos">
    <div v-if="!loggedInUserId">
      Please SignIn first...
    </div>
    <template v-else>
      <h1>Todos</h1>

      <section>
        <input
          type="text"
          v-model="newTodoName"
          @keypress.enter="createNewTodo"
          placeholder="What needs to be done?"
          class="new-todo"
        />

        <ul class="todo-list">
          <li
            class="item"
            v-for="todo in todos"
            :key="todo.id"
            :class="{ completed: todo.completed, 'not-mine': todo.author.uid !== loggedInUserId }"
          >
            <input
              type="checkbox"
              class="toggle"
              :checked="todo.completed"
              @change="toggle(todo.id)"
            />
            <label>{{ todo.title }}</label>
            <button class="destroy" @click="remove(todo.id)"></button>
          </li>
        </ul>
      </section>
    </template>
  </div>
</template>

<script>
import { auth, firestore } from '@/firebase';

const collection = firestore.collection('todos');

export default {
  name: 'todos',
  data() {
    return {
      todos: [],
      unsubscriber: null,
      authUnsubscriber: null,
      newTodoName: '',
      loggedInUserId: null,
    };
  },
  // computed: {
  //   loggedInUserId() {
  //     const { uid } = auth.currentUser || {};
  //     return uid;
  //   },
  // },
  mounted() {
    this.authUnsubscriber = auth.onAuthStateChanged((user) => {
      this.loggedInUserId = user && user.uid;
    });
  },
  destroyed() {
    this.authUnsubscriber();
    this.unwatchTodos();
  },
  watch: {
    loggedInUserId(uid) {
      if (uid) {
        this.watchTodos();
      } else {
        this.unwatchTodos();
      }
    },
  },
  methods: {
    createNewTodo() {
      const { uid, displayName: name } = auth.currentUser || {};

      collection.add({
        title: this.newTodoName,
        completed: false,
        author: { uid, name },
        created: new Date().getTime(),
      });

      this.newTodoName = '';
    },
    toggle(id) {
      const todo = this.todos.find(item => item.id === id);
      collection.doc(id).update({ completed: !todo.completed });
    },
    remove(id) {
      collection.doc(id).delete();
    },
    watchTodos() {
      this.unsubscriber = collection.orderBy('created', 'desc').onSnapshot((querySnapshot) => {
        this.todos = [];
        querySnapshot.forEach((doc) => {
          this.todos.push({ id: doc.id, ...doc.data() });
        });
      });
    },
    unwatchTodos() {
      if (this.unsubscriber) {
        this.unsubscriber();
      }
    },
  },
};
</script>

<style scoped lang="scss">
h1 {
  /* position: absolute; */
  /* top: -155px; */
  width: 100%;
  font-size: 100px;
  font-weight: bold;
  text-transform: lowercase;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
}

section {
  width: 550px;
  margin: 0 auto;

  background: #fff;
  /* margin: 130px 0 40px 0; */
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

input {
  background: none;
  border: none;
}

.new-todo {
  border-radius: 0;
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  width: 100%;
  box-sizing: border-box;
  font-size: 24px;
  line-height: 1.4em;
}

li {
  line-height: 25px;
}

ul {
  padding: 0;
}

.item {
  list-style: none;
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
  // display: flex;
  // flex-direction: row;

  &.completed label {
    color: #d9d9d9;
    text-decoration: line-through;

    &:before {
      content: '✔';
      color: #71b1a7;
    }
  }

  &.not-mine {
    background: #f2f2f2;
  }

  .toggle {
    text-align: center;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none;
    opacity: 0;
    z-index: 15;
  }

  label {
    word-break: break-all;
    padding: 15px 15px 15px 60px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;

    &:before {
      display: block;
      border: solid 1px #ddd;
      border-radius: 50%;
      content: '';
      position: absolute;
      width: 35px;
      height: 35px;
      left: 10px;
      bottom: 10px;
      box-sizing: border-box;
      padding: 3px 8px;
    }
  }

  button.destroy {
    outline: none;
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s;
    border: none;
    background: none;
    font-weight: normal;

    &:after {
      content: '×';
    }
  }

  &:hover button.destroy {
    display: block;
  }
}

h3 {
  margin-top: 30px;
}
</style>
