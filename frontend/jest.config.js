// frontend/jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  preset: 'jest-puppeteer', // Add this for E2E tests
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js'
  },
  testMatch: [
    'src/tests/**/*.test.js',
    // The following is for Puppeteer tests
    '!src/tests/e2e/**/*.test.js'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/**/*.d.ts',
    '!src/reportWebVitals.js'
  ],
  coverageThreshold: {
    global: {
      statements: 60,
      branches: 60,
      functions: 60,
      lines: 60
    }
  }
};