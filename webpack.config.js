const path = require('path')
const webpack = require('webpack')

const EXAMPLES_DIR = `${__dirname}/docs`

module.exports = {
  context: EXAMPLES_DIR,
  resolve: {
    root: [
      path.resolve('/node_modules'),
      path.resolve('./src'),
    ]
  },

  entry: {
    app: './app.js'
  },
  output: {
    path: `${EXAMPLES_DIR}/`,
    filename: '[name].dist.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ],

}
