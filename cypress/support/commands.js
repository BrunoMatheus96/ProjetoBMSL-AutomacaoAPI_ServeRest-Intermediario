Cypress.Commands.add('postUsuarios', (dados) => {
  return cy.api({
    method: 'POST',
    url: '/usuarios',
    body: dados,
    failOnStatusCode: false
  }).then(response => { return response })
})