var webpack = require("webpack");
var babel = require("@babel/core");
var babelregister = require("@babel/register");
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'none',
    entry: [
        './src/app.js'
    ],
    output: {
        filename: "app.js"
    },
    watch: true,
    module: {
        rules: [{
                test: /\.js$/,
                exclude: path.resolve(__dirname, '/node_modules'),
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: ['style', 'css', 'sass']
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: false,
        hot: true,
        stats: "errors-only",
        open: true
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    }
}