import App from '@/App.vue'
import { State, getters } from '@/store'
import { exampleModeledItemList } from '@/api/__mocks__/exampleItemList'
import Vuex, { Store } from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('App Component', () => {
  let actions: { fetchItemList: jest.Mock, setFilterValue: jest.Mock, setCurrentPage: jest.Mock, setSortingOrder: jest.Mock }
  let state: State
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
    state = new State()
    actions = {
      fetchItemList: jest.fn(),
      setFilterValue: jest.fn(),
      setCurrentPage: jest.fn(),
      setSortingOrder: jest.fn()
    }

    store = new Vuex.Store({
      state,
      getters,
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
  it('dispatches setFilterValue and false when search-input emit event', () => {
    const wrapper = renderWrapper(store)
    const searchInput = wrapper.findComponent({ name: 'SearchInput' })
    const expectedValue = { filterValue: 'iPhone', isFavourite: false }

    searchInput.vm.$emit('change-filter-value', 'iPhone')

    expect(actions.setFilterValue).toBeCalledWith(expect.any(Object), expectedValue)
  })
  it('dispatches setFilterValue and false when FavouriteModal emit change filter event', () => {
    const wrapper = renderWrapper(store)
    const FavouriteModal = wrapper.findComponent({ name: 'FavouriteModal' })
    const expectedValue = { filterValue: 'Bolso', isFavourite: true }

    FavouriteModal.vm.$emit('change-filter-value', 'Bolso')

    expect(actions.setFilterValue).toBeCalledWith(expect.any(Object), expectedValue)
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
  it('changes showFavouriteModal when topBar emit see-favourite-modal event', async () => {
    const wrapper = renderWrapper(store)
    const FavouriteModalComponent = wrapper.findComponent({ name: 'FavouriteModal' })
    wrapper.setData({ showFavouriteModal: true })

    await FavouriteModalComponent.vm.$emit('close-favourite-modal')

    expect((wrapper.vm as unknown as { showFavouriteModal: boolean }).showFavouriteModal).toBe(false)
  })
  it('triggers setCurrentPage when pagination-list emit change-page', async () => {
    window.scrollTo = jest.fn()
    store.state.itemList = exampleModeledItemList
    const wrapper = renderWrapper(store)
    const paginationComponent = wrapper.findComponent({ name: 'PaginationList' })

    await paginationComponent.vm.$emit('change-page', 4)

    expect(actions.setCurrentPage).toBeCalledWith(expect.any(Object), 4)
  })
  it('scroll to the top when pagination-list emit change-page', async () => {
    const scrollSpy = jest.fn()
    window.scrollTo = scrollSpy
    store.state.itemList = exampleModeledItemList
    const wrapper = renderWrapper(store)
    const paginationComponent = wrapper.findComponent({ name: 'PaginationList' })

    await paginationComponent.vm.$emit('change-page', 4)

    expect(scrollSpy).toBeCalledWith({ behavior: 'smooth', top: 0 })
  })
  it('triggers setSortingOrder when SortSelect component emit event', async () => {
    const wrapper = renderWrapper(store)
    const SortSelectComponent = wrapper.findComponent({ name: 'SortSelect' })

    SortSelectComponent.vm.$emit('change-order-sorting', 'price')

    expect(actions.setSortingOrder).toBeCalledWith(expect.any(Object), 'price')
  })
})
