<template>
<div class="container mb-4">
  <div class="d-flex justify-content-start align-items-center ms-3 mb-3 me-3">
    <span class="text-purple page-title">评测记录</span>
  </div>
  <p class="text-purple ms-3">
    #{{ this.$route.params.id }}
  </p>
  <div class="row">
    <div class="col-md-8 col-12 order-last order-md-first">
      <CardTestCase :details="data.detail" class="mb-2" :loading="loading" :error="error"></CardTestCase>
      <CardCode :code="data.code" :lang="data.langId" class="mb-2" :loading="loading" :error="error"></CardCode>
    </div>
    <div class="col-md-4 col-12 order-first order-md-last">
      <div class="card rounded-4 bg-light border-0 p-4 mb-2">
        <h5 class="d-inline-flex align-items-center mb-3">
          <IconListColumnsReverse/>
          <span class="ms-2 me-1">提交属性</span>
          <IconChevronDoubleRightSmall/>
        </h5>
        <p><span class="h6">编号：</span>{{ $route.params.id }}</p>
        <p><span class="h6">用户：</span>[u:{{ getUserIdText(data.uid) }}] @{{ data.nickname }}</p>
        <p><span class="h6">题目：</span><a :href="`/problem/${data.pid}`" class="text-purple text-decoration-none">{{ data.name }}<IconBoxArrowInUpRightSmall class="ms-1"/></a></p>
        <p><span class="h6">时间：</span>{{ getLocaleDate(data.when) }}</p>
        <p><span class="h6">公开：</span>{{ data.share ? '是' : '否' }}</p>
        <p><span class="h6">语言：</span>{{ getLangText(data.langId) }}</p>
        <p><span class="h6">用时：</span>{{ data.runTime }} ms</p>
        <p><span class="h6">内存：</span>{{ data.runMemory }} KiB</p>
        <p v-if="data.compileInfo"><span class="h6">编译：</span><a @click="showCompilationInfo()" href="#" class="text-purple text-decoration-none">查看编译信息</a></p>
        <p><span class="h6">判定：</span><span :class="`text-${getStatusVariant(data.statusId)}`">{{getStatusText(data.statusId)}}</span></p>
        <p v-if="data.score !== null"><span class="h6">分数：</span><span :class="`ml-4 text-${getVariantForScore(data.score)}`">{{data.score}}分</span></p>
      </div>
    </div>
  </div>
  <ModalCompilationOutput ref="modal_compilation_output"/>
</div>
</template>

<script>
import IconListColumnsReverse from "@/components/icons/IconListColumnsReverse.vue";
import IconChevronDoubleRightSmall from "@/components/icons/IconChevronDoubleRightSmall.vue";
import dateToStr from "@/util/date-to-str";
import langCodeToText from "@/util/lang-code-to-text";
import statusCodeToVariantStr from "@/util/status-code-to-variant-str";
import statusCodeToStr from "@/util/status-code-to-str";
import axios from "axios";
import IconBoxArrowInUpRightSmall from "@/components/icons/IconBoxArrowInUpRightSmall.vue";
import uidToStr from "@/util/uid-to-str";
import CardTestCase from "@/components/submission/CardTestCase.vue";
import CardCode from "@/components/submission/CardCode.vue";
import ModalCompilationOutput from "@/components/modal/ModalCompilationOutput.vue";

export default {
  name: "SubmissionPage",
  components: {
    ModalCompilationOutput,
    CardCode,
    CardTestCase, IconBoxArrowInUpRightSmall, IconChevronDoubleRightSmall, IconListColumnsReverse},
  data: function () {
    return {
      sid: 0,
      loading: true,
      data: {},
      error: false
    }
  },
  methods: {
    loadSubmissionData: function () {
      this.sid = this.$route.params.id;
      this.loading = true;
      this.error = false;
      axios.get(`/api/solution/id/${this.sid}`).then(res => {
        this.data = res.data;
        this.loading = false;
        this.error = false;
      }, e => {
        if (e.response.status === 403) {
          this.loading = false;
          this.error = false;
        } else {
          this.error = true;
          this.loading = false;
        }
      })
    },
    getStatusText: function (status) {
      return statusCodeToStr(status)
    },
    getStatusVariant: function (status) {
      return statusCodeToVariantStr(status)
    },
    getLangText: function (id) {
      return langCodeToText(id)
    },
    getLocaleDate: function (string) {
      return dateToStr(string)
    },
    getUserIdText: function (uid) {
      return uidToStr(uid);
    },
    getVariantForScore: function (score) {
      if (score <= 0) {
        return 'danger'
      } else if (score >= 100) {
        return 'success'
      }
      return 'warning'
    },
    showCompilationInfo: function () {
      this.$refs.modal_compilation_output.show(this.data.compileInfo);
    }
  },
  mounted() {
    this.loadSubmissionData()
  }
}
</script>

<style scoped>

</style>
