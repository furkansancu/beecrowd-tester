const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'cli.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: [/node_modules/],
            },
        ],
    },
    externals: [ nodeExternals() ],
    target: 'node',
    resolve: {  extensions: ['.ts'] },
    optimization: { minimize: true }
}