'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    context: path.join(__dirname, 'pages'),
    entry: {
        base: './base/base.js',
        authorization: './authorization/authorization.js',
        registration: './registration/registration.js',
        notFound: './notFound/notFound.js',
        index: './index/index.js',
        userPage: './userPage/userPage.js'
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
    postcss: () => {
        return [autoprefixer];
    }
};
