module.exports = {
    // 选项...
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080/',
                pathRewrite: { '^/api': '' },
                ws: true,
                changeOrigin: true
            }
        }
    }
}
