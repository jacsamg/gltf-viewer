const path = require('path'),
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ThreeWebpackPlugin = require('@wildpeaks/three-webpack-plugin');

// ====================
// VARIABLES Y UTILIDADES
// ====================

// Crea rutas para archivos y carpetas
function src(source) {
  return path.resolve(__dirname, source);
}

// Ruta de distribucion
const dist = src('./build');

// ====================
// PLUGINS
// ====================

// Crea graficas de las dependencias
const analyzer = new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
  analyzerMode: 'static',
  openAnalyzer: false
});

// Genera el index.html
const html = new HtmlWebpackPlugin({
  hash: false,
  filename: 'index.html',
  title: 'GLTF viewer',
  template: './src/view/index.html'
});

// Para cargar los modulos de ejemplo de three.js
const threeModules = new ThreeWebpackPlugin();

// ====================
// LOADERS
// ====================

// Javascript
const javascript = {
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
};

// ====================
// CONFIGURACION DE WEBPACK
// ====================

module.exports = {
  entry: {
    main: [src('./src/scripts/main.js'), src('./src/styles/main.scss')]
  },
  output: {
    path: dist,
    filename: '[name].js'
  },
  module: {
    rules: [javascript]
  },
  plugins: [
    html,
    threeModules
    // analyzer
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
