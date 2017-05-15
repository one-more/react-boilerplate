/* eslint-disable */
import {babelConfig, distPath, publicPath, assets} from '../shared';
import entries, {root} from '../entries';
import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FlowBabelWebpackPlugin from 'flow-babel-webpack-plugin';

const mainExtractPlugin = new ExtractTextPlugin({filename: '[name].[chunkhash].css', allChunks: true});

const globalStyles = [path.join(root, 'app/styles/global')];
module.exports = {
    entry: entries,
    output: {
        filename: '[name].[chunkhash].js',
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
    devtool: 'source-map',
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
                                localIdentName: '[local]'
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
        new CleanWebpackPlugin([path.basename(distPath)], {root}),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest'],
        }),
        mainExtractPlugin,
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'DEBUG': JSON.stringify(false),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            mangle: false,
            sourceMap: true,
            output: {
                comments: false
            },
        }),
        new FlowBabelWebpackPlugin(),
        ...assets
    ]
};
