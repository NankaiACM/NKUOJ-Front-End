<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-4"><b-icon icon="gear"></b-icon>管理中心</h1>
      <p class="lead">管理题目、作业、比赛、考试、用户等。</p>
      <hr class="my-4">
      <b-button variant="info" @click="$router.push('/home')"><b-icon icon="house"></b-icon>返回主站</b-button>
    </div>

    <div class="row">
      <div class="col-md-4 p-3 d-flex" v-for="route in routes" :key="route.href">
        <div class="card flex-fill">
          <div class="card-header text-center">
            <b-link @click="$router.push(route.href)" class="card-link text-dark stretched-link">
              <b-icon :icon="route.icon" class="mr-1"></b-icon>{{route.title }} </b-link>
          </div>
          <div class="card-body">
            <p class="card-text text-center">{{ route.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin-home-page',
  data: function () {
    return {
      routes: [{
        title: '题目管理',
        icon: 'file-word',
        href: '/admin/problem',
        description: '创建、修改、克隆题目和上传下载数据。'
      }, {
        title: '重测',
        icon: 'arrow-left-right',
        href: '/admin/rejudge',
        description: '对题目的所有提交或者单个提交进行重测。'
      }, {
        title: '题目完成数据',
        icon: 'clipboard-data',
        href: '/admin/statistics',
        description: '查看和下载题目完成数据。'
      },
      ]
    }
  }
}
</script>

<style scoped>

</style>
