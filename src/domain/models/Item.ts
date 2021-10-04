import itemInterface from '@/domain/models/item.interface'

class Item implements itemInterface {
  id: number
  title: string
  description: string
  price: string
  email: string
  image: string
  isFavourite?: boolean

  constructor (data: itemInterface, idNumber: number) {
    this.id = idNumber
    this.title = data.title
    this.description = data.description
    this.price = data.price
    this.email = data.email
    this.image = data.image
    this.isFavourite = false
  }
}

export default Item
