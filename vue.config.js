
const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, dir)
}
const port = process.env.port || 8080// dev port
module.exports = {
    // 部署应用的基本url  可用 process.env.NODE_ENV 环境变量控制
    publicPath: '',
    // productionSourceMap: false,//正式优化
    // 指定生产环境目录
    outputDir: 'dist',
    // 指定生成静态资源的生成目录
    assetsDir: 'static',
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
    /**
     * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
     * 打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
     * map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
     * 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
     * */
    productionSourceMap: false,

    // 跨域
    devServer: {
        open: true, //是否自动弹出浏览器页面
        port: port,
        open: false,
        proxy: {
            '/music-api': {
                target: 'https://autumnfish.cn/', //API服务器的地址          
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/music-api': ''
                }
            },
            '/cors': {
                target: 'https://api.tianapi.com/',//对应自己的接口,抖音视频
                changeOrigin: true,
                pathRewrite: {
                    '^/cors': ''
                }
            }
        },
        disableHostCheck: true
    },
    //webpack配置
    configureWebpack: {
        name: 'title',
        cache: {
            type: 'filesystem', // 使用文件缓存
        },
        resolve: {
            alias: {
                '@': resolve('src'),
                '@img': resolve('src/assets/images'),
            },
            extensions: [".ts", ".tsx", ".js", ".json"]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                    }
                },
                // loader=>
                // { test: /\.css/, use: ['style-loader', 'css-loader'] },
                // { test: /\.less/, use: ['style-loader', 'css-loader', 'less-loader'] },
                //图片值如果大于limit给定的字节 不被转base64
                // {
                //     test: /\.jpg|png|gif$/,
                //     use: {
                //         loader: 'url-loader',
                //         options: {
                //             limit: 1024 * 200000,
                //             // outputPath: 'image'//打包存放路径
                //         }
                //     }
                // },
                /*limit: 10,限制 图片大小 10B，小于限制会将图片转换为 base64格式*/

            ]
        },
        plugins: [

        ]
    },

    // chainWebpack: config => {
    //     // 修复HMR
    //     config.resolve.symlinks(true);
    // },
}

