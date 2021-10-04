import getItems from '@/api/getItems'
import Item from '../models/Item'

const itemService = {
  get: async ():Promise<Item[]> => {
    const itemList = await getItems()
    const modeledItemList = itemList.map((item, index) => new Item(item, index))

    return modeledItemList
  }
}

export default itemService
