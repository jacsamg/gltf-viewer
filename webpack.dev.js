const path = require('path'),
  webpack = require('webpack'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  merge = require('webpack-merge'),
  common = require('./webpack.common.js');

// ====================
// CONFIGURACION DE WEBPACK
// ====================

module.exports = merge(common, {
  devServer: {
    contentBase: path.join(__dirname, './build'),
    open: true,
    hot: true
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            // Toma los css importados
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            // Compila sass
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // Entorno
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    // Extrae los estilos del 'bundle.js' a sus propios archivos '.css'
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    // Generar vistas
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/views/index.html'),
      filename: 'index.html',
      inject: false,
      scripts: {
        main: 'main.js',
        vendorsMain: 'vendors-main.js'
      },
      styles: {
        main: 'main.css'
      }
    }),
    // Recarga en caliente
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'cheap-eval-source-map'
});
