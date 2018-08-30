const path = require('path'),
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer'),
  ThreeWebpackPlugin = require('@wildpeaks/three-webpack-plugin');

// ====================
// CONFIGURACION DE WEBPACK
// ====================

module.exports = {
  entry: {
    main: [
      path.resolve(__dirname, './src/scripts/main.js'),
      path.resolve(__dirname, './src/styles/main.scss')
    ]
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // Utiliza browserlist
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // Para cargar los modulos de ejemplo de three.js
    new ThreeWebpackPlugin()
    // Crea graficas de las dependencias
    // new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   openAnalyzer: false
    // })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '-',
      cacheGroups: {
        globals: {
          chunks: 'initial',
          name: 'globals',
          test: 'globals',
          enforce: true,
          priority: 9
        }
      }
    }
  }
};
