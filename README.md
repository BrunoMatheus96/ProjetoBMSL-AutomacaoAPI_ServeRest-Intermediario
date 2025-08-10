# API utilizada
https://serverest.dev/ 
<br><br>

# Arquitetura do projeto

```
cypress/
  e2e/
    usuarios/
      postUsuario.cy.js
      getUsuario.cy.js
      putUsuario.cy.js
      deleteUsuario.cy.js
  fixtures/
    usuario.json
  support/
    e2e.js
    commands.js
```
**Boas práticas aplicadas aqui:**

- Separar por **módulo** (`usuarios`, `produtos`).
- Centralizar **massa de dados fixa** em `fixtures`.
- Colocar **reuso de requests** em `commands.js`.

<br><br>
# PASSOS

## 1️⃣ Criando o projeto e instalando o Cypress

No terminal:

1. Iniciar package.json
    ```
    npm init -y
    ```

2. Instalar Cypress como dependência de desenvolvimento
    ```
    npm install cypress -D
    ```

## 2️⃣ Abrindo o Cypress pela primeira vez
```
npx cypress open
```

- Ele vai criar automaticamente a pasta cypress/ e o arquivo cypress.config.js.

- Esse arquivo é onde centralizamos as configurações globais.

<br><br>
# Para rodar os testes sem abrir o Cypress
## Rodar testes no modo headless
```
npx cypress run
```