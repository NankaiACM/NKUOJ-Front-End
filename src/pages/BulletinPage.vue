<template>
  <div class="container mb-4">
    <div class="d-flex justify-content-start align-items-center ms-3 mb-3 me-3">
      <IconMegaphone class="text-purple me-2"/>
      <span class="text-purple page-title">全站公告</span>
    </div>
    <p class="text-purple ms-3">
      站务消息，包括维护通知、运行状态等。
    </p>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div class="col" v-for="announcement in announcements" :key="announcement.id">
        <div class="card rounded-4 h-100">
          <div class="card-body">
            <h5 class="card-title"><span class="badge rounded-pill text-bg-secondary me-2" v-if="announcement.top">置顶</span>{{announcement.title}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{getLocaleDate(announcement.time)}}</h6>
          </div>
          <div class="card-footer text-muted bg-transparent">
            <a :href="`/announcement/${announcement.id}`" class="card-link text-decoration-none text-purple">查看详情</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconMegaphone from "@/components/icons/IconMegaphone.vue";
import axios from "axios";
import dateToStr from "@/util/date-to-str";

export default {
  name: "BulletinPage",
  components: {IconMegaphone},
  data: function () {
    return {
      announcements: [],
      loading: true
    }
  },
  mounted() {
    axios.get(`/api/announcement/global`).then(res => {
      this.announcements = res.data
      this.loading = false
    });
  },
  methods: {
    getLocaleDate: function (string) {
      return dateToStr(string)
    }
  }
}</script>

<style scoped>

</style>
