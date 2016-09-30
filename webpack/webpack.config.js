const webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: "inline-sourcemap",
    entry: './js/script.js',
    output: {
        path: __dirname + '/js',
        filename: 'bundle.min.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourcemap: false
        })
    ]
};