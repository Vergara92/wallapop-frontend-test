import getItems from '@/api/getItems'
import Item from '../models/Item'

const itemService = {
  get: async ():Promise<Item[]> => {
    const itemList = await getItems()
    const modeledItemList = itemList.map((item) => new Item(item))

    return modeledItemList
  }
}

export default itemService
