const SemiWebpackPlugin = require("@douyinfe/semi-webpack-plugin").default;

module.exports = function override(config, _) {
    config.plugins.push(
        new SemiWebpackPlugin({
            theme: "@semi-bot/semi-theme-universedesign",
        })
    );
    config.watch = true;
    return config;
};
