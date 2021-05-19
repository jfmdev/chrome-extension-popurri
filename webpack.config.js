const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  devtool: 'source-map',

  entry: {
    background: './src/background.js',
    content: './src/content.js',
    menu: './src/pages/menu.js',
    options: './src/pages/options.js',
    scraper: './src/pages/scraper.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/menu.html',
      filename: "menu.html",
      chunks: ['menu']
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/svelte_base.html',
      filename: "options.html",
      chunks: ['options'],
      title: "Popurri | Settings",
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/svelte_base.html',
      filename: "scraper.html",
      chunks: ['scraper'],
      title: "Popurri | Scraper",
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
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        use: ["file-loader"],
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
        // Don't split background nor content files, otherwise won't be loaded completely by Chrome.
        return chunk.name !== 'background' && chunk.name !== 'content';
      },
    },
  },
};
