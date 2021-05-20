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
    svelte: './src/pages/svelte.js',
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
      template: './src/pages/svelte.ejs',
      templateParameters: { type: 'options' },
      filename: "options.html",
      chunks: ['svelte'],
      title: "Popurri | Extension settings",
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/svelte.ejs',
      templateParameters: { type: 'scraper' },
      filename: "scraper.html",
      chunks: ['svelte'],
      title: "Popurri | Website scraper",
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.join(__dirname, 'src/'),
        globOptions: {
          ignore: ["**/*.html", "**/*.ejs", "**/*.js", "**/*.svelte"],
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
