import App from '@/App.vue'
import Vuex, { Store } from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { State } from '@/store'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('App Component', () => {
  let actions: { fetchItemList: jest.Mock, setFilterValue: jest.Mock }
  let store: Store<State>
  const renderWrapper = (store: Store<State>) => {
    return shallowMount<typeof App & Vue>(App, {
      store,
      localVue,
      data () {
        return {
          showFavouriteModal: false
        }
      }
    })
  }

  beforeEach(() => {
    actions = {
      fetchItemList: jest.fn(),
      setFilterValue: jest.fn()
    }

    store = new Vuex.Store({
      actions
    })
  })

  it('Item List component shouldnt appear if no items fetched', () => {
    const wrapper = renderWrapper(store)
    const ItemListComponent = wrapper.findComponent({ name: 'ItemList' })

    expect(ItemListComponent.exists()).toBe(false)
  })
  it('dispatches fetchItemList when mounting component', () => {
    renderWrapper(store)

    expect(actions.fetchItemList).toBeCalledTimes(1)
  })
  it('dispatches setFilterValue when search-input emit event', () => {
    const wrapper = renderWrapper(store)
    const searchInput = wrapper.findComponent({ name: 'SearchInput' })

    searchInput.vm.$emit('change-filter-value', 'iPhone')

    expect(actions.setFilterValue).toBeCalledWith(expect.any(Object), 'iPhone')
  })
  it('changes showFavouriteModal when topBar emit see-favourite-modal event', async () => {
    const wrapper = renderWrapper(store)
    const TopBarComponent = wrapper.findComponent({ name: 'TopBar' })

    await TopBarComponent.vm.$emit('see-favourite-modal')

    // @Vergara92 TODO: This workaround is actually because Vue Typing properties are private
    // and you need to specify it if you want to access a property
    // Here is the issue for future references: https://github.com/vuejs/vue-test-utils-next/issues/972

    expect((wrapper.vm as unknown as { showFavouriteModal: boolean }).showFavouriteModal).toBe(true)
  })
})
