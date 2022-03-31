module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'vue'
  ],
  'rules': {
    'space-before-function-paren': 0,
    'brace-style': [2, 'stroustrup', { 'allowSingleLine': true }],
    'indent': ['error', 2, { 'SwitchCase': 1, 'ignoredNodes': ['TemplateLiteral']}],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-console': ['error'],
    'no-empty': 2,
    'no-eq-null': 2,
    'no-new': 0,
    'no-fallthrough': 0,
    'no-unreachable': 0,
    'template-curly-spacing' : 'off',
    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'any',
        'normal': 'any',
        'component': 'any'
      },
      'svg': 'always',
      'math': 'always'
    }],
    'vue/no-parsing-error': ['error', {
      'x-invalid-end-tag': false
    }]
  }
};
