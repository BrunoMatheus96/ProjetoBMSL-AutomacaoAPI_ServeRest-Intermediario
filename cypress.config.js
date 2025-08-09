const { defineConfig } = require("cypress");
const axios = require('axios');


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

      on('task', {
        async removeUser(email) {
          try {
            const { data } = await axios.get(`https://serverest.dev/usuarios?email=${email}`);
            if (data.quantidade > 0) {
              const userId = data.usuarios[0]._id;
              await axios.delete(`https://serverest.dev/usuarios/${userId}`);
              return `Usuário ${email} removido`;
            }
            return `Usuário ${email} não encontrado`;
          } catch (err) {
            console.error(err);
            throw err;
          }
        }
      });
      return config;
    },
    
    baseUrl: 'https://serverest.dev',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
  }
});