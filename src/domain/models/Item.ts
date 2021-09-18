import itemInterface from '@/domain/models/item.interface'

class Item implements itemInterface {
  title: string
  description: string
  price: string
  email: string
  image: string

  constructor (data: itemInterface) {
    this.title = data.title
    this.description = data.description
    this.price = data.price
    this.email = data.email
    this.image = data.image
  }
}

export default Item
