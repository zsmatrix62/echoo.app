const SemiWebpackPlugin = require("@douyinfe/semi-webpack-plugin").default;
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const path = require("path");

module.exports = function override(config, _) {
  config.plugins.push(
    new SemiWebpackPlugin({
      theme: "@semi-bot/semi-theme-universedesign",
    }),
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/microsoft/monaco-editor/blob/main/webpack-plugin/README.md#options
      languages: ["json"],
    })
  );

  config.module.rules.push(
    ...[
      {
        test: /\.wasm$/,
        type: "webassembly/async",
      },
    ]
  );

  config.experiments = {
    asyncWebAssembly: true,
  };

  return config;
};
