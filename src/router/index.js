import Vue from 'vue';
import VueRouter from 'vue-router';
import Profile from '../views/Profile.vue';
import Todos from '../views/Todos.vue';
import Benchmark from '../views/Benchmark.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/todos',
    name: 'todos',
    component: Todos,
  },
  {
    path: '/benchmark',
    name: 'benchmark',
    component: Benchmark,
  },
  {
    path: '*',
    redirect: { name: 'profile' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
