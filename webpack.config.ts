import * as path from 'path';
import * as webpack from 'webpack';
import * as Dotenv from 'dotenv-webpack';

export default {
  mode: 'development',
  entry: ['react-hot-loader/patch', './src/Framework'],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'docs/dist'),
    publicPath: "/dist/",
  },
  devServer: {
    contentBase: path.join(__dirname, "./docs/"),
    port: 3000,
    host: '0.0.0.0',
    publicPath: "http://0.0.0.0:3000/dist/",
    historyApiFallback: true,
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new Dotenv.default()],
};
