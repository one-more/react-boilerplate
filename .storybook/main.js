const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.tsx'],
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-viewport/register',
        '@storybook/addon-links/register',
    ],
    webpackFinal: async config => {
        const commonConfig = require('../webpack.config.common');
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: [
                {
                    loader: require.resolve('babel-loader'),
                },
                {
                    loader: require.resolve('react-docgen-typescript-loader'),
                },
            ],
        });
        config.module.rules = config.module.rules.filter(rule => rule.test.test('.svg') === false);
        config.module.rules.push({
            test: /\.(|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
            loader: path.resolve(__dirname, '../node_modules/@storybook/core/node_modules/file-loader/dist/cjs.js'),
            query: { name: 'static/media/[name].[hash:8].[ext]' },
        });
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: 'svg-inline-loader',
                    options: {
                        removeSVGTagAttrs: false,
                    },
                },
            ],
        });
        config.resolve.extensions.push('.ts', '.tsx');
        config.resolve.alias = commonConfig.resolve.alias;
        return config;
    },
};
