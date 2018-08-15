const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/client/source/main.ts'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname,'./client/build')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
};