// jest.config.ts
import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,

  projects: [
    '<rootDir>/server/auth/jest.config.js',
    '<rootDir>/server/users/jest.config.js',
  ],
};
export default config;
