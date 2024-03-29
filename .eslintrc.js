module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
    browser: true
  },
  extends: ['standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'space-before-function-paren': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    camelcase: 'off',
    indent: 'off'
  }
}
