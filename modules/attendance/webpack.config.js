const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const { getModulePort } = require("../../webpack-utils/publicPaths");
const { name, dependencies } = require("./package.json");
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: getModulePort(name),
    historyApiFallback: true,
    hot: false,
    hotOnly: false,
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /bootstrap\.tsx$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name,
      filename: "remoteEntry.js",
      exposes: {
        "./routes": "./src/routes",
      },
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
