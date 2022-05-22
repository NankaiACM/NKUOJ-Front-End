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
        <hitokoto-panel class="mb-2"></hitokoto-panel>
        <jump-panel class="mb-2"></jump-panel>
        <association-poster-panel class="mb-2"></association-poster-panel>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import userPanel from '../../components/home/user-panel'
import userCoursesPanel from '../../components/home/user-courses-panel'
import userAssignmentsPanel from '../../components/home/user-assignments-panel'
import userContestsPanel from '../../components/home/user-contests-panel'
import userExamsPanel from '../../components/home/user-exams-panel'
import associationPosterPanel from "@/components/home/association-poster-panel";
import AnnouncementsPanel from "@/components/home/announcements-panel";
import HitokotoPanel from "@/components/home/hitokoto-panel";
import JumpPanel from "@/components/home/jump-panel";

export default {
  name: 'tab-home',
  components: {
    JumpPanel,
    HitokotoPanel,
    AnnouncementsPanel,
    userPanel,
    userCoursesPanel,
    userAssignmentsPanel,
    userExamsPanel,
    userContestsPanel,
    associationPosterPanel
  },
  methods: {
  },
  computed: {
  },
  mounted () {
    console.log(`%c
      ___           ___           ___           ___           ___           ___
     /\\  \\         /|  |         /\\  \\         /\\  \\         /\\__\\         /\\  \\
     \\:\\  \\       |:|  |         \\:\\  \\       /::\\  \\       /:/  /        |::\\  \\
      \\:\\  \\      |:|  |          \\:\\  \\     /:/\\:\\  \\     /:/  /         |:|:\\  \\
  _____\\:\\  \\   __|:|  |      ___  \\:\\  \\   /:/ /::\\  \\   /:/  /  ___   __|:|\\:\\  \\
 /::::::::\\__\\ /\\ |:|__|____ /\\  \\  \\:\\__\\ /:/_/:/\\:\\__\\ /:/__/  /\\__\\ /::::|_\\:\\__\\
 \\:\\~~\\~~\\/__/ \\:\\/:::::/__/ \\:\\  \\ /:/  / \\:\\/:/  \\/__/ \\:\\  \\ /:/  / \\:\\~~\\  \\/__/
  \\:\\  \\        \\::/~~/~      \\:\\  /:/  /   \\::/__/       \\:\\  /:/  /   \\:\\  \\
   \\:\\  \\        \\:\\~~\\        \\:\\/:/  /     \\:\\  \\        \\:\\/:/  /     \\:\\  \\
    \\:\\__\\        \\:\\__\\        \\::/  /       \\:\\__\\        \\::/  /       \\:\\__\\
     \\/__/         \\/__/         \\/__/         \\/__/         \\/__/         \\/__/

     @NKUACM 2022
`, 'color: #6cf')
    console.log('%c Release 3.0.0. Sunrisefox & Saurus & 墨染 SaucerHi & 什锦 & Alexhaoge & ArcanusNEO & Listerily', 'color: #6cf')
  }
}
</script>
<style lang="less" scoped>

#home {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
}
</style>
