const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const CopyWebpackPlugin = require("copy-webpack-plugin");


 module.exports = {
   mode: 'development',
   entry: {
     index: './src/index.js',
    //  print: './src/print.js',
   },
   devtool: 'inline-source-map',

  devServer: {

    static: './dist',

  },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Development',
       template: './src/index.html',
     }),
   ],

   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },

  optimization: {

    runtimeChunk: 'single',

  },
 };