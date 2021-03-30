// const webpack = require('webpack');
const { resolve, join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');
const sass = require('sass');

module.exports = {
  ...(
    process.env.NODE_ENV !== 'production'
      ? {
        devServer: {
          contentBase: join(__dirname, 'dist'),
          compress: true,
          port: 9000
        }
      }
      : {}
  ),
  entry: {
    clio: resolve(__dirname, 'src/index.tsx'),
  },
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { esModule: true }
          },
          {
            loader: 'css-loader',
            options: { modules: true }
          },
          {
            loader: 'sass-loader',
            options: { implementation: sass }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        sideEffects: true,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { esModule: true }
          },
          'css-loader',
          {
            loader: 'sass-loader',
            options: { implementation: sass }
          }
        ],
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.mjs' ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      template: './index.html',
      title: `clio (${pkg.version})`,
      description: pkg.description,
      minify: { collapseWhitespace: false, removeComments: false },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  stats: {
    all: undefined,
    assets: true,
    assetsSort: '!size',
    builtAt: false,
    cached: false,
    cachedAssets: false,
    children: false,
    chunkGroups: false,
    chunkModules: false,
    chunkOrigins: false,
    chunks: false,
    chunksSort: 'size',
    depth: false,
    entrypoints: true,
    env: false,
    errorDetails: true,
    errors: true,
    modules: false,
    modulesSort: 'size',
    moduleTrace: false,
    performance: false,
    providedExports: false,
    reasons: false,
    source: false,
    timings: false,
    usedExports: false,
    version: true,
    warnings: false,
  },
};