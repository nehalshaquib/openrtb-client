const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://endpoint.bc-sys.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
}; 