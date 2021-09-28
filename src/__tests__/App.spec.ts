import App from '@/App.vue'
import Vuex, { Store } from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { State } from '@/store'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('App Component', () => {
  let actions: { fetchItemList: jest.Mock }
  let store: Store<State>
  const renderWrapper = (store: Store<State>) => {
    return shallowMount(App, { store, localVue })
  }

  beforeEach(() => {
    actions = {
      fetchItemList: jest.fn()
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
})
