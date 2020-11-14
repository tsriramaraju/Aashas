import type { Config } from '@jest/types';

process.env.GOOGLE_CLIENT_ID = 'something ';
process.env.GOOGLE_CLIENT_SECRET = 'something ';
process.env.FACEBOOK_CLIENT_ID = 'something ';
process.env.FACEBOOK_CLIENT_SECRET = 'something ';
export default async (): Promise<Config.InitialOptions> => {
  return {
    name: 'auth service',
    verbose: true,
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./src/test/setup.ts'],
    testEnvironment: 'node',
  };
};
