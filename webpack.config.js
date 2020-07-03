const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const NodeMonPluging = require('nodemon-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'App.js'),

    mode: "development",

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            }
        ]
    },

    resolve: {
        extensions: ['*', '.js', '.jsx', '.css']
    },

    output: {
        path: path.join(__dirname, 'dist'),
        // publicPath: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'ssr map'
        })
    ]
}