const path = require('path');

module.exports = {
    mode: 'development',                              // 不写的mode，默认就是生产模式
    entry: './src/index.js',                         // 入口文件
    output: {
        filename: 'bundle.js',                       // 打包好之后的名字，之前默认是叫main.js 这里我们改为bundle.js
        path: path.resolve(__dirname, 'dist')        // 打包好的文件应该放到哪个文件夹下
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            limit: 2048
                        }
                    }
                ]
            }
        ]
    }
}