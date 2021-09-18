module.exports = {
    // 选项...
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:9090/',
                pathRewrite: { '^/api': '' },
                ws: true,
                changeOrigin: true
            }
        }
    }
}
