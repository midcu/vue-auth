module.exports = {
    // 选项...
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://101.35.137.184:8764/',
                target: 'http://localhost:9090/',
                pathRewrite: { '^/api': '' },
                ws: true,
                changeOrigin: true
            }
        }
    }
}
