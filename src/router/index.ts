import { createRouter, createWebHistory } from 'vue-router'
import AbbreviationsListPage from '@/views/abbreviations/pages/AbbreviationsListPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AbbreviationsListPage,
    },
    {
      path: '/abbreviations-list-page',
      name: 'abbreviations-list-page',
      component: AbbreviationsListPage,
    },
  ],
})

export default router
