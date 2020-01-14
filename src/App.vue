<template>
  <div id="app">
    <AppHeader />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view class="viewport" />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';

export default {
  name: 'home',
  components: {
    AppHeader,
  },
};
</script>

<style lang="scss">
html, body, #app {
  font-family: Ubuntu, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

button {
  display: block;
  font-family: Ubuntu, 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 18px;
  font-weight: bold;
  padding: 7px 10px;
  margin: 10px 0;
  // min-width: 150px;
  border-radius: 5px;
  border: solid 1px #bbb;
  background: #eee;
}

input {
  padding: 7px 10px;
  border: solid 1px #999;
  border-radius: 5px;
}

.viewport {
  padding: 10px;
}

// #nav {
//   padding: 30px;
//
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
