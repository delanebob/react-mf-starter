const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { getModulePort, getPublicPath } = require("../../webpack-utils/publicPaths");
const { name, dependencies } = require("./package.json");

module.exports = (_, argv) => ({
  output: {
    publicPath: getPublicPath(name, argv.mode),
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  devServer: {
    port: getModulePort(name),
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name,
      filename: "remoteEntry.js",
      remotes: {
        "shell": "shell@http://localhost:3000/remoteEntry.js",
        "landing": "landing@http://localhost:3001/remoteEntry.js"
      },
      exposes: {
        "./Checkout": "./src/federated/Checkout",
        "./BuyButton": "./src/federated/BuyButton",
        "./Cart": "./src/federated/Cart",
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
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
