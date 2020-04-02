// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const merge = require('webpack-merge');
// eslint-disable-next-line @typescript-eslint/no-var-requires
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
