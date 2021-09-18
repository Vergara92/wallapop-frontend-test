import axios from 'axios'
import Item from '@/domain/models/item.interface'

export default function getItems (): Promise<Item[]> {
  return axios.get('https://frontend-tech-test-data.s3.eu-west-1.amazonaws.com/items.json')
    .then(response => {
      return response.data.items
    })
}
