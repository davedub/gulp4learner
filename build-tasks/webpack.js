var gulp = require("gulp");
var webpackstream = require("webpack-stream");
var connect = require("gulp-connect");

function webpack(done) {
    return (
        gulp.task(
            gulp.src('src/app.js')
            .pipe(webpackstream(require('./../webpack.config.js')))
            .pipe(gulp.dest('dist/assets/scripts/'))
            .pipe(connect.reload()),
            done()
        )
    )
}

gulp.task('webpack', webpack);