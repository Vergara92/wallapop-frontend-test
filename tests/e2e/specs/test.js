// https://docs.cypress.io/api/introduction/api.html

describe('Item Manager Tests', () => {
  it('Make a search to find iPhone', () => {
    cy.visit('/')
    cy.get('[data-test-id="search-input-general"]')
      .type('iPhone')

    cy.wait(1000)

    cy.get('[data-test-id="item-list-general"]')
      .find('[data-test-id="item-general"]').its('length').should('eq', 1)
  })
  it('add item to favourite list', () => {
    cy.visit('/')

    cy.get('[data-test-id="item-general"]').eq(3)
      .find('[data-test-id="favourite-trigger"]')
      .click()

    cy.get('[data-test-id="see-favourite-button"]').click()

    cy.get('[data-test-id="modal-container"]').should('contain', 'Reloj de Daniel Wellington')
  })
  it('set the ascendent price sorting go to the last page and test that the last item is correct', () => {
    cy.visit('/')

    cy.get('[data-test-id="sort-select"]')
      .select('Precio: Ascendente')

    cy.get('[data-test-id="pagination-item"]').last().click()

    cy.get('[data-test-id="item-general"]').last().should('contain', 'Piso en Clot')
  })
})
