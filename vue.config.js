'use strict'
module.exports = {
    dev: {
        proxyTable: {
            '/test': {
                target: 'http://127.0.0.1/',
                changeOrigin: true,
                pathRewrite: {
                    '^/test': ''
                }
            }
        }
    }
}