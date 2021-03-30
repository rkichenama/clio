module.exports = {
  roots: [ '<rootDir>/src' ],
  testMatch: [ '**/?(*.)+(spec|test).+(ts|tsx|js)' ],
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  globals: {
    'ts-jest': {
      compiler: 'ttypescript'
    }
  },
  moduleNameMapper: {
    '\\.s?css$': 'identity-obj-proxy'
  },
  "collectCoverageFrom": [
    "./src/**/*.{ts,tsx}",
    "!./src/**/*.d.ts",
    "!./src/shared**/*",
    "!**/node_modules/**"
  ],
  setupFiles: [ '<rootDir>config.ts' ],
  // Setup Enzyme
  snapshotSerializers: [ 'enzyme-to-json/serializer' ],
  setupFilesAfterEnv: [ '<rootDir>/src/setupEnzyme.ts' ]
}