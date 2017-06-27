const path = require('path')
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
  }
}
