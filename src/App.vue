<template>
  <div id="app">
    <item-list
      v-if="itemList"
      :item-list="itemList"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import ItemList from '@/components/ItemList.vue'

export default Vue.extend({
  name: 'App',

  components: {
    ItemList
  },

  computed: {
    ...mapState(['itemList'])
  },

  methods: {
    ...mapActions(['fetchItemList'])
  },

  created () {
    this.fetchItemList()
  }
})
</script>

<style>
:root {
  --text-color: #2c3e50;
  --grey-color: #f7f7f7;
  --border-radius-size: 8px;
}

html {
    background-color: var(--grey-color);
}

#app {
  margin-top: 60px;
  text-align: center;
  color: var(--text-color);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
