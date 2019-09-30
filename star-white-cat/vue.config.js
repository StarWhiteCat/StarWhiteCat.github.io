const fs= require('fs')
const path= require('path')
const basePath= process.cwd()
const srcPath= path.resolve(basePath, 'src')
const NODE_ENV= process.env.NODE_ENV
module.exports= {
    publicPath: '/',
    // 输出文件目录
    outputDir: '../../dist',
    assetsDir: 'assets',// 相对于outputDir文件夹
    indexPath: '../index.html',// 相对于outputDir文件夹
    // filenameHashing: true, // 静态文件包含hash便于更好的控制缓存
    // eslint-loader 是否在保存的时候检查
    lintOnSave: NODE_ENV!== 'production',
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    // 是否在使用运行时包含变化一起的vue构建版本
    runtimeCompiler: NODE_ENV!== 'production',
    // transpileDependencies: [], //babel-loader默认忽略node_modules中文件，显式转译某个依赖，可以单独列出来
    pages: {
        index: {
          // page 的入口
          entry: path.resolve(srcPath, 'main.js'),
          // 模板来源
          template: 'public/index.html',
          // 在 dist/index.html 的输出
          filename: 'index.html',
          // 当使用 title 选项时，
          // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
          title: '余生Blog-zc',
          // 在这个页面中包含的块，默认情况下会包含
          // 提取出来的通用 chunk 和 vendor chunk。
          chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        // subpage: 'src/subpage/main.js'
    },
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
    configureWebpack: () => {},
    //如果想要引入babel-polyfill可以这样写
    // configureWebpack: (config) => {
    //   config.entry = ["babel-polyfill", "./src/main.js"]
    // },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否生成 sourceMap 文件 
    // Source map的作用：针对打包后的代码进行的处理，就是一个信息文件，里面储存着位置信息。
    // 也就是说，转换后的代码的每一个位置，所对应的转换前的位置。
    // 有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin// css提取到一个独立地css文件中
        extract: true,
        // 开启 CSS source maps?// 设置为true之后会影响到构建的性能
        sourceMap: false,
        // css预设器配置项// 例如css: {} 会传递给css-loader
        loaderOptions: {
            css: {
                // 会传递给 css-loader
            },
            postcss: {
                // 会传递给 postcss-loader
            }
        },
        // 启用 CSS modules for all css / pre-processor files.默认情况下只有带*.module.[ext]结尾的文件才会被视作css Modules模块
        // 设置true可以去掉文件名中的module
        modules: false
    },
    // 是否为babel或者typescript使用 thread-loader。在系统的cpu有多余一个内核的自动启用
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false, 
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: 'xzz-zc.yusheng.com',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
        before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {
    // ...
    }
}
