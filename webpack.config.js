const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',                             
    entry: {
        main: './src/index.js',
        sub: './src/index.js'
    },                        
    output: {
        filename: '[name].js',                      
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://cdn.com.cn'        
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
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin(
        {
            template: 'src/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true
            }
        }
    ), new CleanWebpackPlugin()]
}