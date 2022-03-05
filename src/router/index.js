import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/signup.vue')
  },
  {
    path: '/explore',
    name: 'explore',
    component: () => import('../views/explore.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
