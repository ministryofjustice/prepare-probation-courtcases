module.exports = {
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  rules: {
    'import/extensions': [
      '.js',
      '.mjs',
    ],
    'import/no-extraneous-dependencies': [
      'error', {
        'devDependencies': [
          "./src/public/**/*",
          "./tasks/**/*",
          "./gulpfile.esm.js",
          "./webpack.config.mjs",
        ],
      },
    ],
    'class-methods-use-this': [
      'off',
    ],
  },
};
