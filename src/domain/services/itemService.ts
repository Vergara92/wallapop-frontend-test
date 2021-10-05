import getItems from '@/api/getItems'
import Item from '../models/Item'

const itemService = {
  get: async ():Promise<Item[]> => {
    const itemList = await getItems()
    const modeledItemList = itemList.map((item, index) => new Item(item, index))

    return modeledItemList
  },
  hasFilterText: (item: Item, textToFilter: string): boolean => {
    const keysToSearch = [item.title, item.description, item.price, item.email]
    let coincidencesFinded = false

    for (let index = 0; index < keysToSearch.length; index++) {
      const key = keysToSearch[index].toLowerCase()

      if (key.includes(textToFilter) === true) {
        coincidencesFinded = true
        break
      }
    }

    return coincidencesFinded
  }
}

export default itemService
