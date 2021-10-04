import Item from '@/domain/models/Item'
import getItems from '@/api/getItems'
import exampleGetItems from '@/api/__mocks__/getItems'
import itemService from '@/domain/services/itemService'

jest.mock('@/api/getItems', () => jest.fn())
const mockedgetItems = getItems as jest.Mock

describe('Item Service', () => {
  it('should call getItems in get', () => {
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
})
