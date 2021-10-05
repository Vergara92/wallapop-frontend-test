<template>
  <section class="item-list--container">
    <ul class="item-list">
      <Item
        v-for="(item, index) in filteredItemList"
        :item="item"
        :key="index"
        @switch-favourite="changeFavouriteStatus"
      />
    </ul>
  </section>
</template>

<script lang="ts">
import Item from '@/components/Item.vue'
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'ItemList',

  components: {
    Item
  },

  computed: {
    ...mapGetters(['filteredItemList'])
  },

  methods: {
    ...mapActions(['triggerFavouriteChange']),

    changeFavouriteStatus (itemId: number) {
      this.triggerFavouriteChange(itemId)
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
    margin: 0;
  }
}
</style>
