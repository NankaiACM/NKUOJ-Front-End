<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-4">管理中心</h1>
      <p class="lead">管理题目、作业、比赛、考试、用户等。</p>
      <hr class="my-4">
      <b-button variant="info" href="/">返回主站</b-button>
    </div>

    <div class="row">
      <div class="col-md-4 p-3 d-flex" v-for="route in routes" :key="route">
        <div class="card flex-fill">
          <div class="card-header text-center">
            <a :href="route.href" class="card-link text-dark">{{route.title}}</a>
          </div>
          <div class="card-body">
            <p class="card-text text-center">{{route.description}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin-home',
  data: function () {
    return {
      routes: [ {
        title: '题目管理',
        href: '/admin/problem',
        description: '创建和修改题目。'
       }, //{
      //   title: '作业管理',
      //   href: '/admin/assignment',
      //   description: '创建、修改、分发作业，分发作业需要指定课程。在此查看作业完成情况。'
      // }, {
      //   title: '课程管理',
      //   href: '/admin/course',
      //   description: '创建、修改课程。为课程添加学生。'
      // }, {
      //   title: '竞赛和考试管理',
      //   href: '/admin/contest',
      //   description: '注册、修改竞赛和考试，亦可批量报名考试。'
      // }, {
      //   title: '公告管理',
      //   href: '/admin/announcement',
      //   description: '创建、修改公告。'
      // }, {
      //   title: '用户数据管理',
      //   href: '/admin/user',
      //   description: '修改用户数据、授权。'
      // }
      ]
    }
  }
}
</script>

<style scoped>

</style>
