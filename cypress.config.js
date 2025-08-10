const { defineConfig } = require("cypress");
const registerTasks = require('./cypress/support/tasks');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      registerTasks(on); // Aqui chamamos nosso arquivo externo
      return config;
    },

    baseUrl: 'https://serverest.dev',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
  }
});
