const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// 多页配置
exports.multiPage = config => {
    let pages = [
        {
            name: 'index',
        }
    ];

    pages.forEach(page => {
        let name = page.name;

        if (process.env.BABEL_ENV === 'development') {
            config.entry[name] = [
                path.resolve(__dirname, `../src/entries/${name}/index.js`),
                require.resolve('react-dev-utils/webpackHotDevClient'),         // 热加载
            ];
        } else {
            config.entry[name] = path.resolve(__dirname, `../src/entries/${name}/index.js`)
        }
        
        config.plugins.unshift(
            new HtmlWebpackPlugin({
                inject: true,
                filename: `${name}.html`,
                template: path.resolve(__dirname, `../public/index.html`),
                chunks: ['vendor', name],
                // cache: true,
                chunksSortMode: 'manual',
            })
        );
    });
};
