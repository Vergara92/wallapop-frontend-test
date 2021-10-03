<template>
  <section class="item-list--container">
    <ul class="item-list">
      <Item
        v-for="(item, index) in itemList"
        :item="item"
        :key="index"
      />
    </ul>
  </section>
</template>

<script lang="ts">
import item from '@/domain/models/item.interface'
import Item from '@/components/Item.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'ItemList',

  components: {
    Item
  },

  props: {
    itemList: {
      required: true,
      type: Array as () => item[]
    }
  }
})
</script>

<style lang="postcss" scoped>
.item-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  margin: 0 -5px;

  @media (min-width: 1020px) {
    max-width: 1400px;
    margin: 0 auto;
  }
}
</style>
