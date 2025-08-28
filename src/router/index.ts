import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import { AbbreviationRouters } from './routes/abbreviation'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    ...AbbreviationRouters,
  ],
})

export default router
