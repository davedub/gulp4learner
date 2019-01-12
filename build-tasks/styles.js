import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import b4s from 'bootstrap-4-stylus';

var sourceDir = './src',
    buildDir = './dist',
    buildAssets = buildDir + '/assets/',
    buildCSS = buildAssets + '/stylesheets/';

function css(done) {
    return (
        gulp.task(
             gulp.src(sourceDir + '/assets/styles/main.scss')
           .pipe(
                autoprefixer({
                    browsers: ['last 2 versions'],
                    cascade: false,
                })
            )
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(buildCSS)),
            done()
        )
    )
}

function bootstrap(done) {
    return (
        b4s.compress(buildCSS),
        done()
    )
}

gulp.task('css', css);
gulp.task('bootstrap', bootstrap);

gulp.task("compilecss", gulp.series(
    css,
    bootstrap
));