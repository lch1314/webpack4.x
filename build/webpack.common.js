const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')   

module.exports = { 
    entry: {
        main: './src/index.js',
    },                        
    output: {
        filename: '[name].js',                      
        path: path.resolve(__dirname, '../dist'),
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
                    // 'style-loader',                          
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
        new MiniCssExtractPlugin({
            filename: '[name].css'                       
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}