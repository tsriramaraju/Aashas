import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    name: 'auth service',
    verbose: true,
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./src/test/setup.ts'],
    testEnvironment: 'node',
  };
};
