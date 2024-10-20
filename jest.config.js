// jest.config.js
module.exports = {
  preset: 'ts-jest/presets/default-esm', // Use the ESM preset
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Treat TypeScript files as ESM
  globals: {
    'ts-jest': {
      useESM: true, // Enable ESM support in ts-jest
      tsconfig: 'tsconfig.jest.json', // Reference to a Jest-specific tsconfig
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Handle path aliases
    '^\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  },
  transformIgnorePatterns: [
    '/node_modules/', // By default, ignore node_modules
    // Add exceptions if certain packages need transformation
    // Example: '/node_modules/(?!(package-to-transform)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
