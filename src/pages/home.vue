<template>
<div id="home">
  <div id="home-content" class="container">
    <div class="row">
      <div class="col-md-8">
        <announcements-panel class="mb-2"></announcements-panel>
        <user-courses class="mb-2"></user-courses>
        <user-assignments class="mb-2"></user-assignments>
        <user-contests class="mb-2"></user-contests>
      </div>
      <div class="col-md-4">
        <user-panel class="mb-2"></user-panel>
        <hitokoto class="mb-2"></hitokoto>
        <jump-panel class="mb-2"></jump-panel>
        <association-poster class="mb-2"></association-poster>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import userPanel from '../components/home/user-panel'
import userCourses from '../components/home/user-courses'
import userAssignments from '../components/home/user-assignments'
import userContests from '../components/home/user-contests'
import associationPoster from "@/components/home/association-poster";
import AnnouncementsPanel from "@/components/home/announcements-panel";
import Hitokoto from "@/components/home/hitokoto";
import JumpPanel from "@/components/home/jump-panel";

export default {
  name: 'component-home',
  components: {
    JumpPanel,
    Hitokoto,
    AnnouncementsPanel,
    userPanel,
    userCourses,
    userAssignments,
    userContests,
    associationPoster
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
