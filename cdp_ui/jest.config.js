module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.[t|j]sx?$": ["babel-jest", { "useESM": true }]
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)", // Add exceptions here if necessary
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};

