const WorkboxPlugin = require('workbox-webpack-plugin');

const prodConfig = {
    mode: 'production', 
    devtool: 'cheap-module-source-map',
    output: {
        filename: '[name].[contenthash].js', 
        chunkFilename: '[name].[contenthash].js', 
    },
    plugins: [
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ]
}

module.exports = prodConfig;