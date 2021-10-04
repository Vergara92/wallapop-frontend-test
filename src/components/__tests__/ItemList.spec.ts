import ItemList from '@/components/ItemList.vue'
import ItemComponent from '@/components/Item.vue'
import { exampleModeledItemList } from '@/api/__mocks__/exampleItemList'
import Vuex, { ActionTree } from 'vuex'
import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)

let actions: ActionTree<unknown, unknown>
let store

let wrapper: Wrapper<typeof ItemList & Vue>

describe('ItemList Component', () => {
  beforeEach(() => {
    actions = {
      triggerFavouriteChange: jest.fn()
    }

    store = new Vuex.Store({
      actions
    })

    wrapper = shallowMount<typeof ItemList & Vue>(ItemList, {
      store,
      localVue,
      propsData: {
        itemList: exampleModeledItemList
      }
    })
  })
  it('Renders item elements for each item passed by prop', () => {
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
})
