<template>
  <b-overlay :show="loading" spinner-variant="secondary" spinner-type="grow" spinner-small rounded="sm">
    <b-card header="一言">
      <blockquote class="blockquote mb-0">
        <h6 class="text-muted text-center">{{ hitokotoData.hitokoto }}</h6>
        <footer class="blockquote-footer text-right">
          {{hitokotoData.from}}
        </footer>
      </blockquote>
    </b-card>
  </b-overlay>
</template>

<script>
import code2str from '../../code/code'

export default {
  name: "hitokoto",
  data() {
    return {
      hitokotoData: {
        from: '二次元入口',
        hitokoto: '这条一言去二次元玩啦，你可以等它一会儿。'
      },
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
          from: 'Http Response',
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
