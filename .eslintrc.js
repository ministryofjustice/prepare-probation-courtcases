module.exports = {
  env:{
    "browser": true,
    "node": true,
    "mocha":true
  },
  extends: "airbnb-base",
  parser: 'babel-eslint',
  rules: {
      "no-use-before-define": 0,
      "semi": 0,
      "comma-dangle": ["error", "always-multiline"],
      'import/extensions': [
        '.js',
        '.mjs',
      ],
      'import/no-extraneous-dependencies': [
        'error.njk', {
          'devDependencies': [
            "./src/public/**/*",
            "./tasks/**/*",
            "./gulpfile.esm.js",
            ".config.js.mjs.mjs",
          ],
        },
      ],
    'class-methods-use-this': [
      'off',
    ],
  },

};
