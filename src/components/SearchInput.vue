<template>
  <input
    placeholder="Buscar por Título/Descripción/Precio/Email"
    class="search-input"
    type="text"
    v-model="filterValue"
  >
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SearchInput',

  data () {
    return {
      filterValue: '' as string,
      delayTimer: setTimeout(() => '', 1000) as ReturnType<typeof setTimeout>
    }
  },

  watch: {
    filterValue () {
      clearTimeout(this.delayTimer)
      this.delayTimer = setTimeout(() => {
        this.$emit('change-filter-value', this.filterValue)
      }, 400)
    }
  }
})
</script>

<style lang="postcss" scoped>
.search-input {
  width: calc(100% - 25px);
  padding: 10px;
  border-radius: 10px;
  color: var(--text-color);
  border: 1px solid var(--text-color);
  transition: border .6s ease;

  @media (min-width: 1020px) {
    font-size: 17px;
    width: calc(100% - 42px);
    margin-bottom: 20px;
    padding: 20px;
  }

  &:focus {
    border: 1px solid var(--main-color);
    outline: none;
  }

  &::placeholder {
    color: var(--placeholder-color);
  }
}
</style>
