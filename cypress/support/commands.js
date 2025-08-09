Cypress.Commands.add('postUsuarios', (dados) => {
  return cy.api({
    method: 'POST',
    url: '/usuarios',
    body: dados,
    failOnStatusCode: false
  }).then(response => { return response })
})

Cypress.Commands.add('getUsuarios', (dados) => {
  return cy.api({
    method: 'GET',
    url: `/usuarios/?email=${dados}`,
    failOnStatusCode: false
  }).then(response => { return response })
})