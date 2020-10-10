const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

// 开发环境
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
                    },
                    
                ],
            }
        ]
    },
    plugins: [
        // 启用热替换模块
        new webpack.HotModuleReplacementPlugin(),
        // 显示模块的相对路径
        new webpack.NamedModulesPlugin(),
        // 打印更多可读的模块名称
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        disableHostCheck: true,
        host: '192.168.87.166',
        port: 8080,
        inline: true,
        // open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        historyApiFallback: true,
        // proxy: {
        //   '/api': {
        //     target: 'http://172.16.8.253:65099',       // 测试地址
        //     changeOrigin: true,
        //   }
        // }
    },
}); 
