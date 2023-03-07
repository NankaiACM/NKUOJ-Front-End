import { createRouter, createWebHistory } from 'vue-router'

import AppUniversal from "@/templates/AppUniversal.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: AppUniversal,
      children: [
        {
          path: '/home',
          component: () => import('../pages/HomePage.vue')
        },
        {
          path: '/problem-list',
          component: () => import('../pages/ProblemListPage.vue')
        },
        {
          path: '/submissions',
          component: () => import('../pages/SiteSubmissionPage.vue')
        },
        {
          path: '/bulletin',
          component: () => import('../pages/BulletinPage.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginPage.vue')
    }
  ]
})

export default router
