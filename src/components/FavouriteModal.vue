<template>
  <div
    class="favourite-modal--container"
    @click="$emit('close-favourite-modal')"
    data-test-id="modal-container"
  >
    <div
      class="favourite-modal"
      @click.stop
      data-test-id="modal-container"
    >
      <button
        class="favourite-modal--close"
        @click="$emit('close-favourite-modal')"
        data-test-id="close-button"
      >
        X
      </button>
      <p class="favourite-modal--title">Lista de favoritos</p>
      <search-input
        @change-filter-value="emitFilterValue"
      />
      <item-list
        v-if="itemList.length > 0"
        :item-list="itemList"
      />
      <p class="favourite-modal--text" v-else>No se han encontrado favoritos</p>
    </div>
  </div>
</template>

<script lang="ts">
import Iitem from '@/domain/models/item.interface'
import searchInput from '@/components/SearchInput.vue'
import ItemList from '@/components/ItemList.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'FavouriteModal',

  components: {
    ItemList,
    searchInput
  },

  props: {
    itemList: {
      required: true,
      type: Array as () => Iitem[]
    }
  },

  methods: {
    emitFilterValue (filterValue: string) {
      this.$emit('change-filter-value', filterValue)
    }
  }
})
</script>

<style lang="postcss" scoped>
.favourite-modal--container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  background-color: color-mod(#000 alpha(50%));
}

.favourite-modal {
  position: absolute;
  top: 20px;
  right: 10px;
  bottom: 20px;
  left: 10px;
  padding: 0 10px;
  background-color: white;
  border-radius: var(--border-radius-size);
  box-shadow: 0 8px 16px 0 color-mod(#000 alpha(20%));
  overflow: scroll;
}

.favourite-modal--close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 10px;
  background-color: white;
  border: 1px solid var(--placeholder-color);
  cursor: pointer;
}

.favourite-modal--title {
  font-size: 18px;
  color: var(--text-color);

  @media (min-width: 1020px) {
    margin-bottom: 40px;
  }
}

.favourite-modal--text {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: var(--placeholder-color);
  transform: translateY(-50%);
}
</style>
