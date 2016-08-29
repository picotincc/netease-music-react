/**
 * Build mode config
 */
"use strict";
const webpack = require('webpack');
const path = require('path');
const config = require("./webpack.config.dev");

config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })

    new webpack.optimize.UglifyJsPlugin({
        minimize: true
    })
);

module.exports = config;
