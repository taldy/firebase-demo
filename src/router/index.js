import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../components/HomePage.vue';
import LoginPage from '../components/LoginPage.vue';
import UserPage from '../components/UserPage.vue';
import DataPage from '../components/DataPage.vue';
import AddPage from '../components/AddPage.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/user',
      name: 'user',
      component: UserPage,
    },
    {
      path: '/data',
      name: 'data',
      component: DataPage,
    },
    {
      path: '/add',
      name: 'add',
      component: AddPage,
    },
    { path: '*', redirect: { name: 'home' } },
  ],
});

export default router;
