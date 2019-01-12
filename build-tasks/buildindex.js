import gulp from 'gulp';

function buildindex(done) {
    return (
        gulp.task(
            gulp.src('./src/index.html')
            .pipe(gulp.dest('./dist')),
            done()
        )
    )
}

gulp.task('buildindex', buildindex);