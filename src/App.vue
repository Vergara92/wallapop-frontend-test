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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
