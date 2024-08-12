const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  // 入口文件
  entry: "./src/index.js",
  // 输出文件
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],

  // 模式：可以是 'development' 或 'production'
  mode: "development",

  // 配置模块处理规则
  module: {
    rules: [
      {
        test: /\.less$/, // 匹配 .less 文件
        use: [
          "style-loader", // 将 CSS 插入到 DOM 中
          {
            loader: "css-loader",
            options: {
              modules: true, // 启用 CSS Modules
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true, // 使 Less 支持 JavaScript, :global这种写法
              },
            },
          },
        ],
      },
      {
        test: /\.css$/, // 匹配 .css 文件
        use: [
          "style-loader", // 将 CSS 插入到 DOM 中
          "css-loader", // 解析 CSS 文件
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // 排除 node_modules 目录
        use: {
          loader: "babel-loader", // 使用 babel-loader
          options: {
            presets: [
              "@babel/preset-env", // 编译现代 JavaScript 语法
              [
                "@babel/preset-react",
                {
                  runtime: "automatic", // React 17+ 自动导入 JSX 转换
                },
              ],
            ],
            plugins: [
              [
                "import",
                { libraryName: "antd", libraryDirectory: "lib", style: "css" },
              ],
            ],
          },
        },
      },
    ],
  },

  // 配置开发服务器
  devServer: {
    headers: {
      // "Content-Type": "application/javascript",
    },
    // contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    port: 9000, // 开发服务器端口
    hot: true,
    contentBase: [
      // path.join(__dirname, "public"), // 提供 public 目录中的静态文件
      path.join(__dirname, "external"), // 提供 external 目录中的静态文件
    ],
  },

  // 配置解析选项
  resolve: {
    extensions: [".js", ".jsx"], // 解析文件时可以忽略的扩展名
  },
  externals: {
    jquery: "jQuery",
    // $: "jquery",
  },
};
