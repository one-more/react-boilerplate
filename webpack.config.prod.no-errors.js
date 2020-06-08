// eslint-disable-next-line @typescript-eslint/no-var-requires
const merge = require('webpack-merge');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./webpack.config.common');

module.exports = merge(config, {
    performance: {
        hints: 'warning',
        maxEntrypointSize: 550000,
        maxAssetSize: 550000,
    },
    mode: 'production',
});
