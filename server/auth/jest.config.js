process.env.GOOGLE_CLIENT_ID = 'something ';
process.env.GOOGLE_CLIENT_SECRET = 'something ';
process.env.FACEBOOK_CLIENT_ID = 'something ';
process.env.FACEBOOK_CLIENT_SECRET = 'something ';
process.env.JWT_SECRET = 'This almost had me ';
module.exports = {
  name: 'auth service',
  verbose: true,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./src/test/setup.ts'],
  testEnvironment: 'node',
};
