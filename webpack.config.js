const path = require('path');

module.exports = {
    mode: 'development',                             
    entry: './src/index.js',                        
    output: {
        filename: 'bundle.js',                      
        path: path.resolve(__dirname, 'dist')        
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
                            importLoaders: 2,
                            modules: true
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}