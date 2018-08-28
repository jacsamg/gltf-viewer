const path = require('path'),
  webpack = require('webpack'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  merge = require('webpack-merge'),
  common = require('./webpack.common.js');

// ====================
// PLUGINS
// ====================

// Entorno
const dev = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('development')
});

// Extrae los estilos del 'bundle.js' a sus propios archivos '.css'
const extractStyles = new MiniCssExtractPlugin({
  filename: '[name].css'
});

// Recarga en caliente
const hotReload = new webpack.HotModuleReplacementPlugin();

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
};

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
    rules: [styles]
  },
  plugins: [extractStyles, dev, hotReload],
  devtool: 'cheap-eval-source-map'
});
