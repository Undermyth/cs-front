const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
  },
  chainWebpack: config => {
    // 添加 text-loader 规则
    config.module
      .rule('text')
      .test(/\.(txt|md)$/) // 匹配 .txt 和 .md 文件
      .use('text-loader')
      .loader('text-loader')
      .end();
  }
});