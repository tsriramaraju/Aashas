import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    name: 'users service',
    verbose: true,
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./src/test/setup.ts'],
    testEnvironment: 'node',
  };
};
