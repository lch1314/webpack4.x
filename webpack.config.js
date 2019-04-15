const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');


const MiniCssExtractPlugin = require('mini-css-extract-plugin')       // 默认打包后只能插入<style>标签内，这个插件可以将css单独打包成文件，以<link>形式引入
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');

module.exports = {
    mode: 'development', 
    devtool: 'cheap-module-eval-source-map',  
    // mode: 'production', 
    // devtool: 'cheap-module-source-map',  
    entry: {
        main: './src/index.js',
    },                        
    output: {
        filename: '[name].js',                      
        path: path.resolve(__dirname, 'dist'),
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
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader'
            },
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
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',                            // 设置MiniCssExtractPlugin.loader后需要去掉这个loader
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
    // optimization: {
    //     usedExports: true
    // },
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
        new webpack.HotModuleReplacementPlugin(),  
        new MiniCssExtractPlugin({
            filename: '[name].css'                         // 打包后的css文件名
        }),     
        new PurifyCSS({
            paths: glob.sync([
                // 要做CSS TreeShaking的文件
                path.resolve(__dirname, './src/*.js')
            ])
        })
    ]
}