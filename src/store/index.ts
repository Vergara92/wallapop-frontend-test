import Item from '@/domain/models/Item'
import itemService from '@/domain/services/itemService'

import Vue from 'vue'
import Vuex, { ActionTree, MutationTree } from 'vuex'

Vue.use(Vuex)

export class State {
  itemList: Item[] | null = null
}

export const mutations = <MutationTree<State>>{
  setItemList (state, itemList: Item[]) {
    if (itemList.length === 0) {
      state.itemList = null

      return
    }
    state.itemList = itemList
  }
}

export const actions = <ActionTree<State, State>>{
  async fetchItemList ({ commit }) {
    const itemList = await itemService.get()

    commit('setItemList', itemList)
  }
}

export default new Vuex.Store({
  state: new State(),
  mutations,
  actions
})
