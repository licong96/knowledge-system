const path = require('path');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

// 生产环境
module.exports = webpackMerge(commonConfig(), {
    module: {
        rules: [
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: false
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ],
            }
        ]
    },
    plugins: [
        // 移动到单独的CSS文件中
        // new ExtractTextPlugin('css/[name].css'),     // 使用了skrollr-stylesheets，所以这里不把样式提取出来
        // 抽取公共js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: 2
        }),
        // 压缩js
        // new UglifyJsPlugin({
        //     sourceMap: true
        // }),
    ],
    // devtool: 'hidden-source-map'
});
