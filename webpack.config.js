const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const buildDir = path.join(__dirname, 'public');

module.exports = {
    entry: './app/main.js',

    output: {
        path: buildDir,
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader?presets[]=es2015',
                exclude: /node_modules/
            },
            {
                test: /\.hbs/,
                loader: 'handlebars-template-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(buildDir),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './app/templates/page.hbs',
            data: require('./app/data/data.json')
        }),
        new ExtractTextPlugin('styles.css')
    ]
};
