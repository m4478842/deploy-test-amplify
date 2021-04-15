module.exports = {
  devServer: {
    proxy: {
      '/local': {
        target: 'http://16.162.44.75:8680',
        pathRewrite: { '^/local': '' },
        ws: false,
        secure: false,
        changeOrigin: true
      },
    },
    disableHostCheck: true,
    hot: true
  },
  lintOnSave: undefined
}