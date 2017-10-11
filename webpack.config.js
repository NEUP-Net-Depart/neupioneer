const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
      'index': './src/js/index.js',
      'signup': './src/js/signup.js'
  },
  output: {
    path: __dirname + '/public',
    filename: "./dist/[name].[hash].js"
  },
  module: {
    loaders: [
      { test: /\.js$/,loader: "babel-loader",exclude: /(node_modules|bower_components)/ },
      { test: /\.scss$/,loader: "style-loader!css-loader!sass-loader" },
      { test: /\.css$/,loader: 'style-loader!css-loader' },
      { test: /\.(png|jpe?g|gif|svg)$/,loader: 'file-loader',options: { name: 'img/[name].[hash].[ext]' } },
      { test: /\.(eot|ttf|woff|woff2)$/,loader: 'file-loader',options: { name: 'font/[name].[hash].[ext]' } },
      { test: /\.md$/,loader: 'file-loader',options: { name: 'static/[name].[hash].[ext]' } },
      { test: /\.html$/, loader: "html-loader?interpolate&minimize&removeComments" }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Popper: ['popper.js', 'default'],
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      except: ['$super', '$', 'exports', 'require']
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: __dirname + "/src/tmpl/index.html",
      inject: true,
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: "signup.html",
      template: __dirname + "/src/tmpl/signup.html",
      inject: true,
      chunks: ['signup']
    }),
  ],
  devtool:'eval-source-map',
  devServer: {
    contentBase: "./public/",
    historyApiFallback: true,
    inline: true
  },
};
