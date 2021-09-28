import ItemList from '@/components/ItemList.vue'
import exampleItemList from '@/api/__mocks__/exampleItemList'
import { shallowMount, Wrapper } from '@vue/test-utils'

const wrapper: Wrapper<ItemList> = shallowMount<ItemList>(ItemList, {
  propsData: {
    itemList: exampleItemList
  }
})

describe('ItemList Component', () => {
  it('Has li elements for each item passed by prop', () => {
    const itemsQuantity = exampleItemList.length

    expect(wrapper.findAll('li').length).toBe(itemsQuantity)
  })
})
