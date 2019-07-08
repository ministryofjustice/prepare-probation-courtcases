import TerserPlugin from 'terser-webpack-plugin';
import path from 'path';
import babel from './.babelrc.js';

// Return module
export default {
  devtool: 'source-map',
  mode: 'production',

  module: {
    rules: [
      {
        exclude: /node_modules/,
        type: 'javascript/auto',
        test: /\.m?js$/,
        use: [{
          loader: 'babel-loader',
          options: babel,
        }],
      },
    ],
  },

  output: {
    filename: '[name].js',
    path: path.resolve('./dist/public/assets/javascripts'),
    publicPath: '/assets/javascripts/',
  },

  optimization: {
    minimizer: [new TerserPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
      terserOptions: {
        compress: {
          ie8: false,
          warnings: false,
        },
        output: {
          comments: false,
          ie8: false,
        },
      },
    })],
  },

  resolve: {
    modules: [
      './node_modules',
      './src/public/assets/javascripts',
    ],
  },
};
