import gulp from 'gulp';

function index(done) {
    return (
        gulp.task(
            gulp.src('./src/index.html')
            .pipe(gulp.dest('./dist')),
            done()
        )
    )
}

gulp.task('index', index);