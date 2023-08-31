// @ts-check
/**
 * ESLint configuration.
 * Using a JavaScript file because that are cases where we may need to load some
 * values from another files, like `package.json`.
 * @see https://eslint.org/docs/user-guide/configuring
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // Require explicit return and argument types on exported functions' and classes' public class methods
    '@typescript-eslint/explicit-module-boundary-types': [
      'warn',
      {
        allowArgumentsExplicitlyTypedAsAny: true,
      },
    ],
    // Require explicit return types on functions and class methods
    '@typescript-eslint/explicit-function-return-type': 'error',

    // Require template literals instead of string concatenation
    'prefer-template': 'error',
    // Disallow async functions which have no `await` expression
    'require-await': 'error',
    // Disallow unnecessary `return await` statements
    'no-return-await': 'error',
    // Warn console.log
    'no-console': 'warn',
    // Correction for 'delete ␍' eslint error
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },

  overrides: [{ files: ['*.ts'] }],
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        paths: ['src'],
        extensions: ['.js', '.json', '.ts'],
      },
      alias: {
        map: [
          ['~/utils/*', './src/utils/*'],
          ['~/utils', './src/utils'],
        ],
        extensions: ['.ts', '.js', '.json'],
      },
    },
  },
};
