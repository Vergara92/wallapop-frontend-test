import TopBar from '@/components/TopBar.vue'
import { mount, Wrapper } from '@vue/test-utils'

let wrapper: Wrapper<typeof TopBar & Vue>

beforeEach(() => {
  wrapper = mount<typeof TopBar & Vue>(TopBar)
})

describe('TopBar Component', () => {
  it('Emit open-favourite-modal when see favourite button is cliccked', async () => {
    const seeFavButton = wrapper.find('[data-testid="see-favourite-button"]')

    await seeFavButton.trigger('click')

    expect(wrapper.emitted('see-favourite-modal')).toEqual([[]])
  })
})
