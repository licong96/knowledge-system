const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// 开发环境和生产环境共用的基本配置
module.exports = () => {
    const config = {
        //  入口
        entry: {
        },
        // 出口
        output: {
            path: path.resolve(__dirname, '../build'),
            filename: 'js/[name].[chunkHash:5].js',
            publicPath: process.env.NODE_ENV === 'development' ? '/' : './',       // 模板、样式、脚本、图片等资源对应的server上的路径
        },
        // 处理模块的规则
        module: {
            rules: [
                {
                    test: /\.hbs$/,
                    exclude: /node_modules/,
                    loader: 'html-loader?attrs=img:src img:data-src'
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader'
                        },
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                name: 'images/[name].[hash:5].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                name: 'media/[name].[hash:5].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'font/[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        // 寻找模块的规则
        resolve: {
            extensions: ['.js'],
            alias: {
                handlebars: 'handlebars/dist/handlebars.min.js',      // handlebars警告
                '@': path.resolve(__dirname, '../src'),
            }
        },
        node: {
            dgram: 'empty',
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty'
        },
        // 扩展插件
        plugins: []
    };

    // 页面越多，热加载速度就越慢
    const pages = [
        {
            name: 'index'
        },
    ];

    pages.forEach(item => {
        if (item.name) {
            let name = item.name;
            // 添加入口文件
            if (process.env.NODE_ENV === 'development') {
                config.output.filename = 'js/[name].js';
            } else {
                config.output.filename = 'js/[name].[chunkHash:5].js';
            }
            config.entry[name] = `./src/views/${name}/index.js`;
            // 添加HtmlWebpackPlugin
            config.plugins.push(
                new HtmlWebpackPlugin({
                    filename: `${name}.html`,
                    template: `./src/views/${name}/index.html`,
                    chunks: ['vendor', name],
                    // hash: true,
                    cache: true,
                    chunksSortMode: 'manual',
                })
            );
        }
    });

    return config;
}