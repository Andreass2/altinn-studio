const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const commonConfig = require('./webpack.common');

module.exports = {
  ...commonConfig,
  mode: 'production',
  devtool: 'source-map',
  performance: {
    hints: false,
  },
  optimization: {
    chunkIds: false,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      ...commonConfig.module.rules,
      {
        test: /\.tsx?/,
        use: 'swc-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
