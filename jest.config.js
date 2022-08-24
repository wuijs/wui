const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

const moduleNameMapper = pathsToModuleNameMapper(
  compilerOptions.paths || {},
  { prefix: '<rootDir>/../' }
);

module.exports = {
  transform: { '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest' },
  testTimeout: 30000,
  coverageReporters: ['json', 'text', 'html', 'lcov', 'clover'],
  testEnvironment: 'jsdom',
  moduleNameMapper,
};