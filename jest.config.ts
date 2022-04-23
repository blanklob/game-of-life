import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'node',
  testMatch: ['**/?(*.)spec.ts?(x)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
export default config;
