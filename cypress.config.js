const { defineConfig } = require("cypress");
const axios = require('axios');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

      on('task', {
        // Task para remover usuário pelo email
        async removerUsuario(email) {
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
        },

        async criarUsuario(usuario = data.cadastro2) {
          // 1. Verificar se o usuário já existe pelo email
          const { data } = await axios.get(`https://serverest.dev/usuarios?email=${usuario.email}`);

          if (data.quantidade > 0) {
            // 2. Se existir, remover o usuário existente
            const userId = data.usuarios[0]._id;
            await axios.delete(`https://serverest.dev/usuarios/${userId}`);
          }

          // 3. Criar o novo usuário
          const res = await axios.post('https://serverest.dev/usuarios', usuario);
          return { id: res.data._id, ...res.data };
        }
      });

      return config;
    },

    baseUrl: 'https://serverest.dev',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
  }
});
