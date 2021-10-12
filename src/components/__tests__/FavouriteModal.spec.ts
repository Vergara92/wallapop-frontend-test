import FavouriteModal from '@/components/FavouriteModal.vue'
import Iitem from '@/domain/models/item.interface'
import { exampleModeledItemList } from '@/api/__mocks__/exampleItemList'
import { shallowMount } from '@vue/test-utils'

describe('FavouriteModal', () => {
  const renderWrapper = (itemList: Iitem[] = []) => shallowMount(FavouriteModal, {
    propsData: {
      itemList
    }
  })

  it('Emit close-favourite-modal when the container is clicked', async () => {
    const wrapper = renderWrapper()
    const modalContainer = wrapper.find('[data-test-id="modal-container"]')

    await modalContainer.trigger('click')

    expect(wrapper.emitted('close-favourite-modal')).toEqual([[]])
  })
  it('Emit close-favourite-modal when close-button is clicked', async () => {
    const wrapper = renderWrapper()
    const closeButton = wrapper.find('[data-test-id="close-button"]')

    await closeButton.trigger('click')

    expect(wrapper.emitted('close-favourite-modal')).toEqual([[]])
  })
  it('Doesnt render itemList if there are no item in the array', () => {
    const wrapper = renderWrapper()
    const itemListComponent = wrapper.findComponent({ name: 'ItemList' })

    expect(itemListComponent.exists()).toBeFalsy()
  })
  it('Render itemList if there are items in the array', () => {
    const wrapper = renderWrapper(exampleModeledItemList)
    const itemListComponent = wrapper.findComponent({ name: 'ItemList' })

    expect(itemListComponent.exists()).toBeTruthy()
  })
  it('Emit the event from the searchInput', async () => {
    const wrapper = renderWrapper()
    const searchComponent = wrapper.findComponent({ name: 'SearchInput' })

    await searchComponent.vm.$emit('change-filter-value', 'Reloj')

    expect(wrapper.emitted('change-filter-value')).toEqual([['Reloj']])
  })
})
