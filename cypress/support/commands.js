import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true, strict: false });

Cypress.Commands.add("validarSchema", (schema, resposta) => {
  const validate = ajv.compile(schema);
  const valid = validate(resposta);

  if (!valid) {
    throw new Error(
      "Falha na validação do schema: " +
      JSON.stringify(validate.errors, null, 2)
    );
  }
});

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
    url: `/usuarios?email=${dados}`,
    failOnStatusCode: false
  }).then(response => { return response })
})

Cypress.Commands.add('getUsuarios_por_id', (dados) => {
  return cy.api({
    method: 'GET',
    url: `/usuarios/${dados}`,
    failOnStatusCode: false
  }).then(response => { return response })
})

Cypress.Commands.add('deleteUsuarios', (dados) => {
  return cy.api({
    method: 'DELETE',
    url: `/usuarios/${dados}`,
    failOnStatusCode: false
  }).then(response => { return response })
})

Cypress.Commands.add('putUsuarios', (id, dados) => {
  return cy.api({
    method: 'PUT',
    url: `/usuarios/${id}`,
    body: dados,
    failOnStatusCode: false
  }).then(response => { return response })
})