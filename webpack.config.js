const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/**
 * webpack插件将打包好的文件注入到html模板里
 * @type {HtmlWebpackPlugin}
 */
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "./public/index.html"),
  filename: "./index.html",
});

module.exports = {
  mode: "development", //这个值有3种：production、development、none
  entry: path.join(__dirname, "./public/app.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: [
          {
            //用 babel-loader 把es6转es5
            loader: "babel-loader",
          },
          "ts-loader",
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }], //打包处理css样式表的第三方loader
      },
      {
        //只为less启用模块化
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: { localIdentName: "[path][name]-[local]-[hash:5]" },
            },
          },
          { loader: "less-loader" },
        ],
      },
    ],
  },
  plugins: [htmlWebpackPlugin], //插件：自动注入编译打包好的文件
  resolve: {
    extensions: [".js", ".tsx"],
  },
  devServer: {
    port: 3001, //端口号
    open: true, // 自动打开浏览器
    compress: true, // 启动gzip压缩
  },
};
