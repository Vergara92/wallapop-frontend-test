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
    return shallowMount<App>(App, { store, localVue })
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

    expect(wrapper.vm.showFavouriteModal).toBe(true)
  })
})
