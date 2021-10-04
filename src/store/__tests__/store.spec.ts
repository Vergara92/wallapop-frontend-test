import exampleItemList from '@/api/__mocks__/exampleItemList'
import Item from '@/domain/models/Item'
import { State, mutations, actions } from '@/store/index'
import { ActionContext, Commit } from 'vuex'

let state: State
describe('Store', () => {
  beforeEach(() => {
    state = new State()
  })
  describe('Store mutations', () => {
    it('should inject the provided array to the object', () => {
      mutations.SET_ITEM_LIST(state, exampleItemList)

      expect(state.itemList).toBe(exampleItemList)
    })

    it('should switch the favourite current status of given item', () => {
      const exampleId = 1
      const modeledItems = exampleItemList.map((item, index) => new Item(item, index))
      state.itemList = modeledItems

      mutations.SWITCH_FAVOURITE_STATUS(state, exampleId)

      expect(state.itemList[exampleId].isFavourite).toBeTruthy()
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

    it('calls SWITCH_FAVOURITE_STATUS when triggerFavouriteChange', () => {
      const exampleId = 3
      const actionContext: ActionContext<State, State> = {
        dispatch: jest.fn(),
        commit: jest.fn(),
        state,
        getters: {},
        rootState: state,
        rootGetters: {}
      }

      const triggerFavouriteChange = actions.triggerFavouriteChange as (ctx: typeof actionContext, itemId: number) => Commit

      triggerFavouriteChange(actionContext, exampleId)

      expect(actionContext.commit).toBeCalledWith('SWITCH_FAVOURITE_STATUS', exampleId)
    })
  })
})
