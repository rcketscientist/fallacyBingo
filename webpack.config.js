const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, 'src', 'index.html')
        })
    ]
  };