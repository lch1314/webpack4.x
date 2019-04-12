const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development', 
    devtool: 'heap-module-eval-source-map',                            
    entry: {
        main: './src/index.js',
    },                        
    output: {
        filename: '[name].js',                      
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8080,
        proxy: {
            '/api:': 'http://localhost:3000'
        },
        hot: true,               // 启用 webpack 的模块热替换特性
        hotOnly: true            // 即使HMR功能不生效，也不让浏览器自动刷新
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
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader', 
                    'postcss-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: 'src/index.html',
                title: 'test App',
                filename: 'index.html',
                minify: {
                    collapseWhitespace: true
                }
            }
        ), 
        new CleanWebpackPlugin(), 
        new webpack.HotModuleReplacementPlugin()        // webapck内置插件
    ]
}