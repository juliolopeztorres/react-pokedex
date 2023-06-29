import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    roots: ["<rootDir>/test"],
    testEnvironment: 'jsdom',
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    coveragePathIgnorePatterns: [
      '<rootDir>/src/Framework/Service/DarkModeContextService',
      '<rootDir>/src/Framework/Service/LoadingContextService',
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        "^.+\\.jsx?$": "babel-jest",
    },
};

export default config;
