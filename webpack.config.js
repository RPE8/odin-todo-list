/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
	index: './src/index.ts',
  },
  devtool: 'inline-source-map',
devServer: {
   static: './dist',
 },
  plugins: [
	new HtmlWebpackPlugin({
	  title: 'Todo',
	}),
  ],
  module: {
	rules: [
	  {
		test: /\.ts?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	  },
	  {
		test: /\.css$/i,
		use: ['style-loader', 'css-loader'],
	  },
	  {
		test: /\.ttf$/i,
		type: 'asset/resource',
	  },
	],
},
resolve: {
	extensions: ['.tsx', '.ts', '.js'],
},
  output: {
	filename: '[name].bundle.js',
	path: path.resolve(__dirname, 'dist'),
	clean: true,
  },
 optimization: {
   runtimeChunk: 'single',
 },
};