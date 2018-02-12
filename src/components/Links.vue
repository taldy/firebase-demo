<template>
  <ul class="links">
    <router-link :to="{ name: 'login' }">Login</router-link>
    <router-link :to="{ name: 'user' }">User</router-link>
    <router-link :to="{ name: 'data' }">Data</router-link>
    <router-link :to="{ name: 'add' }">Add</router-link>
  </ul>
</template>

<style scoped>

a {
  font-size: 28px;
  margin: 0 10px;
}

</style>
