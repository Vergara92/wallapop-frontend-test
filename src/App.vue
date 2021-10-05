<template>
  <div id="app">
    <div class="container">
      <search-input
        @change-filter-value="changeFilterValue"
      />
      <item-list
        v-if="itemList"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import ItemList from '@/components/ItemList.vue'
import SearchInput from './components/SearchInput.vue'

export default Vue.extend({
  name: 'App',

  components: {
    ItemList,
    SearchInput
  },

  computed: {
    ...mapState(['itemList'])
  },

  methods: {
    ...mapActions(['fetchItemList', 'setFilterValue']),
    changeFilterValue (filterValue: string) {
      this.setFilterValue(filterValue)
    }
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
  --main-color: #13C1AC;
  --placeholder-color: #a6a6a6;
  --border-radius-size: 8px;
}

html {
    background-color: var(--grey-color);
}

#app {
  margin-top: 60px;
  color: var(--text-color);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 1400px;
  margin: 0 auto;

  @media (min-width: 1020px) {
    padding: 0 20px;
  }
}

</style>
