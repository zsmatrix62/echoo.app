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

  //region WASM Support
  const wasmExtensionRegExp = /\.wasm$/;
  config.resolve.extensions.push(".wasm");

  config.module.rules.forEach((rule) => {
    (rule.oneOf || []).forEach((oneOf) => {
      if (oneOf.loader && oneOf.loader.indexOf("file-loader") >= 0) {
        // make file-loader ignore WASM files
        oneOf.exclude.push(wasmExtensionRegExp);
      }
    });
  });
  config.module.rules.push(
    ...[
      {
        test: /\.wasm$/,
        type: "webassembly/sync",
      },
    ]
  );
  config.experiments = {
    syncWebAssembly: true,
  };

  return config;
};
