var gulp = require("gulp");

function index(done) {
    return (
        gulp.task(
            gulp.src('./index.html')
            .pipe(gulp.dest('./dist')),
            done()
        )
    )
}

gulp.task('index', index);