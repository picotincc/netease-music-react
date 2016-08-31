var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev.js');


var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    proxy: config.devServer.proxy,
    // hot: true,
    // historyApiFallback: true,
}).listen(8080, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:8080');
});
