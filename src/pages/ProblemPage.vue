<template>
  <div class="container mb-4">
    <div class="d-flex justify-content-start align-items-center ms-3 mb-3 me-3">
      <span class="text-purple page-title">{{ problemInfo.name }}</span>
    </div>
    <p class="text-purple ms-3">
      题目 | #{{ this.$route.params.id }}
    </p>
    <div class="row">
      <div class="col-md-8 col-12 order-last order-md-first">
        <CardProblemContent :loading="loading" ref="problem_content" :pid="$route.params.id" :error="error"/>
        <ButtonSubmit class="mb-2 d-md-none d-grid" :pid="$route.params.id" @submit="showSubmitModal()" @list="showMySubmissions()"/>
      </div>
      <div class="col-md-4 col-12 order-first order-md-last">
        <div class="card rounded-4 bg-light border-0 p-4 mb-2">
          <h5 class="d-inline-flex align-items-center mb-3">
            <IconListColumnsReverse/>
            <span class="ms-2 me-1">题目配置</span>
            <IconChevronDoubleRightSmall/>
          </h5>
          <p><span class="h6">题目名：</span>{{ problemInfo.name }}</p>
          <p><span class="h6">编号：</span>{{ $route.params.id }}</p>
          <p><span class="h6">测试点：</span>{{ problemInfo.cases }}</p>
          <p><span class="h6">时间限制：</span>{{ problemInfo.timeLimit }} ms</p>
          <p><span class="h6">空间限制：</span>{{ problemInfo.memoryLimit }} KiB</p>
          <p><span class="h6">完成状态：</span><span :class="['text-dark', 'text-warning', 'text-success'][problemInfo.status]">{{['未提交', '未通过', '已通过'][problemInfo.status]}}</span></p>
          <p><span class="h6">通过率：</span>{{ problemInfo.submitAc }} / {{ problemInfo.submitAll }}</p>
          <p><span class="h6">评测全部测试点：</span>{{ problemInfo.detailJudge ? '是' : '否' }}</p>
          <p><span class="h6">非文本比对评测：</span>{{ problemInfo.specialJudge ? '启用' : '未启用' }}</p>
        </div>
        <DropdownNavigator class="mb-2" :psid="problemInfo.psid" v-if="problemInfo.psid" :pid="$route.params.id"/>
        <ButtonSubmit class="mb-2 d-md-grid d-none" :pid="$route.params.id" @submit="showSubmitModal()" @list="showMySubmissions()"/>
      </div>
    </div>
    <ModalSubmitProblem ref="modal_submit_problem" :pid="$route.params.id"/>
    <ModalMySubmissions ref="modal_my_submissions" :pid="$route.params.id" :uid="userDataStore.uid"/>
  </div>
</template>

<script>
import axios from "axios";
import CardProblemContent from "@/components/problem/CardProblemContent.vue";
import ButtonSubmit from "@/components/problem/ButtonSubmit.vue";
import IconListColumnsReverse from "@/components/icons/IconListColumnsReverse.vue";
import IconChevronDoubleRightSmall from "@/components/icons/IconChevronDoubleRightSmall.vue";
import DropdownNavigator from "@/components/problem/DropdownNavigator.vue";
import ModalSubmitProblem from "@/components/modal/ModalSubmitProblem.vue";
import ModalMySubmissions from "@/components/modal/ModalMySubmissions.vue";
import {useUserDataStore} from "@/stores/user-data";

export default {
  name: "ProblemPage",
  components: {
    ModalMySubmissions,
    ModalSubmitProblem,
    DropdownNavigator, IconChevronDoubleRightSmall, IconListColumnsReverse, ButtonSubmit, CardProblemContent},
  data: function () {
    return {
      problemInfo: {},
      loading: true,
      content: '',
      extension: '',
      error: false,
    }
  },
  mounted() {
    this.loadProblemData()
  },
  setup() {
    const userDataStore = useUserDataStore()
    return {
      userDataStore
    }
  },
  methods: {
    loadProblemData: function () {
      this.loading = true;
      this.error = false;
      axios.get(`/api/problem/id/${this.$route.params.id}`).then(
        res => {
          this.problemInfo = res.data;
          this.content = btoa(this.Uint8ToBase64(new Uint8Array(this.problemInfo.content.data)));
          this.loading = false;
          this.error = false;
          this.$refs.problem_content.load(this.content, this.problemInfo.extension);
        }).catch(() => {
          this.error = true;
          this.loading = false;
      });
    },
    showSubmitModal: function () {
      this.$refs.modal_submit_problem.show();
    },
    showMySubmissions: function () {
      this.$refs.modal_my_submissions.show();
    },
    Uint8ToBase64: function (u8a) {
      const CHUNK_SZ = 0x8000;
      const c = [];
      for (let i = 0; i < u8a.length; i += CHUNK_SZ) {
        c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)));
      }
      return c.join("");
    }
  }, watch: {
    '$route': function () {
      this.loadProblemData();
    }
  }
}
</script>

<style scoped>

</style>
