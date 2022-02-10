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
        <div class="card mb-2">
          <div class="card-body">
            <h5 class="card-title">网站开发正在进行</h5>
            <h6 class="card-subtitle mb-2 text-muted">班级、作业等基本功能已经完成。</h6>
            <h6 class="card-subtitle mb-2 text-muted">竞赛、考试会尽快上线。</h6>
          </div>
        </div>
        <div class="card mb-2">
          <div class="card-body">
            <h5 class="card-title">南开大学ACM算法协会</h5>
            <h6 class="card-subtitle mb-2 text-muted">纳新喵~</h6>
            <img class="img-fluid" src="../assets/qq-group.jpg" alt="QQ Group ID: 1001918732">
          </div>
        </div>
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

export default {
  name: 'component-home',
  components: {
    userPanel,
    userCourses,
    userAssignments,
    userContests
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
