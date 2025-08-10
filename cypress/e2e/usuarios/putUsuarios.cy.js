describe('PUT /usuarios', () => {

    it('Editar usuario', function () {
        cy.fixture('usuario').then((data) => {

            const usuario = data.cadastro2;

            // Cria usuário e captura ID
            cy.task('criarUsuario', usuario).then((res) => {
                const userId = res.id;

                cy.putUsuarios(userId, usuario).then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
                })
            })
        })
    })

    it('Editar usuario com email já existente', function () {
        cy.fixture('usuario').then((data) => {

            const usuario = data.cadastro_ja_existente;
            const id = '0uxuPY0cbmQhpEz1';

                cy.putUsuarios(id, usuario).then((response) => {
                    expect(response.status).to.eq(400)
                    expect(response.body).to.have.property('message', 'Este email já está sendo usado')
                })
            })
        })

})

