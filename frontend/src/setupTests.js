// Import jest-dom matchers
import '@testing-library/jest-dom';

// Mock global fetch if needed
global.fetch = jest.fn();

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});