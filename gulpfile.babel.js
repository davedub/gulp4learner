"use strict";

const gulp = require("gulp");
const babel = require('gulp-babel');
const webpackconfig = require("./webpack.config.js");
const webpackstream = require("webpack-stream");
const babelregister = require("@babel/register");

var css = require('./build-tasks/styles');
var messages = require('./build-tasks/messages');
var sayhey = require('./build-tasks/messages');
var webpack = require('./build-tasks/webpack');

// import [ sayhey, messages ] from './build-tasks/messages'
// import css from './build-tasks/styles'
// import index from './build-tasks/index'
// import webpack from './build-tasks/webpack'