import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import { AbbreviationRouters } from './routes/abbreviation'
import { CountryRouters } from './routes/country'
import AdminLayout from '@/layouts/MainLayout.vue'
import NotFound from '@/views/Error/404.vue'

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
        ...CountryRouters
      ]
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound } // fallback toàn cục
  ]
})

export default router
