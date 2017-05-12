/* eslint-disable */

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {root, assetEntries} from './entries';

export const publicPath = '/';
export const distPath = path.join(root, 'dist');

export const babelConfig = require('../package.json').babel;

export const assets = assetEntries.map(assetPath => {
    const minify = process.env.NODE_ENV === 'production' ? {removeComments: true, collapseWhitespace: true} : false;
    return new HtmlWebpackPlugin({
        template: assetPath,
        filename: path.join(distPath, path.basename(assetPath)),
        inject: false,
        minify
    });
});
