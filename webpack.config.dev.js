const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.config.common');

module.exports = merge(config, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: process.env.PORT || 3000,
        open: true,
        historyApiFallback: true,
    },
});
