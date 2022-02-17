<template>
  <b-card header="一言">
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-skeleton width="85%"></b-skeleton>
        <b-skeleton width="55%"></b-skeleton>
        <b-skeleton width="70%"></b-skeleton>
      </template>
      <blockquote class="blockquote mb-0">
        <h6 class="text-muted text-center">{{ hitokotoData.hitokoto }}</h6>
        <footer class="blockquote-footer text-right">
          {{hitokotoData.from}}
        </footer>
      </blockquote>
    </b-skeleton-wrapper>
  </b-card>
</template>

<script>
import code2str from '../../util/code'

export default {
  name: "hitokoto",
  data() {
    return {
      hitokotoData: {},
      loading: true
    }
  },
  methods: {
    requestHitokoto: function () {
      this.$http.get('https://v1.hitokoto.cn').then(res => {
        this.hitokotoData = res.data
        this.loading = false
      }, e => {
        this.hitokotoData = {
          from: 'HTTP Response',
          hitokoto: code2str(e.status)
        }
        this.loading = false
      })
    }
  },
  mounted() {
    this.requestHitokoto()
  }
}
</script>

<style scoped>

</style>
