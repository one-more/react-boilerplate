// eslint-disable-next-line @typescript-eslint/no-var-requires
const merge = require('webpack-merge');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./webpack.config.common');

module.exports = merge(config, {
    mode: 'production',
});
