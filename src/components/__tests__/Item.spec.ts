import ItemComponent from '@/components/Item.vue'
import exampleItemList from '@/api/__mocks__/exampleItemList'
import { mount, Wrapper } from '@vue/test-utils'
import Item from '@/domain/models/Item'

const exampleModeledItem = new Item(exampleItemList[0])

let wrapper: Wrapper<typeof ItemComponent & Vue>

beforeEach(() => {
  wrapper = mount<typeof ItemComponent & Vue>(ItemComponent, {
    propsData: {
      item: exampleModeledItem
    }
  })
})

describe('ItemList Component', () => {
  it('emit change favourite event when heart is clicker', async () => {
    const heartIcon = wrapper.find('[data-testid="favourite-trigger"]')

    await heartIcon.trigger('click')

    expect(wrapper.emitted('switch-favourite')).toBeTruthy()
  })
  it('has mailto email as email anchor', async () => {
    const emailDOMElement = wrapper.find('[data-testid="email-anchor"]')
    const expectedHref = `mailto:${exampleItemList[0].email}`

    expect(emailDOMElement.attributes('href')).toBe(expectedHref)
  })
})
