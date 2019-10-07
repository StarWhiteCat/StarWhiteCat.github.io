const path= require('path')
const webpack= require('webpack')
const VueLoaderPlugin= require('vue-loader/lib/plugin')
const HtmlWebpackPlugin= require('html-webpack-plugin')
const MiniCSSExtractPlugin= require('mini-css-extract-plugin')

const isDev= process.env.NODE_ENV==="development"
const srcPath= path.resolve(__dirname, 'src')

const config= {
  target: 'web',
  entry: path.resolve(srcPath, 'main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        exclude: /\.(node_modules|bower_components)/,
        use: 'babel-loader'
      },{
        test: /\.vue$/,
        use: 'vue-loader'
      },{
        test: /\.css$/,
        use: [
          isDev?'style-loader':MiniCSSExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, 'postcss.config.js')
              }
            }
          }
        ]
      },{
        test: /\.(png|gif|jpg|jpeg|svg)$/i,
        // filename: '[name].[ext]',
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name][hash].[ext]'
            }
          }
        ]
      },{
        test:/woff|ttf|eot|svg|otf/,
        use:{
            loader:'file-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack 配置教程',
      template: path.resolve(__dirname, 'template.html'),
      filename: 'index.html'
    }),
    new MiniCSSExtractPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev? '"development"':'"production"'
      }
    })
  ]
}
if(isDev){
  config.devtool= '#source-map'
  config.devServer= {
    port: 8080,
    host: '0.0.0.0',
    compress: true,
    overlay: {
      errors: true
    },
    open: true,
    hot: true,
    contentBase: path.resolve(__dirname, 'dist')
  }
  // NoEmitOnErrorsPlugin减少不必要的错误提示
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports= config