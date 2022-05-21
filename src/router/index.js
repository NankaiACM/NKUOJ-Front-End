import Vue from 'vue'
import Router from 'vue-router'

const appUniversal = () => import('../templates/app-universal.vue')
const appAdministrator = () => import('../templates/app-administrator')
const appStrict = () => import('../templates/app-strict')

const loginPage = () => import('../pages/login-page')
const coursePage = () => import('../pages/entities/entity-page-course')
const homePage = () => import('../pages/tabs/tab-home')
const problemsPage = () => import('../pages/tabs/tab-problems')
const coursesPage = () => import('../pages/tabs/tab-courses')
const examsPage = () => import('../pages/tabs/tab-exams')
const contestsPage = () => import('../pages/tabs/tab-contests')
const statusPage = () => import('../pages/tabs/tab-status')
const submissionPage = () => import('../pages/entities/entity-page-submission')
const problemPage = () => import('../pages/entities/entity-page-problem')
const notFoundPage = () => import('../pages/404-page')
const profilePage = () => import('../pages/profile-page')
const assignmentPage = () => import('../pages/entities/entity-page-assignment')
const examPage = () => import('../pages/entities/entity-page-exam')
const contestPage = () => import('../pages/entities/entity-page-contest')
const assignmentsPage = () => import('../pages/tabs/tab-assignments')
const announcementsPage = () => import('../pages/tabs/tab-announcements')
const announcementPage = () => import('../pages/entities/entity-page-announcement')
const rankingContestPage = () => import('../pages/entities/entity-page-ranking-contest')
const rankingExamPage = () => import('../pages/entities/entity-page-ranking-exam')
const strictHomePage = () => import('../pages/strict/strict-home-page')
const administratorHomePage = () => import('../pages/admin/admin-home-page')
const administratorProblemPage = () => import('../pages/admin/admin-problem-page')
const administratorRejudgePage = () => import('../pages/admin/admin-rejudge-page')
const administratorStatisticsPage = () => import('../pages/admin/admin-statistics-page')

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: appUniversal,
    children: [
      { path: '/home', component: homePage, meta: { strictRedirect: 'strictHome' } },
      { path: '/problems', component: problemsPage },
      { path: '/courses', component: coursesPage },
      { path: '/status', component: statusPage },
      { path: '/announcements', component: announcementsPage },
      { path: '/assignments', component: assignmentsPage },
      { path: '/exams', component: examsPage },
      { path: '/contests', component: contestsPage },
      { path: '/profile', component: profilePage },
      { path: '/problem/:problemId', component: problemPage, meta: { strictRedirect: 'strictProblem' } },
      { path: '/announcement/:announcementId', component: announcementPage },
      { path: '/course/:courseId', component: coursePage },
      { path: '/submission/:submissionId', component: submissionPage, meta: { strictRedirect: 'strictSubmission' }},
      { path: '/assignment/:assignmentId', component: assignmentPage },
      { path: '/ranking/contest/:contestId', component: rankingContestPage, meta: { strictRedirect: 'strictRankingContest' } },
      { path: '/ranking/exam/:examId', component: rankingExamPage, meta: { strictRedirect: 'strictRankingExam' } },
      { path: '/contest/:contestId', component: contestPage, meta: { strictRedirect: 'strictContest' } },
      { path: '/exam/:examId', component: examPage, meta: { strictRedirect: 'strictExam' } },
      { path: '/', redirect: '/login', meta: { isLogin: true } },
    ]
  }, {
    path: '/login',
    component: loginPage,
    meta: { isLogin: true }
  }, {
    path: '/notFound',
    component: notFoundPage,
    meta: { isNotFound: true }
  }, {
    path: '/admin',
    component: appAdministrator,
    children: [
      { path: '/admin/home', component: administratorHomePage, meta: { isAdministrator: true }},
      { path: '/admin', redirect: '/admin/home', meta: { isAdministrator: true } },
      { path: '/admin/problem', component: administratorProblemPage, meta: { isAdministrator: true } },
      { path: '/admin/statistics', component: administratorStatisticsPage, meta: { isAdministrator: true } },
      { path: '/admin/rejudge', component: administratorRejudgePage, meta: { isAdministrator: true } },
    ]
  }, {
    path: '/strict',
    component: appStrict,
    children: [
      { path: '/strict/home', component: strictHomePage, name: 'strictHome', meta: { isStrict: true } },
      { path: '/strict', redirect: '/strict/home', name: 'strictRoot', meta: { isStrict: true } },
      { path: '/strict/problem/:problemId', component: problemPage, name: 'strictProblem', meta: { isStrict: true } },
      { path: '/strict/exam/:examId', name: 'strictExam', component: examPage, meta: { isStrict: true } },
      { path: '/strict/ranking/exam/:examId', name: 'strictRankingExam', component: rankingExamPage, meta: { isStrict: true } },
      { path: '/strict/contest/:contestId', name: 'strictContest', component: contestPage, meta: { isStrict: true } },
      { path: '/strict/ranking/contest/:contestId', name: 'strictRankingContest', component: rankingContestPage, meta: { isStrict: true } },
      { path: '/strict/submission/:submissionId', name: 'strictSubmission', component: submissionPage, meta: { isStrict: true } },
    ]
  }, {
    path: '/logout',
    meta: {isLogout: true}
  }, {
    path: '*',
    component: notFoundPage,
    meta: { isNotFound: true }
  }]
})
router.beforeEach((to, from, next) => {
  let store = router.app.$options.store
  const isLogoutPage = to.meta.isLogout
  const isLoginPage = to.meta.isLogin
  const isAdminPage = to.meta.isAdministrator
  const isStrictPage = to.meta.isStrict
  const isNotFoundPage = to.meta.isNotFound
  if (isNotFoundPage) {
    next()
  } else if (isLogoutPage) {
    Vue.http.get(`${window.backendOrigin}/api/logout`)
    store.commit('clearUserData')
    next('/login')
  } else if (isLoginPage && store.getters.isUserLogin) {
    next('/home')
  } else if (isLoginPage && !store.getters.isUserLogin) {
    next()
  } else if (!isLoginPage && !store.getters.isUserLogin) {
    next('/login')
  } else if (isAdminPage && !store.getters.isAdministrator) {
    next('/notFound')
  } else if (isAdminPage && store.getters.isAdministrator) {
    next()
  } else if (!isStrictPage && (store.getters.isClientStrictMode || store.getters.isServerStrictMode)) {
    if (store.getters.isServerStrictMode && !store.getters.isClientStrictMode && store.getters.isAdministrator) {
      next()
    } else if (to.meta.strictRedirect) {
      next({name: to.meta.strictRedirect, params: to.params})
    } else {
      next('/notFound')
    }
  } else {
    next()
  }
})
export default router
