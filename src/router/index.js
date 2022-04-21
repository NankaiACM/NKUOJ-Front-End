import Vue from 'vue'
import Router from 'vue-router'

const appUniversal = () => import('../templates/app-universal.vue')
const appContest = () => import('../templates/app-contest')
const appAdministrator = () => import('../templates/app-administrator')

const loginPage = () => import('../pages/login')
const coursePage = () => import('../pages/course')
const homePage = () => import('../pages/home')
const problemsPage = () => import('../pages/problems')
const coursesPage = () => import('../pages/courses')
const examsPage = () => import('../pages/exams')
const contestsPage = () => import('../pages/contests')
const statusPage = () => import('../pages/status')
const submissionPage = () => import('../pages/submission')
const problemPage = () => import('../pages/problem')
const notFoundPage = () => import('../pages/404')
const profilePage = () => import('../pages/profile')
const contestAuthorizePage = () => import('../pages/authorize')
const assignmentPage = () => import('../pages/assignment')
const examPage = () => import('../pages/exam')
const assignmentsPage = () => import('../pages/assignments')
const announcementsPage = () => import('../pages/announcements')
const announcementPage = () => import('../pages/announcement')
const administratorHomePage = () => import('../pages/admin/admin-home')
const administratorProblemPage = () => import('../pages/admin/problem-page')
const administratorRejudgePage = () => import('../pages/admin/rejudge-page')
const administratorStatisticsPage = () => import('../pages/admin/statistics-page')
const administratorContestPage = () => import('../pages/admin/contest-page')
const administratorAssignmentPage = () => import('../pages/admin/assignment-page')
const administratorCoursePage = () => import('../pages/admin/course-page')
const administratorAnnouncementPage = () => import('../pages/admin/announcement-page')
const administratorUserPage = () => import('../pages/admin/user-page')

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
      { path: '/exam/:examId', component: examPage },
      { path: '/', redirect: '/login', meta: { isLoginPage: true } },
    ]
  }, {
    path: '/login',
    component: loginPage,
    meta: { isLoginPage: true }
  }, {
    path: '/contest',
    component: appContest,
    children: [
      {
        path: '/contest/:contestId/authorize',
        component: contestAuthorizePage,
        meta: { isContestPage: true }
      }
    ]
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
      { path: '/admin/contest', component: administratorContestPage, meta: { isAdministrator: true } },
      { path: '/admin/assignment', component: administratorAssignmentPage, meta: { isAdministrator: true } },
      { path: '/admin/course', component: administratorCoursePage, meta: { isAdministrator: true } },
      { path: '/admin/announcement', component: administratorAnnouncementPage, meta: { isAdministrator: true } },
      { path: '/admin/user', component: administratorUserPage, meta: { isAdministrator: true } },
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
