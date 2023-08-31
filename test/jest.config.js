module.exports = {
  rootDir: '..',
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePaths: ['<rootDir>/src/'],
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testRegex: '\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^~utils': ['<rootDir>/src/utils'],
  },

  // All imported modules in your tests should be mocked automatically
  automock: false,

  // Automatically clear mock calls and instances between every test
  clearMocks: false,

  // The directory where Jest should output its coverage files
  coverageDirectory: './coverage',

  coveragePathIgnorePatterns: [
    // Ignore all metadata files
    '/node_modules/',
    '@types',
    // 'index.ts', // Ignore all 'barrel' modules
  ],
  coverageReporters: ['lcov', 'text', 'json-summary'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json', 'ts'],

  preset: 'ts-jest',

  // Automatically reset mock state between every test
  resetMocks: true,
};
