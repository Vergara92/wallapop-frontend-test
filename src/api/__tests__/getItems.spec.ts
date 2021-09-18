import getItems from '@/api/getItems'
import axios from 'axios'

jest.mock('axios')

describe('Items Api calls', () => {
  it('Should call the expected endpoint', async () => {
    await getItems()

    expect(axios.get).toBeCalledWith('https://frontend-tech-test-data.s3.eu-west-1.amazonaws.com/items.json')
  })
})
