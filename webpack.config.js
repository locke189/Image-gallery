var path = require('path');

module.exports = {
  entry: __dirname + '/app/js/main.js',
  output: {
      path: __dirname + '/app',
      filename: 'bundle.js'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  resolve: {
    root: path.resolve('./app'),
    extensions: ['', '.js']
  },
  devServer: {
    contentBase: "./app"
  }
};


