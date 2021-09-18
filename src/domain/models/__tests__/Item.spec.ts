import Item from '@/domain/models/Item'
import exampleItemList from '@/api/__tests__/__mocks__/exampleItemList'

describe('Item Model', () => {
  it('must have the provided title', () => {
    const exampleItem = exampleItemList[0]
    const expectedTitle = exampleItem.title

    const modeledItem = new Item(exampleItem)

    expect(modeledItem.title).toBe(expectedTitle)
  })

  it('must have the provided description', () => {
    const exampleItem = exampleItemList[0]
    const expectedDescription = exampleItem.description

    const modeledItem = new Item(exampleItem)

    expect(modeledItem.description).toBe(expectedDescription)
  })

  it('must have the provided price', () => {
    const exampleItem = exampleItemList[0]
    const expectedPrice = exampleItem.price

    const modeledItem = new Item(exampleItem)

    expect(modeledItem.price).toBe(expectedPrice)
  })

  it('must have the provided email', () => {
    const exampleItem = exampleItemList[0]
    const expectedEmail = exampleItem.email

    const modeledItem = new Item(exampleItem)

    expect(modeledItem.email).toBe(expectedEmail)
  })

  it('must have the provided image', () => {
    const exampleItem = exampleItemList[0]
    const expectedImage = exampleItem.image

    const modeledItem = new Item(exampleItem)

    expect(modeledItem.image).toBe(expectedImage)
  })
})
