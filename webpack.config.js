const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = function () {
  return {
    mode: 'development',
    entry: {
      'app': './src/js/app.js',
      // 'style': './src/less/lobiadmin.less'
    },
    watch: true,
    watchOptions: {
      aggregateTimeout: 300, // Process all changes which happened in this time into one rebuild
      poll: 1000, // Check for changes every second,
      ignored: /node_modules/,
      // ignored: [
      //   '**/*.scss', '/node_modules/'
      // ]
    },
    devtool: 'source-maps',
    devServer: {
      contentBase: path.join(__dirname, 'src'),
      watchContentBase: true,
      hot: true,
      open: true,
      inline: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack starter project',
        template: path.resolve('./src/index.html')
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
      })
    ],
    module: {
      rules: [
        {
          test: /\.(css|less)$/,
          use: [
            'style-loader',
            "css-loader",
            "less-loader"
          ]
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(pdf|doc|docx|xls|xlsx|txt|csv|tsv)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: './files',
                name: "[name].[ext]",
              },
            }
          ]
        },
        {
          test: /\.(jpg|jpeg|gif|png|svg|webp)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: './images',
                name: "[name].[ext]",
              },
            },
          ]
        },
        {
          test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: [':src']
            }
          }
        },
      ]
    }
  };
}
