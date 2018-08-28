const webpack = require('webpack'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  merge = require('webpack-merge'),
  common = require('./webpack.common');

// ====================
// PLUGINS
// ====================

// Entorno
const prod = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
});

// Extrae los estilos del 'bundle.js' a sus propios archivos '.css'
const extractStyles = new MiniCssExtractPlugin({
  filename: '[name].css'
});

// ====================
// LOADERS
// ====================

// Estilos sass
const styles = {
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
};

// ====================
// CONFIGURACION DE WEBPACK
// ====================

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [styles]
  },
  plugins: [extractStyles, prod]
});
