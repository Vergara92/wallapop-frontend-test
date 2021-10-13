import PaginationList from '@/components/PaginationList.vue'
import { mount } from '@vue/test-utils'

describe('PaginationList Component', () => {
  const renderWrapper = (itemsQuantity = 0) => mount(PaginationList, {
    propsData: {
      itemsQuantity
    }
  })
  it('Renders 4 pages with 20 items', () => {
    const wrapper = renderWrapper(20)
    const paginationItems = wrapper.findAll('[data-test-id="pagination-item"]')

    expect(paginationItems.length).toBe(4)
  })
  it('Renders 5 pages with 21 items', () => {
    const wrapper = renderWrapper(21)
    const paginationItems = wrapper.findAll('[data-test-id="pagination-item"]')

    expect(paginationItems.length).toBe(5)
  })
  it('Renders 5 pages with 21 items', () => {
    const wrapper = renderWrapper(21)
    const paginationItems = wrapper.findAll('[data-test-id="pagination-item"]')

    expect(paginationItems.length).toBe(5)
  })
  it('didnt render pages with less than 5 items', () => {
    const wrapper = renderWrapper(4)
    const paginationItems = wrapper.findAll('[data-test-id="pagination-item"]')

    expect(paginationItems.length).toBe(0)
  })
  it('didnt render pages with less than 0 items', () => {
    const wrapper = renderWrapper(-4)
    const paginationItems = wrapper.findAll('[data-test-id="pagination-item"]')

    expect(paginationItems.length).toBe(0)
  })
  it('emit change-page event when any paginationItem is clicked', async () => {
    const wrapper = renderWrapper(28)
    const paginationItems = wrapper.findAll('[data-test-id="pagination-item"]').at(2)

    await paginationItems.trigger('click')

    expect(wrapper.emitted('change-page')).toEqual([[3]])
  })
})
