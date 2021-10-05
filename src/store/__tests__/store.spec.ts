import exampleItemList, { exampleModeledItemList } from '@/api/__mocks__/exampleItemList'
import Item from '@/domain/models/Item'
import itemService from '@/domain/services/itemService'
import { State, getters, mutations, actions } from '@/store/index'
import { ActionContext, Commit } from 'vuex'

let state: State
describe('Store', () => {
  beforeEach(() => {
    state = new State()
  })

  describe('Store getters', () => {
    it('filter Item when filterText is changed', () => {
      state = {
        itemList: exampleModeledItemList,
        filterText: 'hone'
      }
      const rootState = state
      const rootGetters = getters

      const filteredList = getters.filteredItemList(state, getters, rootState, rootGetters)

      expect(filteredList.length).toBe(1)
    })
  })

  describe('Store mutations', () => {
    it('Should inject the provided array to the object', () => {
      mutations.SET_ITEM_LIST(state, exampleItemList)

      expect(state.itemList).toBe(exampleItemList)
    })

    it('Switch the favourite current status of given item', () => {
      const exampleId = 1
      const modeledItems = exampleItemList.map((item, index) => new Item(item, index))
      state.itemList = modeledItems

      mutations.SWITCH_FAVOURITE_STATUS(state, exampleId)

      expect(state.itemList[exampleId].isFavourite).toBeTruthy()
    })

    it('Sets given text in filterText in lowerCase', () => {
      mutations.SET_FILTER_TEXT(state, 'Polaroid')

      expect(state.filterText).toBe('polaroid')
    })
  })
  describe('Store actions', () => {
    it('itemService should be triggered on fetItemList call', async () => {
      const actionContext: ActionContext<State, State> = {
        dispatch: jest.fn(),
        commit: jest.fn(),
        state,
        getters: {},
        rootState: state,
        rootGetters: {}
      }
      const itemServiceGetSpy = jest.spyOn(itemService, 'get').mockImplementation()

      const fetchItemList = actions.fetchItemList as (ctx: typeof actionContext) => Commit

      await fetchItemList(actionContext)

      expect(itemServiceGetSpy).toHaveBeenCalled()
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

    it('trigger SET_FILTER_TEXT on setFilterValue call', () => {
      const actionContext: ActionContext<State, State> = {
        dispatch: jest.fn(),
        commit: jest.fn(),
        state,
        getters: {},
        rootState: state,
        rootGetters: {}
      }

      const setFilterValue = actions.setFilterValue as (ctx: typeof actionContext, filterValue: string) => Commit

      setFilterValue(actionContext, 'Bolso')

      expect(actionContext.commit).toBeCalledWith('SET_FILTER_TEXT', 'Bolso')
    })
  })
})
