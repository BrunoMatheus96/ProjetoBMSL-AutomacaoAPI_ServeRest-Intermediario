const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    
      // implement node event listeners here
      baseUrl: 'https://serverest.dev',
      specPattern: 'cypress/e2e/**/*.cy.js',
      supportFile: 'cypress/support/e2e.js'
  },
});
