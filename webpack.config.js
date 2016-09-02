const webpack = require('webpack');
// const IS_PROD = process.argv.indexOf('-p') > -1;

module.exports = {
  // devtool: IS_PROD ? 'source-map' : 'eval',
  entry: './docs/entry.ts',
  output: {
    filename: 'bundle.js',
    path: './docs',
  },
  module: {
    // preLoaders: [{
    //   test: /\.ts$/, loader: 'tslint?emitErrors=false&failOnHint=false', exclude: /node_modules/
    // }],
    loaders: [{
      test: /\.ts$/, loader: 'ts', exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  devServer: {
    port: 8000,
    inline: true,
    hot: true,
    historyApiFallback: true,
    contentBase: './docs'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(/*IS_PROD ? 'production' : */'development')
    })
  ]
};
