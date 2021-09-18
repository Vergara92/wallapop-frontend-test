import getItems from '@/api/getItems'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
describe('Items Api calls', () => {
  it('Should call the expected endpoint', async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: { items: {} } }))
    await getItems()

    expect(mockedAxios.get).toBeCalledWith('https://frontend-tech-test-data.s3.eu-west-1.amazonaws.com/items.json')
  })
})
