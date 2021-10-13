<template>
  <div class="pagination">
    <div class="pagination--container" v-if="pagesQuantity > 1">
      <p
        v-for="pageNumber in pagesQuantity"
        :key="pageNumber"
        v-text="pageNumber"
        @click="$emit('change-page', pageNumber)"
        :class="{ 'current-page': activePage === pageNumber }"
        data-test-id="pagination-item"
        class="pagination--item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PaginationList',

  props: {
    itemsQuantity: {
      type: Number,
      default: 0
    },
    activePage: {
      type: [Number, Boolean],
      default: false
    }
  },

  computed: {
    pagesQuantity () {
      const quantityNumber = this.itemsQuantity

      if (typeof quantityNumber !== 'number') return 0

      if (quantityNumber <= 5) return 1

      const divisibleByFive = quantityNumber % 5 === 0

      if (divisibleByFive) return quantityNumber / 5

      return Math.floor(quantityNumber / 5) + 1
    }
  }
})
</script>

<style lang="postcss" scoped>

  .pagination--container {
    display: flex;
    justify-content: center;
    padding: 15px 0;
  }

  .pagination--item {
    margin: 0 10px;
    cursor: pointer;
    color: var(--main-color);
    transition: color .6 ease;

    &.current-page {
      color: var(--text-color);
      cursor: default;
    }
  }
</style>
