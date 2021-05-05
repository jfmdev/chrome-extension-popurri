const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/background.js',
  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "background.js",
    clean: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/options.html',
      filename: "options.html"
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.join(__dirname, 'src/'),
        globOptions: {
          ignore: ["**/*.html", "**/*.js"],
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
    ],
  },
};