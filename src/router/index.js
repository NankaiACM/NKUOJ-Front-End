import { createRouter, createWebHistory } from 'vue-router'

import AppUniversal from "@/templates/AppUniversal.vue";
import AppStrict from "@/templates/AppStrict.vue";

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
        },
        {
          path: '/profile',
          component: () => import('../pages/ProfilePage.vue')
        },
        {
          path: '/problem/:id',
          component: () => import('../pages/ProblemPage.vue')
        },
        {
          path: '/submission/:id',
          component: () => import('../pages/SubmissionPage.vue')
        },
        {
          path: '/announcement/:id',
          component: () => import('../pages/BulletinContentPage.vue')
        },
        {
          path: '/course/:id',
          component: () => import('../pages/CoursePage.vue')
        },
        {
          path: '/exam/:id',
          component: () => import('../pages/ExamPage.vue')
        },
        {
          path: '/contest/:id',
          component: () => import('../pages/ContestPage.vue')
        },
        {
          path: '/assignment/:id',
          component: () => import('../pages/AssignmentPage.vue')
        },
        {
          path: '/ranking/contest/:id',
          component: () => import('../pages/ContestRankingPage.vue')
        },
        {
          path: '/ranking/exam/:id',
          component: () => import('../pages/ExamRankingPage.vue')
        }
      ]
    },
    {
      path: '/strict',
      redirect: '/strict/home',
      component: AppStrict,
      children: [
        {
          path: '/strict/home',
          component: () => import('../pages/StrictHomePage.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginPage.vue')
    },
    {
      path: '/association',
      name: 'association',
      component: () => import('../pages/AlgoAssociationPage.vue')
    }
  ]
})

export default router
