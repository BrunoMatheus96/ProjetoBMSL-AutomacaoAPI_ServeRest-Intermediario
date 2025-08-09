describe('GET /usuarios', () => {

    it('Listar usuarios cadastrados', function () {
        cy.fixture('usuario').then((data) => {

            const email = data.cadastro_ja_existente.dados.email

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

    it('Listar usuarios cadastrados por id', function () {
        cy.fixture('usuario').then((data) => {

            const id = data.cadastro_ja_existente._id._id

            cy.getUsuarios_por_id(id).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('nome', 'Fulano da Silva')
                expect(response.body).to.have.property('email', data.cadastro_ja_existente.dados.email)
                expect(response.body).to.have.property('_id', id)
                expect(response.body).to.have.property('administrador', "true")

            })
        })
    })


    it('Cadastro nao encontrado por id', function () {
        cy.fixture('usuario').then((data) => {

            const id = data.sem_cadastro._id

            cy.getUsuarios_por_id(id).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body).to.have.property('message', 'Usuário não encontrado')
            })
        })
    })
    

})