const fs= require('fs')
const path= require('path')
const basePath= process.cwd()
const srcPath= path.resolve(basePath, 'src')
const NODE_ENV= process.env.NODE_ENV
module.exports= {
    publicPath: '/',
    // 输出文件目录
    outputDir: '../dist',
    assetsDir: '../assets',// 相对于outputDir文件夹
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
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            filename: 'index.html',
            title: '余生Blog-zc',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
    },
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
        host: '127.0.0.1',
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
