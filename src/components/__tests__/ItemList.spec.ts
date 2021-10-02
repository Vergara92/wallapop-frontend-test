import ItemList from '@/components/ItemList.vue'
import ItemComponent from '@/components/Item.vue'
import exampleItemList from '@/api/__mocks__/exampleItemList'
import { shallowMount, Wrapper } from '@vue/test-utils'

const wrapper: Wrapper<ItemList> = shallowMount<ItemList>(ItemList, {
  propsData: {
    itemList: exampleItemList
  }
})

describe('ItemList Component', () => {
  it('Renders item elements for each item passed by prop', () => {
    const itemsQuantity = exampleItemList.length

    expect(wrapper.findAll(ItemComponent).length).toBe(itemsQuantity)
  })
  it('Set Item prop in Items components', () => {
    const firstItemObject = exampleItemList[0]
    const firstItemComponentProp = wrapper.find(ItemComponent).props()

    expect(firstItemComponentProp.item).toBe(firstItemObject)
  })
})
