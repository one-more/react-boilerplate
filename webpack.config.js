module.exports = {
    entry: 'app/index',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['app', 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [path.join(__dirname, 'app'), path.join(__dirname, 'modules')],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            cacheDirectory: path.join(__dirname, '.cache')
                        }
                    }
                ]
            }
        ]
    }
};