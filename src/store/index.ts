import Item from '@/domain/models/Item'
import itemService from '@/domain/services/itemService'

import Vue from 'vue'
import Vuex, { ActionTree, GetterTree, MutationTree } from 'vuex'

Vue.use(Vuex)

export class State {
  itemList: Item[] | null = null
  filterText = ''
}

export const getters: GetterTree<State, State> = {
  filteredItemList (state): Item[] | [] {
    if (state.itemList === null) return []

    if (state.filterText === '') {
      return state.itemList
    }

    const filteredList = state.itemList.filter((item: Item) => {
      const finded = itemService.hasFilterText(item, state.filterText)

      return finded
    })
    return filteredList
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
  SET_FILTER_TEXT (state, filterText: string) {
    state.filterText = filterText.toLowerCase()
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
  setFilterValue ({ commit }, filterValue: string) {
    commit('SET_FILTER_TEXT', filterValue)
  }
}

export default new Vuex.Store({
  state: new State(),
  mutations,
  getters,
  actions
})
