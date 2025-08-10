describe('POST /usuarios', () => {

  it('Usuário ja cadastrado', function () {
    cy.fixture('usuario').then((data) => {

      const usuario = data.cadastro_ja_existente.dados

      cy.postUsuarios(usuario).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('message', 'Este email já está sendo usado')
      })
    })
  })

  it('Cadastrar usuario', function () {
    cy.fixture('usuario').then((data) => {

      const usuario = data.cadastro

      cy.task('removerUsuario', usuario.email) // Remove o usuário antes de criar e o código esta localizado no cypress.config.js

      cy.postUsuarios(usuario).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
        expect(response.body).to.have.property('_id').and.to.be.a('string')
      })
    })
  })

})

