import { createRouter, createWebHistory } from 'vue-router'

import AppUniversal from "@/templates/AppUniversal.vue";
import AppStrict from "@/templates/AppStrict.vue";
import AppAdmin from "@/templates/AppAdmin.vue";
import AppPublic from "@/templates/AppPublic.vue";

import {useUserDataStore} from "@/stores/user-data";
import {useStrictModeStore} from "@/stores/strict-mode";
import {config} from "@/config";

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
          component: () => import('../pages/HomePage.vue'),
          meta: { strictRedirect: 'strictHome' }
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
          component: () => import('../pages/ProfilePage.vue'),
          meta: { strictRedirect: 'strictProfile' }
        },
        {
          path: '/problem/:id',
          component: () => import('../pages/ProblemPage.vue'),
          meta: { strictRedirect: 'strictProblem' }
        },
        {
          path: '/submission/:id',
          component: () => import('../pages/SubmissionPage.vue'),
          meta: { strictRedirect: 'strictSubmission' }
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
          component: () => import('../pages/ExamPage.vue'),
          meta: { strictRedirect: 'strictExam' }
        },
        {
          path: '/contest/:id',
          component: () => import('../pages/ContestPage.vue'),
          meta: { strictRedirect: 'strictContest' }
        },
        {
          path: '/assignment/:id',
          component: () => import('../pages/AssignmentPage.vue')
        },
        {
          path: '/ranking/contest/:id',
          component: () => import('../pages/ContestRankingPage.vue'),
          meta: { strictRedirect: 'strictRankingContest', publicRedirect: 'publicRankingContest' }
        },
        {
          path: '/ranking/exam/:id',
          component: () => import('../pages/ExamRankingPage.vue'),
          meta: { strictRedirect: 'strictRankingExam', publicRedirect: 'publicRankingExam' }
        },
        {
          path: '/',
          redirect: '/login',
          meta: { isLogin: true }
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
          component: () => import('../pages/StrictHomePage.vue'),
          name: 'strictHome',
          meta: { isStrict: true }
        },
        {
          path: '/strict/profile',
          component: () => import('../pages/ProfilePage.vue'),
          name: 'strictProfile',
          meta: { isStrict: true }
        },
        {
          path: '/strict/problem/:id',
          component: () => import('../pages/ProblemPage.vue'),
          name: 'strictProblem',
          meta: { isStrict: true }
        },
        {
          path: '/strict/submission/:id',
          component: () => import('../pages/SubmissionPage.vue'),
          name: 'strictSubmission',
          meta: { isStrict: true }
        },
        {
          path: '/strict/exam/:id',
          component: () => import('../pages/ExamPage.vue'),
          name: 'strictExam',
          meta: { isStrict: true }
        },
        {
          path: '/strict/contest/:id',
          component: () => import('../pages/ContestPage.vue'),
          name: 'strictContest',
          meta: { isStrict: true }
        },
        {
          path: '/strict/ranking/contest/:id',
          component: () => import('../pages/ContestRankingPage.vue'),
          name: 'strictRankingContest',
          meta: { isStrict: true }
        },
        {
          path: '/strict/ranking/exam/:id',
          component: () => import('../pages/ExamRankingPage.vue'),
          name: 'strictRankingExam',
          meta: { isStrict: true }
        }
      ]
    },
    {
      path: '/admin',
      redirect: '/admin/home',
      component: AppAdmin,
      children: [
        {
          path: '/admin/home',
          component: () => import('../pages/AdminHomePage.vue'),
          meta: { isAdministrator: true }
        },
        {
          path: '/admin/problem/:id',
          component: () => import('../pages/AdminProblemPage.vue'),
          meta: { isAdministrator: true }
        },
        {
          path: '/admin/problem/submissions/:id',
          component: () => import('../pages/AdminProblemSubmissionsPage.vue'),
          meta: { isAdministrator: true }
        },
        {
          path: '/admin/problem/content/:id',
          component: () => import('../pages/AdminProblemContentPage.vue'),
          meta: { isAdministrator: true }
        },
        {
          path: '/admin/problem/data/:id',
          component: () => import('../pages/AdminProblemDataPage.vue'),
          meta: { isAdministrator: true }
        },
        {
          path: '/admin/rejudge',
          component: () => import('../pages/AdminRejudgePage.vue'),
          meta: { isAdministrator: true }
        },
        {
          path: '/admin',
          redirect: '/admin/home',
          meta: { isAdministrator: true }
        },
      ]
    },{
      path: '/public',
      redirect: '/404',
      component: AppPublic,
      children: [
        {
          path: '/public/ranking/exam/:id',
          name: 'publicRankingExam',
          component: () => import('../pages/ExamRankingPage.vue'),
          meta: { isPublic: true }
        },
        {
          path: '/public/ranking/contest/:id',
          name: 'publicRankingContest',
          component: () => import('../pages/ContestRankingPage.vue'),
          meta: { isPublic: true }
        },
        {
          path: '/public',
          redirect: '/404',
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginPage.vue'),
      meta: { isLogin: true }
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../pages/NotFoundPage.vue'),
      meta: { isNotFound: true }
    },
    {
      path: '/association',
      name: 'association',
      component: () => import('../pages/AlgoAssociationPage.vue'),
      meta: { authNotRequired: true }
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../pages/LogoutPage.vue'),
      meta: { authNotRequired: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const userDataStore = useUserDataStore();
  const strictModeStore = useStrictModeStore();
  const isLoginPage = to.meta.isLogin;
  const isAdminPage = to.meta.isAdministrator;
  const isStrictPage = to.meta.isStrict;
  const isNotFoundPage = to.meta.isNotFound;
  const isPublicPage = to.meta.isPublic;
  const authNotRequired = to.meta.authNotRequired;
  if (isNotFoundPage || authNotRequired || isPublicPage) {
    next();
  } else if (isLoginPage && userDataStore.valid) {
    next('/home');
  } else if (isLoginPage && !userDataStore.valid) {
    next();
  } else if (!isLoginPage && !userDataStore.valid) {
    if (to.meta.publicRedirect && config.publicPageEnabled) {
      next({name: to.meta.publicRedirect, params: to.params});
    } else {
      next({path: '/login', query: { redirect: to.fullPath }});
    }
  } else if (isAdminPage && !userDataStore.isAdministrator) {
    next('/404');
  } else if (isAdminPage && userDataStore.isAdministrator) {
    next();
  } else if (!isStrictPage && (strictModeStore.clientStrictMode || strictModeStore.serverStrictMode)) {
    if (strictModeStore.serverStrictMode && !strictModeStore.clientStrictMode && userDataStore.isAdministrator) {
      next();
    } else if (to.meta.strictRedirect) {
      next({name: to.meta.strictRedirect, params: to.params});
    } else {
      next('/404');
    }
  } else {
    next();
  }
});

export default router;
