<template>
  <nav class="navbar navbar-expand p-4">
    <div class="container">
      <a href="/">
        <img class="head-bar-slogan" src="../../assets/nkuoj-slogan.svg" alt="Nankai University Online Judge">
      </a>
      <div class="navbar-nav me-auto mb-2 mb-lg-0 d-none d-sm-block h-100">
        <div class="d-inline-flex align-items-center">
          <span class="text-purple" style="font-size: x-large;">公开页面</span>
        </div>
      </div>
      <div class="nav-item dropdown d-none d-sm-block">
        <a class="nav-link dropdown-toggle text-purple" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          菜单
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="/login">前往登录</a></li>
        </ul>
      </div>
      <div class="nav-item dropstart d-block d-sm-none">
        <a class="nav-link dropdown-toggle text-purple" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          菜单
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="/login">前往登录</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>


export default {
  name: 'HeadBarPublic',
  methods: {

  }
}
</script>

<style>
.head-bar-slogan {
  height: 50px;
  margin: 10px;
}
</style>
