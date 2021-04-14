module.exports = {
  devServer: {
    proxy: {
      '/local': {
        target: 'http://18.162.151.236:8680',
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