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
          ".config.mjs.mjs",
        ],
      },
    ],
    'class-methods-use-this': [
      'off',
    ],
  },
};
