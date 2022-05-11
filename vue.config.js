const port = process.env.port || process.env.npm_config_port || 9028
// const webpack = require('webpack') 
// 压缩代码的插件
const CompressionPlugin = require("compression-webpack-plugin")
// 去掉注释的插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 
const { HashedModuleIdsPlugin } = require('webpack');
// 打包分析插件
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const isProd = process.env.NODE_ENV === 'production'

const vueConfig = {
  lintOnSave: process.env.NODE_ENV === 'development', //设置是否在开发环境下每次保存代码时都启用 eslint验证
    // 根据不同的命令打包文件到不同文件夹
    outputDir: process.env.ENV === 'development'? 'dev' : process.env.ENV === 'test'? 'test' : 'dist',
    devServer: {
      open: true, // 自动打开浏览器
      port:port,
      overlay: {
        warnings: false,
        errors: true
      },
      proxy:{
        [process.env.VUE_APP_BASE_API]:{
          // 目标服务器，代理访问到 https://localhost:8001
          target:`http://127.0.0.1:${port}/mock`,
          // target:'http://192.168.0.83:8080',
          // 开启代理，在本地会创建虚拟服务器，然后发送请求数据
          // 并同时接收请求的数据，这样服务端和服务端进行数据交互就不会有跨域
          changeOrgin:true,//开启代理
          pathRewrite:{
            // 会将/dev-api 替换为 ''。
            // 如/dev-api/db.json 代理到 https://localhost:8080/db.json
            ['^' + process.env.VUE_APP_BASE_API]: ""
          }
        }
      },
      //通过这一行来实现在webpack-dev-serve启动之前启动mock-server服务的
      before: require('./mock/mock-server.js')
    },
    publicPath: './', // 静态资源路径（默认/，打包后会白屏）
    // assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录  默认为‘’没有单独目录js/css/img在根目录中。
    //去除生产环境的productionSourceMap
    productionSourceMap: false,
    // webpack配置
    chainWebpack: config => {
      // 开启图片压缩
      config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.limit = 10240; // 小于10kb的图片都转为base64
        options.esModule = false;
        return options;
      })
      .end()
      // 启用图片压缩功能
      // .use('image-webpack-loader')
      // .loader('image-webpack-loader')
      // .options({ bypassOnDebug: false })
      // .end();
      if(isProd){
        // 启用打包分析工具 BundleAnalyzer
        config.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin);
      }
    },
    // configureWebpack:{
    //   plugins:[
    //     // 如果使用moment.js  javaScript日期处理类库   忽略/moment/locale下的所有文件
    //     // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    //     // 只打包改变的文件
    //     new HashedModuleIdsPlugin(),
    //   ]
    // }
    configureWebpack: config => {
      if(isProd){
        config.plugins.push(
          // 只打包改变的文件
           new HashedModuleIdsPlugin(),
        )
        config.plugins.push(
          // 对资源文件进行压缩
          new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            // test: /\.js$|\.html$|\.json$|\.css/,
            test: /\.js$|\.json$|\.css/,
            threshold: 10240, // 只有大小大于该值的资源会被处理
            minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
            deleteOriginalAssets: false // 删除原文件
          })
        )
        config.plugins.push(
          new UglifyJsPlugin({
            uglifyOptions: {
              output: {
                comments: false, // 去掉注释
              },
              warnings: false,
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ['console.log']//移除console
              }
            }
          })
        )
        // 开启分离js
        config.optimization = {
          runtimeChunk: 'single',
          splitChunks: {
              chunks: 'all',
              maxInitialRequests: Infinity,
              minSize: 1000 * 60,
              cacheGroups: {
                  vendor: {
                      test: /[\\/]node_modules[\\/]/,
                      name(module) {
                          // 排除node_modules 然后吧 @ 替换为空 ,考虑到服务器的兼容
                          const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                          return `npm.${packageName.replace('@', '')}`
                      }
                   }
              }
          }
        }
      }
        
    }
}


module.exports = vueConfig

