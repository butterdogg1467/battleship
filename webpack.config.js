const path = require('path');

module.exports = {
  entry: './visualgamescript.js',  
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader', 
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  mode: 'development', 

  
};