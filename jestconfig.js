module.exports = {
    preset: 'jest-playwright-preset',
    transform: {
      '^.+\\.ts$': 'ts-jest'
    },
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.ts']
  };
  