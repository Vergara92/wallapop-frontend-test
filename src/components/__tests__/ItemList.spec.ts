import ItemList from '@/components/ItemList.vue'
import ItemComponent from '@/components/Item.vue'
import { exampleModeledItemList } from '@/api/__mocks__/exampleItemList'
import Vuex, { ActionTree, Store } from 'vuex'
import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils'
import { State, mutations, getters } from '@/store'

const localVue = createLocalVue()
localVue.use(Vuex)

let actions: ActionTree<unknown, unknown>
let state: State
let store: Store<State>

let wrapper: Wrapper<typeof ItemList & Vue>

describe('ItemList Component', () => {
  beforeEach(() => {
    actions = {
      triggerFavouriteChange: jest.fn()
    }
    state = {
      itemList: exampleModeledItemList,
      filterText: ''
    }

    store = new Vuex.Store({
      actions,
      state,
      getters,
      mutations
    })

    wrapper = shallowMount<typeof ItemList & Vue>(ItemList, {
      store,
      localVue
    })
  })
  it('Renders item elements for each item passed by prop if filterText isnt setted', () => {
    const itemsQuantity = exampleModeledItemList.length
    const itemComponentQuantity = wrapper.findAllComponents(ItemComponent).length

    expect(itemComponentQuantity).toBe(itemsQuantity)
  })
  it('Set Item prop in Items components', () => {
    const firstItemObject = exampleModeledItemList[0]
    const firstItemComponentProp = wrapper.findComponent(ItemComponent).props()

    expect(firstItemComponentProp.item).toBe(firstItemObject)
  })
  it('Calls triggerFavouriteChange action with itemId when item emit switch-favourite event', async () => {
    const secondItemComponent = wrapper.findAllComponents(ItemComponent).at(1)

    await secondItemComponent.vm.$emit('switch-favourite', 1)

    expect(actions.triggerFavouriteChange).toHaveBeenCalledWith(expect.any(Object), 1)
  })
  it('filter Item when filterText is changed', async () => {
    const numberOfItems = () => wrapper.findAllComponents(ItemComponent).length

    store.commit('SET_FILTER_TEXT', 'polaroid')
    await await wrapper.vm.$nextTick()

    expect(numberOfItems()).toBe(1)
  })
})
