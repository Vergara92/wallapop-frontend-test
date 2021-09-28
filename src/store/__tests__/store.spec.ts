import exampleItemList from '@/api/__mocks__/exampleItemList'
import { State, mutations, actions } from '@/store/index'
import { ActionContext, Commit } from 'vuex'

let state: State
describe('Store', () => {
  beforeEach(() => {
    state = new State()
  })
  describe('Store mutations', () => {
    it('should inject the provided array to the object', () => {
      mutations.setItemList(state, exampleItemList)

      expect(state.itemList).toBe(exampleItemList)
    })
  })
  describe('Store actions', () => {
    it('itemService should be triggered on fetItemList call', () => {
      const actionContext: ActionContext<State, State> = {
        dispatch: jest.fn(),
        commit: jest.fn(),
        state,
        getters: {},
        rootState: state,
        rootGetters: {}
      }

      const fetchItemList = actions.fetchItemList as (ctx: typeof actionContext) => Commit

      fetchItemList(actionContext)
    })
  })
})
