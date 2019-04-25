var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: ['webpack/hot/dev-server', path.resolve(__dirname, './src/main.js')],
  output: {
      path: path.resolve(__dirname, './build'),
      filename: 'bundle.js',
      publicPath: '/'
  },
  devServer: {
      inline: true,
      port: 8083,
      proxy: {
        '/api': {
          target: 'https://www.easy-mock.com/mock/5b7bce071f130e5b7fe8cd7d/antd-pro',
          ws: false,
          changeOrigin: true
        }
      },
      historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test:/\.less$/,//支持正则
        loader: "style-loader!css-loader!less-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader'
      },
      {//antd样式处理
        test:/\.css$/,
        exclude:/src/,
        use:[
            { loader: "style-loader",},
            {
              loader: "css-loader",
              options:{
                  importLoaders:1
              }
            }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};