import ItemList from '@/components/ItemList.vue'
import ItemComponent from '@/components/Item.vue'
import exampleItemList from '@/api/__mocks__/exampleItemList'
import { shallowMount, Wrapper } from '@vue/test-utils'

const wrapper: Wrapper<typeof ItemList & Vue> = shallowMount<typeof ItemList & Vue>(ItemList, {
  propsData: {
    itemList: exampleItemList
  }
})

describe('ItemList Component', () => {
  it('Renders item elements for each item passed by prop', () => {
    const itemsQuantity = exampleItemList.length
    const itemComponentQuantity = wrapper.findAllComponents(ItemComponent).length

    expect(itemComponentQuantity).toBe(itemsQuantity)
  })
  it('Set Item prop in Items components', () => {
    const firstItemObject = exampleItemList[0]
    const firstItemComponentProp = wrapper.findComponent(ItemComponent).props()

    expect(firstItemComponentProp.item).toBe(firstItemObject)
  })
})
