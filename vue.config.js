const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    allowedHosts: '*'
  }
})
