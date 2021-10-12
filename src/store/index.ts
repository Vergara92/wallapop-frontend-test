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
}

export const getters: GetterTree<State, State> = {
  filteredItemList (state): Item[] | [] {
    return filterListItems(state.itemList, state.filterText)
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

    state.itemList[itemId].isFavourite = !currentStatus
  },
  SET_FILTER_TEXT (state, payload: setFilterInterface) {
    const { filterValue, isFavourite } = payload
    if (isFavourite === false) {
      state.filterText = filterValue.toLowerCase()

      return
    }

    state.favouriteFilterText = filterValue.toLowerCase()
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
