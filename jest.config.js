const config = {
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.(ts|tsx)$': '<rootDir>/scripts/preprocessor.js'
  },
  testMatch: [
    '**/__tests__/**/*.test.(ts|js)'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/package.json',
    '<rootDir>/package-lock.json',
    '<rootDir>/coverage',
    '.*\\.d\\.ts',
    'types.ts'
  ]
};

module.exports = config;
