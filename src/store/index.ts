import Item from '@/domain/models/Item'
import itemService from '@/domain/services/itemService'
import setFilterInterface from '@/store/setFilter.interface'
import Vue from 'vue'
import Vuex, { ActionTree, GetterTree, MutationTree } from 'vuex'

Vue.use(Vuex)

export class State {
  itemList: Item[] | null = null
  filterText = ''
  favouriteFilterText = ''
  sortingKey: 'title' | 'description' | 'email' |'price' | boolean = false
  currentPage = 1
}

export const getters: GetterTree<State, State> = {
  filteredItemList (state): Item[] | [] {
    return filterListItems(state.itemList, state.filterText)
  },

  sortedItems (state, getters): Item[] | [] {
    const sortingKey = state.sortingKey
    const filteredItemList: Item[] | [] = getters.filteredItemList
    const itemsToSort = filteredItemList.slice()
    if (typeof sortingKey !== 'string') return getters.filteredItemList

    if (sortingKey === 'price') {
      return itemsToSort.sort((a, b) => Number(a.price) - Number(b.price))
    }

    return itemsToSort.sort((a, b) => {
      const stringA = a[sortingKey].toUpperCase()
      const stringB = b[sortingKey].toUpperCase()

      if (stringA < stringB) return -1
      if (stringA > stringB) return 1
      return 0
    })
  },

  paginatedItems (state, getters): Item[] | [] {
    const currentPage = state.currentPage
    const firstItemIndex = currentPage * 5 - 5
    const lastItemIndex = currentPage * 5 - 1

    return getters.sortedItems.filter((item: Item, index: number) => {
      if (index >= firstItemIndex && index <= lastItemIndex) {
        return true
      }
      return false
    })
  },

  favouriteItemList (state): Item[] | [] {
    if (state.itemList === null) return []

    return state.itemList.filter((item: Item) => item.isFavourite)
  },

  filteredFavouriteItemList (state, getters): Item[] | [] {
    return filterListItems(getters.favouriteItemList, state.favouriteFilterText)
  }
}

export const mutations = <MutationTree<State>>{
  SET_ITEM_LIST (state, itemList: Item[]) {
    if (itemList.length === 0) {
      state.itemList = null

      return
    }
    state.itemList = itemList
  },

  SWITCH_FAVOURITE_STATUS (state, itemId: number) {
    if (state.itemList === null) return
    const currentStatus = state.itemList[itemId].isFavourite

    console.log(itemId, state.itemList[itemId])
    state.itemList[itemId].isFavourite = !currentStatus
  },

  SET_FILTER_TEXT (state, payload: setFilterInterface) {
    const { filterValue, isFavourite } = payload
    if (isFavourite === false) {
      state.filterText = filterValue.toLowerCase()

      return
    }

    state.favouriteFilterText = filterValue.toLowerCase()
  },

  SET_CURRENT_PAGE (state, currentPage: number) {
    state.currentPage = currentPage
  },

  SET_SORTING_ORDER (state, sortingKey) {
    state.sortingKey = sortingKey
  }
}

export const actions = <ActionTree<State, State>>{
  async fetchItemList ({ commit }) {
    const itemList = await itemService.get()

    commit('SET_ITEM_LIST', itemList)
  },

  triggerFavouriteChange ({ commit }, itemId: number) {
    commit('SWITCH_FAVOURITE_STATUS', itemId)
  },

  setFilterValue ({ commit }, payload: setFilterInterface) {
    commit('SET_FILTER_TEXT', payload)

    if (payload.isFavourite === false) commit('SET_CURRENT_PAGE', 1)
  },

  setCurrentPage ({ commit }, currentPage: number) {
    commit('SET_CURRENT_PAGE', currentPage)
  },

  setSortingOrder ({ commit }, sortingKey: string | boolean) {
    commit('SET_SORTING_ORDER', sortingKey)
  }
}

function filterListItems (itemList: Item[] | null, textToFilter: string): Item[] | [] {
  if (itemList === null) return []

  if (textToFilter === '') {
    return itemList
  }

  const filteredList = itemList.filter((item: Item) => {
    const finded = itemService.hasFilterText(item, textToFilter)

    return finded
  })
  return filteredList
}

export default new Vuex.Store({
  state: new State(),
  mutations,
  getters,
  actions
})
