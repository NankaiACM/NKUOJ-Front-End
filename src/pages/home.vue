<template>
<div id="home">
  <div id="home-content" class="container">
    <div class="row">
      <div class="col-md-8">
        <user-contests class="mb-2"></user-contests>
        <user-courses class="mb-2"></user-courses>
        <user-assignments class="mb-2"></user-assignments>
      </div>
      <div class="col-md-4">
        <user-panel class="mb-2"></user-panel>
        <hitokoto class="mb-2"></hitokoto>
        <association-poster></association-poster>
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
import hitokoto from '../components/home/hitokoto'
import associationPoster from "@/components/home/association-poster";

export default {
  name: 'component-home',
  components: {
    userPanel,
    userCourses,
    userAssignments,
    userContests,
    hitokoto,
    associationPoster
  },
  methods: {
    logIn () {
    }
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
