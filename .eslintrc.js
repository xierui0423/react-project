// http://eslint.org/docs/user-guide/configuring

module.exports = {

  parser: 'babel-eslint',

  env: {
    browser: true,
  },

  globals: {
    "$": true
  },

  extends: [
    'airbnb'
  ],

  // add your custom rules here
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0

    //
  }
}
