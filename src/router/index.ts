// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Home from '@/views/home/index.vue'
import Abbreviation from '@/views/abbreviation/index.vue'
import { AbbreviationRouters } from './routes/abbreviation'
import Country from '@/views/country/index.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {path: '', name: 'home', component: Home },
      {path: 'Abbreviation', name: 'Abbreviation', component: Abbreviation},
      {path: 'Country', name: 'Country', component: Country}
    ]
  },
  ...AbbreviationRouters, 
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
