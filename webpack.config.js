const currentTask = process.env.npm_lifecycle_event
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const fse = require("fs-extra")
//-------------------------------------------------------------------------------------------------

let cssConfig = {
  test: /\.css$/i,
  use: ["css-loader", "postcss-loader"],
}
let pages = fse
  .readdirSync("./app")
  .filter(function (file) {
    return file.endsWith(".html")
  })
  .map(function (page) {
    return new HtmlWebpackPlugin({
      title: "Clear View Escapes",
      filename: page,
      template: `app/${page}`,
    })
  })

//---------------------------------- shared -------------------------------------------------
let config = {
  entry: { bundle: path.resolve(__dirname, "app/assets/scripts/App.js") },
  target: "web",
  module: {
    rules: [
      cssConfig,
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext]",
        },
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/icons/[name][ext]",
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  plugins: pages,
}

//---------------------------------- development -------------------------------------------------
if (currentTask == "dev") {
  cssConfig.use.unshift("style-loader")

  config.mode = "development"

  config.devServer = {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    host: "0.0.0.0",
    open: true,
    hot: true,
    open: true,

    compress: true,
    historyApiFallback: true,
  }

  //config.plugins.push(new BundleAnalyzerPlugin())
}

//--------------------------------- production -------------------------------------------------
if (currentTask == "build") {
  cssConfig.use.unshift(MiniCssExtractPlugin.loader)

  config.mode = "production"
  config.output = {
    path: path.resolve(__dirname, "docs"),
    filename: "[name][contenthash].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  }
  config.optimization = {
    splitChunks: { chunks: "all" },
  }
  config.plugins.push(
    new MiniCssExtractPlugin({ filename: "styles[contenthash].css" })
  )
}

//--------------------------------------------------------------------------------------------------
module.exports = config
