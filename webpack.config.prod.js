const merge = require('webpack-merge');
const config = require('./webpack.config.common');

module.exports = merge(config, {
    mode: 'production',
});
