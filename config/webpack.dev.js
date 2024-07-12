const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  // output: {
  //   publicPath: 'http://localhost:8082/',
  // },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
          mangle: true,
          output: {
            comments: false,
          },
          sourceMap: true, 
        },
        extractComments: false,
      }),
    ],
  },
  entry: './src/App.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devtool: 'source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 8082,
    open: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'myva_todo',
      filename: 'remoteEntry.js',
      exposes: {
        './TodoIndex': './src/App.tsx',
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          singleton: true,
          requiredVersion: packageJson.dependencies.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: packageJson.dependencies['react-dom'],
        },
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
