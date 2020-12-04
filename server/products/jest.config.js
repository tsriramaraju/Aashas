process.env.ALGOLIA_APP_ID = 'some fix';
process.env.ALGOLIA_API_KEY = 'some fix';
module.exports = {
  name: 'Products service',
  verbose: true,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./src/test/setup.ts'],
  testEnvironment: 'node',
};
