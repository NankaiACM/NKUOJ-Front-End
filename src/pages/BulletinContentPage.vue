<template>
  <div class="container mb-4">
    <div class="d-flex justify-content-start align-items-center ms-3 mb-3 me-3">
      <span class="text-purple page-title">{{ announcement.title }}</span>
    </div>
    <p class="text-purple ms-3">
      公告 #{{ this.$route.params.id }} | {{getLocaleDate(announcement.time)}}
    </p>
    <div class="card announcement-card-min-height rounded-4 bg-light border-0 p-4">
      <pre>{{announcement.content}}</pre>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dateToStr from "@/util/date-to-str";

export default {
  name: "BulletinContentPage",
  data: function () {
    return {
      loading: true,
      error: false,
      announcement: {}
    }
  },
  mounted() {
    this.loading = true;
    this.error = false;
    axios.get(`/api/announcement/id/${this.$route.params.id}`).then(res => {
      this.announcement = res.data;
      this.loading = false;
      this.error = false;
    }, () => {
      this.loading = false;
      this.error = true;
    });
  },
  methods: {
    getLocaleDate: function (string) {
      return dateToStr(string);
    }
  }
}
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  word-break: keep-all;
}
.announcement-card-min-height {
  min-height: 20rem;
}
</style>
