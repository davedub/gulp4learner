import gulp from 'gulp'
import sass from 'gulp-sass'

var 
  sourceDir = "./src",
  buildDir = "./dist",
  buildAssets  = buildDir + "/assets/",
  buildCSS = buildAssets + "/stylesheets/"

function css() {
    return gulp
        .src(sourceDir + "/assets/components/styles/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(buildCSS))
    return done()
}

gulp.task("css", css);