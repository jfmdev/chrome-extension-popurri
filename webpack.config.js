const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  devtool: 'source-map',

  entry: {
    background: './src/background.js',
    menu: './src/menu.js',
    options: './src/options.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/menu.html',
      filename: "menu.html",
      chunks: ['menu']
    }),
    new HtmlWebpackPlugin({
      template: './src/options.html',
      filename: "options.html",
      chunks: ['options']
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.join(__dirname, 'src/'),
        globOptions: {
          ignore: ["**/*.html", "**/*.js", "**/*.svelte"],
        },
      }],
    }),
  ],

  module: {
    rules: [
      {
        test: /\\.(js|jsx)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader','css-loader'],
      },
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.mjs', '.js', '.svelte'],
  },

  optimization: {
    minimize: true,
    splitChunks: {
      chunks(chunk) {
        // Don't split background file, otherwise won't be loaded completely by Chrome.
        return chunk.name !== 'background';
      },
    },
  },
};
