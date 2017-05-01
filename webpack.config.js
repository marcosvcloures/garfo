const path = require('path');

module.exports = {

    entry: path.resolve(__dirname, 'src/index.jsx'),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {test: /\.(css|less)$/, use: ['style-loader', 'css-loader', 'less-loader']},
            {test: /\.jsx$/, use: ['babel-loader']},
        ]
    },

    devServer: {
        contentBase: __dirname + "/dist/"
    },

};
