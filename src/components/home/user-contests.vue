<template>
  <b-card no-body header="我报名的竞赛或考试" v-if="contests.length > 0 && false">
    <b-list-group flush>
      <b-list-group-item button @click="onItemClicked(contest)" v-for="contest in contests" v-bind:key="contest.id">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{contest.name}}</h5>
          <small v-if="contest.status === 0" class="text-info">正在进行</small>
          <small v-if="contest.status === 1" class="text-muted">将在{{contest.time}}开始</small>
        </div>
      </b-list-group-item>
    </b-list-group>

  </b-card>
</template>

<script>
export default {
  name: 'user-contests',
  data: function () {
    return {
      password: '',
      securityCode: '',
      contests: []
    }
  },
  methods: {
    onItemClicked: function (contest) {
      if (contest.status === 0) {
        this.$router.push(`/contest/${this.$route.params.contestId}/authorize`)
      } else {
        this.$bvModal.msgBoxOk(`${contest.name} 未开始，请开始后再进入。`, {title: '提示', okTitle: '返回'})
      }
    },
    submit: function () {

    }
  },
  mounted () {
    this.$http.get(`${window.backendOrigin}/api/user/contests`).then(res => {
      this.contests = res.data.contests
    })
  }
}
</script>

<style scoped>

</style>
