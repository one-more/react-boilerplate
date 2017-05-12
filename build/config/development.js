/* eslint-disable */
import {babelConfig, distPath, publicPath, assets} from '../shared';
import entries, {root} from '../entries';
import path from 'path';
import {isArray, forEach} from 'lodash';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FlowBabelWebpackPlugin from 'flow-babel-webpack-plugin';

const port = 8000;
const mainExtractPlugin = new ExtractTextPlugin({filename: '[name].css', allChunks: true, disable: true});

babelConfig.plugins = isArray(babelConfig.plugins) ?
    ['react-hot-loader/babel'].concat(babelConfig.plugins) : ['react-hot-loader/babel'];

forEach(entries, (v, key) => {
    entries[key] = [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://localhost:${port}`,
        'webpack/hot/only-dev-server'
    ].concat(v);
});

const globalStyles = [path.join(root, 'app/styles/global')];

module.exports = {
    entry: entries,
    output: {
        filename: '[name].js?[hash]',
        path: distPath,
        publicPath
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['app', 'node_modules']
    },
    resolveLoader: {
        modules: ['node_modules', 'loaders'],
        extensions: [".loader.js", ".js"],
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.path/,
                use: [
                    'raw-loader'
                ]
            },
            {
                test: /\.(gif|png|jpg|svg|ttf|otf|eot|woff|woff2)$/,
                include: path.join(root, 'app'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: '[path][name].[ext]?[hash]'
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpg|svg|ttf|otf|eot|woff|woff2)$/,
                include: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: 'vendors/[name].[ext]?[hash]'
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                include: [path.join(root, 'app'), path.join(root, 'modules')],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            ...babelConfig,
                            babelrc: false,
                            cacheDirectory: path.join(root, '.cache')
                        }
                    },
                ]
            },
            {
                test: /\.css$/,
                include: [require.resolve('normalize.css'), path.join(root, 'app/modules')],
                loader: mainExtractPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'resolve-url-loader'
                    ]
                })
            },
            {
                test: /\.(sass|scss)$/,
                include: [path.join(root, 'app'), path.join(root, 'modules')],
                exclude: globalStyles,
                loader: mainExtractPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[local]-[hash:base64:3]'
                            }
                        },
                        'postcss-loader',
                        'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'expanded'
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(sass|scss)$/,
                include: globalStyles,
                loader: mainExtractPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'expanded'
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /(ru|en-gb)/),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest'],

        }),
        new CleanWebpackPlugin([path.basename(distPath)], {root}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'DEBUG': JSON.stringify(true),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        mainExtractPlugin,
        new webpack.NamedModulesPlugin(),
        new FlowBabelWebpackPlugin(),
        ...assets
    ],
    devServer: {
        hot: true,
        proxy: {
            "/api": "http://localhost:8080"
        },
        watchOptions: {
            aggregateTimeout: 500,
            poll: 1000
        },
        historyApiFallback: true,
        stats: 'errors-only',
        port,
        contentBase: distPath,
        publicPath
    },
};
