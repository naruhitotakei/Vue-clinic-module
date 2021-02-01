module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: process.env.API_URL || 'http://localhost:3080',
          changeOrigin: true
        },
      }
    }
  }