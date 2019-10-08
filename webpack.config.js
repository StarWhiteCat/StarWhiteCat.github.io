const path= require('path')
const webpack= require('webpack')
const VueLoaderPlugin= require('vue-loader/lib/plugin')
const HtmlWebpackPlugin= require('html-webpack-plugin')
const MiniCSSExtractPlugin= require('mini-css-extract-plugin')
// 消除冗余的css代码
const PurifyCssPlugin= require('purifycss-webpack')
// 扫描路径
const Glob= require('glob')
const {CleanWebpackPlugin}= require('clean-webpack-plugin')

const isDev= process.env.NODE_ENV==="development"
const hashPart= isDev? '.': '.[contenthash:8].'
const srcPath= path.resolve(__dirname, 'src')

function getUrlLoaderOption(type) {
  return {
    limit: 10000,
    name: `${type}/[name]${hashPart}[ext]`
  }
}

const config= {
  target: 'web',
  entry: path.resolve(srcPath, 'main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  performance:{
    hints: "warning", // 枚举
    maxAssetSize: 30000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
    assetFilter: function(assetFilename) {
    // 提供资源文件名的断言函数
    return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
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
            options: getUrlLoaderOption('images')
          }
        ]
      },{
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        loader: 'url-loader',
        options: getUrlLoaderOption('media')
      },{
        test:/\.(woff|ttf|eot|svg|otf)$/,
        use:{
            loader:'url-loader',
            options: getUrlLoaderOption('font')
        }
      }
    ]
  },
  // 消除冗余JS代码
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 抽离多页面应用的公共模块的打包
        // common: {
        //   name: 'common',
        //   chunks: 'all',
        //   miniSize: 30,
        //   miniChunks: 2
        // }
        // 分离业逻辑JS和第三方库公共JS--能抽离出来的公共库JS，其实就可以作为CDN方式去请求
        vendor: {
          name: 'vendor',
          test: /node_modules/,
          priority: 10,
          chunks: 'all',
          filename: `js/vendor${hashPart}js`,
          // enfoce?
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack 配置教程',
      template: path.resolve(__dirname, 'template.html'),
      filename: 'index.html'
    }),
    ...(isDev?[]: [new MiniCSSExtractPlugin()]),
    // 去除冗余的css
    ...(isDev?[]: [new PurifyCssPlugin({
      // 扫描路径
      paths: Glob.sync(path.join(__dirname, 'src/*.html'))
    })]),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev? '"development"':'"production"'
      }
    })
  ]
}
if(isDev){
  config.devtool= '#cheap-eval-source-map'
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