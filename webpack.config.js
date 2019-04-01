const path = require('path');

module.exports = {
    entry: './src/index.js',                         // 入口文件
    output: {
        filename: 'bundle.js',                       // 打包好之后的名字，之前默认是叫main.js 这里我们改为bundle.js
        path: path.resolve(__dirname, 'dist')        // 打包好的文件应该放到哪个文件夹下
    }
}