import Vue from 'vue'
import Router from 'vue-router'

const appUniversal = () => import('../templates/app-universal.vue')
const appAdministrator = () => import('../templates/app-administrator')

const loginPage = () => import('../pages/login')
const coursePage = () => import('../pages/entities/entity-page-course')
const homePage = () => import('../pages/tabs/tab-home')
const problemsPage = () => import('../pages/tabs/tab-problems')
const coursesPage = () => import('../pages/tabs/tab-courses')
const examsPage = () => import('../pages/tabs/tab-exams')
const contestsPage = () => import('../pages/tabs/tab-contests')
const statusPage = () => import('../pages/tabs/tab-status')
const submissionPage = () => import('../pages/entities/entity-page-submission')
const problemPage = () => import('../pages/entities/entity-page-problem')
const notFoundPage = () => import('../pages/404')
const profilePage = () => import('../pages/profile')
const assignmentPage = () => import('../pages/entities/entity-page-assignment')
const examPage = () => import('../pages/entities/entity-page-exam')
const contestPage = () => import('../pages/entities/entity-page-contest')
const assignmentsPage = () => import('../pages/tabs/tab-assignments')
const announcementsPage = () => import('../pages/tabs/tab-announcements')
const announcementPage = () => import('../pages/entities/entity-page-announcement')
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
      { path: '/home', component: homePage },
      { path: '/problems', component: problemsPage },
      { path: '/courses', component: coursesPage },
      { path: '/status', component: statusPage },
      { path: '/announcements', component: announcementsPage },
      { path: '/assignments', component: assignmentsPage },
      { path: '/exams', component: examsPage },
      { path: '/contests', component: contestsPage },
      { path: '/notFound', component: notFoundPage },
      { path: '/profile', component: profilePage },
      { path: '/problem/:problemId', component: problemPage },
      { path: '/announcement/:announcementId', component: announcementPage },
      { path: '/course/:courseId', component: coursePage },
      { path: '/submission/:submissionId', component: submissionPage },
      { path: '/assignment/:assignmentId', component: assignmentPage },
      { path: '/contest/:contestId', component: contestPage },
      { path: '/exam/:examId', component: examPage },
      { path: '/', redirect: '/login', meta: { isLoginPage: true } },
    ]
  }, {
    path: '/login',
    component: loginPage,
    meta: { isLoginPage: true }
  }, {
    path: '/admin',
    component: appAdministrator,
    children: [
      {
        path: '/admin/home',
        component: administratorHomePage,
        meta: { isAdministrator: true }
      },
      { path: '/admin', redirect: '/admin/home', meta: { isAdministrator: true } },
      { path: '/admin/problem', component: administratorProblemPage, meta: { isAdministrator: true } },
      { path: '/admin/statistics', component: administratorStatisticsPage, meta: { isAdministrator: true } },
      { path: '/admin/rejudge', component: administratorRejudgePage, meta: { isAdministrator: true } },
    ]
  }, {
    path: '/logout',
    meta: {isLogout: true}
  }, {
    path: '*',
    component: notFoundPage
  }]
})
router.beforeEach((to, from, next) => {
  let store = router.app.$options.store
  const isLogout = to.matched.some((record) => record.meta.isLogout)
  const isLoginPage = to.matched.some((record) => record.meta.isLoginPage)
  if (isLogout) {
    Vue.http.get(`${window.backendOrigin}/api/logout`)
    store.commit('clearUserData')
    next('/login')
  } else if (isLoginPage && store.getters.isUserLogin) {
    next('/home')
  } else if (!isLoginPage && !store.getters.isUserLogin) {
    next('/login')
  } else {
    next()
  }
})
export default router
