describe('GET /usuarios', () => {

    it('Listar usuarios cadastrados', function () {
        cy.fixture('usuario').then((data) => {

            const email = data.cadastro_ja_existente.email

            cy.getUsuarios(email).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.quantidade).to.be.a('number')
                expect(response.body.usuarios).to.be.an('array')
                expect(response.body.usuarios[0]).to.have.property('nome', 'Fulano da Silva')
                expect(response.body.usuarios[0]).to.have.property('email', email)
            })
        })
    })

    it('Listar usuarios nao cadastrados', function () {
        cy.fixture('usuario').then((data) => {

            const email = data.sem_cadastro.email

            cy.getUsuarios(email).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.quantidade).to.eq(0)
                expect(response.body.usuarios).to.be.an('array').and.have.length(0)
            })
        })
    })


})