const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0', // 监听所有网络接口
    port: 8080,      // 可以自定义端口号
  }
})
