const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const {
  getModulePort,
  getRemoteUrl,
  getPublicPath,
  getProductionDistPath,
} = require("../../build-utils/webpack-functions");
const { name, dependencies } = require("./package.json");
const path = require("path");

module.exports = (env, argv) => {
  const { mode } = argv;

  return {
    entry: "./src/index",
    mode,
    output: {
      publicPath: mode === "production" ? getPublicPath(name, mode) : "/",
      path: getProductionDistPath(name),
      filename: "[name].[contenthash].js",
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      port: getModulePort(name),
      historyApiFallback: true,
      hot: false,
      hotOnly: false,
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
      new CleanWebpackPlugin(),
      new ModuleFederationPlugin({
        name,
        remotes: {
          dashboard: getRemoteUrl("dashboard", mode),
          attendance: getRemoteUrl("attendance", mode),
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
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
  };
};
