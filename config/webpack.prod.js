const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/myva_todo/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'myva_todo',
      filename: 'remoteEntry.js',
      exposes: {
        './TodoIndex': './src/App.js',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
