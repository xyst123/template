// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  globals: {
    "WK_G_STATIC_DOMAIN": true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',

  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    "quotes": [1, "single"],
    "semi": 1,
    "space-before-function-paren": 0,
    // 'indent': 'off',
    // 'vue/script-indent': [
    //   1,
    //   4,
    //   {
    //     'baseIndent': 1
    //   }
    // ],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? 2 : 0
  }
}
