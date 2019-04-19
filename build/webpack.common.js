const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')   
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = { 
    entry: {
        main: './src/index.js',
        sub: './src/index1.js'
    },                        
    output: {
        filename: '[name].js', 
        chunkFilename: '[name].chunk.js',                     
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
                    MiniCssExtractPlugin.loader,
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
            filename: '[name].css',
            chunkFilename: '[name].chunk.css'                       
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
              vendors:  {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                // filename: 'vendors.js'
              },
              default: {
                // minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
                filename: 'common.js'
              },
              styles: {
                name: 'styles',
                test: /\.css$/,
                chunks: 'all',
                enforce: true,
              },
            }
        },
        minimizer: [
            new TerserJSPlugin({}), 
            new OptimizeCSSAssetsPlugin({})
        ]
    }
}