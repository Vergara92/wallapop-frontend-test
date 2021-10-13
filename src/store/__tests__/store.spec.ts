import exampleItemList, { exampleModeledItemList } from '@/api/__mocks__/exampleItemList'
import Item from '@/domain/models/Item'
import itemService from '@/domain/services/itemService'
import { State, getters, mutations, actions } from '@/store/index'
import setFilterInterface from '@/store/setFilter.interface'
import { ActionContext, Commit } from 'vuex'

let state: State
let actionContext: ActionContext<State, State>
describe('Store', () => {
  beforeEach(() => {
    state = new State()

    actionContext = {
      dispatch: jest.fn(),
      commit: jest.fn(),
      state,
      getters,
      rootState: state,
      rootGetters: {}
    }
  })

  describe('Store getters', () => {
    it('filter Item when filterText is changed', () => {
      state.itemList = exampleModeledItemList
      state.filterText = 'hone'

      const rootState = state
      const rootGetters = getters

      const filteredList = getters.filteredItemList(state, getters, rootState, rootGetters)

      expect(filteredList.length).toBe(2)
    })
    it('doesnt order items when sortingKey is false', () => {
      state.itemList = exampleModeledItemList
      state.sortingKey = false
      const mockedGetters = {
        filteredItemList: exampleModeledItemList
      }

      const rootState = state
      const rootGetters = getters

      const sortedItems = getters.sortedItems(state, mockedGetters, rootState, rootGetters)

      expect(sortedItems[0].title).toBe('iPhone 6S Oro')
    })
    it('order items by ascending title when that sortingKey is selected', () => {
      state.itemList = exampleModeledItemList
      state.sortingKey = 'title'
      const mockedGetters = {
        filteredItemList: exampleModeledItemList
      }

      const rootState = state
      const rootGetters = getters

      const sortedItems = getters.sortedItems(state, mockedGetters, rootState, rootGetters)

      expect(sortedItems[0].title).toBe('Barbacoa')
    })
    it('order items by ascending price when price sortingKey is selected', () => {
      state.itemList = exampleModeledItemList
      state.sortingKey = 'price'
      const mockedGetters = {
        filteredItemList: exampleModeledItemList
      }

      const rootState = state
      const rootGetters = getters

      const sortedItems = getters.sortedItems(state, mockedGetters, rootState, rootGetters)

      expect(sortedItems[0].title).toBe('Clases de piano')
    })

    it('show only 5 items in paginatedItems', () => {
      state.itemList = exampleModeledItemList
      const mockedGetters = {
        sortedItems: exampleModeledItemList
      }
      const rootState = state
      const rootGetters = mockedGetters

      const paginatedItems = getters.paginatedItems(state, mockedGetters, rootState, rootGetters)

      expect(paginatedItems.length).toBe(5)
    })

    it('show items related with the currentPage', () => {
      state.itemList = exampleModeledItemList
      state.currentPage = 3
      const mockedGetters = {
        sortedItems: exampleModeledItemList
      }
      const rootState = state
      const rootGetters = mockedGetters

      const paginatedItems = getters.paginatedItems(state, mockedGetters, rootState, rootGetters)

      expect(paginatedItems[0]).toBe(mockedGetters.sortedItems[10])
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

    it('Sets given text in filterText in lowerCase if isFavourite is false', () => {
      mutations.SET_FILTER_TEXT(state, { filterValue: 'Polaroid', isFavourite: false })

      expect(state.filterText).toBe('polaroid')
    })

    it('Sets given text in favouriteFilterText in lowerCase if isFavourite is true', () => {
      mutations.SET_FILTER_TEXT(state, { filterValue: 'iPhone', isFavourite: true })

      expect(state.favouriteFilterText).toBe('iphone')
    })

    it('Sets currentPage with SET_CURRENT_PAGE mutation', () => {
      mutations.SET_CURRENT_PAGE(state, 3)

      expect(state.currentPage).toBe(3)
    })
    it('Sets sortingOrder with SET_SORTING_ORDER mutation', () => {
      mutations.SET_SORTING_ORDER(state, 'email')

      expect(state.sortingKey).toBe('email')
    })
  })
  describe('Store actions', () => {
    it('itemService should be triggered on fetItemList call', async () => {
      const itemServiceGetSpy = jest.spyOn(itemService, 'get').mockImplementation()

      const fetchItemList = actions.fetchItemList as (ctx: typeof actionContext) => Commit

      await fetchItemList(actionContext)

      expect(itemServiceGetSpy).toHaveBeenCalled()
    })

    it('calls SWITCH_FAVOURITE_STATUS when triggerFavouriteChange', () => {
      const exampleId = 3
      const triggerFavouriteChange = actions.triggerFavouriteChange as (ctx: typeof actionContext, itemId: number) => Commit

      triggerFavouriteChange(actionContext, exampleId)

      expect(actionContext.commit).toBeCalledWith('SWITCH_FAVOURITE_STATUS', exampleId)
    })

    it('trigger SET_FILTER_TEXT on setFilterValue call', () => {
      const setFilterPayload = { filterValue: 'Bolso', isFavourite: false }
      const setFilterValue = actions.setFilterValue as (ctx: typeof actionContext, payload: setFilterInterface) => Commit

      setFilterValue(actionContext, setFilterPayload)

      expect(actionContext.commit).toBeCalledWith('SET_FILTER_TEXT', setFilterPayload)
    })

    it('trigger SET_CURRENT_PAGE to 1 on setFilterValue call if isnt favourite filterValue', () => {
      const setFilterPayload = { filterValue: 'Bolso', isFavourite: false }
      const setFilterValue = actions.setFilterValue as (ctx: typeof actionContext, payload: setFilterInterface) => Commit

      setFilterValue(actionContext, setFilterPayload)

      expect(actionContext.commit).toBeCalledWith('SET_CURRENT_PAGE', 1)
    })

    it('trigger SET_CURRENT_PAGE on setCurrentPage call', () => {
      const setCurrentPage = actions.setCurrentPage as (ctx: typeof actionContext, currentPage: number) => Commit

      setCurrentPage(actionContext, 10)

      expect(actionContext.commit).toBeCalledWith('SET_CURRENT_PAGE', 10)
    })
    it('trigger SET_SORTING_ORDER on setSortingOrder call', () => {
      const setSortingOrder = actions.setSortingOrder as (ctx: typeof actionContext, sortingKey: string) => Commit

      setSortingOrder(actionContext, 'price')

      expect(actionContext.commit).toBeCalledWith('SET_SORTING_ORDER', 'price')
    })
  })
})
