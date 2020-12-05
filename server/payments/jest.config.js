module.exports = {
  name: 'Payments service',
  verbose: true,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./src/test/setup.ts'],
  testEnvironment: 'node',
};
