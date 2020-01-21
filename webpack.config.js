const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    devtool: "source-map",
    plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  //'style-loader',
                  MiniCssExtractPlugin.loader,
                  // Translates CSS into CommonJS
                  {
                    loader: 'css-loader',
                    options: {
                      sourceMap: true,
                    },
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: true,
                    },
                  },
                ],
              }
        ]
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};
