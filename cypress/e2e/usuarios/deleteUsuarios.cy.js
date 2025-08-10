describe('DELETE /usuarios', () => {

    it('Deletar usuario', function () {
        cy.fixture('usuario').then((data) => {

            const usuario = data.cadastro2;

            // Cria usuário e captura ID
            cy.task('criarUsuario', usuario).then((res) => {
                const userId = res.id;

                cy.deleteUsuarios(userId).then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('message', 'Registro excluído com sucesso')
                })
            })
        })
    })

})

