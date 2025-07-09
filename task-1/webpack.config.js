import path from "node:path";
import TerserPlugin from "terser-webpack-plugin";

export default (_env, argv) => {
  const __dirname = import.meta.dirname;
  const mode = argv.mode || "development";

  return {
    mode,
    entry: path.resolve(__dirname, "src", "index.ts"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.js",
      clean: true,
      module: true,
      library: {
        type: "module",
      },
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: [/node_modules/, /\.(test)\.ts$/],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    target: "node",
    experiments: {
      outputModule: true,
      topLevelAwait: true,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false
        }),
      ],
    },
  };
};
