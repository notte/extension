const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = (env) => ({
    mode: env.production ? "production" : "development",
    entry: {
      background: "./src/background.ts",
      service: "./src/service.ts"
    },
    
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".scss"],
      fallback: {
        stream: require.resolve("stream-browserify"),
        buffer: false
      },
      alias: {
        process: 'process/browser',
        stream: "stream-browserify",
        zlib: "browserify-zlib"
      }
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: "[name].js"
    },
    // watch:true,

    module:{
      rules:[
        {
          test:/\.(scss)$/,
          use:[
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
              publicPath: path.resolve(__dirname, "dist"),
            },
            },
            "css-loader",
            "sass-loader",
          ]
        },
        {
          test: /\.ts$/,
          exclude: /(node_modules)/,
          use: ["babel-loader", "ts-loader"],
        },
      ]
    },

    plugins:[
      new HtmlWebpackPlugin({
        template: "./src/popup.html",
        filename: "popup.html"
      }),
      new MiniCssExtractPlugin(),
      new CopyPlugin({
        patterns: [
          { from: "manifest.json", to: "." },
          { from: "icon.png", to: "." }
        ],
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
    }),
    ]
})