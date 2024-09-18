// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// setupTests.js

// Mock window.matchMedia
// window.matchMedia = jest.fn().mockImplementation(query => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: jest.fn(), // Deprecated
//     removeListener: jest.fn(), // Deprecated
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     dispatchEvent: jest.fn(),
//   }));
global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
      addListener: jest.fn(), // Deprecated but still necessary for some cases
      removeListener: jest.fn(), // Deprecated but still necessary for some cases
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
  };
};
  