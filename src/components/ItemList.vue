<template>
  <section class="item-list--container">
    <transition-group name="list" tag="ul" class="item-list">
      <Item
        v-for="(item) in itemList"
        :item="item"
        :key="item.id"
        @switch-favourite="changeFavouriteStatus"
      />
    </transition-group>
  </section>
</template>

<script lang="ts">
import Item from '@/components/Item.vue'
import Iitem from '@/domain/models/item.interface'
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  name: 'ItemList',

  components: {
    Item
  },

  props: {
    itemList: {
      required: true,
      type: Array as () => Iitem[]
    }
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
.item-list--container {
  position: relative;
}
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

.list-enter-active {
  transition: all .6s;
}
.list-leave-active {
  display: none;

  .favourite-modal & {
    display: flex;
    transition: all .6s;
  }
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
