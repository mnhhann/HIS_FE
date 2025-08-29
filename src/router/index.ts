// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Home from '@/views/home/index.vue'
import Abbreviation from '@/views/abbreviation/index.vue'
import { AbbreviationRouters } from './routes/abbreviation'
import AdminLayout from '@/layouts/MainLayout.vue'
import NotFound from '@/views/Error/404.vue'
import { WardRouters } from './routes/ward'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: AdminLayout,
      children: [
        { path: '', redirect: '/home' },
        { path: 'home', name: 'home', component: Home },
        ...AbbreviationRouters,
        ...WardRouters,
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }, // fallback toàn cục
  ],
})

export default router
