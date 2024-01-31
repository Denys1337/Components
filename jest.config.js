module.exports = {
  globalSetup: '<rootDir>/test/unit/global-setup',
  globalTeardown: '<rootDir>/test/unit/global-teardown',
  setupFiles: ['<rootDir>/test/unit/setup'],
  setupFilesAfterEnv: ['<rootDir>/test/unit/matchers'],
  testMatch: ['**/(*.)spec.ts', '**/(*.)spec.js'],
  moduleFileExtensions: ['vue', 'ts', 'js', 'json'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.+\\.(css|scss|jpe?g|png|gif|webp|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)$':
      'jest-transform-stub',
  },
  coverageDirectory: '<rootDir>/public/coverage',
  collectCoverageFrom: ['src/js/**/*.{ts,js,vue}', '!**/*.stories.{ts,js}', '!**/node_modules/**'],
  transformIgnorePatterns: ['node_modules/?!'],
  modulePaths: ['<rootDir>/node_modules'],
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/js/$1',
    '^@stories/(.*)': '<rootDir>/.storybook/$1',
    '^@style': '<rootDir>/src/style/$1',
    '^lodash-es$': 'lodash',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
    'vue-jest': {
      // Compilation errors in the <style> tags of Vue components will
      // already result in failing builds, so compiling CSS during unit
      // tests doesn't protect us from anything. It only complicates
      // and slows down our unit tests.
      experimentalCSSCompile: false,
    },
  },
};
