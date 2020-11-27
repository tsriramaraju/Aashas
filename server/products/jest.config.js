module.exports = {
  name: 'Products service',
  verbose: true,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./src/test/setup.ts'],
  testEnvironment: 'node',
};
