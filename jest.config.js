module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  collectCoverage: true,
  "collectCoverageFrom": [
    "**/*.{js,vue}",
    "!**/node_modules/**",
    '!**/build/**',
    // '!**/src/**',
    '!**/build/**',
    '!**/stories/**',
    '!**/coverage/**',
    '!**/.storybook/**',
    '!.eslintrc.js',
    "!babel.config.js",
    "!jest.config.js",
    "!postcss.config.js",
  ],
  "moduleFileExtensions": [
    "js",
    "json",
    "vue"
  ],
  "transform": {
    ".*\\.(vue)$": "@vue/vue3-jest"
  }
};
