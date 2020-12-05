// jest.config.ts
import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,

  projects: [
    '<rootDir>/server/auth/jest.config.js',
    '<rootDir>/server/users/jest.config.js',
    '<rootDir>/server/products/jest.config.js',
    '<rootDir>/server/orders/jest.config.js',
    '<rootDir>/server/designer/jest.config.js',
    '<rootDir>/server/notification/jest.config.js',
    '<rootDir>/server/payments/jest.config.js',
  ],
};
export default config;
