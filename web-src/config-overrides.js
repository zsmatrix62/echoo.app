const SemiWebpackPlugin = require('@douyinfe/semi-webpack-plugin').default
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')

module.exports = function override(config, _) {
  config.plugins.push(
    new SemiWebpackPlugin({
      theme: '@semi-bot/semi-theme-universedesign',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8888,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info',
    })
  )

  //region WASM Support
  const wasmExtensionRegExp = /\.wasm$/

  config.resolve.extensions.push('.wasm')

  config.module.rules.forEach((rule) => {
    ;(rule.oneOf || []).forEach((oneOf) => {
      if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
        // make file-loader ignore WASM files
        oneOf.exclude.push(wasmExtensionRegExp)
      }
    })
  })

  // add a dedicated loader for WASM
  config.module.rules.push({
    test: wasmExtensionRegExp,
    include: path.resolve(__dirname, 'src'),
    use: [{ loader: require.resolve('wasm-loader'), options: {} }],
  })
  //endregion

  return config
}
