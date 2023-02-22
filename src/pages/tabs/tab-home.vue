<template>
<div>
  <div id="home-content" class="container">
    <div class="row">
      <div class="col-md-8">
        <announcements-panel class="mb-2"></announcements-panel>
        <user-courses-panel class="mb-2"></user-courses-panel>
        <user-assignments-panel class="mb-2"></user-assignments-panel>
        <user-exams-panel class="mb-2"></user-exams-panel>
        <user-contests-panel class="mb-2"></user-contests-panel>
      </div>
      <div class="col-md-4">
        <user-panel class="mb-2"></user-panel>
        <jump-panel class="mb-2"></jump-panel>
        <association-poster-panel class="mb-2"></association-poster-panel>
      </div>
    </div>
  </div>
</div>
</template>
<script>
const userPanel = () => import('../../components/home/user-panel')
const userCoursesPanel = () => import('../../components/home/user-courses-panel')
const userAssignmentsPanel = () => import('../../components/home/user-assignments-panel')
const userContestsPanel = () => import('../../components/home/user-contests-panel')
const userExamsPanel = () => import('../../components/home/user-exams-panel')
const associationPosterPanel = () => import('@/components/home/association-poster-panel')
const AnnouncementsPanel = () => import('@/components/home/announcements-panel')
const JumpPanel = () => import('@/components/home/jump-panel')

export default {
  name: 'tab-home',
  components: {
    JumpPanel,
    AnnouncementsPanel,
    userPanel,
    userCoursesPanel,
    userAssignmentsPanel,
    userExamsPanel,
    userContestsPanel,
    associationPosterPanel
  }
}
</script>
<style lang="less">
</style>
