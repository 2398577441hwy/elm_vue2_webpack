// 处理js
// eslint对js代码进行检测   label对js代码进行转换
// 引入eslintwebpackPlugin插件  babel是通过loader进行处理 
//  均需要指示文件 看看干什么      babel.config.js


const path = require("path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
// 处理html  插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 处理vue
const { VueLoaderPlugin } = require('vue-loader')

// 返回处理样式loader函数
const getStyleLoaders = (pre) => {
    return [
        "vue-style-loader",
        "css-loader",
        {
            // 处理css兼容性问题
            // 配合package.json中browserslist来指定兼容性做到什么程度
            loader: "postcss-loader",
            // 为postcss-loader做配置
            options: {
                postcssOptions: {
                    plugins: ["postcss-preset-env"],
                },
            },
        },
        pre,
    ].filter(Boolean);
};

module.exports = {
    entry: "./src/main.js",
    // output: {
    //     path: undefined,
    //     filename: "static/js/[name].js",
    //     chunkFilename: "static/js/[name].chunk.js",
    //     assetModuleFilename: "static/media/[hash:10][ext][query]",
    // },
    module: {
        rules: [
            // 处理css
            {
                test: /\.css$/,
                use: getStyleLoaders(),
            },
            {
                test: /\.less$/,
                use: getStyleLoaders("less-loader"),
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoaders("sass-loader"),
            },
            // 处理图片
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                // asset可以转base64
                type: "asset",
                // 将小于10kb的图片转换成base64
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
            },
            // 处理其他资源
            {
                test: /\.(woff2?|ttf)$/,
                // asset/resource是原封不动的输出
                type: "asset/resource",
            },
            // 处理js
            {
                test: /\.js?$/,
                // 编译范围
                include: path.resolve(__dirname, "../src"),
                loader: "babel-loader",
                // 提升性能
                options: {
                    // 开启缓存 提升打包速度 
                    cacheDirectory: true,
                    // 缓存内容不压缩
                    cacheCompression: false,
                },
            },
            // 处理vue
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            }
        ]
    },
    plugins: [
        // 还需要通过.eslintrc.js指定eslintrc到底按照什么规则进行代码检测
        new EslintWebpackPlugin({
            // context对哪些js代码进行检测  需要绝对路径  
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules",
            // 进行缓存 第二次打包会更好
            cache: true,
            // 设置缓存的目录
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        new VueLoaderPlugin()
    ],
    // 代码运行读取的环境变量 并不是babel读取时的环境变量
    mode: "development",
    // 调试加友好 报源码错误
    devtool: "cheap-module-source-map",
    // 进行代码分割 主要分割node_modules代码和import动态导入的代码
    
    // lintOnSave: false,
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        // 代码分割可能导致代码失效 配置runtimeChunk
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`,
        },
    },
    // webpack解析模块加载选项
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src/')
        },
        // 自动补全文件扩展名
        extensions: [".vue", ".js", ".json"],
    },
    // 为了调试更加方便  
    devServer: {
        host: "localhost",
        port: 3000,
        open: true, //自动开启服务器
        hot: true, // 开启HMR
        historyApiFallback: true, // 解决前端路由刷新404问题   告诉webpack-dev-server在出现404错误时将请求重定向到入口文件，以便前端路由可以正确处理这些请求
        proxy: {
            context: ['/v1', '/v2', '/v3', '/v4', '/shopping', '/ugc', '/bos', '/member', '/img', '/payapi', '/eus', '/promotion'],
            target: 'http://localhost:8001',
            changeOrigin: true,
        }
    },
}