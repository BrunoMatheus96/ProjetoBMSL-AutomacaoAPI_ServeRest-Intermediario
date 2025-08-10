const axios = require('axios');

describe('GET /usuarios', () => {

    beforeEach(() => {
        cy.request('/usuarios').then((response) => {
            cy.fixture('schema/usuarios.schema.json').then((schema) => {
                cy.validarSchema(schema, response.body)
            })
        })
    })

    it('Listar usuarios cadastrados', function () {
        cy.fixture('usuario').then((data) => {

            const email = data.cadastro_ja_existente.email

            cy.getUsuarios(email).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.quantidade).to.be.a('number')
                expect(response.body.usuarios).to.be.an('array')
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

            const email = data.cadastro_ja_existente.email;

            cy.task('buscarUsuariosPorEmail', email).then((res) => {
                const userId = res.usuarios[0]._id;


                cy.getUsuarios_por_id(userId).then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('nome', 'Fulano da Silva')
                    expect(response.body).to.have.property('email', email)
                    expect(response.body).to.have.property('_id', userId)
                    expect(response.body).to.have.property('administrador', "true")

                })
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