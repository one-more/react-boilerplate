/* eslint-disable */
const webpack = require('webpack');
const omit = require('lodash/omit');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

const path = require('path');
const root = path.join(__dirname, '..');

module.exports = function (storybookBaseConfig, env) {
    const {module, plugins, output, resolve} = storybookBaseConfig;
    const distPath = env === 'production' ?  path.join(root, '.storybook', 'build') : [];
    const config = {
        resolve: {
            modules: [path.join(root, 'app'), 'node_modules'],
        },
        module: {
            loaders: [
                {
                    test: /\.(gif|png|jpg|svg|ttf|otf|eot|woff|woff2)$/,
                    loader: 'url'
                },
                {
                    test: /\.(js|jsx)$/,
                    include: [path.join(root, 'app'), path.join(root, 'app', 'modules')],
                    loader: 'babel-loader'
                },
                {
                    test: /\.path/,
                    loader: 'raw-loader'
                },
                {
                    test: /\.css$/,
                    loader: 'style!css!postcss!resolve-url'
                },
                {
                    test: /\.(sass|scss)$/,
                    include: [path.join(root, '.storybook')],
                    loader: 'style!css!postcss!resolve-url!sass?outputStyle=expanded'
                },
                {
                    test: /\.(sass|scss)$/,
                    include: [path.join(root, 'app'), path.join(root, 'app', 'modules'), path.join(root, 'app', 'stories')],
                    loader: 'style!css?modules&importLoaders=1&localIdentName=[local]-[hash:base64:3]!' +
                    'postcss!resolve-url!sass?outputStyle=expanded'
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(distPath, {allowExternal: true}),
            new webpack.DefinePlugin({
                'DEBUG': JSON.stringify(true),
                'process.env.NODE_ENV': JSON.stringify(env)
            }),
            new FlowBabelWebpackPlugin()
        ]
    };
    module.loaders.push.apply(module.loaders, config.module.loaders);
    plugins.push.apply(plugins, config.plugins);
    resolve.modulesDirectories = config.resolve.modules;
    if (env === 'PRODUCTION') {
        output.filename = 'storybook_static/[name].[chunkhash].bundle.js';
    }
    return omit(storybookBaseConfig, 'devtool');
};
