// frontend/.eslintrc.js
module.exports = {
    env: {
      browser: true,
      node: true,
      es2021: true,
      jest: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:jest/recommended',
    ],
    globals: {
      page: 'readonly',
      browser: 'readonly',
      jestPuppeteer: 'readonly',
    },

  };