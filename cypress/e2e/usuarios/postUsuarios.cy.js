describe('POST /usuarios', () => {
    
  it('Usuário já cadastrado', function () {
    cy.fixture('usuario').then((data) => {
      const usuario = data.cadastro_ja_exist

      cy.postUsuarios(usuario).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('message', 'Este email já está sendo usado')
      })
    })
  })
})
