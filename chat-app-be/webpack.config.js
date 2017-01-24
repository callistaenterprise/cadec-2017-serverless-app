module.exports = {
  entry: {
    index: './index.js'
  },
  target: 'node',
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [
        'babel'
      ],
      include: __dirname,
      exclude: /node_modules/
    }, {
      test: /.json$/,
      loaders: ['json']
    }]
  },
  output: {
    libraryTarget: 'commonjs',
    path: '.webpack',
    filename: '[name].js'
  }
};

