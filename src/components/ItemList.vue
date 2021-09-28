<template>
  <div>
    <ul>
      <li
        v-for="(item, index) in itemList"
        :key="index"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import item from '@/domain/models/item.interface'
import Vue from 'vue'

export default Vue.extend({
  name: 'ItemList',

  props: {
    itemList: {
      required: true,
      type: Array as () => item[]
    }
  }
})
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
}

li {
  flex: 0 0 calc(25% - 10px);
  margin: 15px 5px;
}

img {
  max-width: 100%;
}
</style>
