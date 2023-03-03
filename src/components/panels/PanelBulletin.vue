<template>
  <div>
    <h5 class="ms-3 d-inline-flex align-items-center">
      <IconMegaphone/>
      <span class="ms-2 me-1">全站公告</span>
      <IconChevronDoubleRightSmall/>
    </h5>
    <div class="list-group list-group-flush">
      <a class="list-group-item list-group-item-action list-group-item-transparent"
         v-for="i in Array(4).keys()" v-bind:key="i" v-if="loading"><span class="placeholder-glow"><span :class="`placeholder col-${Math.floor(Math.random() * 6 + 6)}`"></span></span>
      </a>
      <a :href="`/announcement/${announcement.id}`" class="list-group-item list-group-item-action list-group-item-transparent"
         v-for="announcement in announcements" v-bind:key="announcement.id" v-else>{{announcement.title}}
      </a>
      <a class="list-group-item list-group-item-action list-group-item-transparent text-muted"
         href="/announcements">查看全部公告<IconChevronDoubleRightSmall/></a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import IconChevronDoubleRightSmall from "@/components/icons/IconChevronDoubleRightSmall.vue";
import IconMegaphone from "@/components/icons/IconMegaphone.vue";

export default {
  name: "PanelBulletin",
  components: {IconMegaphone, IconChevronDoubleRightSmall},
  data: function () {
    return {
      announcements: [],
      loading: true,
      statusCode: 200,
      hasMoreAnnouncements: false,
      announcementsLimit: 4
    }
  },
  mounted () {
    axios.get(`/api/announcement/global?limit=${this.announcementsLimit}`).then(res => {
      this.announcements = res.data
      this.loading = false
    }, e => {
      this.statusCode = e.status
      this.loading = false
    })
  }
}
</script>

<style scoped>

</style>
