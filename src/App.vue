<template>
  <div id="app">
    <top-bar @see-favourite-modal="showFavouriteModal = true"/>

    <div class="container">
      <div class="container-top">
        <search-input
          data-test-id="search-input-general"
          @change-filter-value="changeFilterValue"
        />
        <sort-select @change-order-sorting="changeOrderSorting"/>
      </div>

      <item-list
        data-test-id="item-list-general"
        v-if="itemList"
        :item-list="paginatedItems"
      />

      <pagination-list
        v-if="itemList"
        :itemsQuantity="filteredItemList.length"
        :activePage="currentPage"
        @change-page="changeCurrentPage"
      />
    </div>

    <transition name="modal--transition">
      <favourite-modal
        v-show="showFavouriteModal"
        :item-list="filteredFavouriteItemList"
        @close-favourite-modal="showFavouriteModal = false"
        @change-filter-value="changeFilterValue($event, true)"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import TopBar from '@/components/TopBar.vue'
import SearchInput from '@/components/SearchInput.vue'
import SortSelect from '@/components/SortSelect.vue'
import ItemList from '@/components/ItemList.vue'
import PaginationList from '@/components/PaginationList.vue'
import FavouriteModal from '@/components/FavouriteModal.vue'

export default Vue.extend({
  name: 'App',

  components: {
    TopBar,
    SearchInput,
    SortSelect,
    ItemList,
    FavouriteModal,
    PaginationList
  },

  data () {
    return {
      showFavouriteModal: false
    }
  },

  computed: {
    ...mapState(['itemList', 'currentPage']),
    ...mapGetters(['paginatedItems', 'filteredItemList', 'filteredFavouriteItemList'])
  },

  watch: {
    showFavouriteModal (value) {
      if (value === true) {
        document.body.classList.add('is-fixed')

        return
      }

      document.body.classList.remove('is-fixed')
    }
  },

  methods: {
    ...mapActions(['fetchItemList', 'setFilterValue', 'setCurrentPage', 'setSortingOrder']),
    changeFilterValue (filterValue: string, isFavourite = false) {
      this.setFilterValue({ filterValue, isFavourite })
    },

    changeCurrentPage (newCurrentPage: number) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      this.setCurrentPage(newCurrentPage)
    },

    changeOrderSorting (orderKey: string) {
      this.setSortingOrder(orderKey)
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

body.is-fixed {
  overflow: hidden;
}

#app {
  margin-top: 80px;
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

.modal--transition-enter-active, .modal--transition-leave-active {
  transition: all .6s ease;
}
.modal--transition-enter, .modal--transition-leave-to {
  opacity: 0;
}

</style>
