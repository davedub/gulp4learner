'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const webpackconfig = require("./webpack.config.js");
const webpackstream = require("webpack-stream");
const babelregister = require("@babel/register");

import {
    sayhey,
    messages
} from './build-tasks/messages';
import css from './build-tasks/styles';
import webpack from './build-tasks/webpack';
import index from './build-tasks/index';