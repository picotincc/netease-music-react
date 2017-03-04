"use strict";

const gulp = require("gulp");
const gutil = require("gulp-util");
const open = require("gulp-open");
const rimraf = require("rimraf");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");


gulp.task("clean", cb => {
    rimraf("./assets", cb);
});

gulp.task("dist", [ "clean" ], cb => {
    webpack(require("./webpack.config.pro.js"), (err, stats) => {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString());
    });
});

gulp.task("dev", [ "clean" ], cb => {
    const config = require("./webpack.config.dev.js");
    const complier = webpack(config);

    new WebpackDevServer(complier, {
        publicPath: config.output.publicPath,
        // proxy: config.devServer.proxy,
        hot: true,
        historyApiFallback: true,
        stats: { colors: true }
    }).listen(3000, "localhost", err => {
        if (err) {
            throw new gutil.PluginError("webpack-dev-server", err);
        }
        const uri = "http://localhost:3000";
        gutil.log("[webpack-dev-server]", uri);
        gulp.src("").pipe(open({ uri }));
    });
});
