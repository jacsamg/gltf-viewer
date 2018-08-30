const path = require('path'),
  webpack = require('webpack'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  merge = require('webpack-merge'),
  common = require('./webpack.common');

// ====================
// CONFIGURACION DE WEBPACK
// ====================

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            // Toma los css importados
            loader: 'css-loader'
          },
          {
            // Procesa los plugins de postcss
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')(), // Utiliza browserlist
                require('cssnano')()
              ]
            }
          },
          {
            // Compila sass
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    // Entorno
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // Limpiar la carpeta de distribucion antes de la compilacion
    new CleanWebpackPlugin([path.resolve(__dirname, './build')]),
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
    // Extrae los estilos del 'bundle.js' a sus propios archivos '.css'
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
});
