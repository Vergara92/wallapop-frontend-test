import Item from '@/domain/models/Item'
import getItems from '@/api/getItems'
import exampleGetItems from '@/api/__mocks__/getItems'
import itemService from '@/domain/services/itemService'
import { exampleModeledItemList } from '@/api/__mocks__/exampleItemList'

jest.mock('@/api/getItems', () => jest.fn())
const mockedgetItems = getItems as jest.Mock

describe('Item Service', () => {
  it('should call getItems in get', () => {
    mockedgetItems.mockImplementation(() => Promise.resolve(exampleGetItems))
    itemService.get()

    expect(getItems).toBeCalledTimes(1)
  })
  it('should return an array of modeled Items', async () => {
    mockedgetItems.mockImplementation(() => Promise.resolve(exampleGetItems))

    const itemList = await itemService.get()

    expect(itemList[0]).toBeInstanceOf(Item)
  })

  it('sholuld inject array position as ID', async () => {
    mockedgetItems.mockImplementation(() => Promise.resolve(exampleGetItems))

    const itemList = await itemService.get()

    expect(itemList[4].id).toBe(4)
  })
  it('return true if the item injected in hasFilterText has the filter text', async () => {
    const modeledItem = exampleModeledItemList[0]
    const textToFilter = 'iphone'

    expect(itemService.hasFilterText(modeledItem, textToFilter)).toBe(true)
  })
  it('return false if the item injected in hasFilterText hasnt the filter text', async () => {
    const modeledItem = exampleModeledItemList[0]
    const textToFilter = 'bolso'

    expect(itemService.hasFilterText(modeledItem, textToFilter)).toBe(false)
  })
})
