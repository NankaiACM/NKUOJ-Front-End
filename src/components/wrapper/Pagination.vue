<template>
  <nav>
    <ul class="pagination">
      <li class="page-item">
        <button class="page-link" @click="this.prevPage()" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      <li :class="`${i === Number(this.modelValue) ? 'page-item active' : 'page-item'}`" v-if="smallPaginationIndicator" v-for="i in lastPageNumber" :key="i">
        <button class="page-link" @click="this.changePage(i)" >{{ i }}</button>
      </li>

      <li :class="`${i === Number(this.modelValue) ? 'page-item active' : 'page-item'}`" v-if="leftIndicator" v-for="i in 5" :key="i">
        <button class="page-link" @click="this.changePage(i)" >{{ i }}</button>
      </li>
      <li class="page-item disabled" v-if="leftIndicator"><button class="page-link">...</button></li>
      <li class="page-item" v-if="leftIndicator"><button class="page-link" @click="this.changePage(this.lastPageNumber)" >{{ this.lastPageNumber }}</button></li>

      <li class="page-item" v-if="rightIndicator"><button class="page-link" @click="this.changePage(this.firstPageNumber)" >{{ this.firstPageNumber }}</button></li>
      <li class="page-item disabled" v-if="rightIndicator"><button class="page-link">...</button></li>
      <li :class="`${this.lastPageNumber - (5 - i) === Number(this.modelValue) ? 'page-item active' : 'page-item'}`" v-if="rightIndicator" v-for="i in 5" :key="i">
        <button class="page-link" @click="this.changePage(this.lastPageNumber - (5 - i))" >{{ this.lastPageNumber - (5 - i) }}</button>
      </li>

      <li class="page-item" v-if="normalIndicator"><button class="page-link" @click="this.changePage(this.firstPageNumber)" >{{ this.firstPageNumber }}</button></li>
      <li class="page-item disabled" v-if="normalIndicator"><button class="page-link">...</button></li>
      <li :class="`${i === 2 ? 'page-item active' : 'page-item'}`" v-if="normalIndicator" v-for="i in 3" :key="i">
        <button class="page-link" @click="this.changePage(Number(this.modelValue) + i - 2)" >{{ Number(this.modelValue) + i - 2 }}</button>
      </li>
      <li class="page-item disabled" v-if="normalIndicator"><button class="page-link">...</button></li>
      <li class="page-item" v-if="normalIndicator"><button class="page-link" @click="this.changePage(this.lastPageNumber)" >{{ this.lastPageNumber }}</button></li>

      <li class="page-item">
        <button class="page-link" @click="this.nextPage()" aria-label="Next" >
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    perPage: Number,
    totalRows: Number,
    modelValue: Number
  },
  computed: {
    lastPageNumber: function () {
      return Math.ceil(this.totalRows / this.perPage);
    },
    firstPageNumber: function () {
      return 1;
    },
    leftIndicator: function () {
      return Number(this.modelValue) - this.firstPageNumber <= 3 && !this.smallPaginationIndicator;
    },
    rightIndicator: function () {
      return this.lastPageNumber - Number(this.modelValue) <= 3 && !this.smallPaginationIndicator;
    },
    smallPaginationIndicator: function () {
      return this.lastPageNumber <= 7;
    },
    normalIndicator: function () {
      return !this.smallPaginationIndicator && !this.leftIndicator && !this.rightIndicator;
    }
  },
  methods: {
    changePage: function (v) {
      this.$emit('update:modelValue', v);
    },
    prevPage: function () {
      if (Number(this.modelValue) > 1) {
        this.$emit('update:modelValue', Number(this.modelValue) - 1);
      }
    },
    nextPage: function () {
      if (Number(this.modelValue) < this.lastPageNumber) {
        this.$emit('update:modelValue', Number(this.modelValue) + 1);
      }
    }
  }
}
</script>

<style scoped>

</style>
