const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackSkipAssetsPlugin = require('html-webpack-skip-assets-plugin').HtmlWebpackSkipAssetsPlugin;

module.exports = {
  mode: 'development',
  devtool: 'source-map',

  entry: {
    background: './src/background.js',
    options: './src/options.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/options.html',
      filename: "options.html",
      skipAssets: ['background.js']
    }),
    new HtmlWebpackSkipAssetsPlugin(),
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
};
